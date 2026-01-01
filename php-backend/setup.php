<?php
require_once __DIR__ . '/helpers/env.php';

echo "<!DOCTYPE html><html><head><title>Database Setup</title>";
echo "<style>
body{font-family:Arial;padding:40px;background:#f5f5f5;max-width:800px;margin:0 auto;}
.success{color:#22c55e;background:#dcfce7;padding:15px;border-radius:8px;margin:10px 0;}
.error{color:#ef4444;background:#fee2e2;padding:15px;border-radius:8px;margin:10px 0;}
.info{color:#3b82f6;background:#dbeafe;padding:15px;border-radius:8px;margin:10px 0;}
h1{color:#7c3aed;}
pre{background:#1f2937;color:#fff;padding:15px;border-radius:8px;overflow-x:auto;}
.step{background:white;padding:20px;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.1);margin:20px 0;}
</style></head><body>";

echo "<h1>🚀 Little Learningss - Database Setup</h1>";

// Step 1: Check MySQL Connection
echo "<div class='step'>";
echo "<h2>Step 1: Testing MySQL Connection</h2>";

try {
    $host = env("DB_HOST", "localhost");
    $port = 3307;
    
    if (strpos($host, ':') !== false) {
        list($host, $port) = explode(':', $host);
    }
    
    echo "<div class='info'>📡 Attempting to connect to MySQL at <strong>{$host}:{$port}</strong></div>";
    echo "<div class='info'>👤 Username: <strong>" . env("DB_USER") . "</strong></div>";
    echo "<div class='info'>🔑 Password: <strong>" . (empty(env("DB_PASS")) ? "(empty)" : "(set)") . "</strong></div>";
    
    // Try to connect
    $pdo = new PDO(
        "mysql:host={$host};port={$port}",
        env("DB_USER"),
        env("DB_PASS"),
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
    
    echo "<div class='success'>✅ Successfully connected to MySQL!</div>";
    echo "</div>"; // close step 1

    // Step 2: Create Database
    echo "<div class='step'>";
    echo "<h2>Step 2: Creating Database</h2>";
    
    $dbName = env("DB_NAME");
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `{$dbName}` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci");
    echo "<div class='success'>✅ Database '<strong>{$dbName}</strong>' created/verified successfully!</div>";
    
    $pdo->exec("USE `{$dbName}`");
    echo "<div class='success'>✅ Using database: <strong>{$dbName}</strong></div>";
    echo "</div>"; // close step 2

    // Step 3: Create Tables
    echo "<div class='step'>";
    echo "<h2>Step 3: Creating Tables</h2>";
    
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
    echo "<div class='success'>✅ Table 'gallery' created/verified</div>";

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
    echo "<div class='success'>✅ Table 'admin_users' created/verified</div>";
    echo "</div>"; // close step 3

    // Step 4: Create Admin User
    echo "<div class='step'>";
    echo "<h2>Step 4: Creating Admin User</h2>";
    
    $hashedPassword = password_hash('admin123', PASSWORD_DEFAULT);
    
    // Check if admin already exists
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM `admin_users` WHERE username = 'admin'");
    $stmt->execute();
    $exists = $stmt->fetchColumn() > 0;
    
    if ($exists) {
        echo "<div class='info'>ℹ️ Admin user already exists</div>";
    } else {
        $stmt = $pdo->prepare("INSERT INTO `admin_users` (`username`, `password`) VALUES (?, ?)");
        $stmt->execute(['admin', $hashedPassword]);
        echo "<div class='success'>✅ Admin user created successfully!</div>";
    }
    
    echo "<div class='info'>";
    echo "<strong>Admin Credentials:</strong><br>";
    echo "Username: <code>admin</code><br>";
    echo "Password: <code>admin123</code>";
    echo "</div>";
    echo "</div>"; // close step 4

    // Step 5: Create Directories
    echo "<div class='step'>";
    echo "<h2>Step 5: Creating Storage Directories</h2>";
    
    $dirs = [
        __DIR__ . '/storage/app/public/gallery',
        __DIR__ . '/storage/app/public/resumes',
        __DIR__ . '/uploads'
    ];
    
    foreach ($dirs as $dir) {
        if (!file_exists($dir)) {
            mkdir($dir, 0777, true);
            echo "<div class='success'>✅ Created: <code>{$dir}</code></div>";
        } else {
            echo "<div class='info'>ℹ️ Already exists: <code>{$dir}</code></div>";
        }
    }
    echo "</div>"; // close step 5

    // Success Summary
    echo "<div class='step' style='background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;'>";
    echo "<h2>🎉 Setup Completed Successfully!</h2>";
    echo "<h3>Next Steps:</h3>";
    echo "<ol style='line-height: 2;'>";
    echo "<li><strong>Start Testing:</strong> Visit <a href='http://localhost/Little_Learning/little-learning1/php-backend/api/gallery' style='color: #fbbf24;' target='_blank'>Gallery API</a></li>";
    echo "<li><strong>Admin Login:</strong> Username: <code>admin</code>, Password: <code>admin123</code></li>";
    echo "<li><strong>Upload Images:</strong> Go to Admin Panel → Gallery Management</li>";
    echo "<li><strong>Test Contact Form:</strong> Submit a form from your website</li>";
    echo "<li><strong>Important:</strong> Delete this <code>setup.php</code> file after successful setup for security!</li>";
    echo "</ol>";
    echo "</div>";

    // Database Info
    echo "<div class='step'>";
    echo "<h2>📊 Database Information</h2>";
    echo "<pre>";
    echo "Host: {$host}\n";
    echo "Port: {$port}\n";
    echo "Database: {$dbName}\n";
    echo "Username: " . env("DB_USER") . "\n";
    echo "Tables Created: gallery, admin_users\n";
    echo "</pre>";
    echo "</div>";

} catch (PDOException $e) {
    echo "<div class='error'>";
    echo "<h3>❌ Database Connection Error</h3>";
    echo "<p><strong>Error Message:</strong> " . htmlspecialchars($e->getMessage()) . "</p>";
    echo "</div>";
    
    echo "<div class='step'>";
    echo "<h3>🔧 Troubleshooting Steps:</h3>";
    echo "<ol>";
    echo "<li><strong>Check if MySQL is Running:</strong><br>";
    echo "   Open XAMPP Control Panel and make sure MySQL is started (green)</li>";
    
    echo "<li><strong>Verify Port Number:</strong><br>";
    echo "   Your MySQL is running on port <strong>3307</strong> (not the default 3306)</li>";
    
    echo "<li><strong>Check .env File:</strong><br>";
    echo "   Location: <code>php-backend/.env</code><br>";
    echo "   Should contain:<br>";
    echo "   <pre>DB_HOST=localhost:3307\nDB_NAME=little-learningss\nDB_USER=root\nDB_PASS=</pre></li>";
    
    echo "<li><strong>If password is required:</strong><br>";
    echo "   Add your MySQL root password in .env file: <code>DB_PASS=your_password</code></li>";
    
    echo "<li><strong>Restart MySQL:</strong><br>";
    echo "   Stop and start MySQL in XAMPP Control Panel</li>";
    
    echo "<li><strong>Check my.ini file:</strong><br>";
    echo "   Location: <code>C:/xamppNew/mysql/bin/my.ini</code><br>";
    echo "   Verify port=3307 is set</li>";
    echo "</ol>";
    echo "</div>";
}

echo "</body></html>";
?>
