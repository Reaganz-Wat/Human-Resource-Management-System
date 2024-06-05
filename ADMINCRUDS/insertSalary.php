<?php

require_once "../functions.php";

$jsonData = file_get_contents("php://input");
$data = json_decode($jsonData, true);

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    if(
        isset($data['user_id']) &&
        isset($data['salary']) &&
        isset($data['creator_id'])
    ) {
        $user_id = $data['user_id'];
        $salary_amount = $data['salary'];
        $creator_id = $data['creator_id'];
        $employee_id = getEmployeeIdFromUserId ($user_id)['employee_id'];
        createSalary($employee_id, $salary_amount, $creator_id);
    } else {
        json_encode("Parameters not set");
    }
}

?>