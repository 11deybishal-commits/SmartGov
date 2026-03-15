const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');

const app = express();

// Middleware
app.use(cors()); // Allows cross-origin requests
app.use(express.json()); // Allows server to read JSON data

// 1. CONNECT TO DATABASE
// Ensure MongoDB Compass is running on your PC
mongoose.connect('mongodb://localhost:27017/govstream_db')
  .then(() => console.log("✅ Database Connected Successfully"))
  .catch(err => console.error("❌ Database Connection Error:", err));

// 2. DEFINE THE DATA STRUCTURE (Schema)
// This tells MongoDB exactly what a "Scan Record" looks like
const recordSchema = new mongoose.Schema({
  citizenName: String,
  idNumber: String,
  matchScore: String,
  timestamp: { type: Date, default: Date.now }
});

const Record = mongoose.model('Record', recordSchema);

// 3. API ROUTES
// A. GET Stats: Used for the Dashboard Overview
app.get('/api/stats', async (req, res) => {
  const total = await Record.countDocuments();
  res.json({
    activeNodes: 1212 + Math.floor(Math.random() * 5),
    totalVerified: total,
    fraudIntercepted: 14 + Math.floor(total / 3)
  });
});

// B. GET History: Used for the "Official Records" tab
app.get('/api/history', async (req, res) => {
  const allRecords = await Record.find().sort({ timestamp: -1 });
  res.json(allRecords);
});

// C. POST Verify: Saves a new scan to the database
app.post('/api/verify', multer().single('document'), async (req, res) => {
  // Logic: In a real app, you'd process the file here.
  // For the hackathon, we simulate the AI success and SAVE it.
  const newEntry = new Record({
    citizenName: "Bishal Dey", // You can make this dynamic later
    idNumber: "GS-" + Math.floor(100000 + Math.random() * 900000),
    matchScore: "99.98%"
  });

  await newEntry.save();
  res.json(newEntry);
});

// 4. START THE SERVER
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 GovStream Backend running on http://localhost:${PORT}`);
});