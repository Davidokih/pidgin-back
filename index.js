const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./utils/db");
const app = express();
const port = process.env.PORT;
const verifiedEmail = require("./utils/sendMail");

app.use(cors());
app.use(express.json());

app.post("/view", (req, res) => {
	const { email } = req.body;

	res.json({ message: "getting access...!" });
});

app.get("/", (req, res) => {
	res.status(200).json({ message: "This is the homepage!" });
});

app.use("/pidgin/user", require("./router/userRouter"));
app.use("/api/post", require("./router/postRouter"));
app.use("/api/definition", require("./router/likeRouter"));
app.use("/api/definition", require("./router/definitionRouter"));

app.listen(port, () => {
	console.log("server is now up and Running");
});
