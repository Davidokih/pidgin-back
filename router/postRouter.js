const express = require("express");
const {
	getAllPost,
	getPost,
	createPost,
	deletePost,
	updatePost
} = require("../controller/postController");
const router = express.Router();

router.route("/").get(getAllPost);
router.route("/").delete(deletePost);
router.route("/:id/createPosts").post(createPost);

router.route("/:id/:postid").get(getPost).delete(deletePost).patch(updatePost);

module.exports = router;
