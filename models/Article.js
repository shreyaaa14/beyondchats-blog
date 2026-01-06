const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: String,

    // original scraped content
    content: String,

    // updated / rewritten content
    updatedContent: String,

    sourceUrl: String,

    image: Number,

    isUpdated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);
