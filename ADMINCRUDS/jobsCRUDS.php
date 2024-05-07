<?php

require_once "../functions.php";

$jsonData = file_get_contents("php://input");
$data = json_decode($jsonData, true);

// CREATE JOBS

// READ OR GET JOBS
if($_SERVER['REQUEST_METHOD'] == "GET") {
    echo json_encode(readJobs());
}

// EDIT JOBS
if($_SERVER['REQUEST_METHOD'] == "POST" && isset($data['editMode'])) {
    if(
        isset($data['title']) &&
        isset($data['description']) &&
        isset($data['modified_by']) &&
        isset($data['id'])
        ) {

        $id = $data['id'];
        $title = $data['title'];
        $description = $data['description'];
        $modified_by = $data['modified_by'];

        editJobs($id, $title, $description, $modified_by);
        // editJobs(2, "Bursar", "This is the update", 1);
    } else {
        json_encode("Parameters not set");
    }
}

// DELETE JOBS
if($_SERVER["REQUEST_METHOD"] == "POST" && isset( $data["deleteMode"])) {
    if(isset($data['id'])) {
        $id = $data['id'];
        deleteJobs($id);
    } else {
        json_encode('Parameters not set');
    }
}

?>