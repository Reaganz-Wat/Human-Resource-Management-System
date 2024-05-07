<?php
require_once "../functions.php";

$jsonData = file_get_contents("php://input");
$data = json_decode($jsonData, true);


// CREATE ATTENDANCE
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (
        isset($data['employee_id']) &&
        isset($data['creator_id']) &&
        isset($data['date']) &&
        isset($data['status'])
        ) {
        $employee_id = $data['employee_id'];
        $creator_id = $data['creator_id'];
        $date = $data['date'];
        $status = $data['status'];

        createAttendance($employee_id, $creator_id, $date, $status);
    
    } else {
        echo json_encode("Parameters not set");
    }
}

// FETCH ALL ATTENDANCE
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    echo json_encode(readAttendance());
}

// UPDATE ATTENDANCE
if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    parse_str(file_get_contents('php://input'), $_PUT);
    echo "Employee id: " . $_PUT['date'];
}

// DELETE ATTENDANCE
if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    // echo "<pre>";
    // print_r($_SERVER);
    // echo "</pre>";
}

// echo "<pre>";
// print_r($_SERVER);
// echo "</pre>";
