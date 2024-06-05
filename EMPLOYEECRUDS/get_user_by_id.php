<?php

require_once "../functions.php";
header("Content-Type: application/json");


if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_GET['id'])) {

        $id = $_GET['id'];

        echo json_encode(getUserById($id));

    } else {
        echo json_encode(["error" => "Parameter not set", "data" => $data]);
    }
}


?>