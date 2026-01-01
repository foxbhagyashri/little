const db = require("../db");
const fs = require("fs");
const path = require("path");

exports.uploadImage = (req, res) => {
  const { title } = req.body;
  const imageUrl = "/uploads/gallery/" + req.file.filename;

  const sql = "INSERT INTO gallery (title, image_url) VALUES (?, ?)";

  db.query(sql, [title, imageUrl], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error", err });
    }

    res.json({
      success: true,
      message: "Image uploaded successfully",
      data: {
        id: result.insertId,
        title,
        image_url: imageUrl
      }
    });
  });
};

exports.getGallery = (req, res) => {
  const sql = "SELECT * FROM gallery ORDER BY created_at DESC";

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching gallery" });

    res.json(results);
  });
};

exports.deleteImage = (req, res) => {
  const { id } = req.params;

  // First, get the image path to delete the file
  const selectSql = "SELECT image_url FROM gallery WHERE id = ?";
  
  db.query(selectSql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error", err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Image not found" });
    }

    const imageUrl = results[0].image_url;
    const filePath = path.join(__dirname, "..", imageUrl);

    // Delete from database
    const deleteSql = "DELETE FROM gallery WHERE id = ?";
    
    db.query(deleteSql, [id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Failed to delete", err });
      }

      // Delete file from filesystem
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      res.json({
        success: true,
        message: "Image deleted successfully"
      });
    });
  });
};
