const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    title: String,
    body: String,
    tags: [{ type: String }],
    created_at: {
      type: Date,
      default: Date.now(),
    },
    user: Object,
    coins: { type: Number, default: 0 },
    likes: [{ type: String }],
    dislikes: [{ type: String }],
    image: String
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Questions", questionSchema);
