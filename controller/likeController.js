const userModel = require("../model/userModel");
const definitionModel = require("../model/definitionModel");
const likeModel = require("../model/likeModel");
const mongoose = require("mongoose");

const likeContent = async (req, res) => {
	try {
		const getUser = await definitionModel.findByIdAndUpdate(
			req.params.definition,
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

const disLikeContent = async (req, res) => {
	try {
		const getUser = await definitionModel.findByIdAndUpdate(
			req.params.definition,
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

// const createLike = async(req, res) => {
//     try{

//     }catch(err){
//         res.status(404).json({message: err.message})
//     }
// }

module.exports = {
	viewLike,
	likeContent,
	disLikeContent,
};
