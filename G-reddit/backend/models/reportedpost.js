const mongoose = require('mongoose');

const ReportedPostSchema = new mongoose.Schema({
    author: {
      type: String,
    },
    reporter: {
        type: String,
      },
    concern: {
        type: String,
    },
    subreddit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subreddit'
    },
    text: {
        type: String, 
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts'
    }
  });

const reportedpost = mongoose.model('Reportedpost', ReportedPostSchema);
module.exports = {reportedpost}