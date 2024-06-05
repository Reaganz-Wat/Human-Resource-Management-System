<?php

require_once "../functions.php";

$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (
        isset($data['leavetype']) &&
        isset($data['start_date']) &&
        isset($data['end_date']) &&
        isset($data['reason']) &&
        isset($data['created_by'])
    ) {

        $user_id = $data['created_by'];
        $leaveType = $data['leavetype'];
        $employee_id = getEmployeeIdFromUserId($user_id)['employee_id'];
        $start_date = $data['start_date'];
        $end_date = $data['end_date'];
        $reason = $data['reason'];

        createLeaveRequest($leaveType, $employee_id, $start_date, $end_date, $reason, $user_id);
    } else {
        echo json_encode("Parameters not set");
    }
}
