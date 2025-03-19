import { MongoClient } from "mongodb";

export interface ImageDocument {
    _id: string;
    src: string;
    name: string;
    author: string;
    likes: number;
}

// The author (or user) document stored in the authors collection.
// You can extend this interface with any additional fields.
export interface AuthorDocument {
    _id: string;
    username: string;
    email: string;
}

// This is the type returned by getAllImages().
// The author field is now replaced by the full AuthorDocument.
export interface DenormalizedImageDocument {
    _id: string;
    src: string;
    name: string;
    author: AuthorDocument;
    likes: number;
}

export class ImageProvider {
    constructor(private readonly mongoClient: MongoClient) {}

    async getAllImages(authorId?: string): Promise<any[]> { // TODO #2
        console.log("hello")
        const collectionName = process.env.IMAGES_COLLECTION_NAME
        if (!collectionName) {
            throw new Error("Missing IMAGES_COLLECTION_NAME from environment variables"); 
        }
        
        console.log(collectionName);

        // const collection = this.mongoClient.db().collection<ImageDocument>(collectionName); // TODO #1

        // const pipeline: any[] = [];

        // // If authorId is provided, filter documents where the "author" field matches it.
        // if (authorId) {
        //     pipeline.push({ $match: { author: authorId } });
        // }

        // // Continue building the pipeline (e.g., with $lookup, $unwind, etc.)
        // pipeline.push(
        //     {
        //         $lookup: {
        //         from: "users",
        //         localField: "author",
        //         foreignField: "_id",
        //         as: "authorData",
        //         },
        //     },
        //     {
        //         $unwind: {
        //         path: "$authorData",
        //         preserveNullAndEmptyArrays: true,
        //         },
        //     },
        //     {
        //         $project: {
        //         _id: 1,
        //         src: 1,
        //         name: 1,
        //         likes: 1,
        //         author: "$authorData",
        //         },
        //     }
        // );

        // // Run the aggregation pipeline and return the results.
        // const images = await collection.aggregate<DenormalizedImageDocument>(pipeline).toArray();
        const images = await this.mongoClient
            .db()
            .collection(collectionName)
            .find()
            .toArray();
        return images;
    }

    async updateImageName(imageId: string, newName: string): Promise<number> {
        const collectionName = process.env.IMAGES_COLLECTION_NAME;
        if (!collectionName) {
            throw new Error("Missing IMAGES_COLLECTION_NAME from environment variables");
        }
      
        const collection = this.mongoClient.db().collection<ImageDocument>(collectionName);
        const result = await collection.updateOne(
            { _id: imageId },
            { $set: { name: newName } }
        );
        
        return result.matchedCount;
    }

    async createImage(newImage: ImageDocument) {
        const collectionName = process.env.IMAGES_COLLECTION_NAME || "images"
        await this.mongoClient.db().collection<ImageDocument>(collectionName).insertOne(newImage);
        return newImage;
    }
}