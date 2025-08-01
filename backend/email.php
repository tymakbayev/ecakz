<?php
session_start();

// Include logging function
function logMessage($message) {
    $logFile = __DIR__ . '/email_log.txt';
    $logMessage = "[" . date('Y-m-d H:i:s') . "] " . $message . "\n";
    file_put_contents($logFile, $logMessage, FILE_APPEND);
}

logMessage("Script started");

header('Content-Type: application/json');

// Remove CORS headers for security

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validate reCAPTCHA (with temporary bypass for demo)
$recaptcha_response = $data['g-recaptcha-response'] ?? '';
if (empty($recaptcha_response)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Пожалуйста, подтвердите, что вы не робот']);
    exit;
}

// Temporary bypass for demo mode
if ($recaptcha_response === 'demo-bypass') {
    logMessage('reCAPTCHA bypassed in demo mode');
} else {
    // Verify reCAPTCHA with Google (only in production)
    $recaptcha_secret = '6LeBp-cpAAAAAFIna2O1qA3A8AGauDoOLmPWotlV'; // Secret key
    $recaptcha_verify_url = 'https://www.google.com/recaptcha/api/siteverify';
    $recaptcha_verify_data = [
        'secret' => $recaptcha_secret,
        'response' => $recaptcha_response,
        'remoteip' => $_SERVER['REMOTE_ADDR'] ?? ''
    ];

    $recaptcha_context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => 'Content-Type: application/x-www-form-urlencoded',
            'content' => http_build_query($recaptcha_verify_data)
        ]
    ]);

    $recaptcha_result = file_get_contents($recaptcha_verify_url, false, $recaptcha_context);
    $recaptcha_json = json_decode($recaptcha_result, true);

    if (!$recaptcha_json || !$recaptcha_json['success']) {
        logMessage('reCAPTCHA verification failed: ' . json_encode($recaptcha_json));
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Проверка reCAPTCHA не пройдена']);
        exit;
    }

    logMessage('reCAPTCHA verification successful');
}

// Validate required fields
$required_fields = ['name', 'email', 'phone'];
foreach ($required_fields as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => "Поле '$field' обязательно для заполнения"]);
        exit;
    }
}

// Validate email format
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Некорректный email адрес']);
    exit;
}

// Sanitize input data
$name = htmlspecialchars(trim($data['name']));
$company = htmlspecialchars(trim($data['company'] ?? ''));
$email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars(trim($data['phone']));
$message = htmlspecialchars(trim($data['message'] ?? ''));
$product = htmlspecialchars(trim($data['product'] ?? 'general'));

// Product names mapping
$product_names = [
    'omilia' => 'Omilia - Голосовые решения', 
    'evochat' => 'EvoChat - Чат-бот платформа',
    'geostatus' => 'GeoStatus - Геолокационные сервисы',
    'evobot' => 'EvoBot - Робототехническая платформа',
    'evomed' => 'EvoMed - Медицинская система',
    'evoprompt' => 'EvoPrompt - AI-промпты',
    'evosensus' => 'EvoSensus - IoT мониторинг',
    'evoshell' => 'EvoShell - Командная строка',
    'evotype' => 'EvoType - Распознавание текста',
    'evologue' => 'EvoLogue - Логирование',
    'campaignmanager' => 'Campaign Manager - Маркетинг',
    'renata' => 'Renata - Персональный ассистент',
    'creatio' => 'Creatio - CRM система',
    'rpa' => 'RPA - Роботизация процессов',
    'general' => 'Общая консультация'
];

$product_name = $product_names[$product] ?? 'Общая консультация';

// Include PHPMailer
try {
    require(__DIR__ . "/PHPMailer/PHPMailer.php");
    require(__DIR__ . "/PHPMailer/SMTP.php");
    require(__DIR__ . "/PHPMailer/Exception.php");
    logMessage("PHPMailer files included successfully");
} catch (Exception $e) {
    logMessage("Error including PHPMailer: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Ошибка сервера']);
    exit;
}

// Initialize PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer(true);
$mail->CharSet = 'UTF-8';

// Email configuration
$to_email = 'info@eca.kz';
$from_email = 'noreply@eca.kz';
$smtp_host = 'ssl://smtp.yandex.ru';
$smtp_port = 465;
$smtp_username = 'info@eca.kz';
$smtp_password = 'Jrnz,hm03'; // В продакшене использовать переменные окружения

// Create email subject and body
$subject = "Новая заявка с сайта EvoTech - $product_name";

$email_body = "
<html>
<head>
    <meta charset='utf-8'>
    <title>Новая заявка с сайта</title>
</head>
<body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
    <div style='max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;'>
        <h2 style='color: #2c3e50; text-align: center; margin-bottom: 30px;'>
            Новая заявка с сайта EvoTech
        </h2>
        
        <table style='width: 100%; border-collapse: collapse;'>
            <tr>
                <td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 30%;'>Имя:</td>
                <td style='padding: 10px; border-bottom: 1px solid #eee;'>$name</td>
            </tr>
            <tr>
                <td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;'>Email:</td>
                <td style='padding: 10px; border-bottom: 1px solid #eee;'>$email</td>
            </tr>
            <tr>
                <td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;'>Телефон:</td>
                <td style='padding: 10px; border-bottom: 1px solid #eee;'>$phone</td>
            </tr>
            <tr>
                <td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;'>Компания:</td>
                <td style='padding: 10px; border-bottom: 1px solid #eee;'>" . ($company ?: 'Не указана') . "</td>
            </tr>
            <tr>
                <td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;'>Продукт:</td>
                <td style='padding: 10px; border-bottom: 1px solid #eee;'>$product_name</td>
            </tr>
            <tr>
                <td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;'>Сообщение:</td>
                <td style='padding: 10px; border-bottom: 1px solid #eee;'>" . ($message ?: 'Запрос консультации') . "</td>
            </tr>
            <tr>
                <td style='padding: 10px; font-weight: bold;'>Дата:</td>
                <td style='padding: 10px;'>" . date('d.m.Y H:i:s') . "</td>
            </tr>
        </table>
        
        <div style='margin-top: 30px; padding: 15px; background-color: #f8f9fa; border-radius: 5px;'>
            <p style='margin: 0; font-size: 14px; color: #666;'>
                Заявка отправлена с сайта EvoTech.kz
            </p>
        </div>
    </div>
</body>
</html>
";

// Email headers
$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=utf-8',
    'From: EvoTech <' . $from_email . '>',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion()
];

try {
    // SMTP Configuration
    $mail->isSMTP();
    $mail->Host = 'smtp.yandex.ru';
    $mail->SMTPAuth = true;
    $mail->Username = $smtp_username;
    $mail->Password = $smtp_password;
    $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = $smtp_port;
    
    // Recipients
    $mail->setFrom($from_email, 'EvoTech');
    $mail->addAddress($to_email);
    $mail->addReplyTo($email, $name);
    
    // Content
    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body = $email_body;
    
    // Send email
    $mail->send();
    
    // Log successful submission
    logMessage("SUCCESS: Email sent to $to_email from $name ($email)");
    
    echo json_encode([
        'success' => true,
        'message' => 'Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.',
        'id' => uniqid('evo_', true)
    ]);
    
} catch (Exception $e) {
    // Log error
    logMessage("ERROR: Failed to send email - " . $e->getMessage());
    
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.'
    ]);
}
?>