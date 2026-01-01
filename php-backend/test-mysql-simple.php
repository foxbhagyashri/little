<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

// Try multiple connection methods
$tests = [];

// Test 1: Check if MySQL port is open
$connection = @fsockopen("localhost", 3307, $errno, $errstr, 5);
$tests['port_3307'] = is_resource($connection) ? "Open" : "Closed - $errstr";
if (is_resource($connection)) fclose($connection);

// Test 2: Try PDO connection
try {
    $pdo = new PDO("mysql:host=localhost;port=3307", "root", "");
    $tests['pdo_connection'] = "Success";
    $tests['mysql_version'] = $pdo->getAttribute(PDO::ATTR_SERVER_VERSION);
} catch (PDOException $e) {
    $tests['pdo_connection'] = "Failed: " . $e->getMessage();
}

// Test 3: Try mysqli connection
$mysqli = @new mysqli("localhost", "root", "", "", 3307);
if ($mysqli->connect_error) {
    $tests['mysqli_connection'] = "Failed: " . $mysqli->connect_error;
} else {
    $tests['mysqli_connection'] = "Success";
    $mysqli->close();
}

echo json_encode([
    "status" => $tests['pdo_connection'] === "Success" ? "success" : "error",
    "tests" => $tests,
    "hint" => $tests['pdo_connection'] !== "Success" 
        ? "MySQL is NOT running. Start it in XAMPP Control Panel as Administrator"
        : "MySQL is running correctly!"
]);
?>
