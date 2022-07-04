const postModel = require("../model/postModel");
const definitionModel = require("../model/definitionModel");
const likeModel = require("../model/likeModel");
const mongoose = require("mongoose");

const likePost = async (req, res) => {
  try {
    const getUser = await postModel.findByIdAndUpdate(
      req.params.post,
      {
        $push: { like: req.params.id },
      },
      { new: true }
    );

    res.status(201).json({ message: "post created", data: getUser });
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error.message);
  }
};

const viewLike = async (req, res) => {
  try {
    const addLike = await definitionModel.findById(req.params.definition).populate("like");

    res.status(201).json({ message: "add Like", data: addLike });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const unLike = async (req, res) => {
  try {
    const getUser = await postModel.findByIdAndUpdate(
      req.params.post,
      {
        $pull: { like: req.params.id },
      },
      { new: true }
    );

    res.status(201).json({ message: "post created", data: getUser });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  viewLike,
  likePost,
  unLike,
};