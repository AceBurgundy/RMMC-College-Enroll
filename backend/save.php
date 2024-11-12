<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://127.0.0.1:5500');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

try {
  // Database connection
  $pdo = new PDO('mysql:host=localhost;dbname=enroll', 'root', '');
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  function formatString($string)
  {
    return ucwords(str_replace('_', ' ', $string));
  }

  // Check for required fields
  foreach (['given_name', 'middle_name', 'last_name', 'email'] as $field) {
    if (empty($_POST[$field])) {
      echo json_encode(['success' => false, 'message' => formatString($field) . " is required"]);
      exit;
    }
  }

  // Check if email already exists
  $statement = $pdo->prepare("SELECT COUNT(*) FROM students WHERE email = :email");
  $statement->execute(['email' => $_POST['email']]);
  if ($statement->fetchColumn() > 0) {
    echo json_encode(['success' => false, 'message' => "Email already exists."]);
    exit;
  }

  // Generate new id_number
  $statement = $pdo->query("SELECT id_number FROM students ORDER BY id DESC LIMIT 1");
  $lastIdNumber = $statement->fetchColumn();
  $newIdNumber = $lastIdNumber ? $lastIdNumber + 1 : date('ym') . "00000";

  // Process profile image if present
  if (!empty($_POST['profile_image'])) {
    // Extract format from the base64 string
    preg_match('/^data:image\/(.*?);base64,/', $_POST['profile_image'], $format);
    $imageFormat = $format[1] ?? 'jpeg';

    // Remove the base64 prefix from the image data
    $imageData = preg_replace('/^data:image\/.*?;base64,/', '', $_POST['profile_image']);
    $decodedImageData = base64_decode($imageData);

    // Save the image with the correct format
    $imagePath = __DIR__ . "/pictures/{$newIdNumber}.{$imageFormat}";
    if (!file_exists(__DIR__ . "/pictures")) {
      mkdir(__DIR__ . "/pictures", 0755, true);
    }

    file_put_contents($imagePath, $decodedImageData);

    // Remove 'profile_image' from POST data to avoid saving it in the database
    unset($_POST['profile_image']);
  }

  // Insert data without id_number in $_POST
  $columns = array_keys($_POST);
  $placeholders = array_map(fn($column) => ":$column", $columns);

  $statement = $pdo->prepare(
    "
      INSERT
      INTO students (id_number, " . implode(", ", $columns) . ")
      VALUES (:id_number, " . implode(", ", $placeholders) . ")
    "
  );

  // Execute with id_number separately
  $data = array_merge($_POST, ['id_number' => $newIdNumber]);
  $statement->execute($data);

  echo json_encode(['success' => true, 'message' => $newIdNumber]);

} catch (PDOException $error) {
  echo json_encode(['success' => false, 'message' => "Database error: " . $error->getMessage()]);
} catch (Exception $error) {
  echo json_encode(['success' => false, 'message' => "Error: " . $error->getMessage()]);
}
