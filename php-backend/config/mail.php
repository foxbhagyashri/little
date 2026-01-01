<?php
require_once __DIR__ . '/../helpers/env.php';

return [
    "kothrud" => [
        "user" => env("KOTHRUD_EMAIL"),
        "pass" => env("KOTHRUD_PASSWORD")
    ],
    "warje" => [
        "user" => env("WARJE_EMAIL"),
        "pass" => env("WARJE_PASSWORD")
    ]
];
