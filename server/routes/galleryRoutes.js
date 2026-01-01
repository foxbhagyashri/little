const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { uploadImage, getGallery, deleteImage } = require("../controllers/galleryController");

const router = express.Router();

// multer storage for gallery
const galleryStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../uploads/gallery");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const uploadGallery = multer({ storage: galleryStorage });

// ROUTES
router.post("/upload", uploadGallery.single("image"), uploadImage);
router.get("/", getGallery);
router.delete("/:id", deleteImage);

module.exports = router;
