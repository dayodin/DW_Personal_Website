import express, { Request, Response, NextFunction } from "express";
import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken"

import { CredentialsProvider } from "../CredentialsProvider";

function generateAuthToken(username: string): Promise<string> {
    const signatureKey = process.env.JWT_SECRET;
    if (!signatureKey) {
        throw new Error("Missing JWT_SECRET from env file");
    }
    return new Promise<string>((resolve, reject) => {
        jwt.sign(
            { username: username },
            signatureKey,
            { expiresIn: "1d" },
            (error, token) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(token as string);
                }
            }
        );
    });
}

export function verifyAuthToken(req: Request, res: Response, next: NextFunction): void {
    const signatureKey = process.env.JWT_SECRET;
    if (!signatureKey) {
        throw new Error("Missing JWT_SECRET from env file");
    }

    const authHeader = req.get("Authorization");
    
    const token = authHeader && authHeader.split(" ")[1];
  
    if (!token) {
        res.status(401).end();
        return
    }
  
    jwt.verify(token, signatureKey, (error, decoded) => {
        if (decoded) {
            res.locals.token = decoded;
            next()
        }
        else {
            res.status(403).end(); 
        }
    });
  }

export function registerAuthRoutes(app: express.Application, mongoClient: MongoClient) {
    app.post("/auth/register", async (req, res): Promise<any> => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send({
                error: "Bad request",
                message: "Missing username or password"
            });
        }

        try {
            const credProvider = new CredentialsProvider(mongoClient);
            const success = await credProvider.registerUser(username, password);
      
            if (!success) {
                return res.status(400).send({
                    error: "Bad request",
                    message: "Username already taken"
                });
            }
      
            return res.status(201).send();
        } catch (error) {
            console.error("Error during registration:", error);
            return res.status(500).send({
                error: "Internal server error",
                message: "An error occurred while registering the user."
            });
        }
    });

    app.post("/auth/login", async (req, res): Promise<any> => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send({
                error: "Bad request",
                message: "Missing username or password"
            });
        }
    
        try {
            const credProvider = new CredentialsProvider(mongoClient);
        
            const isValid = await credProvider.verifyPassword(username, password);
            if (!isValid) {
                return res.status(401).send({
                    error: "Unauthorized",
                    message: "Incorrect username or password"
                });
            }
            
            const token = await generateAuthToken(username);
            return res.send({ token });
        } catch (error) {
            console.error("Error during login:", error);
            return res.status(500).send({
                error: "Internal server error",
                message: "An error occurred during login."
            });
        }
    });
}