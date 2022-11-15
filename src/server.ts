import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const server = express();

server
	.use(cors())
	.use(express.json())
	.get("/status", (req, res) => res.status(200).send("It's alive!!!"));

const port = process.env.PORT || 4000;

server.listen(port, () => console.log(`Server is listening on port ${port}`));
