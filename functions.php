<?php
require_once "config.php";

function create_user($user_name, $password, $email, $role) {
    global $link;

    $user_sql = "INSERT INTO users(username, password, email, role) VALUES ('$user_name', '$password', '$email', '$role')";

    if(mysqli_query($link, $user_sql)) {
        $user_id = mysqli_insert_id($link);
    }

    return $user_id;

}
function create_employee($user_name, $password, $email, $role, $department_id, $phone, $job_title) {
    global $link;

    $user_id = create_user($user_name, $password, $email, $role);

    $employee_sql = "INSERT INTO employees(user_id, department_id, phone, job_title) VALUES ('$user_id', '$department_id', '$phone', '$job_title')";

    if(mysqli_query($link, $employee_sql)) {
        echo json_encode("Employee created successfully");
    } else {
        echo json_encode("ERROR_: creating employee");
    }

    mysqli_close($link);
}
function create_manager($user_name, $password, $email, $role, $department_id) {
    global $link;

    $user_id = create_user($user_name, $password, $email, $role);
    $manager_sql = "INSERT INTO managers(user_id, department_id) VALUES ('$user_id', '$department_id')";
    if(mysqli_query($link, $manager_sql)) {
        echo json_encode("Manager created successfully");
    } else {
        echo json_encode("ERROR_ creating manager");
    }
    mysqli_close($link);
}
function create_admin($user_name, $password, $email, $role) {
    global $link;
    $user_id = create_user($user_name, $password, $email, $role);
    $admin_sql = "INSERT INTO admin(user_id) VALUES ('$user_id')";
    if(mysqli_query($link, $admin_sql)) {
        echo json_encode("Admin created successfully");
    } else {
        echo json_encode("ERROR_ creating admin");
    }
    mysqli_close($link);
}
function fetch_user() {
    global $link;
    mysqli_close($link);
}

?>