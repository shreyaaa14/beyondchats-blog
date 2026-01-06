const Article = require("../models/Article");

// GET all articles
exports.getArticles = async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
};

// CREATE article
exports.createArticle = async (req, res) => {
  const article = await Article.create(req.body);
  res.json(article);
};

// UPDATE article
exports.updateArticle = async (req, res) => {
  const updated = await Article.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

// DELETE article
exports.deleteArticle = async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.json({ message: "Article deleted" });
};
