const Article = require("../models/Article");
const connectDB = require("../config/db");
require("dotenv").config();

const updateArticles = async () => {
  try {
    await connectDB();

    // get articles not updated yet
    const articles = await Article.find({ isUpdated: false });

    console.log(`🔍 Found ${articles.length} articles to update`);

    for (const article of articles) {
      // SIMPLE simulated AI rewrite
      const updatedText =
        "UPDATED VERSION:\n\n" +
        article.content.slice(0, 800) +
        "\n\n[This content has been enhanced for clarity and readability.]";

      article.updatedContent = updatedText;
      article.isUpdated = true;

      await article.save();

      console.log(`✅ Updated: ${article.title}`);
    }

    console.log("🎉 Phase 2 update completed");
    process.exit();
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
};

updateArticles();
