<?php
	require 'config.php';
	
	$_pass=sha1($_POST['pass']);
	$sql = "SELECT user FROM reg WHERE user='{$_POST['user']}'AND pw='{$_pass}'";
		
	 $result = mysqli_query($conn, $sql);
	if (mysqli_num_rows($result) > 0) {//用户名和密码正确
	     
		 //sleep(3);
		 echo 0;
	} else {//用户名或密码不正确
		 sleep(3);
			echo 1;
		}
	
	 $conn->close();


?>