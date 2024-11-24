
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Load academic configuration
const academicConfig = require('./config');

// Routes
app.get('/api/academic-config', (req, res) => {
  res.json({
    success: true,
    data: academicConfig
  });
});

app.get('/api/subjects/:semester', (req, res) => {
  const semester = parseInt(req.params.semester);
  const subjects = academicConfig.subjects[semester] || [];
  res.json({ success: true, data: subjects });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Academic config server running on port ${PORT}`);
});