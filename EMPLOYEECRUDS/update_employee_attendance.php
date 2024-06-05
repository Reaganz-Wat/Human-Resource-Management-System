<?php

require_once "../functions.php";

$data = getData ();
//error_log(print_r($data, true));

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    if (checkParameters(($data))) {
        // do something
        $id = $data['id'];
        $result = updateLeaveRequest($id, $data);
        //echo json_encode(array(["id" => $id, "status" => $data['status']]));
    } else {
        echo json_encode(["message" => "Parameters must be specified"]);
    }
}

function checkParameters(array $parameters) {
    if(isset($parameters['id']) && isset($parameters['status'])) {
        return true;
    } else {
        return false;
    }
}

function getData () {
    return json_decode(file_get_contents("php://input"), true);
}

?>