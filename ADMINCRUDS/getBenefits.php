<?php

require_once "../functions.php";
header("Content-Type: application/json ");

if($_SERVER['REQUEST_METHOD'] == 'GET') {
    echo json_encode(getBenefits());
}


?>