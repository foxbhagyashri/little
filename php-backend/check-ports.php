<?php
header("Content-Type: application/json");

$ports = [
    3306 => "MySQL Default Port",
    3307 => "MySQL Alternative Port",
    80 => "Apache HTTP",
    443 => "Apache HTTPS"
];

$results = [];

foreach ($ports as $port => $desc) {
    $connection = @fsockopen("localhost", $port, $errno, $errstr, 2);
    $results[$port] = [
        "description" => $desc,
        "status" => is_resource($connection) ? "Open (In Use)" : "Closed (Available)",
        "error" => $errstr ?? null
    ];
    if (is_resource($connection)) fclose($connection);
}

echo json_encode([
    "port_check" => $results,
    "hint" => "Green/Open means the port is in use. If MySQL port shows Closed, MySQL is not running."
]);
?>
