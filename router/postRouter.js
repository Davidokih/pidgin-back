const express = require("express");
const upload = require("../utils/multer");
const {
	getAllPost,
	getPost,
	createPost,
	deletePost,
	updatePost,
	searchPost,
	getAzPost
} = require("../controller/postController");
const router = express.Router();

router.route("/").get(getAllPost);
router.route("/word").get(searchPost);
router.route("/filter").get(getAzPost);
router.route("/:id/createPosts").post(createPost);

router.route("/:id/:postid").get(getPost).delete(deletePost).patch(updatePost);

module.exports = router;
