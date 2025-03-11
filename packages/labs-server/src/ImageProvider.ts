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

    async getAllImages(authorId?: string): Promise<DenormalizedImageDocument[]> { // TODO #2
        const collectionName = process.env.IMAGES_COLLECTION_NAME
        if (!collectionName) {
            throw new Error("Missing IMAGES_COLLECTION_NAME from environment variables");
        }

        const collection = this.mongoClient.db().collection<ImageDocument>(collectionName); // TODO #1

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

        // Build an aggregation pipeline that denormalizes the author field.
        const pipeline = [
            {
                // Lookup into the "authors" collection where _id matches the image's author.
                $lookup: {
                    from: "users", // authors collection
                    localField: "author",
                    foreignField: "_id",
                    as: "authorData",
                },
            },
            {
                // Flatten the resulting array from $lookup.
                $unwind: {
                    path: "$authorData",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                // Project the fields we want in the final result,
                // replacing the author field with the joined authorData.
                $project: {
                    _id: 1,
                    src: 1,
                    name: 1,
                    likes: 1,
                    author: "$authorData",
                },
            },
        ];

        // Run the aggregation pipeline and return the results.
        const images = await collection.aggregate<DenormalizedImageDocument>(pipeline).toArray();
        // console.log(images);
        return images;
    }
}