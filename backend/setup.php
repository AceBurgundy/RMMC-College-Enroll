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

$connection = new mysqli($servername, $username, $password);
if ($connection->connect_error)
  die("Connection failed: " . $connection->connect_error);

// Create the database if it doesn't exist
$sql = "SHOW DATABASES LIKE '$database'";
$result = $connection->query($sql);

if ($result->num_rows <= 0) {
  logger(
    $connection->query("CREATE DATABASE $database") === TRUE
    ? "Database created successfully"
    : "Error creating database: $connection->error"
  );
}

$connection->select_db($database);

// Create the students table if it doesn't exist
$sql = "SHOW TABLES LIKE 'students'";
$result = $connection->query($sql);

if ($result->num_rows == 0) {
  $sql = "CREATE TABLE IF NOT EXISTS students (
            id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
            id_number INT(10) DEFAULT NULL
          )";

  logger(
    $connection->query($sql) === TRUE
    ? "Table students created successfully"
    : "Error creating table: $connection->error"
  );
}

// Get JSON input
$data = json_decode(file_get_contents('php://input'), true);
$columns = $data['columns'] ?? [];

if (empty($columns)) {
  echo json_encode(['success' => false, 'message' => 'No columns to process.']);
  exit;
}

// Loop through each column name
foreach ($columns as $column) {
  $sql = "SHOW COLUMNS FROM students LIKE `$column`";

  if ($connection->query($sql)->num_rows == 0) {
    // Create missing column
    $alterTableSQL = "ALTER TABLE students ADD COLUMN `$column` TEXT DEFAULT NULL";

    logger(
      $connection->query($alterTableSQL) === TRUE
      ? "Column `$column` added to students table."
      : "Error adding column $column: $connection->error"
    );
  }
}

echo json_encode(
  [
    'success' => true,
    'message' => 'Columns processed successfully.'
  ]
);

$connection->close();
