const express = require("express");
const {
	viewLike,
	createLike,
	unLike,
} = require("../controller/likeController");
const { getMyLike,
	createMyLike,
	deleteMyLike, } = require("../controller/newLikeController");
const router = express.Router();

router.route("/:definition/like").get(viewLike).post(createLike).post(createMyLike).get(getMyLike);
router.route("/:definition/:like").delete(unLike).delete(deleteMyLike);

module.exports = router;
