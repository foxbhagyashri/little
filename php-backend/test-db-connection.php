<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once __DIR__ . '/helpers/env.php';

try {
    $host = env("DB_HOST", "localhost");
    $port = env("DB_PORT", "3307");
    $dbname = env("DB_NAME", "little-learningss");
    $user = env("DB_USER", "root");
    $pass = env("DB_PASS", "");
    
    $dsn = "mysql:host={$host};port={$port};dbname={$dbname};charset=utf8mb4";
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
    
    // Test queries
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM gallery");
    $galleryCount = $stmt->fetch(PDO::FETCH_ASSOC);
    
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM admin_users");
    $adminCount = $stmt->fetch(PDO::FETCH_ASSOC);
    
    echo json_encode([
        "status" => "success",
        "message" => "Database connection successful!",
        "connection_details" => [
            "host" => $host,
            "port" => $port,
            "database" => $dbname
        ],
        "php_version" => phpversion(),
        "mysql_version" => $pdo->getAttribute(PDO::ATTR_SERVER_VERSION),
        "tables" => [
            "gallery_images" => $galleryCount['count'],
            "admin_users" => $adminCount['count']
        ]
    ]);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Database connection failed",
        "error" => $e->getMessage(),
        "connection_attempted" => [
            "host" => $host ?? "localhost",
            "port" => $port ?? "3307",
            "database" => $dbname ?? "little-learningss"
        ],
        "hint" => "Make sure MySQL is running on port " . ($port ?? "3307") . " in XAMPP Control Panel"
    ]);
}
?>
