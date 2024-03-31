<?php
require_once "../functions.php";

$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($data['username'])) {
        $username = $data['username'];
        $user = loginUser($username);
        if ($user) {
            echo json_encode($user);
        } else {
            echo json_encode(array("error" => "User not found"));
        }
    } else {
        echo json_encode(array("error" => "Parameter 'username' not set"));
    }
}
?>


