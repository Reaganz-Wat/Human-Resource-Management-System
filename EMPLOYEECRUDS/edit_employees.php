<?php

require_once "../functions.php";
header("Content-Type: application/json");

// get the json data from the input
$data = parseData();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {


    if (checkParameters($data)) {

        $response = editEmployee($data);
        header($response['status_code_header']);

        if ($response['body']) {
            echo $response['body'];
        }
    } else {
        echo json_encode(['error' => 'Parameters not set']);
    }
}

// check if the parameters are valid
function checkParameters(array $parameters)
{
    if (
        isset($parameters['username']) &&
        isset($parameters['email']) &&
        isset($parameters['role']) &&
        isset($parameters['phone']) &&
        isset($parameters['id'])
    ) {
        return true;
    } else {
        return false;
    }
}

function parseData() {
    return json_decode(file_get_contents("php://input"), true);
}

?>