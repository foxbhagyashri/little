<?php

// =========================
// ERROR REPORTING (for debugging)
// =========================
error_reporting(E_ALL);
ini_set('display_errors', 1);

// =========================
// CORS & HEADERS
// =========================
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, GET, DELETE, OPTIONS");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// =========================
// CONTROLLER INCLUDES
// =========================
require_once __DIR__ . '/../app/Http/Controllers/MailController.php';
require_once __DIR__ . '/../app/Http/Controllers/CareerController.php';
require_once __DIR__ . '/../app/Http/Controllers/GalleryController.php';
require_once __DIR__ . '/../app/Http/Controllers/AuthController.php';

// =========================
// REQUEST URI & METHOD
// =========================
$uri = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

// Clean up URI - remove query string
$uri = parse_url($uri, PHP_URL_PATH);

// Remove base path variations (dynamic + legacy)
$scriptName = $_SERVER['SCRIPT_NAME'] ?? '';
$scriptDir = str_replace('\\', '/', dirname($scriptName));
if ($scriptDir === '.') {
    $scriptDir = '';
}

// Strip the directory that contains this router script (works on shared hosting)
if ($scriptDir !== '' && strpos($uri, $scriptDir) === 0) {
    $uri = substr($uri, strlen($scriptDir));
}

// Legacy local paths (kept for backward compatibility)
$basePaths = [
    '/Little_Learning/little-learning1/php-backend/api/index.php',
    '/Little_Learning/little-learning1/php-backend/api',
    '/Little_Learning/little-learning1/php-backend',
];

foreach ($basePaths as $basePath) {
    if (strpos($uri, $basePath) === 0) {
        $uri = substr($uri, strlen($basePath));
        break;
    }
}

// Normalize URI
$uri = '/' . trim($uri, '/');
if ($uri === '/') {
    $uri = '/';
}

// =========================
// LOGGING (for debugging)
// =========================
$logFile = __DIR__ . '/../logs/api.log';
$logDir = dirname($logFile);
if (!file_exists($logDir)) {
    @mkdir($logDir, 0777, true);
}

$logEntry = date('Y-m-d H:i:s') . " | Method: $method | URI: $uri | Original: {$_SERVER['REQUEST_URI']}\n";
@file_put_contents($logFile, $logEntry, FILE_APPEND);

// =========================
// ROUTING
// =========================
try {

    // Root test route
    if ($uri === '/' && $method === 'GET') {
        echo json_encode([
            "status" => "success",
            "message" => "Little Learningss API is running!",
            "timestamp" => date('Y-m-d H:i:s'),
            "php_version" => phpversion(),
            "available_routes" => [
                "POST /send-email - Send contact/enrollment/franchise emails",
                "POST /send-career-application - Submit career application",
                "GET /api/gallery - Get all gallery images",
                "POST /api/gallery/upload - Upload gallery image",
                "DELETE /api/gallery/{id} - Delete gallery image",
                "POST /api/admin/login - Admin authentication"
            ],
            "debug_info" => [
                "parsed_uri" => $uri,
                "original_uri" => $_SERVER['REQUEST_URI'],
                "method" => $method,
                "server" => $_SERVER['SERVER_SOFTWARE']
            ]
        ]);
        exit;
    }

    // Contact/Enrollment/Franchise Forms
    if (preg_match('#/send-email$#', $uri) && $method === 'POST') {
        (new MailController())->send();
        exit;
    }

    // Career Applications
    if (preg_match('#/send-career-application$#', $uri) && $method === 'POST') {
        (new CareerController())->apply();
        exit;
    }

    // Gallery - Get All Images
    if (preg_match('#/(api/)?gallery$#', $uri) && $method === 'GET') {
        (new GalleryController())->getAll();
        exit;
    }

    // Gallery - Upload Image
    if (preg_match('#/(api/)?gallery/upload$#', $uri) && $method === 'POST') {
        (new GalleryController())->upload();
        exit;
    }

    // Gallery - Delete Image
    if (preg_match('#/(api/)?gallery/(\d+)$#', $uri, $matches) && $method === 'DELETE') {
        $imageId = $matches[2];
        (new GalleryController())->delete($imageId);
        exit;
    }

    // Admin Login
    if (preg_match('#/(api/)?admin/login$#', $uri) && $method === 'POST') {
        (new AuthController())->login();
        exit;
    }

    // =========================
    // ROUTE NOT FOUND
    // =========================
    http_response_code(404);
    echo json_encode([
        "status" => "error",
        "message" => "API route not found",
        "requested_uri" => $uri,
        "original_uri" => $_SERVER['REQUEST_URI'],
        "method" => $method,
        "hint" => "Check if the endpoint exists in available_routes by visiting the root endpoint"
    ]);

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Server error occurred",
        "error" => $e->getMessage(),
        "file" => $e->getFile(),
        "line" => $e->getLine()
    ]);
}
