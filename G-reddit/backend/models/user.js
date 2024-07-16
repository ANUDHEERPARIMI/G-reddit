const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const { commentSchema } = require('./posts');

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true, unique:true, dropDups: true },
	password: { type: String, required: true },
	username: { type: String, required: true},
	subgreddiits: [{type: String},],
	posts: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Posts'},],
	followers: [ { type: String }],
	following: [ { type: String }],
	totalComments: { type: Number, default: 0, },
	savedPosts: [ { type: mongoose.Schema.Types.ObjectId, ref: 'SavedPost'}],
	},
	{
	  timestamps: true,
	}
);

userSchema.methods.generateAuthToken = async function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};
const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
		username: Joi.string().required().label("Username")
	});
	return schema.validate(data);
};

const User = mongoose.model("user", userSchema);
module.exports = { User, validate };
