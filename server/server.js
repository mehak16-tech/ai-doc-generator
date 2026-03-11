const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("./middleware/auth");
require("dotenv").config();

const app = express();

const User = require("./models/User");
const Readme = require("./models/Readme");

// middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });


// test route
app.get("/", (req, res) => {
  res.send("Backend server is running");
});


// ================= SIGNUP ROUTE =================
app.post("/signup", async (req, res) => {
  try {

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword
    });

    await user.save();

    res.json({ message: "User created successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token: token
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ================= README GENERATOR =================
app.post("/generate-readme", authMiddleware, async (req, res) => {
  try {

    if (!req.body.repoUrl) {
      return res.status(400).json({
        error: "Repository URL is required"
      });
    }

    const repoUrl = req.body.repoUrl;
    const parts = repoUrl.split("/");
    const owner = parts[3];
    const repo = parts[4];

    console.log("Owner:", owner);
    console.log("Repo:", repo);

    const githubUrl = `https://api.github.com/repos/${owner}/${repo}`;
    const response = await axios.get(githubUrl);

    const repoData = response.data;

    const prompt = `
Generate a professional GitHub README.

Project Name: ${repoData.name}
Description: ${repoData.description}
Language: ${repoData.language}

Include sections:
Overview
Installation
Usage
Features
Contributing
`;

    const geminiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      }
    );

    const readme =
      geminiResponse.data.candidates[0].content.parts[0].text;

    const newReadme = new Readme({
      userId: req.user.userId,
      repoUrl: repoUrl,
      content: readme
    });

    await newReadme.save();

    res.json({
      readme: readme
    });

  } catch (error) {

    if (error.response) {
      console.error("API Error:", error.response.data);
    } else {
      console.error("Error:", error.message);
    }

    res.status(500).json({
      error: "AI generation failed"
    });
  }
});

// ================= HISTORY ROUTE =================
app.get("/history", authMiddleware, async (req, res) => {

  try {

    const readmes = await Readme.find({
      userId: req.user.userId
    }).sort({ createdAt: -1 });

    res.json(readmes);

  } catch (error) {

    res.status(500).json({
      error: "Failed to fetch history"
    });

  }

});


// start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});