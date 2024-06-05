<?php
require_once "../functions.php";

$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($data['username']) && isset($data['password'])) {

        $username = $data['username'];
        $password = $data['password'];

        login($username, $password);

    } else {
        echo json_encode(array("error" => "Parameter username not set"));
    }
}
?>