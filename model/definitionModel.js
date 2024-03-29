const mongoose = require("mongoose");

const definitionModel = mongoose.Schema(
	{
		meaning: {
			type: String,
		},

		useCase: {
			type: String,
		},

		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
		},
		post: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "posts",
		},

		like: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "likes",
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("definitions", definitionModel);