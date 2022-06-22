const express = require("express");
const {
	getMyLike,
	createMyLike,
	deleteMyLike,
} = require("../controller/newLikeController");
const router = express.Router();

// router.route("/likes").get(getAllPost);
router.route("/:definition/like").post(createMyLike);
router.route("/").get(getMyLike);

router.route("/:definition/like/:like").delete(deleteMyLike);

module.exports = router;
