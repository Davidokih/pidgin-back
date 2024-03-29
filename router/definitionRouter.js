const express = require("express");
const {
	deleteDefinition,
	createDefinition,
	getDefinition,
	getAllDefinition
} = require("../controller/definitionController");

const router = express.Router();

router.route("/:id/:postId/definitions").post(createDefinition);
router.route("/:postId").get(getDefinition);
router.route("/").get(getAllDefinition);

router.route("/:id/:postId/:definitionId").delete(deleteDefinition);

module.exports = router;
