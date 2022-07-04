const mongoose = require("mongoose");

const likeModel = mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "posts",
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("likes", likeModel);
