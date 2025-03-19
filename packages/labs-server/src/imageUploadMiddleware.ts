import { Request, Response, NextFunction } from "express";
import multer from "multer";

class ImageFormatError extends Error {}

const storageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
        // TODO 1: Use the IMAGE_UPLOAD_DIR env variable (default to "uploads")
        const uploadDir = process.env.IMAGE_UPLOAD_DIR || "uploads"; 
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // TODO 2: Validate file type and generate a unique filename
        let fileExtension = "";
        if (file.mimetype === "image/png") {
            fileExtension = "png";
        } else if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
            fileExtension = "jpg";
        } else {
            return cb(new ImageFormatError("uh oh"), "");
        }
        const fileName = Date.now() + "-" + Math.round(Math.random() * 1e9) + "." + fileExtension;

        console.log(fileName)
        cb(null, fileName);
    },
});

export const imageMiddlewareFactory = multer({
    storage: storageEngine,
    limits: {
        files: 1,
        fileSize: 5 * 1024 * 1024, // 5 MB
    },
});

export function handleImageFileErrors(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof multer.MulterError || err instanceof ImageFormatError) {
        console.log(err);
        res.status(400).send({
            error: "Bad Request",
            message: err.message,
        });
        return;
    }
    next(err);
}
