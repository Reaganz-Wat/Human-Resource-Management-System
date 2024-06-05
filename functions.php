<?php
require_once "config.php";

// function create_user($user_name, $password, $email, $role)
// {
//     global $link;

//     $user_sql = "INSERT INTO users(username, password, email, role) VALUES ('$user_name', '$password', '$email', '$role')";

//     if (mysqli_query($link, $user_sql)) {
//         $user_id = mysqli_insert_id($link);
//     }

//     return $user_id;
// }

// function create_employee($user_name, $password, $email, $role, $department_id, $phone, $job_title)
// {
//     global $link;

//     $user_id = create_user($user_name, $password, $email, $role);

//     $employee_sql = "INSERT INTO employees(user_id, department_id, phone, job_title) VALUES ('$user_id', '$department_id', '$phone', '$job_title')";

//     if (mysqli_query($link, $employee_sql)) {
//         echo json_encode("Employee created successfully");
//     } else {
//         echo json_encode("ERROR_: creating employee");
//     }

//     mysqli_close($link);
// }
// function create_manager($user_name, $password, $email, $role, $department_id)
// {
//     global $link;

//     $user_id = create_user($user_name, $password, $email, $role);
//     $manager_sql = "INSERT INTO managers(user_id, department_id) VALUES ('$user_id', '$department_id')";
//     if (mysqli_query($link, $manager_sql)) {
//         echo json_encode("Manager created successfully");
//     } else {
//         echo json_encode("ERROR_ creating manager");
//     }
//     mysqli_close($link);
// }
// function create_admin($user_name, $password, $email, $role)
// {
//     global $link;
//     $user_id = create_user($user_name, $password, $email, $role);
//     $admin_sql = "INSERT INTO admin(user_id) VALUES ('$user_id')";
//     if (mysqli_query($link, $admin_sql)) {
//         echo json_encode("Admin created successfully");
//     } else {
//         echo json_encode("ERROR_ creating admin");
//     }
//     mysqli_close($link);
// }


function create_user($user_name, $password, $email, $role)
{
    global $link;

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $stmt = mysqli_prepare($link, "INSERT INTO users(username, password, email, role) VALUES (?, ?, ?, ?)");

    if ($stmt) {
        mysqli_stmt_bind_param($stmt, 'ssss', $user_name, $hashed_password, $email, $role);
        mysqli_stmt_execute($stmt);
        $user_id = mysqli_stmt_insert_id($stmt);
        mysqli_stmt_close($stmt);
        return $user_id;
    } else {
        // Log error or handle it appropriately
        return false;
    }
}

function create_employee($user_name, $password, $email, $role, $department_id, $phone, $job_title)
{
    global $link;

    $user_id = create_user($user_name, $password, $email, $role);
    if ($user_id) {
        $stmt = mysqli_prepare($link, "INSERT INTO employees(user_id, department_id, phone, job_title) VALUES (?, ?, ?, ?)");
        if ($stmt) {
            mysqli_stmt_bind_param($stmt, 'iiss', $user_id, $department_id, $phone, $job_title);
            mysqli_stmt_execute($stmt);
            if (mysqli_stmt_affected_rows($stmt) > 0) {
                echo json_encode("Employee created successfully");
            } else {
                echo json_encode("ERROR: creating employee");
            }
            mysqli_stmt_close($stmt);
        } else {
            echo json_encode("ERROR: preparing statement for employee");
        }
    } else {
        echo json_encode("ERROR: creating user");
    }
    mysqli_close($link);
}

function create_manager($user_name, $password, $email, $role, $department_id)
{
    global $link;

    $user_id = create_user($user_name, $password, $email, $role);
    if ($user_id) {
        $stmt = mysqli_prepare($link, "INSERT INTO managers(user_id, department_id) VALUES (?, ?)");
        if ($stmt) {
            mysqli_stmt_bind_param($stmt, 'ii', $user_id, $department_id);
            mysqli_stmt_execute($stmt);
            if (mysqli_stmt_affected_rows($stmt) > 0) {
                echo json_encode("Manager created successfully");
            } else {
                echo json_encode("ERROR: creating manager");
            }
            mysqli_stmt_close($stmt);
        } else {
            echo json_encode("ERROR: preparing statement for manager");
        }
    } else {
        echo json_encode("ERROR: creating user");
    }
    mysqli_close($link);
}

function create_admin($user_name, $password, $email, $role)
{
    global $link;

    $user_id = create_user($user_name, $password, $email, $role);
    if ($user_id) {
        $stmt = mysqli_prepare($link, "INSERT INTO admin(user_id) VALUES (?)");
        if ($stmt) {
            mysqli_stmt_bind_param($stmt, 'i', $user_id);
            mysqli_stmt_execute($stmt);
            if (mysqli_stmt_affected_rows($stmt) > 0) {
                echo json_encode("Admin created successfully");
            } else {
                echo json_encode("ERROR: creating admin");
            }
            mysqli_stmt_close($stmt);
        } else {
            echo json_encode("ERROR: preparing statement for admin");
        }
    } else {
        echo json_encode("ERROR: creating user");
    }
    mysqli_close($link);
}

function login($username, $password)
{
    global $link;

    // Prepare an SQL statement to prevent SQL injection
    $stmt = mysqli_prepare($link, "SELECT user_id, username, password, role FROM users WHERE username = ?");

    if ($stmt) {
        // Bind the parameters
        mysqli_stmt_bind_param($stmt, 's', $username);

        // Execute the statement
        mysqli_stmt_execute($stmt);

        // Bind the result variables
        mysqli_stmt_bind_result($stmt, $user_id, $db_username, $db_password, $role);

        // Fetch the result
        if (mysqli_stmt_fetch($stmt)) {
            // Verify the password
            if (password_verify($password, $db_password)) {
                // Password is correct, return user data
                $user_data = array(
                    "user_id" => $user_id,
                    "username" => $db_username,
                    "password" => $password,  // Note: returning plain password is not recommended in a real scenario
                    "role" => $role
                );
                echo json_encode($user_data);
            } else {
                // Password is incorrect
                echo json_encode("ERROR: Incorrect password");
            }
        } else {
            // Username not found
            echo json_encode("ERROR: Username not found");
        }

        // Close the statement
        mysqli_stmt_close($stmt);
    } else {
        // SQL statement preparation failed
        echo json_encode("ERROR: SQL statement preparation failed");
    }

    // Close the connection
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
    while ($row = mysqli_fetch_assoc($result)) {
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

// GET USES BY ID
function getUserById($id)
{
    global $link;

    // Prepare the SQL query
    $sql = "SELECT users.username, users.email, users.role, employees.phone FROM users 
            INNER JOIN employees ON users.user_id = employees.user_id
            WHERE users.user_id = '{$id}' ";

    // Execute the query
    $result = mysqli_query($link, $sql);

    // Check if the query was successful
    if ($result) {
        // Fetch the user data
        $user = mysqli_fetch_assoc($result);

        // Free the result set
        mysqli_free_result($result);

        return $user;
    } else {
        // Handle the case where the query fails
        echo "Error: " . mysqli_error($link);
        return null;
    }
}

function editEmployee(array $data)
{
    global $link;

    $username = $data['username'];
    $email = $data['email'];
    $role = $data['role'];
    $phone = $data['phone'];
    $user_id = $data['id'];

    $users_sql = "UPDATE users SET username = '{$username}', email = '{$email}', role = '{$role}' WHERE user_id = '{$user_id}' ";
    $employee_sql = "UPDATE employees SET phone = '{$phone}' WHERE user_id = '{$user_id}' ";
    $user_result = mysqli_query($link, $users_sql);
    if ($user_result) {
        // insert into employee table also
        $employee_result = mysqli_query($link, $employee_sql);
        if ($employee_result) {
            $response['status_code_header'] = "HTTP/1.1 200 OK";
            $response['body'] = json_encode(["message" => "Employee updated successfully"]);
            return $response;
        }
    } else {
        $response['status_code_header'] = "HTTP/1.1 404 Not Found";
        $response['body'] = null;
        return $response;
    }
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
function createLeaveRequest($leaveType, $employee_id, $start_date, $end_date, $reason, $created_by)
{
    global $link;
    $sql = "INSERT INTO leaverequest (employee_id, leave_type, start_date, end_date, reason, created_by) VALUES ('{$employee_id}', '{$leaveType}', '{$start_date}', '{$end_date}', '{$reason}', '{$created_by}')";
    if ($results = mysqli_query($link, $sql)) {
        echo json_encode("Leave created successfully");
    } else {
        echo json_decode("ERROR_ creating leave");
    }
    mysqli_close($link);
}
function readLeaveRequest()
{
    global $link;
    //$sql = "SELECT leaverequest.request_id, users.username, leaverequest.leave_type, leaverequest.start_date, leaverequest.end_date  FROM ((leaverequest INNER JOIN employees ON leaverequest.employee_id = employees.employee_id) INNER JOIN users ON employees.user_id = users.user_id)";
    $sql = "SELECT leaverequest.request_id, users.username, leaverequest.leave_type, leaverequest.start_date, leaverequest.end_date, leaverequest.status, leaverequest.reason, leaverequest.created FROM ((leaverequest INNER JOIN employees ON leaverequest.employee_id = employees.employee_id) INNER JOIN users ON employees.user_id = users.user_id) ";

    $results = mysqli_query($link, $sql);
    $resources = [];
    while ($row = mysqli_fetch_assoc($results)) {
        $resources[] = $row;
    }
    mysqli_close($link);
    return $resources;
}

// JOBS CRUDS
// CREATE JOBS
function createJobs($title, $description, $salary_range)
{
    global $link;
    $sql = "INSERT INTO jobs (title, description, salary_range) VALUES ('{$title}', '{$description}', '{$salary_range}') ";
    if ($result = mysqli_query($link, $sql)) {
        echo json_encode("Jobs created successfully");
    } else {
        echo json_encode("ERROR_ creating jobs");
    }
    mysqli_close($link);
}
function readJobs()
{
    global $link;
    $sql = "SELECT * FROM jobs";
    $results = mysqli_query($link, $sql);
    $jobs = [];
    while ($row = mysqli_fetch_assoc($results)) {
        $jobs[] = $row;
    }
    mysqli_close($link);

    return $jobs;
}
function deleteJobs($id)
{
    global $link;
    $sql = "DELETE FROM jobs WHERE job_id = '{$id}' ";
    if ($result = mysqli_query($link, $sql)) {
        echo json_encode("Deleted successfully");
    } else {
        echo json_encode("ERROR_ DELETING");
    }
    mysqli_close($link);
}

// EDIT JOBS
function editJobs($id, $title, $description, $modified_by)
{
    global $link;
    $modified_date = date("Y-m-d H:i:s");
    // $sql = "UPDATE jobs SET title='{$title}', description='{$description}', modified_by='{$modified_by}', modified='{$modified_date}' WHERE job_id='{$id}' ";
    $sql = "UPDATE jobs SET title='$title', description='$description', modified='$modified_date', modified_by='$modified_by' WHERE job_id='$id' ";
    $result = mysqli_query($link, $sql);
    if ($result) {
        echo json_encode("Job edited successfully");
    } else {
        echo json_encode("ERROR_: editing jobs");
    }

    mysqli_close($link);
}
function readById($id)
{
}


// Employee Attendance
function fetchAttendance($id)
{
    global $link;
    $sql = "SELECT * FROM attendance WHERE employee_id = '{$id}'";
    $result = mysqli_query($link, $sql);
    $attendance = [];
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $attendance[] = $row;
        }
        return $attendance;
    } else {
        return ["error" => "No record found"];
    }
}

function getEmployeeIdFromUserId($user_id)
{
    global $link;
    $sql = "SELECT employee_id FROM employees WHERE user_id = '{$user_id}' ";
    $result = mysqli_query($link, $sql);
    if ($result) {
        $row = mysqli_fetch_assoc($result);
        return $row;
    } else {
        return ["message" => "No results found"];
    }
}

function getEmployeeSalary()
{
    global $link;
    $sql = "SELECT users.username, users.role, employees.employee_id FROM users INNER JOIN employees ON users.user_id = employees.user_id";
    $result = mysqli_query($link, $sql);
    $employee = [];
    if ($result) {
        while ($row = mysqli_fetch_assoc($result)) {
            $employee[] = $row;
        }
        return $employee;
    } else {
        return ["message" => "error occurred"];
    }
}

function updateLeaveRequest($id, array $data)
{
    $newData = $data['status'];
    global $link;
    $sql = "UPDATE leaverequest SET status = '{$newData}' WHERE request_id = '{$id}'";
    $result = mysqli_query($link, $sql);
    if ($result) {
        return ["message" => "udpated successfully"];
    } else {
        return ["message" => "error occurred"];
    }
}

function getAcceptedLeave()
{
    global $link;
    //$sql = "SELECT * FROM leaverequest WHERE status = 'Accepted' ";
    $sql = "SELECT leaverequest.request_id, users.username, leaverequest.leave_type, leaverequest.start_date, leaverequest.end_date, leaverequest.status, leaverequest.reason, leaverequest.created FROM ((leaverequest INNER JOIN employees ON leaverequest.employee_id = employees.employee_id) INNER JOIN users ON employees.user_id = users.user_id) WHERE leaverequest.status = 'Accepted' ";

    $result = mysqli_query($link, $sql);
    $acceptedLeaves = [];

    if ($result) {
        while ($row = mysqli_fetch_assoc($result)) {
            $acceptedLeaves[] = $row;
        }
        return $acceptedLeaves;
    } else {
        return ["message" => "error message"];
    }
}

function getLeaveById($id)
{
    global $link;
    //$sql = "SELECT * FROM leaverequest WHERE employee_id = '{$id}' ";
    $sql = "SELECT leaverequest.request_id, users.username, leaverequest.leave_type, leaverequest.start_date, leaverequest.end_date, leaverequest.status, leaverequest.reason, leaverequest.created FROM ((leaverequest INNER JOIN employees ON leaverequest.employee_id = employees.employee_id) INNER JOIN users ON employees.user_id = users.user_id) WHERE employees.employee_id = '{$id}' ";
    $result = mysqli_query($link, $sql);
    $res = [];
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            $res[] = $row;
        }
        return $res;
    } else {
        return ["message" => "no leave available"];
    }
}

/* Benefit cruds */
function createBenefitPrograms(array $benefitPrograms)
{
    global $link;
    $benefit = $benefitPrograms['benefit'];
    $description = $benefitPrograms['description'];
    $created_by = $benefitPrograms['created_by'];
    $sql = "INSERT INTO benefits (benefit, description, created_by) VALUES ('{$benefit}', '$description', '{$created_by}') ";
    $result = mysqli_query($link, $sql);
    if ($result) {
        return ["message" => "created successfully"];
    } else {
        return ["message" => "error creating benefit record"];
    }
}
function getBenefits()
{
    global $link;
    $sql = "SELECT benefit_id, benefit, description, date_created FROM benefits";
    $result = mysqli_query($link, $sql);
    $benefits = [];
    if ($result) {
        while ($row = mysqli_fetch_assoc($result)) {
            $benefits[] = $row;
        }
        return $benefits;
    } else {
        return ["message" => "error occurred"];
    }
}

function editBenefit(array $benefit)
{
    global $link;
    $id = $benefit['id'];
    $benefit_type = $benefit['benefit'];
    $description = $benefit['description'];
    $modified_by = $benefit['modified_by'];
    $modified_date = date("Y-m-d H:i:s");
    $sql = "UPDATE benefits SET benefit = '{$benefit_type}', description = '{$description}', date_modified = '{$modified_date}', modified_by = '{$modified_by}' WHERE benefit_id = '{$id}' ";
    $result = mysqli_query($link, $sql);
    if ($result) {
        return ["message" => "updated successfully"];
    } else {
        return ["message" => "error occurred"];
    }
}

function applyForBenefit($employee_id, $benefit_id, $user_id)
{
    global $link;
    $status = "Pending";  // staus are: Pending, Approved, Dismissed

    $sql = "INSERT INTO employeebenefits (employee_id, benefit_id, status, created_by) VALUES ('{$employee_id}', '{$benefit_id}', '{$status}', '{$user_id}') ";
    $result = mysqli_query($link, $sql);
    if ($result) {
        return ["message" => "application successfull"];
    } else {
        return ["message" => "error applying"];
    }
}

// End of Benefit cruds
