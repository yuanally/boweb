<?php
	require 'config.php';
	
	$sql = "SELECT user FROM reg WHERE user='{$_POST['user']}'";
		
	 $result = mysqli_query($conn, $sql);
	if (mysqli_num_rows($result) > 0) {
	     echo 1;
	} else {
			echo "0 结果";
		}
	
	 $conn->close();


?>