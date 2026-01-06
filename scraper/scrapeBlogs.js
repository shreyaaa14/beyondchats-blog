const axios = require("axios");
const cheerio = require("cheerio");
const Article = require("../models/Article");
const connectDB = require("../config/db");
require("dotenv").config();

const scrapeBlogs = async () => {
  try {
    // Connect to DB
    await connectDB();

    const url = "https://beyondchats.com/blogs/";
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const articles = [];

    // Use correct selector
    $("article")
      .slice(-5)
      .each((i, el) => {
        const title = $(el).find("h2, h3").first().text().trim();
        const link = $(el).find("a").attr("href");

        if (title && link) {
          articles.push({
            title,
            content: "To be scraped later",
            sourceUrl: link,
            isUpdated: false,
          });
        }
      });

    if (articles.length === 0) {
      console.log("❌ No articles found – selector mismatch");
      process.exit();
    }

    await Article.insertMany(articles);
    console.log(`✅ ${articles.length} articles saved`);

    process.exit();
  } catch (err) {
    console.error("❌ Scraping failed:", err.message);
    process.exit(1);
  }
};

scrapeBlogs();
