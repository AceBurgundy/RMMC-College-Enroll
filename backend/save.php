<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://127.0.0.1:5500');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

try {
  // Database connection
  $pdo = new PDO('mysql:host=localhost;dbname=enroll', 'root', '');
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  // Converts lower cased snake case to Sentence cese
  // Ex: middle_name to Middle name
  function formatString($string)
  {
    return ucwords(str_replace('_', ' ', $string));
  }

  // Check for required fields
  foreach (['given_name', 'middle_name', 'last_name', 'email'] as $field) {
    if (empty($_POST[$field])) {
      echo json_encode([
        'success' => false,
        'message' => formatString($field) . " is required"
      ]);

      exit;
    }
  }

  $emailExists = $pdo
      ->prepare("SELECT COUNT(*) FROM students WHERE email = :email")
      ->execute(['email' => $_POST['email']])
      ->fetchColumn() > 0;

  if ($emailExists) {
    echo json_encode([
      'success' => false,
      'message' => "Email already exists."
    ]);

    exit;
  }

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

  unset($_POST['profile_image']);

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
  $data = array_merge($_POST, ['id_number' => null]);
  $statement->execute($data);

  echo json_encode([
    'success' => true,
    'email' => $_POST['email']
  ]);

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
