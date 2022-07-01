const userModel = require("../model/userModel");
const bioModel = require("../model/bioModel");
const mongoose = require("mongoose");
const cloudinary = require("../utils/cloudinary");

const getAllBio = async (req, res) => {
  try {
    const bio = await bioModel.find().sort({ word: "asc" });

    res.status(200).json({
      status: "All Bio Found Successfully",
      totalBio: bio.length,
      data: bio,
    });
  } catch (error) {
    res.status(404).json({
      message: "No Bio Found",
    });
  }
};
const getBio = async (req, res) => {
  try {
    const bio = await bioModel.findById(req.params.bioID);

    res.status(200).json({
      status: "User  Bio Found Successfully",
      data: bio,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
const deleteBio = async (req, res) => {
  try {
    const bio = await bioModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Deleted successfully",
      data: bio,
    });
  } catch (error) {
    res.status(404).json({
      message: "Unable to delete Bio",
    });
  }
};
const createBio = async (req, res) => {
  try {
    const { bio, gender } = req.body;
    const getUser = await userModel.findById(req.params.id);
    const image = await cloudinary.uploader.upload(req.file.path);
    const bioContent = new bioModel({
      bio,
      gender,
      avatar: image.secure_url,
      avatarID: image.public_id,
    });

    bioContent.user = getUser;
    bioContent.save();

    res.status(201).json({
      status: "Created Successfully",
      data: bioContent,
    });
  } catch (error) {
    res.status(404).json({
      message: "Can't create bio",
    });
    console.log(error);
  }
};

module.exports = {
  getAllBio,
  getBio,
  createBio,
  deleteBio,
};