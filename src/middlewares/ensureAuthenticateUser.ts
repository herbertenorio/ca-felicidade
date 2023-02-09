import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { env } from "process";

export async function ensureAuthenticateUser(request: Request, response: Response, next: NextFunction) {

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({
            message: "Token is missing!"
        });
    }

    const [, token] = authHeader.split(" ");

    try {

        const { sub } = verify(token, env.SECRET_KEY as string);

        request.id_user_auth = sub as string;

        return next();

    } catch (error) {

        return response.status(401).json({
            message: "Invalid token!"
        });

    }

}