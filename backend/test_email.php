<?php
// Test script to check PHP mail functionality
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "=== PHP Mail Test Script ===\n";

// Test 1: Check if PHPMailer files exist
$phpmailer_files = [
    'PHPMailer/PHPMailer.php',
    'PHPMailer/SMTP.php', 
    'PHPMailer/Exception.php'
];

foreach ($phpmailer_files as $file) {
    if (file_exists($file)) {
        echo "✅ Found: $file\n";
    } else {
        echo "❌ Missing: $file\n";
    }
}

// Test 2: Try to include PHPMailer
try {
    require_once 'PHPMailer/PHPMailer.php';
    require_once 'PHPMailer/SMTP.php';
    require_once 'PHPMailer/Exception.php';
    echo "✅ PHPMailer included successfully\n";
} catch (Exception $e) {
    echo "❌ Error including PHPMailer: " . $e->getMessage() . "\n";
    exit;
}

// Test 3: Create PHPMailer instance
try {
    $mail = new PHPMailer\PHPMailer\PHPMailer(true);
    echo "✅ PHPMailer instance created\n";
} catch (Exception $e) {
    echo "❌ Error creating PHPMailer instance: " . $e->getMessage() . "\n";
    exit;
}

// Test 4: Test SMTP settings
try {
    $mail->isSMTP();
    $mail->Host = 'smtp.yandex.ru';
    $mail->SMTPAuth = true;
    $mail->Username = 'info@eca.kz';
    $mail->Password = 'Jrnz,hm03';
    $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;
    $mail->CharSet = 'UTF-8';
    
    echo "✅ SMTP settings configured\n";
} catch (Exception $e) {
    echo "❌ Error configuring SMTP: " . $e->getMessage() . "\n";
    exit;
}

// Test 5: Test email sending
try {
    $mail->setFrom('info@eca.kz', 'EvoTech Test');
    $mail->addAddress('info@eca.kz');
    $mail->isHTML(true);
    $mail->Subject = 'Test Email - ' . date('Y-m-d H:i:s');
    $mail->Body = 'This is a test email sent from EvoTech website.';
    
    $result = $mail->send();
    
    if ($result) {
        echo "✅ Test email sent successfully!\n";
    } else {
        echo "❌ Failed to send test email\n";
    }
    
} catch (Exception $e) {
    echo "❌ Error sending test email: " . $e->getMessage() . "\n";
    echo "SMTP Error: " . $mail->ErrorInfo . "\n";
}

echo "=== Test Complete ===\n";
?>