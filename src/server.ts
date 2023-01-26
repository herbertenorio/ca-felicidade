
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { routes } from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";


const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {

    if (err instanceof Error) {
        return res.status(401).json({
            message: err.message
        })
    }

    return res.status(500).json({
        status: "error",
        message: "Internal server error"
    })
})

app.listen(3333, () => { console.log("Server Online") });