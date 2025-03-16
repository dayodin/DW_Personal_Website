import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";
import { ImageProvider } from "../ImageProvider";

const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER, DB_NAME } = process.env;

const connectionString = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${DB_NAME}`;

export function registerImageRoutes(app: express.Application, mongoClient: MongoClient) {
    app.get("/api/images", async (req, res) => {
        console.log("Query params:", req.query);
        let userId: string | undefined = undefined;
        if (typeof req.query.createdBy === "string") {
            userId = req.query.createdBy;
            // console.log(userId)
        }

        // console.log("User id to query:", userId);

        try {
            // const mongoClient = await MongoClient.connect(connectionString);
            const imageProvider = new ImageProvider(mongoClient);
            const images = await imageProvider.getAllImages(userId);
            // console.log(images)
            res.json(images);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
      });
}