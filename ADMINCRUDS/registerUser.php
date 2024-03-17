<?php
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
// header("Access-Control-Allow-Headers: Content-Type, Authorization");

// name: fullName,
// email: email,
// password: password,
// phoneNumber: phoneNumber,
// department_id: department_id,
// job_title: title,
// role: selectedValue


require_once "../functions.php";

$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if(
        isset($data['name']) && 
        isset($data['email']) && 
        isset($data['password']) &&
        isset($data['phoneNumber']) &&
        isset($data['department_id']) &&
        isset($data['job_title']) &&
        isset($data['role'])
        ) {
        $user_name = $data['name'];
        $email = $data['email'];
        $password = $data['password'];
        $phone_number = $data['phoneNumber'];
        $department_id = $data['department_id'];
        $job_title = $data['job_title'];
        $role = $data['role'];

        if($role == "Admin") {
            create_admin($user_name, $password, $email, $role);
        } elseif ($role == "Manager") {
            create_manager($user_name, $password, $email, $role, $department_id);
        } else {
            create_employee($user_name, $password, $email, $role, $department_id, $phone_number, $job_title);
        }


    } else {
        echo json_encode("Something went wrong");
    }
}

?>