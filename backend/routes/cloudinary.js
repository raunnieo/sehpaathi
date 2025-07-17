const express = require('express');
const router = express.Router();
const { deleteImage } = require("../controllers/cloudinaryController");

// This route will be mounted at /api/delete-profile-image, so path should be '/'
router.post("/", deleteImage);

module.exports = router;
