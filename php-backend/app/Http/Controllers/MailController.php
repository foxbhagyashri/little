<?php
use PHPMailer\PHPMailer\PHPMailer;

require_once __DIR__ . '/../../../config/mail.php';
require_once __DIR__ . '/../../../vendor/autoload.php';

class MailController {
    public function send() {
        $data = json_decode(file_get_contents("php://input"), true);
        $branch = strtolower($data["branch"]);
        $config = require __DIR__ . '/../../../config/mail.php';

        if (!isset($config[$branch])) {
            http_response_code(400);
            echo json_encode(["error" => "Invalid branch"]);
            return;
        }

        try {
            $mail = new PHPMailer(true);
            $mail->isSMTP();
            $mail->Host = "smtp.gmail.com";
            $mail->SMTPAuth = true;
            $mail->Username = $config[$branch]["user"];
            $mail->Password = $config[$branch]["pass"];
            $mail->SMTPSecure = "tls";
            $mail->Port = 587;

            $mail->setFrom($config[$branch]["user"], "Little Learningss");
            $mail->addAddress($config[$branch]["user"]);

            $formType = $data['formType'] ?? 'Contact';
            $mail->Subject = "New {$formType} Form Submission";
            
            // Create HTML email body
            $mail->isHTML(true);
            $mail->Body = $this->formatEmailBody($data, $formType);

            $mail->send();
            echo json_encode(["success" => true, "message" => "Email sent successfully"]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => "Failed to send email: " . $mail->ErrorInfo]);
        }
    }

    private function formatEmailBody($data, $formType) {
        $html = "
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: white; padding: 30px; border-radius: 0 0 10px 10px; }
                .field { margin-bottom: 15px; padding: 10px; background: #f5f5f5; border-left: 4px solid #667eea; }
                .label { font-weight: bold; color: #667eea; margin-bottom: 5px; }
                .value { color: #333; }
                .footer { text-align: center; margin-top: 20px; color: #999; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h2>New {$formType} Form Submission</h2>
                    <p>Little Learningss - " . ucfirst($data['branch'] ?? '') . " Branch</p>
                </div>
                <div class='content'>
        ";

        // Add fields based on what's available
        if (isset($data['name']) && $data['name']) {
            $html .= "<div class='field'><div class='label'>Full Name:</div><div class='value'>{$data['name']}</div></div>";
        }

        if (isset($data['email']) && $data['email']) {
            $html .= "<div class='field'><div class='label'>Email:</div><div class='value'>{$data['email']}</div></div>";
        }

        if (isset($data['phone']) && $data['phone']) {
            $html .= "<div class='field'><div class='label'>Phone:</div><div class='value'>{$data['phone']}</div></div>";
        }

        if (isset($data['program']) && $data['program']) {
            $html .= "<div class='field'><div class='label'>Program:</div><div class='value'>{$data['program']}</div></div>";
        }

        if (isset($data['childName']) && $data['childName']) {
            $html .= "<div class='field'><div class='label'>Child's Name:</div><div class='value'>{$data['childName']}</div></div>";
        }

        if (isset($data['childAge']) && $data['childAge']) {
            $html .= "<div class='field'><div class='label'>Child's Age:</div><div class='value'>{$data['childAge']}</div></div>";
        }

        if (isset($data['investmentAmount']) && $data['investmentAmount']) {
            $html .= "<div class='field'><div class='label'>Investment Amount:</div><div class='value'>{$data['investmentAmount']}</div></div>";
        }

        if (isset($data['city']) && $data['city']) {
            $html .= "<div class='field'><div class='label'>City:</div><div class='value'>{$data['city']}</div></div>";
        }

        if (isset($data['message']) && $data['message']) {
            $html .= "<div class='field'><div class='label'>Message:</div><div class='value'>" . nl2br(htmlspecialchars($data['message'])) . "</div></div>";
        }

        $html .= "
                    <div class='field'>
                        <div class='label'>Submission Time:</div>
                        <div class='value'>" . date('F j, Y, g:i a') . "</div>
                    </div>
                </div>
                <div class='footer'>
                    <p>This is an automated message from Little Learningss website contact form.</p>
                </div>
            </div>
        </body>
        </html>
        ";

        return $html;
    }
}
