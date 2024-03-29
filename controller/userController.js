const userModel = require("../model/userModel");
const cloudinary = require("../utils/cloudinary");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const transport = require("../utils/email");
const { verifiedEmail, signInverifiedEmail, token, passverifiedEmail } = require("../utils/sendMail");

const getAllUsers = async (req, res) => {
	try {
		const user = await userModel.find();
		res.status(200).json({
			message: "success",
			data: user,
		});
	} catch (error) {
		res.status(404).json({
			message: error.message,
		});
	}
};

const getUser = async (req, res) => {
	try {
		const user = await userModel.findById(req.params.id);
		res.status(200).json({
			message: "success",
			data: user,
		});
	} catch (error) {
		res.status(404).json({
			message: error.message,
		});
	}
};

const deleteUser = async (req, res) => {
	try {
		const user = await userModel.findByIdAndRemove(req.params.id);
		res.status(200).json({
			message: "deleted",
		});
	} catch (error) {
		res.status(404).json({
			message: error.message,
		});
	}
};

const createBio = async (req, res) => {
	try {
		const { bio, gender } = req.body;
		const user = await userModel.findById(req.params.id);
		if (user) {
			// await cloudinary.uploader.destroy(user.avatarID);
			const image = await cloudinary.uploader.upload(req.file.path);

			const newUser = await userModel.create(
				{
					bio,
					gender,
					avatar: image.secure_url,
					avatarID: image.public_id,
				},
			);

			res.status(200).json({
				message: "success",
				data: newUser,
			});
		}
	} catch (error) {
		res.status(404).json({
			message: error.message,
		});
		console.log(error);
	}
};
const updateUser = async (req, res) => {

	try {
		const user = await userModel.findById(req.params.id);
		if (user) {
			const { bio, gender, fullName } = req.body;

			await cloudinary.uploader.destroy(user.avatarID);
			const image = await cloudinary.uploader.upload(req.file.path);

			const newUser = await userModel.findByIdAndUpdate(
				user._id,
				{
					fullName,
					bio,
					gender,
					avatar: image.secure_url,
					avatarID: image.public_id,
				},
				{ new: true }
			);

			res.status(200).json({
				message: "success",
				data: newUser,
			});
		}
	} catch (error) {
		res.status(404).json({
			message: error.message,
		});
		console.log(error);
	}
};


const createUser = async (req, res) => {
	try {
		const { fullName, email, password } = req.body;

		const salt = await bcrypt.genSalt(10);
		const hashed = await bcrypt.hash(password, salt);
		// const image = await cloudinary.uploader.upload(req.file.path);
		// const getToken = crypto.randomBytes(32).toString("hex");
		// const token = jwt.sign({ getToken }, "ThisIsIt", { expiresIn: "3d" });

		const user = await userModel.create({
			fullName,
			email,
			password: hashed,
			verifiedToken: token,
		});

		verifiedEmail(email, user._id, user.fullName)
			.then((result) => {
				console.log(result);
			})
			.catch((err) => console.log(err));

		res.status(200).json({
			message: "An email has been sent to you",
		});
	} catch (error) {
		res.status(404).json({
			message: error.message,
		});
		console.log(error);
	}
};

const verifyUser = async (req, res) => {
	try {
		const user = await userModel.findById(req.params.id);
		if (user) {
			if (user.verifiedToken === req.params.token) {
				await userModel.findByIdAndUpdate(
					user._id,
					{
						verifiedToken: "",
						isVerified: true,
					},
					{ new: true }
				);
				res.status(200).json({
					message: "Account is now Verify, please signin now!",
				});
			} else {
				res.status(400).json({
					message: "You can't do this",
				});
			}
		} else {
			res.status(201).json({
				message: "user isn't in our db",
			});
		}
	} catch (error) {
		res.status(404).json({
			message: error.message,
		});
	}
};

const signinUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await userModel.findOne({ email });
		if (user) {
			const check = await bcrypt.compare(password, user.password);

			if (check) {
				if (user.verifiedToken === "") {
					const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
						expiresIn: process.env.EXPIRES2,
					});
					const { password, ...info } = user._doc;
					res.status(200).json({
						message: `welcome back ${user.fullName}`,
						data: { token, ...info },
					});
				} else {
					signInverifiedEmail(email, user._id)
						.then((result) => {
							console.log(result);
						})
						.catch((err) => console.log(err));
					res.status(200).json({
						message: "An email has been sent to you",
					});
				}
			} else {
				res.status(404).json({
					message: "password is incorrect",
				});
			}
		} else {
			res.status(404).json({
				message: "user isn't found",
			});
		}
	} catch (error) {
		res.status(404).json({
			message: error.message,
		});
	}
};

const resetUser = async (req, res) => {
	try {
		const { email } = req.body;

		const user = await userModel.findOne({ email });

		if (user) {
			if (user.isVerified) {

				passverifiedEmail(email, user._id)
					.then((result) => {
						console.log(result);
					})
					.catch((err) => console.log(err));


				res.status(200).json({
					message: "An email has been sent to you",
				});

			} else {
				res.status(200).json({
					message: "Please go sign in first",
				});
			}
		} else {
			res.status(200).json({
				message: "user isn't in our db",
			});
		}
	} catch (error) {
		res.status(404).json({
			message: error.message,
		});
	}
};

const newPassword = async (req, res) => {
	try {
		const { password } = req.body;

		const user = await userModel.findById(req.params.id);
		if (user) {
			if (user.isVerified && user.verifiedToken === req.params.token) {
				const salt = await bcrypt.genSalt(10);
				const hashed = await bcrypt.hash(password, salt);
				await userModel.findByIdAndUpdate(
					user._id,
					{
						password: hashed,
					},
					{ new: true }
				);
			} else {
				res.status(200).json({
					message: "You are not authorised for this!",
				});
			}
		} else {
			res.status(200).json({
				message: "You are not authorised for this!",
			});
		}
	} catch (error) {
		res.status(404).json({
			message: error.message,
		});
	}
};

// const getAllUsers = async (req, res) => {
// 	try {
// 		const user = await userModel.find();
// 		res.status(200).json({
// 			message: "success",
// 			data: user,
// 		});
// 	} catch (error) {
// 		res.status(404).json({
// 			message: error.message,
// 		});
// 	}
// };

module.exports = {
	createUser,
	getAllUsers,
	getUser,
	resetUser,
	updateUser,
	deleteUser,
	newPassword,
	signinUser,
	createBio,
	verifyUser
};







