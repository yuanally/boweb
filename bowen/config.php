<?php
	header('Content-Type:text/html;charset=utf-8');
	
	//链接MySQL
	$conn=@mysqli_connect("localhost:3307","root","abc123456")or die ("数据库链接失败：". mysqli_connect_error());
	/*
	if($conn){
		echo('你好，链接成功<br>');
	}*/
	//链接数据库test1
	$db=@mysqli_select_db($conn,"test1")or die("数据库错误信息：".mysqli_error($conn));
	/*
	if($db){
		echo('你好，数据库链接成功');
	}*/
	@mysqli_query($conn,'SET NAMES UTF8')or die('字符集错误：'.mysqli_error($conn));
	
	
	
	
	
	
?>