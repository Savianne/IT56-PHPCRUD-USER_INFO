<?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        require_once $_SERVER['DOCUMENT_ROOT'].'/config.php';
       
        header('Content-Type: application/json');  // <-- header declaration

        $json = file_get_contents('php://input');

        $user_info = json_decode($json, true);

        // Create connection
        $conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

        // Check connection
        if ($conn->connect_error) {
            $result = array('success' => false, 'error' => $conn->connect_error);
            //return the json response :
            echo json_encode($result, true);    // <--- encode
            exit();
        }

        $sql = "INSERT INTO user_information (fullName, userName, password) VALUES (?, ?, ?)";

        // prepare and bind
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $fullName, $userName, $password);

        $fullName = $user_info['fullName'];
        $userName = $user_info['userName'];
        $password = $user_info['password'];
        $stmt->execute();
        
        $stmt->close();
        $conn->close();

        $result = array('success' => true);
        //return the json response :
        echo json_encode($result, true);    // <--- encode

        exit();
   }
?>