const userModel = require("../model/userModel");
const postModel = require("../model/postModel");
const definitionModel = require("../model/definitionModel");
const mongoose = require("mongoose");

const createDefinition = async (req, res) => {
	try {
		await userModel.findById(req.params.id);
		const { meaning } = req.body;
		const createPost = await postModel.findById(req.params.postId);
		const newDefinition = new definitionModel({
			meaning,
			user: req.params.id,
			post: req.params.postId
		});

		newDefinition.post = createPost;
		newDefinition.save();

		createPost.definition.push(mongoose.Types.ObjectId(newDefinition._id));
		createPost.save();

		res.status(201).json({
			message: "definition created",
			data: newDefinition,
		});

	} catch (error) {
		res.status(404).json({
			message: error.message,
		});
		console.log(error);
	}
};

const getDefinitionLimit = async (req, res) => {
	try {
		const definition = await postModel.findById(req.params.post).populate({
			path: "definitions",
			options: { sort: { createdAt: -1 }, limit: 1 },
		});

		res.status(201).json({ message: "definitions", data: definition });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const getDefinition = async (req, res) => {
	try {
		const post = await postModel
			.findById(req.params.postId)
			.populate("definition");

		res.status(200).json({
			message: "Gotten Post",
			data: post,
		});
	} catch (error) {
		res.status(404).json({
			message: error.message,
		});
	}
};
const getAllDefinition = async (req, res) => {
	try {
		const post = await definitionModel.find();

		res.status(200).json({
			message: "Gotten Post",
			data: post,
		});
	} catch (error) {
		res.status(404).json({
			message: error.message,
		});
	}
};

const deleteDefinition = async (req, res) => {
	try {
		const getPost = await postModel.findById(req.params.post);
		const remove = await definitionModel.findByIdAndRemove(
			req.params.definitionId
		);

		getPost.definition.pull(remove);
		getPost.save();

		res.status(200).json({
			message: "deleted",
		});
	} catch (error) {
		res.status(404).json({
			message: error.message,
		});
		console.log(error);
	}
};

// const createDefinition = async(req, res)=>{
//     try {

//     } catch (error) {
//         res.status(404).json({
//             message: error.message,
//         })
//     }
// }

module.exports = {
	deleteDefinition,
	createDefinition,
	getDefinition,
	getAllDefinition
};