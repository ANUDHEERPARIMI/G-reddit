const mongoose = require('mongoose');

const SavedPostSchema = new mongoose.Schema({
  user: {
    type: String,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Posts'
  },
  savedAt: {
    type: Date,
    default: Date.now
  }
});
const savedpost = mongoose.model('SavedPost', SavedPostSchema);
module.exports = {savedpost}
