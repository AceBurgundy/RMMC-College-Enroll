<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://127.0.0.1:5500');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

function logger($message)
{
  $logFileName = 'database_log.txt';
  $logFileDoesNotExist = !file_exists($logFileName);

  if ($logFileDoesNotExist) {
    $handle = fopen($logFileName, 'w');
    if (!$handle)
      die("Error creating log file");
    fclose($handle);
  }

  $handle = fopen($logFileName, 'a');
  if (!$handle)
    die("Error opening log file");
  fwrite($handle, "$message\n");
  fclose($handle);
}

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$database = "enroll";

// Create database and table
try {
  $pdo = new PDO("mysql:host=$servername", $username, $password);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  $noEnrollDatabaseYet = $pdo
      ->query("SHOW DATABASES LIKE '$database'")
      ->rowCount() <= 0;

  if ($noEnrollDatabaseYet) {
    $pdo->exec("CREATE DATABASE $database");
    logger("Database created successfully");
  }

  $pdo->exec("USE $database");
  $studentTableExist = $pdo
      ->query("SHOW TABLES LIKE 'students'")
      ->rowCount() == 0;

  if ($studentTableExist) {
    $pdo->exec("
      CREATE TABLE IF NOT EXISTS students (
        id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        id_number INT(10) DEFAULT NULL
      )
    ");

    logger("Table students created successfully");
  }

} catch (PDOException $error) {
  logger("Database error: " . $error->getMessage());

  echo json_encode([
    'success' => false,
    'message' => 'Database error.'
  ]);

  exit;
}

// Get JSON input
$data = json_decode(file_get_contents('php://input'), true);
$columns = $data['columns'] ?? [];

if (empty($columns)) {
  echo json_encode([
    'success' => false,
    'message' => 'No columns to process.'
  ]);

  exit;
}

try {
  foreach ($columns as $column) {
    $statement = $pdo->prepare("
      SHOW COLUMNS
      FROM students
      LIKE :column
    ");

    $statement->execute([':column' => $column]);

    if ($statement->rowCount() == 0) {
      $pdo->exec("
        ALTER TABLE students
        ADD COLUMN `$column`
        TEXT
        DEFAULT NULL
      ");

      logger("Column `$column` added to students table.");
    }
  }

  echo json_encode(
    [
      'success' => true,
      'message' => 'Columns processed successfully.'
    ]
  );

} catch (PDOException $error) {
  logger("Error: " . $error->getMessage());

  echo json_encode([
    'success' => false,
    'message' => 'Error processing columns.'
  ]);

}

$pdo = null;
