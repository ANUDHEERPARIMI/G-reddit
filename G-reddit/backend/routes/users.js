const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	try {
		console.log("req.body",req.body)
		const { error } = validate(req.body);
		if (error)
		{
			console.log(error)
			return res.status(400).send({ message: error.details[0].message });
		}

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		console.log(error)
		res.status(500).send({ message: `${error}` });
	}
});
router.get("/", async(req, res) => {
	try {
		console.log(req.query.email)
		const userr = await User.findOne({ email: req.query.email});
		console.log(userr.followers.length)
		res.json(userr);

	}
	catch(error) {
		console.log(error)
	}
})
router.post("/followers", async(req,res) => {
	try{
		const rec = req.body.email
		const rec2 = req.body.email2
		console.log("email",req.body.email)
		console.log("email2",req.body.email2)
		const user2 = await User.findOne({ email: rec});
		const user1 = await User.findOne({ email: rec2})
		let flag=0
		for(i=0;i<user1.following.length;i++)
		{
			if((user1.following)[i] === rec)
			{
				flag=1
				break
			}
		}
		if(flag === 0)
		{
		user1.following.push(rec)
		console.log("following push done")
		}
		let flag1=0
		for(i=0;i<user2.followers.length;i++)
		{
			if((user2.followers)[i] === rec2)
			{
				flag1=1
				break
			}
		}
		if(flag1 === 0)
		{
			user2.followers.push(rec2)
			console.log("followers push done")
		}
		// if(!(user1.following.includes(rec)))
		// {
		// user1.following.push(rec)
		// user2.followers.push(rec2)
		// }
		await user1.save()
		await user2.save()
		console.log("done again")
	}
	catch(error){
		console.log(error)
	}
})
router.delete("/followers", async(req,res) => {
	try{
		const rec = req.query.email
		const rec2 = req.query.email2
		//console.log("email", req)
		const user1 = await User.findOne({email:rec})
		const user2 = await User.findOne({email:rec2})
		console.log("rec", user1.followers)
		console.log("rec2", user2.following)
		user1.followers = user1.followers.filter(element => element!=rec2)
		user2.following = user2.following.filter(element => element!=rec)
		//const updateduser1 = await user1.save()
		if(rec !== rec2)
		{
			
		const updateduser1 = await user1.save()
		const updateduser2 = await user2.save()
		}
		else
		{
			user1.following = user1.following.filter(element => element!=rec)
			user2.followers = user2.followers.filter(element => element!=rec2)
			await user1.save()
			await user2.save()
		}
		//res.status(200).send("1089")
	}
	catch(error){
		console.log(error)
	}
})
router.delete("/following", async(req,res) => {
	try{
		const rec = req.query.email
		const rec2 = req.query.email2
		//console.log("email", req)
		const user1 = await User.findOne({email:rec})
		const user2 = await User.findOne({email:rec2})
		user1.following = user1.following.filter(element => element!=rec2)
		user2.followers = user2.followers.filter(element => element!=rec)
		console.log("email", rec)
		console.log("local", rec2)
		console.log(user2.following)
		//const updateduser1 = await user1.save()
		if(rec !== rec2)
		{
		const updateduser1 = await user1.save()
		const updateduser2 = await user2.save()
		}
		else
		{
			user1.following = user1.following.filter(element => element!=rec)
			user2.followers = user2.followers.filter(element => element!=rec2)
			await user1.save()
			await user2.save()
		}
		//res.status(200).send("1089")


	}
	catch(error){
		console.log(error)
	}
})
// router.post("/savedposts", async(req,res) => {
// 	try{
// 		const userr = await User.findOne({email: req.body.email})
// 		let flag=0
// 		for(i=0;i<userr.savedPosts.length;i++)
// 		{
// 			if(userr.savedPosts[i] === req.body.post)
// 			{
// 				flag=1
// 				break
// 			}
// 		}
// 		if(flag==0)
// 		{
// 		userr.savedPosts.push(req.body.post)
// 		}
// 		await userr.save()
// 		res.json(req.body.post)

// 	}
// 	catch(error)
// 	{
// 		console.log(error)
// 	}
// })
// router.get("/savedposts", async(req,res) => {
// 	try{
// 		const userr = await User.findById(id)
// 		res.json(userr.savedPosts)
// 	}
// })
module.exports = router;