const userModel = require("../model/userModel");
const definitionModel = require("../model/definitionModel");
const likeModel = require("../model/likeModel");
const mongoose = require("mongoose");

const createLike = async (req, res) => {
	try {
		const likeComment = await definitionModel.findByIdAndUpdate(
			req.params.definition,
			{
				$push: { user: req.params.id },
			},
			{ new: true }
		);

		res.status(201).json({ message: "definition Liked", data: likeComment });
		// }
	} catch (error) {
		res.status(404).json({ message: error.message });
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
		const likeComment = await definitionModel.findByIdAndUpdate(
			req.params.definition,
			{
				$pull: { user: req.params.id },
			},
			{ new: true }
		);

		res.status(201).json({ message: "Liked Deleted", data: likeComment });
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
	createLike,
	unLike,
};
