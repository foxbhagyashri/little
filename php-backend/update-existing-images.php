<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once __DIR__ . '/config/database.php';

try {
    // Get all gallery images
    $stmt = $db->query("SELECT id, image_url FROM gallery");
    $images = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $updated = 0;
    $errors = [];
    
    foreach ($images as $img) {
        $oldUrl = $img['image_url'];
        
        if (!$oldUrl) {
            continue;
        }

        // Check if URL needs updating
        if (strpos($oldUrl, 'storage/app/public/gallery/') === false) {
            $fileName = basename($oldUrl);
            $newUrl = "storage/app/public/gallery/" . $fileName;
            
            // Check if file exists
            $filePath = __DIR__ . '/storage/app/public/gallery/' . $fileName;
            
            if (file_exists($filePath)) {
                // Update database
                $updateStmt = $db->prepare("UPDATE gallery SET image_url = ? WHERE id = ?");
                $updateStmt->execute([$newUrl, $img['id']]);
                $updated++;
            } else {
                $errors[] = "File not found: " . $fileName;
            }
        }
    }
    
    echo json_encode([
        "status" => "success",
        "message" => "Image paths updated successfully",
        "total_images" => count($images),
        "updated" => $updated,
        "errors" => $errors
    ]);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Failed to update paths",
        "error" => $e->getMessage()
    ]);
}
?>
