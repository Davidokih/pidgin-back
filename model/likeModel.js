const mongoose = require("mongoose");

const likeModel = mongoose.Schema(
	{
		_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
		},
		definition: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "definitions",
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model("likes", likeModel);
