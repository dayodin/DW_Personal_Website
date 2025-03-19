import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";
import { ImageProvider } from "../ImageProvider";
import { imageMiddlewareFactory, handleImageFileErrors } from "../imageUploadMiddleware";

export function registerImageRoutes(app: express.Application, mongoClient: MongoClient) {
    
    app.get("/api/images", async (req, res) => {

        let userId: string | undefined = undefined;
        if (typeof req.query.createdBy === "string") {
            userId = req.query.createdBy;
        }

        try {
            const imageProvider = new ImageProvider(mongoClient);
            const images = await imageProvider.getAllImages(userId);
            res.json(images);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    });

    app.patch("/api/images/:id", async (req, res) => {
        const imageId = req.params.id;
        const newName = req.body.name;
      
        if (!newName || typeof newName !== "string") {
            res.status(400).send({
                error: "Bad request",
                message: "Missing name property"
            });
        }
      
        console.log(`Updating image with id ${imageId} to new name: ${newName}`);
      
        try {
            const imageProvider = new ImageProvider(mongoClient);
            const matchedCount = await imageProvider.updateImageName(imageId, newName);
        
            if (matchedCount === 0) {
                res.status(404).send({
                    error: "Not found",
                    message: "Image does not exist"
                });
            }
      
            res.status(204).send();
        } catch (error) {
            console.error("Error updating image:", error);
            res.status(500).send({ error: "Internal Server Error" });
        }
    });

    app.post(
        "/api/images",
        imageMiddlewareFactory.single("image"),
        handleImageFileErrors,
        async (req: Request, res: Response): Promise<any> => {
            console.log("hello")

            if (!req.file || !req.body.name) {
                return res.status(400).send({ error: "Missing image file or name" });
            }
            
            console.log("hi")

            const filename = req.file.filename;
            const imageName = req.body.name;
            
            const token = res.locals.token;
            console.log(token)
            if (!token || !token.username) {
                return res.status(400).send({ error: "Missing or invalid authentication token" });
            }
        
            const newImage = {
                _id: filename, 
                src: `/uploads/${filename}`, 
                name: imageName,
                author: token.username, 
                likes: 0,
            };
            
            console.log(newImage)
            try {
                const imageProvider = new ImageProvider(mongoClient);
                const createdImage = await imageProvider.createImage(newImage);
                return res.status(201).json(createdImage);
            } catch (err) {
                console.error("Error inserting image document:", err);
                return res.status(500).send({ error: "Error saving image to database" });
            }
        }
    )
}