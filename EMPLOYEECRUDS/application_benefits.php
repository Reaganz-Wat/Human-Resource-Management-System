<?php

require_once "../functions.php";

$data = getData();

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    if(checkParameters($data)) {
        $user_id = $data['user_id'];
        $employee_id = getEmployeeIdFromUserId($user_id)['employee_id'];
        $benefit_id = $data['benefit_id'];
        $result = applyForBenefit($employee_id, $benefit_id, $user_id);
        echo json_encode($result);
    } else {
        echo json_encode(['message' => 'Parameters is required']);
    }
}

function checkParameters(array $parameters) {
    if(isset($parameters['user_id']) && isset($parameters['benefit_id'])) {
        return true;
    } else {
        return false;
    }
}

function getData() {
    return json_decode(file_get_contents('php://input'), true);
}

?>