<?php
header("Content-Type: application/json");

$connection = @fsockopen("localhost", 3306, $errno, $errstr, 5);

if (is_resource($connection)) {
    fclose($connection);
    echo json_encode([
        "status" => "info",
        "message" => "Port 3306 is in use",
        "hint" => "MySQL might already be running, or another service is using port 3306"
    ]);
} else {
    echo json_encode([
        "status" => "info",
        "message" => "Port 3306 is available",
        "hint" => "MySQL is not running. Start it from XAMPP Control Panel"
    ]);
}
?>
