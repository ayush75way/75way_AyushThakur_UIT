import express from "express";
import { createUser, getUser, loginUser, refreshToken } from "../controllers/User";
import { authenticateAdmin } from "../utils/helpers";

const router = express.Router();

// /user is in base route
router
  .post("/signup", createUser)
  .post("/login", loginUser)
  .get("/me", authenticateAdmin, getUser)
  .post("/token/refresh", refreshToken);

export default router;
