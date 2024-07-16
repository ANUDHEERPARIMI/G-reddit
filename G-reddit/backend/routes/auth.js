const router = require("express").Router();

// const { User } = require("../models/user");
const { User } = require("../models/user")
const bcrypt = require("bcrypt");
const Joi = require("joi");
// const axioss = require("axios")
// const jwt = require("jsonwebtoken");
//const passwordComplexity = require("joi-password-complexity");

// const userSchema = new mongoose.Schema({
// 	firstName: { type: String, required: true },
// 	lastName: { type: String, required: true },
// 	email: { type: String, required: true },
// 	password: { type: String, required: true },
// });

// userSchema.methods.generateAuthToken = function () {
// 	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
// 		expiresIn: "7d",
// 	});
// 	return token;
// };
// userSchema.methods.generateAuthToken = async function() {
// 	//try using Camel notation here(User(U with uppercase))
// 	const User = this    
// 	const token = jwt.sign({_id:user._id.toString()},'thisisnewcourse')
// 	return token}
	
// 	const token = await User.generateAuthToken()
router.post("/", async (req, res) => {
	try {
		 const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

		//const token = a
		//const token = await user.generateAuthtoken()
		//console.log(token);
		const token = user.email
		//localStorage.setItem("firstname", user.firstName)
		//localStorage.setItem("lastname", user.lastName)
		console.log(token)
		res.status(200).send({ data: token, message: "logged in successfully" });
	} catch (error) {
		res.status(500).send({ message: `${error}` });
	}
});
router.get('/', function(req, res, next) {
    res.send("Hello world");
});
router.post("/userData", async (req, res) => {
	const { token } = req.body;
	try {
	//   const user = jwt.verify(token, JWT_SECRET, (err, res) => {
	// 	if (err) {
	// 	  return "token expired";
	// 	}
	// 	return res;
	//   });
	//   console.log(user);
	//   if (user == "token expired") {
	// 	return res.send({ status: "error", data: "token expired" });
	//   }
	User.findOne({ email: req.body.email })
	.then((data) => {
		res.send({status : "ok", data: data});
	})
	.catch((error) => {
		res.send({ status: "error", data : error})
	})
  
	//   const useremail = user.email;
	//   User.findOne({ email: useremail })
	// 	.then((data) => {
	// 	  res.send({ status: "ok", data: data });
	// 	})
	// 	.catch((error) => {
	// 	  res.send({ status: "error", data: error });
	// 	});
	} catch (error) {}
  });
const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;
