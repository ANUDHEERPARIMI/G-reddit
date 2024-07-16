const mongoose = require('mongoose');

const subredditSchema = new mongoose.Schema(
  {
    subredditName: {
      type: String,
      required: true,
      unique: true,
      dropDups: true
    },
    description: {
      type: String,
      required: true,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts',
      },
    ],
    // admin: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    // },
    admin:  {
      type: String,
    },
    members: [{
      type: String,
    }],
    joiningreqs: [{
      type: String,
    }],
    leftusers: [{
      type: String,
    }],
    followedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    followerCount: {
      type: Number,
      default: 1,
    },
    bannedkeywords: [
      {
        type: String,
      }
    ],
    reportedposts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reportedpost',
      }
    ],
    tags: [
      {
        type: String,
      }
    ],
  },
  {
    timestamps: true,
  }
);
const subgreddiit = mongoose.model("Subreddit", subredditSchema);
module.exports = {subgreddiit};