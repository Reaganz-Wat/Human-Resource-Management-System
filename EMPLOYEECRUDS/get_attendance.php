<?php

require_once "../functions.php";
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        $employee_id = getEmployeeIdFromUserId ($id)['employee_id'];
        echo json_encode(fetchAttendance($employee_id));
    } else {
        echo json_encode(['message' => 'Parameter is required']);
    }
}

// use this for POST request where the body of the request is given, and required
// function checkParameters(array $parameters) {
//     if (isset($parameters['id'])) {
//         return true;
//     } else {
//         return false;
//     }
// }

?>