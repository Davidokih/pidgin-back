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
			default: "https://res.cloudinary.com/dmrqqaapc/image/upload/v1655727638/s0ddjf3ogzij4soowcnc.jpg"
		},
		avatarID: {
			type: String,
			default: "s0ddjf3ogzij4soowcnc"
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

		},
		gender:
		{
			type: String,
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
