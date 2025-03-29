const mongoose = require("mongoose");

const memoSchema = new mongoose.Schema({
  user: {
    // typeとrefはセット
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  icon: {
    type: String,
    default: "📝",
  },
  title: {
    type: String,
    default: "無題",
  },
  description: {
    type: String,
    default: "ここにメモを記入して下さい．",
  },
  position: {
    type: Number,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  favoritePosition: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Memo", memoSchema);
