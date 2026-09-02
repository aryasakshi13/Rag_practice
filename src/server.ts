import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import ragRoutes from "./routes/ragRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Bhagavad Gita RAG API is running"
    });
});

app.use("/api", ragRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});