const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
  optionsSuccessStatus: 200
}));

app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderPath = `C:/Users/nites/OneDrive/Desktop/AI_Resume/uploads/${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    fs.mkdirSync(folderPath, { recursive: true });
    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === ".zip") {
      cb(null, true);
    } else {
      cb(new Error("Only .zip files are allowed"), false);
    }
  },
});

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.post("/upload", upload.array("zipFile"), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No valid .zip files uploaded" });
  }
  const folderPath = req.files[0].destination;
  res.json({
    message: "ZIP files uploaded successfully",
    folderPath: folderPath,
  });
});

app.post("/score-resumes", (req, res) => {
  console.log("Incoming request body:", req.body);
  const { jd, skills, threshold, meeting_link } = req.body;
  if (!jd || !skills || !threshold || !meeting_link) {
    console.log("Validation failed - missing fields:", { jd, skills, threshold, meeting_link });
    return res.status(400).json({ message: "All fields (jd, skills, threshold, meeting_link) are required" });
  }
  const response = {
    message: "Data received successfully",
    data: {
      jd,
      skills,
      threshold: parseInt(threshold),
      meeting_link,
    },
  };
  console.log("Sending response:", response);
  res.json(response);
});

app.use((err, req, res, next) => {
  console.error("Error occurred:", err.stack);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});