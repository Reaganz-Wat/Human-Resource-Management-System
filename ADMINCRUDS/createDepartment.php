<?php

require_once "../functions.php";

$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    if(isset($data['id']) && isset($data['department_name'])) {

        $creator_id = $data['id'];
        $department_name = $data['department_name'];

        createDepartment($creator_id, $department_name);

    } else {
        echo json_encode("Parameters not set");
    }
}

?>