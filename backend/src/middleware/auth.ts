import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";

declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}

const verifiyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies['auth_token'];
    if(!token) {
        return res.status(401).json({message: 'unauth'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
        req.userId = (decoded as JwtPayload).userId;
        next();
    } catch(error) {
        return res.status(401).json({message: 'unauth'})
    }
}

export default verifiyToken