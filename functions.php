<?php
require_once "config.php";

function create_user($user_name, $password, $email, $role)
{
    global $link;

    $user_sql = "INSERT INTO users(username, password, email, role) VALUES ('$user_name', '$password', '$email', '$role')";

    if (mysqli_query($link, $user_sql)) {
        $user_id = mysqli_insert_id($link);
    }

    return $user_id;
}
function create_employee($user_name, $password, $email, $role, $department_id, $phone, $job_title)
{
    global $link;

    $user_id = create_user($user_name, $password, $email, $role);

    $employee_sql = "INSERT INTO employees(user_id, department_id, phone, job_title) VALUES ('$user_id', '$department_id', '$phone', '$job_title')";

    if (mysqli_query($link, $employee_sql)) {
        echo json_encode("Employee created successfully");
    } else {
        echo json_encode("ERROR_: creating employee");
    }

    mysqli_close($link);
}
function create_manager($user_name, $password, $email, $role, $department_id)
{
    global $link;

    $user_id = create_user($user_name, $password, $email, $role);
    $manager_sql = "INSERT INTO managers(user_id, department_id) VALUES ('$user_id', '$department_id')";
    if (mysqli_query($link, $manager_sql)) {
        echo json_encode("Manager created successfully");
    } else {
        echo json_encode("ERROR_ creating manager");
    }
    mysqli_close($link);
}
function create_admin($user_name, $password, $email, $role)
{
    global $link;
    $user_id = create_user($user_name, $password, $email, $role);
    $admin_sql = "INSERT INTO admin(user_id) VALUES ('$user_id')";
    if (mysqli_query($link, $admin_sql)) {
        echo json_encode("Admin created successfully");
    } else {
        echo json_encode("ERROR_ creating admin");
    }
    mysqli_close($link);
}
function fetch_user()
{
    global $link;
    mysqli_close($link);
}
function fetchEmployee()
{
    global $link;
    $sql = "SELECT employees.employee_id, users.username, users.email, role FROM users INNER JOIN employees ON users.user_id = employees.user_id";
    $result = mysqli_query($link, $sql);
    $employees = [];
    while($row = mysqli_fetch_assoc($result)) {
        $employees[] = $row;
    }
    mysqli_close($link);
    return $employees;
}

// DEPARTMENT CRUDS
// CREATE DEPARTMENT
function createDepartment($creator_id, $department_name)
{
    global $link;
    $sql = "INSERT INTO departments (name, created_by) VALUES ('{$department_name}', '{$creator_id}')";
    if ($result = mysqli_query($link, $sql)) {
        echo json_encode("Department created successfully");
    } else {
        echo json_encode("ERROR_ creating department");
    }
    mysqli_close($link);
}
// READ DEPARTMENT
function fetchDepartment()
{
    global $link;
    $sql = 'SELECT department_id AS `key`, name FROM departments';
    $result = mysqli_query($link, $sql);
    $resources = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $resources[] = $row;
    }
    mysqli_close($link);
    return json_encode($resources);
}

// EDIT DEPARTMENT
function editDepartment($department_id, $department_name, $logged_in_user_id, $date_modified)
{
    global $link;
    $sql = "UPDATE departments SET name = '{$department_name}', modified_by = '{$logged_in_user_id}', modified = '{$date_modified}' WHERE department_id = '{$department_id}'";
    if ($result = mysqli_query($link, $sql)) {
        echo json_encode("Department edited successfully");
    } else {
        echo json_encode("Error editing department");
    }
    mysqli_close($link);
}

// DELETE DEPARTMENT
function deleteDepartment($id)
{
    global $link;
    $sql = "DELETE FROM departments WHERE department_id = '{$id}'";
    if ($result = mysqli_query($link, $sql)) {
        echo json_encode("Deleted successfully");
    } else {
        echo json_encode("Error deleting department");
    }
    mysqli_close($link);
}


// LOGIN USERS
function loginUser($user_name)
{
    global $link;
    $sql = "SELECT user_id, username, password, role FROM users WHERE username = '{$user_name}'";
    $result = mysqli_query($link, $sql);

    $res = [];

    if (mysqli_num_rows($result) > 0) {
        $user = mysqli_fetch_assoc($result);
        $res[] = $user;
    } else {
        echo json_encode("Error fetching user");
    }
    mysqli_close($link);
    return $user;
}

// FETCH USERS
function fetchUsers()
{
    global $link;
    $sql = "SELECT user_id, username, email, role FROM Users";
    $result = mysqli_query($link, $sql);
    $resources = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $resources[] = $row;
    }
    mysqli_close($link);
    return $resources;
}

// FETCH MANAGERS
function fetchManagers()
{
    global $link;
    $sql = "SELECT Users.username, Users.email, Users.role, Managers.manager_id, Departments.name AS department_name FROM ((Users INNER JOIN Managers ON Users.user_id = Managers.user_id) INNER JOIN Departments ON Managers.department_id = Departments.department_id)";
    $result = mysqli_query($link, $sql);
    $resources = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $resources[] = $row;
    }
    mysqli_close($link);
    return $resources;
}

// SALARIES CRUDS
// CREATE SALARY
function createSalary($employee_id, $salary_amount, $creator_id)
{
    global $link;
    $sql = "INSERT INTO salary (employee_id, salary_amount, created_by) VALUES ('{$employee_id}', '{$salary_amount}', '{$creator_id}')";
    if ($result = mysqli_query($link, $sql)) {
        echo json_encode("Salary details created successfully");
    } else {
        echo json_encode("ERROR_ creating salary");
    }
    mysqli_close($link);
}

// READ SALARY
function readSalaryDetails()
{
    global $link;
    // getting the name, role, salary
    $sql = "SELECT salary.salary_id, users.username, users.role, salary.salary_amount FROM ((employees INNER JOIN salary ON employees.employee_id = salary.employee_id) INNER JOIN users ON employees.user_id = users.user_id)";
    $results = mysqli_query($link, $sql);
    $salaryDetails = [];
    while ($row = mysqli_fetch_assoc($results)) {
        $salaryDetails[] = $row;
    }
    mysqli_close($link);
    return $salaryDetails;
}

// EDIT SALARY
function updateSalary($salary_id, $salary_amount, $modified_by)
{
    global $link;
    $date_modified = date("Y-m-d H:i:s");
    $sql = "UPDATE salary SET salary_amount = '{$salary_amount}', modified_by = '{$modified_by}', modified = '{$date_modified}' WHERE salary_id = '{$salary_id}'";
    if ($result = mysqli_query($link, $sql)) {
        echo json_encode("Salary updates successfully");
    } else {
        echo json_encode("ERROR_ updating salary details");
    }
    mysqli_close($link);
}

// DELETE SALARY
function deleteSalaryRecord($salary_id)
{
    global $link;
    $sql = "DELETE FROM salary WHERE salary_id = '{$salary_id}'";
    if ($result = mysqli_query($link, $sql)) {
        echo json_encode("Salary record deleted successfully");
    } else {
        echo json_encode("ERROR_ deleting salary record");
    }
    mysqli_close($link);
}

// ATTENDANCE CRUDS
function createAttendance($employee_id, $creator_id, $date, $status)
{
    global $link;
    $sql = "INSERT INTO attendance (employee_id, created_by, date, status) VALUES ('{$employee_id}', '{$creator_id}', '{$date}', '{$status}')";
    if ($result = mysqli_query($link, $sql)) {
        echo json_encode("Attendance Marked");
    } else {
        echo json_encode("ERROR_ Creating attendance");
    }
    mysqli_close($link);
}

function readAttendance()
{
    global $link;
    $sql = "SELECT * FROM attendance";
    $result = mysqli_query($link, $sql);
    $attendanceArray = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $attendanceArray[] = $row;
    }
    mysqli_close($link);
    return $attendanceArray;
}
function editAttendance($id)
{
    global $link;
    mysqli_close($link);
}
function deleteAttendance($id)
{
    global $link;
    $sql = "DELETE FROM attendance WHERE attendance_id = '{$id}'";
    if ($result = mysqli_query($link, $sql)) {
        echo json_encode("Deleted attendance successfully");
    } else {
        echo json_encode("ERROR_ Deleting attendance");
    }
    mysqli_close($link);
}

// LEAVE REQUEST CRUDS
// CREATE LEAVETABLE
function createLeaveRequest($leaveType, $employee_id, $start_date, $end_date, $reason, $created_by) {
    global $link;
    $sql = "INSERT INTO leaverequest (employee_id, leave_type, start_date, end_date, reason, created_by) VALUES ('{$employee_id}', '{$leaveType}', '{$start_date}', '{$end_date}', '{$reason}', '{$created_by}')";
    if($results = mysqli_query($link, $sql)) {
        echo json_encode("Leave created successfully");
    } else {
        echo json_decode("ERROR_ creating leave");
    }
    mysqli_close($link);
}
function readLeaveRequest() {
    global $link;
    $sql = "SELECT leaverequest.request_id, users.username, leaverequest.leave_type, leaverequest.start_date, leaverequest.end_date  FROM ((leaverequest INNER JOIN employees ON leaverequest.employee_id = employees.employee_id) INNER JOIN users ON employees.user_id = users.user_id)";
    $results = mysqli_query($link, $sql);
    $resources = [];
    while($row = mysqli_fetch_assoc($results)) {
        $resources[] = $row;
    }
    mysqli_close($link);
    return $resources;
}

// JOBS CRUDS
// CREATE JOBS
function createJobs() {}
function readJobs() {
    global $link;
    $sql = "SELECT * FROM jobs";
    $results = mysqli_query($link, $sql);
    $jobs = [];
    while($row = mysqli_fetch_assoc($results)) {
        $jobs[] = $row;
    }
    mysqli_close($link);

    return $jobs;
}
function deleteJobs($id) {
    global $link;
    $sql = "DELETE FROM jobs WHERE job_id = '{$id}' ";
    if($result = mysqli_query( $link, $sql)) {
        echo json_encode("Deleted successfully");
    } else {
        echo json_encode("ERROR_ DELETING");
    }
    mysqli_close($link);
}

// EDIT JOBS
function editJobs($id, $title, $description, $modified_by) {
    global $link;
    $modified_date = date("Y-m-d H:i:s");
    // $sql = "UPDATE jobs SET title='{$title}', description='{$description}', modified_by='{$modified_by}', modified='{$modified_date}' WHERE job_id='{$id}' ";
    $sql = "UPDATE jobs SET title='$title', description='$description', modified='$modified_date', modified_by='$modified_by' WHERE job_id='$id' ";
    $result = mysqli_query($link, $sql);
    if($result) {
        echo json_encode("Job edited successfully");
    } else {
        echo json_encode("ERROR_: editing jobs");
    }

    mysqli_close($link);
}
function readById($id) {}


?>