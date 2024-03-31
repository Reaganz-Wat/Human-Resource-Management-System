<?php

require_once "../functions.php";

$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    if(
        isset($data['salary_id']) &&
        isset($data['amount']) &&
        isset($data['modified_by'])
    ) {

    $salary_id = $data['salary_id'];
    $salary_amount = $data['amount'];
    $modified_by = $data['modified_by'];

    updateSalary($salary_id, $salary_amount, $modified_by);

    } else {
        echo json_encode("Parameters not set");
    }
}

?>