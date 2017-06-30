<?php
	require 'config.php';
	

	if($_POST['type']=='all'){
		$sql = "SELECT small_bg,big_bg,bg_color,bg_text FROM skin  LIMIT 6";
			
		 $result = mysqli_query($conn, $sql) or die("SQL错误！");
		 
		 $json='';
		 while(!!$row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
			 
			 $json.= json_encode($row).',';// implode($row)方法是把数组转换成字符串
		 }
		 //sleep(3);
		  echo '['.substr($json,0,strlen($json)-1).']';
	  }else if($_POST['type']=='main'){
		  $sql = "SELECT big_bg,bg_color FROM skin  WHERE bg_flag=1";
		  $result = mysqli_query($conn, $sql) or die("SQL错误！");
		  $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
		  $json= json_encode($row);
		  echo $json;
	  }else if($_POST['type']=='set'){
		   $sql_1 = "UPDATE skin SET bg_flag=0 where bg_flag=1";
		   $sql_2 = "UPDATE skin SET bg_flag=1 where big_bg='{$_POST['big_bg']}'";
		  $result_1 = mysqli_query($conn, $sql_1) or die("SQL错误！");
		  $result_2 = mysqli_query($conn, $sql_2) or die("SQL错误！");
		  echo mysqli_affected_rows($conn);
	  }
	 $conn->close();


?>