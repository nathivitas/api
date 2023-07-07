const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const _ = require("lodash");
const { v4: uuid } = require("uuid")
const port = process.env.PORT || '3000';
const app = express();

app.use(express.json());
//app.use(express.cors());


app.get("/", (req, res) => {

	res.send("Your Express API is up and running on containers!");
	
	});

app.get("/outfit", (req, res) => {
	const tops = ["Black", "White", "Orange", "Navy"];
	const jeans = ["Grey", "Dark Grey", "Black", "Navy"];
	const shoes = ["White", "Grey", "Black"];
   res.json({
		top: _.sample(tops),
		jeans: _.sample(jeans),
		shoes: _.sample(shoes)
	});
});

app.get("/comments/:id", async (req, res) => {
	const id = req.params.id;
	let content;

	try {
		content = await fs.readFile(`naty/comments/${id}.txt`, "utf-8");
	} catch (err) {
		return res.sendStatus(404);
	}

	res.json({
		content: content
	});
});

app.post("/comments", async ( req, res) => {
	const id = uuid();
	const content = req.body.content;
	
	if (!content) {
		return res.status(400).json({"nada":"nada"});
		 	
	}

	 await fs.mkdir("naty/comments", { recursive: true });
	 await fs.writeFile(`naty/comments/${id}.txt`, content);

	 res.status(201).json({
	 	id: id
	 });
});

app.listen(port, () => console.log("API Server is running..."));