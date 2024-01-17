import express from 'express'
import { createUser, loginUser } from '../controllers/User';

const router = express.Router();

// /user is in base route
router.post("/signup", createUser)
        .post("/login", loginUser)

export default router