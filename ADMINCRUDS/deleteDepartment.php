<?php

require_once "../functions.php";

$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    if(isset($data['id'])) {
        $id = $data['id'];
        deleteDepartment($id);
    } else {
        json_encode("Parameter not set");
    }
}

?>