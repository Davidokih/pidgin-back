const mongoose = require("mongoose");

const postModel = mongoose.Schema(
	{
		word: {
			type: String,
		},

		useCase: {
			type: String,
		},
		userDefinition: {
			type: String,
		},
		avatar: {
			type: String,
		},
		avatarID: {
			type: String,
		},

		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
		},

		definition: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "definitions",
			},
		],

		like: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "likes",
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("posts", postModel);
