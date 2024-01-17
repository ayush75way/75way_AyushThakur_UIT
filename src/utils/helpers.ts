import mongoose from "mongoose";
import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
require("dotenv").config();

interface DecodedUser {
  id: String;
  role: String;
}
export const createConnection = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}`);
    console.log("Database connected");
  } catch (err) {
    console.log(err);
  }
};
export const authenticateAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const JWT_SECRET_KEY = "JWT_SECRET_KEY";
    const token = authHeader.split(" ")[1];
    const user = jwt.verify(token, JWT_SECRET_KEY) as DecodedUser;
    if (!user) {
      return res.status(403).json({
        msg: "User not found",
      });
    } else {
      if (user.role == "admin") {
        next();
      } else {
        return res.status(404).json({
          msg: "Endpoint accessible to admins only",
        });
      }
    }
  } else {
    return res.status(401).json({
      msg: "Auth header not provided",
    });
  }
};
export const authenticateEmployee = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const JWT_SECRET_KEY = "JWT_SECRET_KEY";
    const token = authHeader.split(" ")[1];
    const user = jwt.verify(token, JWT_SECRET_KEY) as DecodedUser;
    if (!user) {
      return res.status(403).json({
        msg: "User not found",
      });
    } else {
      res.locals.user = user;
      if (user.role == "employee") {
        next();
      } else {
        res.status(404).json({
          msg: "Endpoint accessible to employees only",
        });
      }
    }
  } else {
    res.status(401).json({
      msg: "Auth header not provided",
    });
  }
};


