<?php
header("Content-Type: application/json");

$diagnostics = [];

// Test port 3306
$conn3306 = @fsockopen("localhost", 3306, $errno, $errstr, 2);
$diagnostics['port_3306'] = is_resource($conn3306) ? "Open" : "Closed";
if (is_resource($conn3306)) fclose($conn3306);

// Test port 3307
$conn3307 = @fsockopen("localhost", 3307, $errno, $errstr, 2);
$diagnostics['port_3307'] = is_resource($conn3307) ? "Open" : "Closed";
if (is_resource($conn3307)) fclose($conn3307);

// Try PDO on 3307
try {
    $pdo = new PDO("mysql:host=localhost;port=3307", "root", "");
    $diagnostics['pdo_3307'] = "Connected";
    $diagnostics['mysql_version'] = $pdo->getAttribute(PDO::ATTR_SERVER_VERSION);
} catch (PDOException $e) {
    $diagnostics['pdo_3307'] = "Failed: " . $e->getMessage();
}

echo json_encode([
    "diagnostics" => $diagnostics,
    "recommendation" => $diagnostics['port_3307'] === "Open" 
        ? "MySQL is running on port 3307. Your configuration is correct."
        : "MySQL is NOT running. Please start it in XAMPP Control Panel."
]);
?>
