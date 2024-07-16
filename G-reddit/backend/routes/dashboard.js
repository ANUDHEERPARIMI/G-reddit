const router = require("express").Router()
const{subgreddiit} = require("../models/subgreddit")
const{posts} = require("../models/posts")
const{User} = require("../models/user")
const {savedpost} = require("../models/savedpost")
const {reportedpost} = require("../models/reportedpost")

// const getsubredposts = async(subredd) => {
//     const subred = await subgreddiit.findById(subredd)
//     subred.posts.map(getposts)
// }

// const getposts = async(post) => {
//     const postt = await posts.findById(post)
//     postts.push(postt)
// }

router.get("/", async(req, res) => {  
    // try{
    //     let postts = []
    //     const userr = await User.findOne({email: req.query.email})
    //     userr.subgreddiits.map(getsubredposts)
    //     res.json(postts)
    // }
    // catch(error){
    //     console.log(error)
    // }
    try{
        let postts = []
        const userr = await User.findOne({email: req.query.email})
        for(i = 0; i < userr.subgreddiits.length; i++){
            const subred = await subgreddiit.findById(userr.subgreddiits[i])
            for(j = subred.posts.length - 1; j >= 0; j--){
                const postt = await posts.findById(subred.posts[j])
                postts.push(postt)
            }
        }
        res.json(postts)
    }
    catch(error){
        console.log(error)
    }
});

router.post("/", async(req,res) => {
    try{
        console.log(req.body.params)
        const postt = await posts.findById(req.body.params.id)
        const subgred = await subgreddiit.findOne({subredditName: req.body.params.subreddit})
        const reppost = await new reportedpost({
            author: postt.author,
            reporter: req.body.params.reporter, 
            concern: req.body.params.concern, 
            text: postt.textSubmission, 
            subreddit: subgred._id,
            post : postt._id
        }).save()
        console.log(subgred)
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

module.exports = router
