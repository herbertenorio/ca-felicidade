import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";



export async function ensureAuthenticateUser(request: Request, response: Response, next: NextFunction) {

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({
            message: "Token is missing!"
        });
    }

    const [, token] = authHeader.split(" ");

    try {

        const { sub } = verify(token, "74b0328a08e7d9e213b1ea77ba32198d");

        request.id_user = sub as string;

        return next();

    } catch (error) {

        return response.status(401).json({
            message: "Invalid token!"
        });

    }

}