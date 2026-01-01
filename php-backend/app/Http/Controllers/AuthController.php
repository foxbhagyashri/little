<?php

class AuthController
{
    private $db;

    public function __construct()
    {
        require __DIR__ . '/../../../config/database.php';
        $this->db = $db;
    }

    public function login()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        $username = $data['username'] ?? '';
        $password = $data['password'] ?? '';

        if (empty($username) || empty($password)) {
            http_response_code(400);
            echo json_encode(["error" => "Username and password required"]);
            return;
        }

        try {
            $stmt = $this->db->prepare("SELECT * FROM admin_users WHERE username = ?");
            $stmt->execute([$username]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user && password_verify($password, $user['password'])) {
                echo json_encode([
                    "success" => true,
                    "message" => "Login successful",
                    "token" => bin2hex(random_bytes(32))
                ]);
            } else {
                http_response_code(401);
                echo json_encode(["error" => "Invalid credentials"]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Database error"]);
        }
    }
}
