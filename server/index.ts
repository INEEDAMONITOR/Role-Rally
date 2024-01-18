import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/api/test", (req: Request, res: Response) => {
  // res.send("Express + TypeScript Server");

  res.status(200).json({
    data: "Test runs successfully!",
    result: true,
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});