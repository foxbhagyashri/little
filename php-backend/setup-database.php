<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once __DIR__ . '/helpers/env.php';

try {
    $host = env("DB_HOST", "localhost");
    $dbname = env("DB_NAME", "little-learningss");
    $user = env("DB_USER", "root");
    $pass = env("DB_PASS", "");
    
    // Connect without database first
    $dsn = "mysql:host={$host};charset=utf8mb4";
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
    
    // Create database
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `{$dbname}` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    $pdo->exec("USE `{$dbname}`");
    
    // Create gallery table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `gallery` (
          `id` int(11) NOT NULL AUTO_INCREMENT,
          `title` varchar(255) NOT NULL,
          `image_url` varchar(255) NOT NULL,
          `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (`id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    ");

    // Create admin_users table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `admin_users` (
          `id` int(11) NOT NULL AUTO_INCREMENT,
          `username` varchar(50) NOT NULL,
          `password` varchar(255) NOT NULL,
          `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (`id`),
          UNIQUE KEY `username` (`username`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    ");

    // Insert default admin (username: admin, password: admin123)
    $hashedPassword = password_hash('admin123', PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("INSERT IGNORE INTO `admin_users` (`username`, `password`) VALUES ('admin', ?)");
    $stmt->execute([$hashedPassword]);

    echo json_encode([
        "status" => "success",
        "message" => "Database setup completed successfully!",
        "database" => $dbname,
        "tables_created" => ["gallery", "admin_users"],
        "default_admin" => [
            "username" => "admin",
            "password" => "admin123",
            "note" => "Change this password after first login"
        ]
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Database setup failed",
        "error" => $e->getMessage(),
        "hint" => "Make sure MySQL is running in XAMPP Control Panel"
    ]);
}
?>
