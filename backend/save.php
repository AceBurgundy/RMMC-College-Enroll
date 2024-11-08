<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://127.0.0.1:5500');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

function logger($message)
{
  $logFile = 'database_log.txt';
  $doesntExist = !file_exists(filename: $logFile);

  if ($doesntExist) {
    $handle = fopen($logFile, 'w');

    if (!$handle) {
      die("Error creating log file");
    }

    fclose($handle);
  }

  // Append the message to the file
  $handle = fopen($logFile, 'a');

  if (!$handle) {
    die("Error opening log file");
  }

  fwrite($handle, $message . "\n");
  fclose($handle);
}

$servername = "localhost";
$username = "root";
$password = "";
$database = "enroll";

// Create connection without database
$connection = new mysqli($servername, $username, $password);

if ($connection->connect_error) {
  die("Connection failed: " . $connection->connect_error);
}

// Create the database if not exist
$sql = "SHOW DATABASES LIKE '$database'";
$result = $connection->query($sql);

if ($result->num_rows <= 0) {
  logger(
    $connection->query("CREATE DATABASE $database") === TRUE
    ? "Database created successfully"
    : "Error creating database: $connection->error"
  );
}

// Use the created database
$connection->select_db($database);

if ($connection->connect_error) {
  logger("Connection failed: $connection->connect_error");
}

// Create students table if it doesn't exist
$sql = "SHOW TABLES LIKE 'students'";
$result = $connection->query($sql);

if ($result->num_rows == 0) {
  $sql = "CREATE TABLE IF NOT EXISTS students (
      id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
      id_number INT(10) DEFAULT NULL,
      entrance_exam_result VARCHAR(255) DEFAULT NULL,
      given_name VARCHAR(100) NOT NULL,
      middle_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      citizenship VARCHAR(100) DEFAULT NULL,
      complete_address VARCHAR(255) DEFAULT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      birth_place VARCHAR(255) DEFAULT NULL,
      contact_number VARCHAR(20) DEFAULT NULL,
      profile_image TEXT DEFAULT NULL
      elementary_school_name VARCHAR(255) DEFAULT NULL,
      elementary_school_section VARCHAR(255) DEFAULT NULL,
      junior_high_school_name VARCHAR(255) DEFAULT NULL,
      junior_high_school_address VARCHAR(255) DEFAULT NULL,
      senior_high_school_name VARCHAR(255) DEFAULT NULL,
      senior_high_school_address VARCHAR(255) DEFAULT NULL,
      parent_full_name VARCHAR(255) DEFAULT NULL,
      parent_contact_number VARCHAR(20) DEFAULT NULL,
      parent_address VARCHAR(255) DEFAULT NULL,
      parent_relationship VARCHAR(100) DEFAULT NULL,
      guardian_full_name VARCHAR(255) DEFAULT NULL,
      guardian_contact_number VARCHAR(20) DEFAULT NULL,
      guardian_address VARCHAR(255) DEFAULT NULL,
      age INT(11) DEFAULT NULL,
      height FLOAT DEFAULT NULL,
      weight FLOAT DEFAULT NULL,
      congenital_diseases VARCHAR(255) DEFAULT NULL,
      date_diagnosed DATE DEFAULT NULL,
      hospitalization_date_1 DATE DEFAULT NULL,
      hospitalization_date_2 DATE DEFAULT NULL,
      allergies VARCHAR(255) DEFAULT NULL,
      medication_1 VARCHAR(255) DEFAULT NULL,
      medication_2 VARCHAR(255) DEFAULT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci";

  logger(
    $connection->query($sql) === TRUE
    ? "Table students created successfully"
    : "Error creating table: $connection->error"
  );
}

$connection->close();

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
