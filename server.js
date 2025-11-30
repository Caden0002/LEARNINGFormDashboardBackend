import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

import Form from "./models/Form.js";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

mongoose
    .connect(
        process.env.MONGO_URI
    )
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("DB Error:", err));

app.get("/api/form", async (req, res) => {
    const data = await Form.find().sort({ createdAt: -1 })
    res.json(data)
});

app.post("/api/form", async (req, res) => {
    const formData = req.body
    await Form.create(formData)
    return res.status(201).json({ success: true, message: "Form submitted" });

});


app.listen(PORT, () => console.log("Server running on port 3000"));