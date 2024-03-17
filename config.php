<?php
define("DB_SERVER", "localhost");
define("DB_USERNAME", "root");
define("DB_PASSWORD", "");
define("DB_DATABASE_NAME", "human_resource_system");

// Initiate the connection to the database
$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE_NAME);

// Check if connection is established
if ($link === false) {
    die ("ERROR_: " . mysqli_connect_error());
}

?>