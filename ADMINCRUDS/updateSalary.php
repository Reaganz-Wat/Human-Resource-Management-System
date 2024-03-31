<?php

require_once "../functions.php";

// $jsonData = file_get_contents('php://input');
// $_POST = json_decode($jsonData, true);

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    if(
        isset($_POST['salary_id']) &&
        isset($_POST['amount']) &&
        isset($_POST['modified_by'])
    ) {

    $salary_id = $_POST['salary_id'];
    $salary_amount = $_POST['amount'];
    $modified_by = $_POST['modified_by'];

    updateSalary($salary_id, $salary_amount, $modified_by);

    } else {
        echo json_encode("Parameters not set");
    }
}

?>