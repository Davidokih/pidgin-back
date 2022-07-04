const express = require("express");
const {
	likeContent,
	viewLike,
	disLikeContent,
} = require("../controller/likeController");
const { likePost,
	unLike,
	deleteMyLike, } = require("../controller/newLikeController");
const router = express.Router();

router.route("/:id/:post/:definition").get(viewLike).post(likeContent);
router.route("/:id/:post/:definition/").delete(disLikeContent);

router.route("/:id/:post").post(likePost);
router.route("/:id/:post").delete(unLike);

module.exports = router;
