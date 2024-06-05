<?php

require_once "../functions.php";

$data = getDataFromJson();


if($_SERVER['REQUEST_METHOD'] == 'POST') {
    if(checkParameters($data)) {
        $response = createBenefitPrograms ($data);
        echo json_encode($response);
    } else {
        echo json_encode(["message" => "Invalid Parameters"]);
    }
}

function checkParameters($params) {
    if($params['benefit'] && $params['description']) {
        return true;
    } else {
        return false;
    }
}

function getDataFromJson () {
    $data = json_decode(file_get_contents('php://input'), true);
    return $data;
}

?>