<?php

require_once "../functions.php";
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_GET['id'])) {
        $user_id = $_GET['id'];
        $id = getEmployeeIdFromUserId ($user_id)['employee_id'];
        echo json_encode(getLeaveById($id));
    } else {
        echo json_encode(['message' => 'Parameter is required']);
    }
}
?>