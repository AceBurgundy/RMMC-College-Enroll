<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://127.0.0.1:5500');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

try {
  // Database connection
  $pdo = new PDO('mysql:host=localhost;dbname=enroll', 'root', '');
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  // Check if the email is provided
  if (!isset($_POST['email'])) {
    echo json_encode([
      'success' => false,
      'message' => "Email is required."
    ]);

    exit;
  }

  $email = $_POST['email'];

  // Generate new id_number
  $lastIdNumber = $pdo
      ->query("SELECT id_number FROM students ORDER BY id DESC LIMIT 1")
      ->fetchColumn();

  $newIdNumber = $lastIdNumber
    ? $lastIdNumber + 1
    : date('ym') . "00000";

  $idHasBeenUpdated = $pdo
      ->prepare("UPDATE students SET id_number = :newIdNumber WHERE email = :email")
      ->execute([
          ':newIdNumber' => $newIdNumber,
          ':email' => $email
        ])
      ->rowCount() > 0;

  if ($idHasBeenUpdated) {
    echo json_encode([
      'success' => true,
      'message' => "$email is now enrolled. ID number is $newIdNumber"
    ]);
  } else {
    echo json_encode([
      'success' => false,
      'message' => "No student found with the email: $email."
    ]);
  }

} catch (PDOException $error) {
  echo json_encode([
    'success' => false,
    'message' => "Database error: {$error->getMessage()}"
  ]);

} catch (Exception $error) {
  echo json_encode([
    'success' => false,
    'message' => "Error: {$error->getMessage()}"
  ]);

}

$pdo = null;
