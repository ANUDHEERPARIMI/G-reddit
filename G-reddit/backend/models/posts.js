const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  repliedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  replyBody: {
    type: String,
    trim: true,
  },
  upvotedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  downvotedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  pointsCount: {
    type: Number,
    default: 1,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const commentSchema = new mongoose.Schema({
  commentedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  commentBody: {
    type: String,
    trim: true,
  },
  replies: [replySchema],
  upvotedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  downvotedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  pointsCount: {
    type: Number,
    default: 1,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100,
    trim: true,
  },
  postType: {
    type: String,
  },
  textSubmission: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
  },
  linkSubmission: {
    type: String,
    trim: true,
  },
  imageSubmission: {
    imageLink: {
      type: String,
      trim: true,
    },
    imageId: {
      type: String,
      trim: true,
    },
  },
  subreddit: {
    type: String,
    ref: 'Subreddit',
  },
  // author: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  // },
  author: {
    type: String,
  },
  isSaved: {
    type: Boolean,
    default: false,
  },
  upvotecount:
    {
      type: Number,
      default: 0,
    },
  downvotecount:
    {
      type: Number,
      default: 0,
    },
  pointsCount: {
    type: Number,
    default: 1,
  },
  voteRatio: {
    type: Number,
    default: 0,
  },
  savedby: [
    {
      type:String,
    }
  ],
  hotAlgo: {
    type: Number,
    default: Date.now,
  },
  controversialAlgo: {
    type: Number,
    default: 0,
  },
  comments: [ {
    type: String,
  } ],
  commentCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
const posts = mongoose.model("Posts", postSchema)
module.exports = {posts};
