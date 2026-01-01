<?php
require_once __DIR__ . '/../helpers/env.php';

try {
    $host = env("DB_HOST", "localhost");
    $port = env("DB_PORT", "3307"); 
    $dbname = env("DB_NAME", "little-learningss");
    $user = env("DB_USER", "root");
    $pass = env("DB_PASS", "");
    $allowCreateDb = strtolower((string) env("DB_ALLOW_CREATE", "false")) === 'true';
    
    // On shared hosting you typically cannot CREATE DATABASE. Connect directly to the configured DB.
    // If you still want auto-create behavior (local/dev), set DB_ALLOW_CREATE=true.
    $dsn = "mysql:host={$host};port={$port};dbname={$dbname};charset=utf8mb4";
    
    $db = new PDO(
        $dsn,
        $user,
        $pass,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ]
    );

    if ($allowCreateDb) {
        $db->exec("CREATE DATABASE IF NOT EXISTS `{$dbname}` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
        $db->exec("USE `{$dbname}`");
    }
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Database connection failed",
        "error" => $e->getMessage(),
        "port_tried" => $port,
        "hint" => "Make sure MySQL is running on port {$port} in XAMPP Control Panel"
    ]);
    exit;
}
?>
