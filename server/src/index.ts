import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "./routes/route";

dotenv.config();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
};

const app = express();

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json({ limit: "25mb" })); //allow us to parse incoming requets: req.body
app.use(express.urlencoded({ extended: true, limit: "25mb" })); //payload size limit increased to 25mb
app.use(cookieParser()); //allow us to parse incoming cookies

app.get("/", (req, res) => {
  res.json({
    health: "100%",
    state: "running",
  });
});

app.use("/", router);

app.listen(3000, () => {
  console.log(`Server Running on Port 3000`);
});
