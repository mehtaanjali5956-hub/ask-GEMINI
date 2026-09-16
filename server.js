const express = require("express");
const app = express();

const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const PORT = 4000;
const API_KEY = process.env.API_KEY;
const API_URL ="https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent";

app.use(cors());
app.use(express.json());
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.send("working");
});

app.post("/ask", async (req, res) => {
    try {
        const question = req.body.text;

        if (!question) {
    return res.status(400).json({
        error: "Question is required"
    });
}
        const response = await axios.post(
            `${API_URL}?key=${API_KEY}`,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: `Give me a short answer to: ${question}`
                            }
                        ]
                    }
                ]
            }
        );

        const ans = response.data.candidates[0].content.parts[0].text;
        console.log(ans);
        res.json({ans});
    } catch (error) {
        console.log(
            error.response?.data || error.message
        );

        res.status(500).json({
            error: "Something went wrong"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});