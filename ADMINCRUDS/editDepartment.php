<?php

// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
// header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once "../functions.php";

$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

if($_SERVER['REQUEST_METHOD'] == 'PUT') {
    if(
        isset($data['id']) &&
        isset($data['name']) &&
        isset($data['logged_in_user_id'])
    ) {
        $id = $data['id'];
        $name = $data['name'];
        $logged_in_user_id = $data['logged_in_user_id'];
        $date_modified = date("Y-m-d H:i:s");

        editDepartment($id, $name, $logged_in_user_id, $date_modified);

    } else {
        json_encode("Parameters not set");
    }
}


?>