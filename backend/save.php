<?php
require_once "setup.php";

try {
  // Database connection
  $pdo = new PDO('mysql:host=localhost;dbname=enroll', 'root', '');
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  // Receive and validate POST data
  $requiredFields = ['given_name', 'middle_name', 'last_name', 'email'];
  $data = [];

  foreach ($_POST as $key => $value) {
    $data[$key] = trim($value);
  }

  foreach ($requiredFields as $field) {
    if (empty($data[$field])) {
      echo json_encode(['success' => false, 'message' => "The field $field is required."]);
      exit;
    }
  }

  // Check if email already exists
  $stmt = $pdo->prepare("SELECT COUNT(*) FROM students WHERE email = :email");
  $stmt->execute(['email' => $data['email']]);
  if ($stmt->fetchColumn() > 0) {
    echo json_encode(['success' => false, 'message' => "Email already exists."]);
    exit;
  }

  // Generate new id_number
  $stmt = $pdo->query("SELECT id_number FROM students ORDER BY id DESC LIMIT 1");
  $lastIdNumber = $stmt->fetchColumn();
  $newIdNumber = $lastIdNumber ? $lastIdNumber + 1 : date('ym') . "00000";

  // Prepare SQL insert statement using prepared statements to avoid SQL injection
  $columns = array_keys($data);
  $placeholders = array_map(fn($column) => ":$column", $columns);

  $sql = "INSERT INTO students (id_number, " . implode(", ", $columns) . ")
            VALUES (:id_number, " . implode(", ", $placeholders) . ")";

  $stmt = $pdo->prepare($sql);
  $data['id_number'] = $newIdNumber;
  $stmt->execute($data);

  // Return success response with id_number
  echo json_encode(['success' => true, 'message' => $newIdNumber]);

} catch (PDOException $e) {
  echo json_encode(['success' => false, 'message' => "Database error: " . $e->getMessage()]);
} catch (Exception $e) {
  echo json_encode(['success' => false, 'message' => "Error: " . $e->getMessage()]);
}
