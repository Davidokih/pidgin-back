const mongoose = require("mongoose");

const userModel = mongoose.Schema(
	{
		fullName: {
			type: String,
		},
		email: {
			type: String,
			unique: true,
		},
		password: {
			type: String,
		},
		verifiedToken: {
			type: String,
		},
		isVerified: {
			type: Boolean,
		},
		avatar: {
			type: String,
			default: "https://res.cloudinary.com/dmrqqaapc/image/upload/v1656856348/xe9vjnpt5wjxks65wevo.png"
		},
		avatarID: {
			type: String,
			default: "xe9vjnpt5wjxks65wevo"
		},
		post: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "posts",
			},
		],
		// bio: [
		// 	{
		// 		type: mongoose.Schema.Types.ObjectId,
		// 		ref: "bios",
		// 	}
		// ],
		bio:
		{
			type: String,
			default: "input you bio"
		},
		gender:
		{
			type: String,
			default: "input your gender"
		},
		saved: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "saves",
			},
		]
	},
	{ timestamps: true }
);

module.exports = mongoose.model("users", userModel);
