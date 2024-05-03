import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import "./config/DbConnection";
import "./middleware/authmiddlewares";
import userRoute from "./routes/userRoutes";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use("/api", userRoute);

app.listen(PORT, () => {
  console.log(`Server is started at port ${PORT}`);
});
