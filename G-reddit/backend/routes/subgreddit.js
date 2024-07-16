const router = require("express").Router();
const {subgreddiit} = require("../models/subgreddit")
const {posts} = require("../models/posts");
const { savedpost } = require("../models/savedpost");
const {reportedpost} = require("../models/reportedpost")
const {User} = require("../models/user")

router.post("/", async (req,res) => {
    try {
        // const subgred = await subgreddiit.findOne({subredditName: req.body.name})
        // if(subgred)
        //     return res
        //         .status(409)
        //         .send({ message: "Subgreddiit with given name already Exists!" });
        const newsubgreddit = new subgreddiit({
            admin: req.body.admin,
            description: req.body.description,
            subredditName: req.body.name,
            posts: [],
            followedBy: [],
            followerCount: 1,
            bannedkeywords: req.body.bannedkeywords,
            tags: req.body.tags,
        });
        newsubgreddit.members.push(req.body.admin)
        await newsubgreddit.save()
        res.status(201).send(newsubgreddit);
        const userr = await User.findOne({email: req.body.admin})
        const subred = await subgreddiit.find({subredditName: req.body.name})
        userr.subgreddiits.push(String(subred[0]._id))
        await userr.save()
    }
    catch (error) {
        console.log(error)
		res.status(500).send({ message: `${error}` });
	}
});

router.get("/", async(req,res) => {
    try{
        const subred = await subgreddiit.find();
    res.json(subred);
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' });
    }
});

router.get("/:id", async(req,res) => {
    try{
        //const subred = await subgreddiit.findById("64033571322c2b43ee0319c1")
        const subred = await subgreddiit.findById(req.params.id)
        if (!subred) {
            return res.status(404).json({ message: 'Subreddit not found' });
        }
        res.json(subred);
    }
    catch(error){
        console.log(error)
    }
});
router.post("/:id/posts", async(req,res) => {
    try{
        const subred = await subgreddiit.findById(req.params.id)
        if (!subred) {
            return res.status(404).json({ message: 'Subreddit not found' });
          }
        const subredd = await subgreddiit.findById(req.body.subreddit)
        const postt = await new posts({
            title: req.body.title,
            author: req.body.author,
            textSubmission: req.body.content,
            image: req.body.image,
            subreddit: subredd.subredditName
        })
        console.log(postt.subreddit)
        const regexes = subredd.bannedkeywords.map(keyword => new RegExp(keyword, 'gi'))
        let flag = 0
        regexes.forEach(regex => {
            if (regex.test(postt.textSubmission)) {
              flag=1
            }
          });
        if(flag === 1)
        {
            console.log("Post contains the banned keyword")
            for (let i = 0; i < subredd.bannedkeywords.length; i++) {
                postt.textSubmission = postt.textSubmission.replace(subredd.bannedkeywords[i], "*".repeat(subredd.bannedkeywords[i].length));
            }

        }
        try{
            posts.create({image:image})
            console.log('Posted')
        }
        catch{
            console.log('Failed to Post')
        }
        await postt.save()
        subred.posts.push(postt)
        await subred.save()
        res.send({makealert: false})
    }
    catch(error){
        console.log(error)
    }
})
router.get("/:id/posts", async(req,res) => {
    try{
        const subred = await subgreddiit.findById(req.params.id)
        let m = []
        for (i=subred.posts.length-1;i>=0;i--)
        {
        const k = await posts.findById(subred.posts[i])
        m.push(k)
        }
        //console.log(m)
        res.json(m)
    }
    catch(error){
        console.log(error)
    }
})
router.delete("/:id", async(req,res) => {
    try{
        const { id } = req.params;
        const subgred = await subgreddiit.findById(id)
        await posts.deleteMany({subreddit: subgred.subredditName})
        await savedpost.deleteMany({subreddit: subgred.subredditName})
        await reportedpost.deleteMany({subreddit: id})
        await subgreddiit.findByIdAndDelete(id)
    }
    catch(error)
    {
        console.log(error)
    }
})
router.post("/upvote", async(req,res) => {
    try{
        const postt = await posts.findById(req.body.post)
        postt.upvotecount = postt.upvotecount + 1
        await postt.save()
    }
    catch(error)
    {
        console.log(error)
    }
})
router.post("/downvote", async(req,res) => {
    try{
        const postt = await posts.findById(req.body.post)
        console.log(postt)
        postt.downvotecount = postt.downvotecount + 1
        await postt.save()
    }
    catch(error)
    {
        console.log(error)
    }
})
router.post("/comments", async(req,res) => {
    try{
        const postt = await posts.findById(req.body.post)
        console.log(req.body)
        postt.comments.push(req.body.comment)
        await postt.save()
    }
    catch(error)
    {
        console.log(error)
    }
})
router.post("/join", async(req,res) => {
    try{
        //console.log("query",req.query)
        console.log("body",req.body)
        const subgred = await subgreddiit.findById(req.body.params.id)
        let flag = 0
        for(let i =0;i<subgred.members.length;i++)
        {
            if(subgred.members[i] === req.body.params.email)
            {
                flag=1
                break
            }
        }
        for(let i =0;i<subgred.leftusers.length;i++)
        {
            if(subgred.leftusers[i] === req.body.params.email)
            {
                flag=2
                break
            }
        }
        if(flag === 0)
        {
            subgred.joiningreqs.push(req.body.params.email)
            console.log(subgred.joiningreqs)
            await subgred.save()
            res.send({makealert: false})

        }
        if(flag === 2)
        {
            res.send({makealert: true})
        }
        if(flag === 1)
        {
            res.send({makealert: false})
        }
    }
    catch(error)
    {
        console.log(error)
    }
})
router.post("/leave", async(req,res) => {
    try{
        //console.log("query",req.query)
        console.log("body",req.body)
        const subgred = await subgreddiit.findById(req.body.params.id)
        let flag = 0
        for(let i =0;i<subgred.members.length;i++)
        {
            if(subgred.members[i] === req.body.params.email)
            {
                flag=1
                break
            }
        }
        if(flag === 1)
        {
            const userr = await User.findOne({email: req.body.params.email})
            userr.subgreddiits = userr.subgreddiits.filter(subgreddiits => subgreddiits != req.body.params.id)
            subgred.members = subgred.members.filter(email => email!=req.body.params.email)
            subgred.leftusers.push(req.body.params.email)
            console.log(subgred.members)
            await userr.save()
            await subgred.save()
        }
    }
    catch(error)
    {
        console.log(error)
    }
})
router.post("/:id/accept", async(req,res) => {
    try{
        const subgred = await subgreddiit.findById(req.body.id)
        subgred.joiningreqs = subgred.joiningreqs.filter(email => email!=req.body.email)
        if(!subgred.members.includes(req.body.email))
        {
            subgred.members.push(req.body.email)
            const userr = await User.findOne({email: req.body.email})
            userr.subgreddiits.push(req.body.id)
            await userr.save()
            
        }
        console.log("members", subgred.members)
        console.log("reqs", subgred.joiningreqs)
        await subgred.save()
    }
    catch(error){
        console.log(error)
    }
})
router.post("/:id/reject", async(req,res) => {
    try{
        console.log(req.body.id)
        const subgred = await subgreddiit.findById(req.body.id)
        subgred.joiningreqs = subgred.joiningreqs.filter(email => email!=req.body.email)
        console.log("members", subgred.members)
        console.log("reqs", subgred.joiningreqs)
        await subgred.save()
    }
    catch(error){
        console.log(error)
    }
})
// router.get("/", async(req,res) => {
//     try{
//         const subred = await subgreddiit.findOne({admin : localStorage.getItem("token")});
//         res.json(subred);
//     }
//     catch(error){
//         console.log(error)
//     }
// })

module.exports = router