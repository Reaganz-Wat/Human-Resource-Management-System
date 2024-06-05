<?php

require_once "../functions.php";

$data = getData();

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    if(checkParameter($data)) {

        $result = editBenefit($data);
        echo json_encode($result);
    } else {
        echo json_encode(['message' => 'Parameters is required']);
    }
}


function checkParameter(array $parameters) {
    if(isset($parameters['id']) && isset($parameters['benefit']) && isset($parameters['description']) && isset($parameters['modified_by'])) {
        return true;
    } else {
        return false;
    }
}

function getData() {
    return json_decode(file_get_contents("php://input"), true);
}
?>