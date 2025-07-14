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

// Add CORS headers for development
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

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
    'creatio' => 'Creatio - CRM система',
    'rpa' => 'RPA - Роботизация процессов',
    'general' => 'Общая консультация'
];

$product_name = $product_names[$product] ?? 'Общая консультация';

// Email configuration for demo (в продакшне использовать переменные окружения)
$to_email = 'info@eca.kz';
$from_email = 'noreply@eca.kz';

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

try {
    // For development - just log the email (in production use actual email sending)
    logMessage("SUCCESS: Email would be sent to $to_email from $name ($email) for product: $product_name");
    
    // Simulate successful email sending
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