<?php
	require 'config.php';
	//print_r($_POST);
	
	$sql = "INSERT INTO content (title,content,date)
		VALUES ('{$_POST['title']}','{$_POST['content']}',NOW())";

	if ($conn->query($sql) === TRUE) {
		echo 1;
	} else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}

	// sleep(3);//延迟3秒
	 $conn->close();
	
?>