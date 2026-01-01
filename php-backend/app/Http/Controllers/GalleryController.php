<?php

class GalleryController
{
    private $db;

    public function __construct()
    {
        require __DIR__ . '/../../../config/database.php';
        $this->db = $db;
    }

    public function getAll()
    {
        try {
            $stmt = $this->db->query("SELECT * FROM gallery ORDER BY created_at DESC");
            $images = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            echo json_encode($images);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Failed to fetch images"]);
        }
    }

    public function upload()
    {
        if (!isset($_FILES['image']) || !isset($_POST['title'])) {
            http_response_code(400);
            echo json_encode(["error" => "Missing image or title"]);
            return;
        }

        $title = $_POST['title'];
        // Use the existing storage directory
        $uploadDir = __DIR__ . '/../../../storage/app/public/gallery/';
        
        // Create directory if it doesn't exist
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        // Use simple filename without special characters
        $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
        $fileName = time() . "_" . uniqid() . "." . $ext;
        $targetPath = $uploadDir . $fileName;

        // Validate image
        $allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (!in_array($_FILES['image']['type'], $allowed)) {
            http_response_code(400);
            echo json_encode(["error" => "Invalid file type"]);
            return;
        }

        if (move_uploaded_file($_FILES['image']['tmp_name'], $targetPath)) {
            try {
                $imageUrl = "storage/app/public/gallery/" . $fileName;
                $stmt = $this->db->prepare("INSERT INTO gallery (title, image_url) VALUES (?, ?)");
                $stmt->execute([$title, $imageUrl]);

                echo json_encode([
                    "success" => true,
                    "id" => $this->db->lastInsertId(),
                    "image_url" => $imageUrl
                ]);
            } catch (PDOException $e) {
                http_response_code(500);
                echo json_encode(["error" => "Database error: " . $e->getMessage()]);
            }
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Upload failed"]);
        }
    }

    public function delete($id)
    {
        try {
            // Get image path first
            $stmt = $this->db->prepare("SELECT image_url FROM gallery WHERE id = ?");
            $stmt->execute([$id]);
            $image = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($image) {
                // Delete file - handle both old and new path formats
                $fileName = basename($image['image_url']);
                $filePath = __DIR__ . '/../../../storage/app/public/gallery/' . $fileName;
                
                if (file_exists($filePath)) {
                    unlink($filePath);
                }

                // Delete from database
                $stmt = $this->db->prepare("DELETE FROM gallery WHERE id = ?");
                $stmt->execute([$id]);

                echo json_encode(["success" => true]);
            } else {
                http_response_code(404);
                echo json_encode(["error" => "Image not found"]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Failed to delete"]);
        }
    }
}
