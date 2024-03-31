<?php

require_once "../functions.php";

// $jsonData = file_get_contents('php://input');
// $_POST = json_decode($jsonData, true);

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    if(isset($_POST['salary_id'])) {
        $id = $_POST['salary_id'];
        deleteSalaryRecord($id);
    } else {
        json_encode("Parameter not set");
    }
}

?>