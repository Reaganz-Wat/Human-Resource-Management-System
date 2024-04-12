<?php
require_once "../functions.php";

// CREATE ATTENDANCE
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['employee_id']) && isset($_POST['creator_id']) && isset($_POST['date'])) {
        $employee_id = $_POST['employee_id'];
        $creator_id = $_POST['creator_id'];
        $date = $_POST['date'];
        createAttendance($employee_id, $creator_id, $date);
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
