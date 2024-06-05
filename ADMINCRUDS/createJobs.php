<?php

require_once "../functions.php";

$jsonData = file_get_contents("php://input");
$data = json_decode($jsonData, true);

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    if(
        isset($data['title']) &&
        isset($data['description']) &&
        isset($data['salary_range'])
        ) {

        $title = $data['title'];
        $description = $data['description'];
        $salary_range = $data['salary_range'];

        createJobs($title, $description, $salary_range);
    } else {
        echo json_encode(array('error' => 'Parameter required'));
    }
    
}


?>