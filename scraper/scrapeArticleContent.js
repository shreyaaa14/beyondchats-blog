const axios = require("axios");
const cheerio = require("cheerio");
const Article = require("../models/Article");
const connectDB = require("../config/db");
require("dotenv").config();

const scrapeArticleContent = async () => {
  try {
    await connectDB();

    // 1️⃣ Get articles with placeholder content
    const articles = await Article.find({
      content: "To be scraped later",
    });

    console.log(`🔍 Found ${articles.length} articles to update`);

    for (const article of articles) {
      try {
        // 2️⃣ Fetch article page
        const { data } = await axios.get(article.sourceUrl);
        const $ = cheerio.load(data);

        // 3️⃣ Extract text (paragraphs)
        let content = "";
        $("p").each((i, el) => {
          content += $(el).text().trim() + "\n\n";
        });

        if (content.length < 100) {
          console.log(`⚠️ Skipped (too short): ${article.title}`);
          continue;
        }

        // 4️⃣ Update DB
        article.content = content.trim();
        article.isUpdated = true;
        await article.save();

        console.log(`✅ Updated: ${article.title}`);
      } catch (err) {
        console.log(`❌ Failed: ${article.title}`);
      }
    }

    console.log("🎉 Content scraping completed");
    process.exit();
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
};

scrapeArticleContent();
