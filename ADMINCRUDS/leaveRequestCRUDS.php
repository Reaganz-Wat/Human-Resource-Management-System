<?php

require_once "../functions.php";

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    if(
        isset($_POST['leavetype']) &&
        isset($_POST['employee_id']) &&
        isset($_POST['start_date']) &&
        isset($_POST['end_date']) &&
        isset($_POST['reason']) &&
        isset($_POST['created_by'])
        ) {

        $leaveType = $_POST['leavetype'];
        $employee_id = $_POST['employee_id'];
        $start_date = $_POST['start_date'];
        $end_date = $_POST['end_date'];
        $reason = $_POST['reason'];
        $created_by = $_POST['created_by'];

        createLeaveRequest($leaveType, $employee_id, $start_date, $end_date, $reason, $created_by);

    } else {
        echo json_encode("Parameters not set");
    }
}


if($_SERVER['REQUEST_METHOD'] == 'GET') {
    echo json_encode(readLeaveRequest());
}

?>