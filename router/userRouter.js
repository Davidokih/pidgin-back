const express = require("express");
const upload = require("../utils/multer");
const {
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
} = require("../controller/userController");

const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/signin").post(signinUser);

router.route("/reset/:id/:token").post(resetUser);
router.route("/reset/:id/:token").patch(newPassword);

router.route("/:id/:token").get(verifyUser);

router.route("/register").post(createUser);
// router.route("/:id/:token").get(createUser);
router.route("/:id").post(upload, createBio);
router.route("/:id").patch(upload, updateUser).delete(deleteUser).get(getUser);

module.exports = router;
