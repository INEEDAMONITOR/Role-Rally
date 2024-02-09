import express from "express";
import { USER_PATH } from "./routes/config";
import userRouter from "./routes/user";

const app = express();

app.use(express.json());
app.use(USER_PATH, userRouter);

export default app;