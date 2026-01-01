<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

echo json_encode([
    "status" => "success",
    "message" => "PHP Backend is working!",
    "php_version" => phpversion(),
    "server" => $_SERVER['SERVER_SOFTWARE'],
    "document_root" => $_SERVER['DOCUMENT_ROOT'],
    "script_filename" => __FILE__
]);
?>
