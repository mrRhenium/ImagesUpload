const mongoose = require("mongoose");

const QuestionScema = new mongoose.Schema({
  q_id: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
});

module.exports = mongoose.model("question", QuestionScema);
