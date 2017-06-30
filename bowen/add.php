<?php
	require 'config.php';
	//print_r($_POST);
	$_birthday=$_POST['year'].'-'.$_POST['month'].'-'.$_POST['day'];
	
	$sql = "INSERT INTO reg (user,pw,question,answer,email,birthday,ps)
		VALUES ('{$_POST['user']}',sha1('{$_POST['pw']}'),'{$_POST['question']}','{$_POST['answer']}','{$_POST['email']}','{$_birthday}','{$_POST['ps']}')";//sha1('{$_POST['pw']}')给密码加密";

	if ($conn->query($sql) === TRUE) {
		echo 1;
	} else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}

	// sleep(3);//延迟3秒
	 $conn->close();
	
?>