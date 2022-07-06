const userModel = require("../model/userModel");
const postModel = require("../model/postModel");
const mongoose = require("mongoose");
const cloudinary = require("../utils/cloudinary");

const getAllPost = async (req, res) => {
	try {
		const post = await postModel.find().sort({ createdAt: "desc" }).populate("definition");

		res.status(200).json({
			status: "Success",
			data: post,
		});
	} catch (error) {
		res.status(404).json({
			message: error.message,
		});
	}
};

// const searchPost = async (req, res) => {
// try {
// 		const search = req.query.searchData
// 			? { title: { $regex: req.query.searchData, $options: "i" } }
// 			: {};

// 		const viewData = await postModel.find(search);

// 		res
// 			.status(200)
// 			.json({ total: viewData.length, message: "view", data: viewData });
// 	} catch (error) {
// 		res.status(404).json({ message: error.message });
// 	}
// };

const getPost = async (req, res) => {
	try {
		const post = await postModel.findById(req.params.postid).populate("definition");

		res.status(200).json({
			status: "Success",
			data: post,
		});
	} catch (error) {
		res.status(404).json({
			message: error.message,
		});
	}
};
const updatePost = async (req, res) => {
	try {
		const { word, useCase, userDefinition } = req.body;

		const getUser = await userModel.findById(req.params.id);
		const postContent = await postModel.findByIdAndUpdate(req.params.postid, req.body, { new: true });
		// const remove = await postModel.findByIdAndDelete(req.params.comment);

		// getUser.post.pull(postContent);
		// getUser.save();

		res.status(200).json({
			message: "updated successfully",
			data: postContent
		});
	} catch (error) {
		res.status(404).json({
			message: error.message,
		});
		console.log(error);
	}
};

const deletePost = async (req, res) => {
	try {
		const getPost = await userModel.findById(req.params.id);
		const postContent = await postModel.findByIdAndDelete(req.params.postid);

		getPost.post.pull(postContent);
		getPost.save();

		res.status(201).json({ message: "comment removed" });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const createPost = async (req, res) => {
	try {
		const { word, useCase, userDefinition } = req.body;
		// const image = await cloudinary.uploader.upload(req.file.path);
		const getUser = await userModel.findById(req.params.id);
		const postContent = new postModel({
			word,
			useCase,
			userDefinition
		});

		postContent.user = getUser;
		postContent.save();

		getUser.post.push(mongoose.Types.ObjectId(postContent._id));
		getUser.save();

		res.status(201).json({
			status: "Success",
			data: postContent,
		});
	} catch (error) {
		res.status(404).json({
			message: error.message,
		});
	}
};

const searchPost = async (req, res) => {
	const keyWord = req.query.search ? {
		$or: [
			{ word: { $regex: req.query.search, $options: "i" } },
			{ word: { $regex: req.query.search, $options: "i" } },
		]
	} : {};

	const userWord = await postModel.find(keyWord).populate("definition");
	res.status(200).send(userWord);
};

// const updatePost = async(req, res)=>{
//     try {

//     } catch (error) {
//         res.status(404).json({
//             message: error.message,
//         })
//     }
// }

module.exports = {
	getAllPost,
	getPost,
	createPost,
	deletePost,
	updatePost,
	searchPost
};
