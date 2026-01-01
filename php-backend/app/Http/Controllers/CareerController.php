<?php
use PHPMailer\PHPMailer\PHPMailer;

require_once __DIR__ . '/../../../vendor/autoload.php';
require_once __DIR__ . '/../../../config/mail.php';

class CareerController
{
    public function apply()
    {
        $data = $_POST;
        $branch = strtolower($data["branch"] ?? "kothrud");
        $config = require __DIR__ . '/../../../config/mail.php';

        if (!isset($config[$branch])) {
            http_response_code(400);
            echo json_encode(["error" => "Invalid branch"]);
            return;
        }

        // Handle resume upload
        $resumePath = null;
        if (isset($_FILES['resume'])) {
            $uploadDir = __DIR__ . '/../../../storage/app/public/resumes/';
            
            // Create directory if it doesn't exist
            if (!file_exists($uploadDir)) {
                mkdir($uploadDir, 0777, true);
            }

            $fileName = time() . "_" . basename($_FILES['resume']['name']);
            $targetPath = $uploadDir . $fileName;

            if (move_uploaded_file($_FILES['resume']['tmp_name'], $targetPath)) {
                $resumePath = $targetPath;
            }
        }

        // Send email
        try {
            $mail = new PHPMailer(true);
            $mail->isSMTP();
            $mail->Host = "smtp.gmail.com";
            $mail->SMTPAuth = true;
            $mail->Username = $config[$branch]["user"];
            $mail->Password = $config[$branch]["pass"];
            $mail->SMTPSecure = "tls";
            $mail->Port = 587;

            $mail->setFrom($config[$branch]["user"], "Little Learningss Career");
            $mail->addAddress($config[$branch]["user"]);
            $mail->Subject = "New Career Application - " . ($data['position'] ?? 'N/A');

            $body = "Name: " . ($data['fullName'] ?? '') . "\n";
            $body .= "Email: " . ($data['email'] ?? '') . "\n";
            $body .= "Phone: " . ($data['phone'] ?? '') . "\n";
            $body .= "Position: " . ($data['position'] ?? '') . "\n";
            $body .= "Location: " . ($data['location'] ?? '') . "\n";
            $body .= "Education: " . ($data['education'] ?? '') . "\n";
            $body .= "Branch: " . ($data['branch'] ?? '') . "\n";
            $body .= "Cover Letter: " . ($data['cover'] ?? '') . "\n";

            $mail->Body = $body;

            // Attach resume
            if ($resumePath && file_exists($resumePath)) {
                $mail->addAttachment($resumePath);
            }

            $mail->send();

            echo json_encode(["success" => true, "message" => "Application submitted successfully"]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => "Failed to send email: " . $mail->ErrorInfo]);
        }
    }
}
