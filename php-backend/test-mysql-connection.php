<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

try {
    // Try to connect to MySQL server (not specific database)
    $pdo = new PDO("mysql:host=localhost", "root", "", [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
    
    echo json_encode([
        "status" => "success",
        "message" => "MySQL is running!",
        "mysql_version" => $pdo->getAttribute(PDO::ATTR_SERVER_VERSION)
    ]);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "MySQL is NOT running or cannot connect",
        "error" => $e->getMessage(),
        "hint" => "Open XAMPP Control Panel and click Start next to MySQL"
    ]);
}
?>
