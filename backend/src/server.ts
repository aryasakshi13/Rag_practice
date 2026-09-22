import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import ragRoutes from "./routes/ragRoutes.js";
import {initializeBM25} from "./Bm25/initializeBM25.js";
import evaluationRoutes from "./routes/evaluationRoutes.js";


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

app.use("/api", evaluationRoutes);


const PORT = process.env.PORT || 5000;


// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

const startServer = async () => {
    try{
        await initializeBM25();

        const server = app.listen(PORT,  () =>{
            console.log(`server running on port ${PORT}`);
             console.log(`PID: ${process.pid}`);
        });

         server.on("error", (error) => {
            console.error("SERVER ERROR:", error);
        });

          server.on("close", () => {
            console.log("SERVER CLOSED");
        });


    
    } catch (error) {
        console.error("Error starting server:", error);

        process.exit(1);
    }

};

startServer();