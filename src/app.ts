import express from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";

import router from "./routes/index";
import errorHandler from "./middlewares/errorHandle";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorHandler);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log("server running on PORT " + PORT);
});
