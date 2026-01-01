<?php
function env($key, $default = null) {
    static $env;
    if (!$env) {
        $env = [];
        $envPath = __DIR__ . '/../.env';
        if (is_readable($envPath)) {
            $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach ($lines as $line) {
                $line = trim($line);
                if ($line === '' || (isset($line[0]) && $line[0] === '#')) {
                    continue;
                }

                $pos = strpos($line, '=');
                if ($pos === false) {
                    continue;
                }

                $k = trim(substr($line, 0, $pos));
                $v = trim(substr($line, $pos + 1));

                if (strlen($v) >= 2) {
                    $first = $v[0];
                    $last = $v[strlen($v) - 1];
                    if (($first === '"' && $last === '"') || ($first === "'" && $last === "'")) {
                        $v = substr($v, 1, -1);
                    }
                }

                if ($k !== '') {
                    $env[$k] = $v;
                }
            }
        }
    }
    return $env[$key] ?? $default;
}
