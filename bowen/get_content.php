<?php
	require 'config.php';
	

	
	$sql = "SELECT title,content,date FROM content ORDER BY date DESC LIMIT 3";
		
	 $result = mysqli_query($conn, $sql);
     
	 $json='';
	 while(!!$row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
		 
         $json.= json_encode($row).',';// implode($row)方法是把数组转换成字符串
     }
	 //sleep(3);
	  echo '['.substr($json,0,strlen($json)-1).']';
	
	 $conn->close();


?>