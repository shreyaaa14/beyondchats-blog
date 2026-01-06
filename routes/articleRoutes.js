const express = require("express");
const router = express.Router();
const {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/articleController");
const Article = require("../models/Article");  // ← Add this import

router.get("/", getArticles);
router.post("/", createArticle);
router.put("/:id", updateArticle);
router.delete("/:id", deleteArticle);

// ✨ NEW ROUTE - Assign random images to all articles
router.get("/assign-images", async (req, res) => {
  try {
    const articles = await Article.find();
    
    let updated = 0;
    for (let article of articles) {
      // Assign random number 1-5
      article.image = Math.floor(Math.random() * 5) + 1;
      await article.save();
      updated++;
    }
    
    res.json({ 
      message: '✅ Images assigned successfully!', 
      totalArticles: articles.length,
      updated: updated
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
