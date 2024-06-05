<?php

require_once "../functions.php";

if($_SERVER['REQUEST_METHOD'] == 'GET') {
    $results = getEmployeeSalary();
    echo json_encode($results);
}
 ?>