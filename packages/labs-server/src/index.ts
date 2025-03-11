import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";
import path from 'path';
import dotenv from "dotenv";
import { registerImageRoutes } from "./routes/images";

dotenv.config(); // Read the .env file in the current working directory, and load values into process.env.
const PORT = process.env.PORT || 3000;
const staticDir = process.env.STATIC_DIR || "public";

const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER, DB_NAME } = process.env;

const connectionStringRedacted = `mongodb+srv://${MONGO_USER}:<password>@${MONGO_CLUSTER}/${DB_NAME}`;
const connectionString = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${DB_NAME}`;

console.log("Attempting Mongo connection at " + connectionStringRedacted);

async function setUpServer () {
    const mongoClient = await MongoClient.connect(connectionString);
    const collectionInfos = await mongoClient.db().listCollections().toArray();
    console.log(collectionInfos.map(collectionInfo => collectionInfo.name)); // For debug only
}

const app = express();

app.use(express.static(staticDir));

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

registerImageRoutes(app)

app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.resolve(staticDir, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

setUpServer()