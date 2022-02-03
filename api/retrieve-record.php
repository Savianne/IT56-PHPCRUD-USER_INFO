<?php 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    require_once $_SERVER['DOCUMENT_ROOT'].'/config.php';
   
    header('Content-Type: application/json');  // <-- header declaration

    // Create connection
    $conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

    // Check connection
    if ($conn->connect_error) {
        $result = array('success' => false, 'error' => $conn->connect_error);
        //return the json response :
        echo json_encode($result, true);    // <--- encode
        exit();
    }

    $sql = "SELECT * FROM user_information";

    $query_result = $conn->query($sql);

    $result_container = array();

    if ($query_result->num_rows > 0) {
        // output data of each row
        while($row = $query_result->fetch_assoc()) {
            array_push($result_container, $row);
        }
    } 
    
    $conn->close();

    $result = array('success' => true, "payload" => $result_container);
    //return the json response :
    echo json_encode($result, true);    // <--- encode

    exit();
}

?>