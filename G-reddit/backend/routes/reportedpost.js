const router = require("express").Router();
const {subgreddiit} = require("../models/subgreddit")
const {posts} = require("../models/posts")
const {savedpost} = require("../models/savedpost")
const {reportedpost} = require("../models/reportedpost")

router.post("/", async(req,res) => {
    try{
        console.log(req.body.params)
        const postt = await posts.findById(req.body.params.id)
        const reppost = await new reportedpost({
            author: postt.author,
            reporter: req.body.params.reporter, 
            concern: req.body.params.concern, 
            text: postt.textSubmission, 
            subreddit: req.body.params.subreddit,
            post : postt._id
        }).save()
        const subgred = await subgreddiit.findById(req.body.params.subreddit)
        if(!(subgred.reportedposts.includes(reppost)))
        {
        subgred.reportedposts.push(reppost)
        }
        await subgred.save()
    }
    catch(error){
        console.log(error)
    }
})
router.get("/", async(req,res) => {
    try{
        const c = await reportedpost.find({subreddit: req.query.id})
        res.json(c)
    }
    catch(error){
        console.log(error)
    }
})
router.delete("/", async(req,res) => {
    try{
        console.log(req.query.id)
        const postt = await posts.findById(req.query.id)
        const subgred = await subgreddiit.findOne({subredditName: postt.subreddit})
        console.log(subgred.posts)
        console.log(postt._id)
        if(subgred.posts.includes(postt._id))
        {
            console.log("Yes")
        subgred.posts = subgred.posts.filter(post => !(post.equals(postt._id)))
        postt.savedby = []
        postt.isSaved = false
        // let b = []
        // for(let i = 0;i<subgred.posts.length;i++)
        // {
        //     const postt1 = await posts.findById(subgred.posts[i])
        //     console.log(postt1)
        //     if(postt1 !== postt)
        //     {
        //         b.push(subgred.posts[i])
        //     }
        //     else
        //     {
        //         console.log("NOOOOOO")
        //     }
        // }
        // subgred.posts = b
        }

        const savedpostt = await savedpost.findByIdAndDelete(postt._id)
        console.log(subgred.posts)
        const reportedpostt = await reportedpost.findOneAndDelete({post: req.query.id})
        await subgred.save()
        await postt.save()
    }
    catch(error){
        console.log(error)
    }
})
module.exports = router