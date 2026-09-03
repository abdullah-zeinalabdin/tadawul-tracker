import express from "express";
import 'dotenv/config'
import cors from "cors";
import mongoose from "mongoose";

async function startServer() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        app.listen(4000, () => {
            console.log("Listening on Port 4000");
        });
    }

    catch(error) {
        console.log(`Error While trying to connect to the DB, Status: ${error}`)
    }
}

const app = express();

app.use(cors());

app.get("/quote/:ticker", async(req, res) => {
    const { ticker } = req.params;
    try {
        const response = await fetch(`https://api.sahmk.sa/api/v1/quote/${ticker}/`,
            { headers: { "X-API-Key": process.env.SHMK_API_KEY } }
        )

        if (!response.ok) {
            throw new Error(`Error! Status: ${response.status}`);
        }
        
        const data = await response.json();

        res.status(200).json(data);
    }
    catch(error) {
        res.status(400).json({error: error.message})
    }
});

startServer();

