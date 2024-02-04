import express from "express";
import { createUser, fetchUser } from "../controllers/user";

const router = express.Router();

router.post("/createUser", createUser);
router.get("/fetchUser/:userId", fetchUser);

export default router;