const Article = require("../models/Article");
const connectDB = require("../config/db");
require("dotenv").config();

const cleanArticles = async () => {
  try {
    await connectDB();

    const articles = await Article.find({ isUpdated: true });

    for (const article of articles) {
      let content = article.content;

      // Remove common unwanted sections
      const removeTexts = [
        "Leave a Reply",
        "Your email address will not be published",
        "Post Comment",
        "Name *",
        "Email *",
        "Website",
        "BeyondChats",
      ];

      removeTexts.forEach((text) => {
        content = content.split(text)[0];
      });

      article.content = content.trim();
      await article.save();

      console.log(`✅ Cleaned: ${article.title}`);
    }

    console.log("🎉 Cleaning completed");
    process.exit();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

cleanArticles();
