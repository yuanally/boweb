

$(function(){
	//个人中心下拉单显示与隐藏
	$('#header .member').hover(function(){
		$(this).css('background','url(img/003a_52.png)no-repeat 55px center');
		$('#header .member_ul').show().animate({
			t:50,
			step:1,
			mul:{
				h:120,
				o:100
			}
		});
	},function(){
		$(this).css('background','url(img/003a_50.png)no-repeat 55px center');
		$('#header .member_ul').animate({
			t:50,
			step:1,
			mul:{
				h:0,
				o:0
			},
			fn:function(){
				$('#header .member_ul').hide();
			}
		});
		
	});
	
	//遮罩层
	var screen=$('#screen');
	//登录框居中
	var login=$('#login');
	login.center(350,250).resize(function(){
		if(login.css('display')=='block'){
			screen.lock();
		}
	});
	
	//开启登录框
	$('#header .login').click(function(){
		login.center(350,250).css('display','block');
		//显示遮罩
		screen.lock().animate({
			attr:'o',
			start:0,
			target:30,
			t:30,
			step:10
			
		});
	});
	
	//关闭登录框
	$('#login .close').click(function(){
		login.css('display','none');
		//遮罩消失
		//先执行渐变动画再关闭遮罩
		screen.animate({
			attr:'o',
			target:0,
			t:30,
			step:10,
			fn:function(){
				screen.unlock();
			}
			
		});;
	});
	
	//登录框拖拽流程：
	login.drag($('#login h2').first());
	//login.drag($('#login h2').getE(0),$('#login .other').getE(0));
	//login.drag($('#login h2').first(),$('#login .other').first());
	
//登录框表单验证
		//点击登录按钮
	$('form').getElement(1).form('sub').click(function(){
		 var _this=this;
		 //alert('a');
		 if(/^[\w]{2,20}$/g.test(trim($('form').getElement(1).form('user').value()))&& $('form').getElement(1).form('pass').value().length>=6){//用户名和密码 满足登录格式
			 $('#loading').css('display','block').center(200,40);
			 $('#loading p').html('正在登录中...');
			 _this.disabled=true;//阻止点击提交状态
			 $(_this).css('background','#ccc');
			//AJAX方式提交
			ajax({
				 method:'post',
				 url:'is_login.php',
				 data:$('form').getElement(1).serialize(),
				 success:function(text){
					 $('#loading').css('display','none');
					 if(text==1){//登录失败
						 $('#login .info').html("登录失败：用户名或密码不正确！");
					 }else{//登录成功
						 $('#login .info').html("");
						 $('#suc').css('display','block').center(200,40);
						 $('#suc p').html('登录成功');
						 setCookie('user',trim($('form').getElement(1).form('user').value()));
						 	setTimeout(function(){
								$('#suc').css('display','none');
								login.css('display','none');
								$('form').getElement(1).first().reset();
								$('#header .reg').css('display','none');
								$('#header .login').css('display','none');
								$('header .info').css('display','block').html(getCookie('user')+',您好！');
								//表单初始化清空所有内容
								screen.animate({//锁屏消失
									attr:'o',
									target:0,
									t:30,
									step:10,
									fn:function(){
										screen.unlock();
									}
								});
						    },1500)
					 }
					 _this.disabled=false;//还原可点击提交状态
			         $(_this).css('background','#009900');

				 },
				 async:true
			 });
			
		 }else{//不可登录
			 $('#login .info').html("用户名或密码不合法！");
			 
		 }
	});
	
	
	
//分享	
	//分享初始化位置
	//$('#share').css('top',document.documentElement.scrollTop+(getInner().height-parseInt(getStyle($('#share').first(),'height')))/2+'px');
	
	//分享收缩效果
	$('#share').hover(function(){
		$(this).animate({
			attr:'x',
			target:0
		})
		},function(){
			$(this).animate({
				attr:'x',
				target:-213
			});
	})
	
	//分享初始化位置绑定滚动条
	/*
	 addEvent(window,'scroll',function(){
		$('#share').animate({
			attr:'y',			target:getScroll().top+(getInner().height-parseInt(getStyle($('#share').first(),'height')))/2,
			t:30,
			step:10
		});
	})*/
	$(window).bind('scroll',function(){
		setTimeout(function(){//防止抖动使移动更平滑
			$('#share').animate({
			attr:'y',
			target:getScroll().top+(getInner().height-parseInt(getStyle($('#share').first(),'height')))/2,
			t:30,
			step:10
		});
		},100);
	});

	//滑动导航
	$('#nav .about li').hover(function(){
			var target=$(this).first().offsetLeft;//获取鼠标移到的li相对父元素的左边距离
			$('#nav .nav_bg').animate({
				attr:'x',
				target:target+20,
				t:30,
				step:10,
				fn:function(){
					$('#nav .white').animate({
						attr:'x',
						target:-target
					})
				}
			});
		},function(){
			$('#nav .nav_bg').animate({
				attr:'x',
				target:20,
				t:30,
				step:10,
				fn:function(){//当回到首页时使white的li也回到首页
					$('#nav .white').animate({
						attr:'x',
						target:0
					})
				}
			});
	});
	
	//左侧菜单运动方式
	  //动画透明度方式
	$('#sidebar h2').toggle(function(){//切换功能
		$(this).next().animate({
			mul:{
				h:0,
				o:0
			}
		})
		
	},function(){
		$(this).next().animate({
			mul:{
				h:150,
				o:100
			}
		})
	})
	
	//左侧菜单点击方式
	/*//非动画透明度方式
	$('#sidebar h2').toggle(function(){
		$(this).next().hide();
	},function(){
		$(this).next().show();
	});
	
	*/
	
//注册框
	//注册框居中
	var reg=$('#reg');
	reg.center(600,550).resize(function(){
		if(reg.css('display')=='block'){
			screen.lock();
		}
	});
	
	//开启注册框
	$('#header .reg').click(function(){
		reg.center(600,550).css('display','block');
		//显示遮罩
		screen.lock().animate({
			attr:'o',
			start:0,
			target:30,
			t:30,
			step:10
			
		});
	});
	
	//关闭注册框
	$('#reg .close').click(function(){
		reg.css('display','none');
		//遮罩消失
		//先执行渐变动画再关闭遮罩
		screen.animate({
			attr:'o',
			target:0,
			t:30,
			step:10,
			fn:function(){
				screen.unlock();
			}
			
		});
	});
	
	//注册框拖拽流程：
	 reg.drag($('#reg h2').first());
	
	
	
//注册的表单验证
	//表单初始化
	$('form').getElement(0).first().reset();
	
	//用户输入验证
	//$('form').getElement(0).form('user').value('fff');
	//alert($('form').getElement(0).form('user').value());
	$('form').getElement(0).form('user').bind('focus',function(){
		$('#reg .info_user').css('display','block');
		$('#reg .error_user').css('display','none');
		$('#reg .success_user').css('display','none');
	}).bind('blur',function(){
		if(trim($(this).value())==''){
			$('#reg .info_user').css('display','none');
			$('#reg .error_user').css('display','none');
			$('#reg .success_user').css('display','none');
		}else if(!check_user()){//正则判断用户名是否2-20位，由字母、数字 和下划线组成
			$('#reg .error_user').css('display','block');
			$('#reg .info_user').css('display','none');
			$('#reg .success_user').css('display','none');
	
		}else{
			$('#reg .success_user').css('display','block');
			$('#reg .info_user').css('display','none');
			$('#reg .error_user').css('display','none');
		}
	});
	function check_user(){
		var flag=true;
		if(!/^[a-zA-Z0-9_]\w{2,20}$/g.test(trim($('form').getElement(0).form('user').value()))){
			$('reg .error_user').html('输入不合法，请重新输入！');
			return false;
		}else{
			$('#reg .info_user').css('display','none');
			$('#reg .loading').css('display','block');
			//AJAX方式提交
			  ajax({
				 method:'post',
				 url:'is_user.php',
				 data:$('form').getElement(0).serialize(),
				 success:function(text){
					if(text==1){
						$('reg .error_user').html('用户名被占用!');
						$('form').getElement(0).form('sub').first().disabled=true;
						$('form').getElement(0).form('sub').css('background','#ccc');
						flag=false;
					}else{
						$('form').getElement(0).form('sub').first().disabled=false;
						$('form').getElement(0).form('sub').css('background','#66ffcc');
						flag=true;
					};
					$('#reg .loading').css('display','none');
				 },
				 async:false
			 });
			 return flag;
		}
	}
	
	//密码验证
	$('form').getElement(0).form('pw').bind('focus',function(){
		$('#reg .info_pw').css('display','block');
		$('#reg .error_pw').css('display','none');
		$('#reg .success_pw').css('display','none');
	}).bind('blur',function(){
		if(trim($(this).value())==''){
			$('#reg .info_pw').css('display','none');
		}else {
			if(check_pw(this)){//合法的情况下
				$('#reg .info_pw').css('display','none');
				$('#reg .error_pw').css('display','none');
				$('#reg .success_pw').css('display','block');
			}else{
				$('#reg .info_pw').css('display','none');
				$('#reg .error_pw').css('display','block');
				$('#reg .success_pw').css('display','none');
			}
		}
	});
	 
	 //密码强度验证
	 $('form').getElement(0).form('pw').bind('keyup',function(){
		 check_pw();
	 });
	
	 //密码验证函数
	 function check_pw(){
		 var value=trim($('form').getElement(0).form('pw').value());
		 var value_length=value.length;
		 var code_length=0;//用来标记字符的种类
		 
		 //第一个必须条件的验证6-20位之间
		 if(value_length>=6&&value_length<=20){
			 $('#reg .info_pw .q1').html('●').css('color','green');
		 }else{
			 $('#reg .info_pw .q1').html('○').css('color','#666');
		 }
		 
		 //第二个必须条件的验证，字母或数字或非空字符，任意一个即可
		 if(value_length>0&&!/\s/.test(value)){
			 $('#reg .info_pw .q2').html('●').css('color','green');
		 }else{
			 $('#reg .info_pw .q2').html('○').css('color','#666');
		 }
		 
		 //第三个必须条件的验证，大小写字母、数字、非空字符，任意两种混拼即可
		 if(/[0-9]/.test(value)){
			 code_length++;
		 }
		 
		 if(/[a-z]/.test(value)){
			 code_length++;
		 }
		 
		 if(/[A-Z]/.test(value)){
			 code_length++;
		 }
		 
		 if(/[^0-9a-zA-Z]/.test(value)){//[^0-9a-zA-Z]表示非0-9a-zA-Z
			 code_length++;
		 }
		 
		 if(code_length>=2){
			 $('#reg .info_pw .q3').html('●').css('color','green');
		 }else{
			  $('#reg .info_pw .q3').html('○').css('color','#666');
		 }
		 
		 //安全强度级别认证
		 if(value_length>=10&&code_length>=3){
			 $('#reg .info_pw .s1').css('color','green');
			 $('#reg .info_pw .s2').css('color','green');
			 $('#reg .info_pw .s3').css('color','green');
			 $('#reg .info_pw .s4').html('高').css('color','orange');
		 }else if(value_length>=8&&code_length>=2){
			 $('#reg .info_pw .s1').css('color','#f60');
			 $('#reg .info_pw .s2').css('color','#f60');
			 $('#reg .info_pw .s3').css('color','#ccc');
			 $('#reg .info_pw .s4').html('中').css('color','orange');
		 }else if(value_length>=1){
			 $('#reg .info_pw .s1').css('color','maroon');
			 $('#reg .info_pw .s2').css('color','#ccc');
			 $('#reg .info_pw .s3').css('color','#ccc');
			 $('#reg .info_pw .s4').html('低').css('color','maroon');
		 }else{
			 $('#reg .info_pw .s1').css('color','#ccc');
			 $('#reg .info_pw .s2').css('color','#ccc');
			 $('#reg .info_pw .s3').css('color','#ccc');
			 $('#reg .info_pw .s4').html('');
		 }
		 if(value_length>=6&&value_length<=20&&!/\s/.test(value)&&code_length>=2){
			return true;
		}else{
			return false;
		};
		 
	 }
	 
	//密码确认
	$('form').getElement(0).form('notpw').bind('focus',function(){
		$('#reg .info_notpw').css('display','block');
		$('#reg .error_notpw').css('display','none');
		$('#reg .success_notpw').css('display','none');
	}).bind('blur',function(){
		if(trim($(this).value())==''){
			$('#reg .info_notpw').css('display','none');
		}else if(check_notpw()){//密码一致
			$('#reg .info_notpw').css('display','none ');
			$('#reg .error_notpw').css('display','none');
			$('#reg .success_notpw').css('display','block');
		}else{
			$('#reg .info_notpw').css('display','none');
			$('#reg .error_notpw').css('display','block');
			$('#reg .success_notpw').css('display','none');
		}
	});
	function check_notpw(){
		if(trim($('form').getElement(0).form('notpw').value())==trim($('form').getElement(0).form('pw').value())){
			return true;
		}else{
			return false;
		};
	}
	
	//提问
	$('form').getElement(0).form('question').bind('change',function(){
		if(check_question()) $('#reg .error_question').css('display','none');
	})
	
	function check_question(){
		if($('form').getElement(0).form('question').value()!=0) {
			return true;
		}else{
			return false;
		};
	}
	
	
	
	//回答
	$('form').getElement(0).form('answer').bind('focus',function(){
			$('#reg .info_answer').css('display','block');
			$('#reg .error_answer').css('display','none');
			$('#reg .success_answer').css('display','none');
		}).bind('blur',function(){
			if(trim($(this).value())==''){
				$('#reg .info_answer').css('display','none');
			}else if(check_answer()){//回答合法
				$('#reg .info_answer').css('display','none ');
				$('#reg .error_answer').css('display','none');
				$('#reg .success_answer').css('display','block');
			}else{
				$('#reg .info_answer').css('display','none ');
				$('#reg .error_answer').css('display','block');
				$('#reg .success_answer').css('display','none');
			}
	});
	function check_answer(){
		if(trim($('form').getElement(0).form('answer').value()).length>=2&&trim($('form').getElement(0).form('answer').value()).length<=32) {
			return true
		}else{
			return false;
		};
	}
	
	
	//电子邮件
	$('form').getElement(0).form('email').bind('focus',function(){
			$('#reg .info_email').css('display','block');
			$('#reg .error_email').css('display','none');
			$('#reg .success_email').css('display','none');
			//补全框显示
			if($(this).value().indexOf('@')==-1){//输入没有@时,
				$('#reg .all_email').css('display','block');
			}
			
		}).bind('blur',function(){
			//补全框消失
			$('#reg .all_email').css('display','none');
			//邮件输入判断
			if(trim($(this).value())==''){
				$('#reg .info_email').css('display','none');
			}else if(check_email()){//邮件合法
				$('#reg .info_email').css('display','none ');
				$('#reg .error_email').css('display','none');
				$('#reg .success_email').css('display','block');
			}else{
				$('#reg .info_email').css('display','none ');
				$('#reg .error_email').css('display','block');
				$('#reg .success_email').css('display','none');
			}
	});
	function check_email(){
		if(/^[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9_\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($('form').getElement(0).form('email').value()))) {
			return true;
		}else{
			return false;
		};
	}
	
	//电子邮件补全框鼠标移入移出效果
	$('#reg .all_email li').hover(function(){
		$(this).css('background','#e5edf2');
		$(this).css('color','#369');
	},function(){
		$(this).css('background','#fff');
		$(this).css('color','#666');
	});
	
	//电子邮件补全框键入
	$('form').getElement(0).form('email').bind('keyup',function(event){
		if($(this).value().indexOf('@')==-1){//输入没有遇到@,自动补全
			$('#reg .all_email li span').html($(this).value());
			$('#reg .all_email').css('display','block');
		}else{//当输入了@时直接不显示补全框
			$('#reg .all_email').css('display','none');
		}
		
		//电子补全框通过键盘和光标键获取内容
		var length=$('#reg .all_email li').length();
			$('#reg .all_email li').css('background','#fff');
			$('#reg .all_email li').css('color','#666');
		 if(event.keyCode==40){
			 if(this.index==undefined||this.index>=length-1){
				 this.index=0;
			 }else{
				 this.index++;
			 }
			 $('#reg .all_email li').getElement(this.index).css('background','#e5edf2');
			 $('#reg .all_email li').getElement(this.index).css('color','#369');
			 
		 }
		
		if(event.keyCode==38){
			 if(this.index==undefined||this.index<=0){
				 this.index=length-1;
			 }else{
				 this.index--;
			 }
			 $('#reg .all_email li').getElement(this.index).css('background','#e5edf2');
			 $('#reg .all_email li').getElement(this.index).css('color','#369');
			 
		 }
		 
		 if(event.keyCode==13){
			 $(this).value($('#reg .all_email li').getElement(this.index).innerText());
			 $('#reg .all_email').css('display','none');
			 this.index=undefined;//初始化索引
		 }
		 
		
	});
	
	//电子邮件补全框通过鼠标mousedown点击获取内容
		//$('#reg .all_email li').click(function(){//无效方式
			//alert('ac');
		//});//PS:click事件是 点击弹起后触发的，而blur失去焦点后，没有点击弹起的元素，导致无法触发
	$('#reg .all_email li').bind('mousedown',function(){
		$('form').getElement(0).form('email').value($(this).innerText());
	});
	
	
	//生日的日期年、月、日选择
	var year=$('form').getElement(0).form('year');
	var month=$('form').getElement(0).form('month');
	var day=$('form').getElement(0).form('day');
	var day30=[4,6,9,11];
	var day31=[1,3,5,7,8,10,12];
	
		//注入年
	 for(var i=1949;i<=2018;i++){
		 year.first().add(new Option(i,i),undefined);//创建年列表 表单里创建option和添加option项
	 }
		//注入月
	 for(var i=1;i<=12;i++){
		 month.first().add(new Option(i,i),undefined);//创建月列表
	 }
	 //改变年或月时选择日
	 year.bind('change',select_day );
	 month.bind('change',select_day );
	 day.bind('change',function(){
		 if(check_birthday()){
			 $('#reg .error_birthday').css('display','none');
		 }
	 })
	 function check_birthday(){
		 if(year.value()!=0&&month.value()!=0&&day.value()!=0){
			return true;
		}else{
			return false;
		};
	 }
	 function select_day(){//选择日
		 if(month.value()!=0&&year.value()!=0){
			 //清理之前的注入
			 day.first().options.length=1;
			 
			 var cur_day=0;

			 //注入日
			 if(inArray(day31,parseInt(month.value()))){
				// for(var i=1;i<=31;i++){
				//	 day.first().add(new Option(i,i),undefined);
				// }
				cur_day=31;
			 }else if(inArray(day30,parseInt(month.value()))){
				// for(var i=1;i<=30;i++){
					// day.first().add(new Option(i,i),undefined);
				// }
				cur_day=30;
			 }else{
				 if(parseInt(year.value())%4==0&&parseInt(year.value())%100!=0||parseInt(year.value())%400==0){//判断闰年
					// for(var i=1;i<=29;i++){
					 //day.first().add(new Option(i,i),undefined);
					// }
					cur_day=29;
				 }else{
					 //for(var i=1;i<=28;i++){
					 //day.first().add(new Option(i,i),undefined);
					//}
					cur_day=28;
				 }
			 }
			 for(var i=1;i<=cur_day;i++){
				 day.first().add(new Option(i,i),undefined);
				}//把下面的重复for合并
		 }else{
			 //清理之前的注入
			 day.first().options.length=1;
		 } 
	 };
	
//备注部分
	 $('form').getElement(0).form('ps').bind('keyup',check_ps).bind('paste',function(){
		 //鼠标粘贴事件会在内容粘贴到文本框之前触发
		 setTimeout(check_ps,50);
	 });
	//清理尾部
	$('#reg .ps .clear').click(function(){
		$('form').getElement(0).form('ps').value($('form').getElement(0).form('ps').value().substring(0,200));
		check_ps();
		
	});
	 function check_ps(){
			 var num=200-$('form').getElement(0).form('ps').value().length;
			 if(num>=0){
				 $('#reg .ps1').css('display','block');
				 $('#reg .ps2').css('display','none');
				 $('#reg .ps1 .num').html(num);
				 return true;
			 }else{
				 $('#reg .ps2').css('display','block');
				 $('#reg .ps1').css('display','none');
				 $('#reg .ps2 .num').html(Math.abs(num)).css('color','red');
				 return false;
			 }
		}
	
	 //提交
	$('form').getElement(0).form('sub').click(function(){			
		 var flag=true;
		 if(!check_user()){//用户
			 flag=false;
			 $('#reg .error_user').css('display','block');
		 }
		  if(!check_pw()){//密码
			  flag=false;
			  $('#reg .error_pw').css('display','block');
		  }
		  
		  if(!check_notpw()){//密码确认
			  flag=false;
			  $('#reg .error_notpw').css('display','block');
		  }
		  
		  if(!check_question()){//提问
			  flag=false;
			  $('#reg .error_question').css('display','block');
		  }
		  
		  if(!check_answer()){//回答
			  flag=false;
			  $('#reg .error_answer').css('display','block');
		  }
		  
		  if(!check_email()){//邮件
			   flag=false;
			  $('#reg .error_email').css('display','block');
		  }
		  
		  if(!check_birthday()){//生日
			   flag=false;
			  $('#reg .error_birthday').css('display','block');
		  }
		  
		  if(!check_ps()){//备注
			   flag=false;
		  }
		  
		 if(flag){//提交
			var _this=this;
			// $('form').getElement(0).first().submit();//传统方式
			$('#loading').css('display','block').center(200,40);
			$('#loading p').html('正在提交注册中...');
			_this.disabled=true;//设置不可点击
			$(_this).css('background','#ccc');
			//AJAX方式提交
			ajax({
				 method:'post',
				 url:'add.php',
				 data:$('form').getElement(0).serialize(),
				 success:function(text){
					if(text==1){
						$('#loading').css('display','none');
						//alert('成功注册！');
						$('#suc').css('display','block').center(200,40);
						$('#suc p').html('注册成功请登录...');
						setTimeout(function(){
							$('#suc').css('display','none');
							reg.css('display','none');
							$('#reg .success').css('display','none');
							$('form').getElement(0).first().reset();//表单初始化清空所有内容
							_this.disabled=false;//还原成可点击状态
							$(_this).css('background','#66ffcc');
							screen.animate({//锁屏消失
								attr:'o',
								target:0,
								t:30,
								step:10,
								fn:function(){
									screen.unlock();
								}
							});	
						},1500)
					};				
				 },
				 async:true
			 });
		 }
	});
	
	


//发文框
	//发文框居中
	var blog=$('#blog');
	blog.center(580,320).resize(function(){
		if(blog.css('display')=='block'){
			screen.lock();
		}
	});
	
	//开启发文框
	$('#header .content').click(function(){
		blog.center(580,320).css('display','block');
		//显示遮罩
		screen.lock().animate({
			attr:'o',
			start:0,
			target:30,
			t:30,
			step:10
			
		});
	});
	
	//关闭发文框
	$('#blog .close').click(function(){
		blog.css('display','none');
		//遮罩消失
		//先执行渐变动画再关闭遮罩
		screen.animate({
			attr:'o',
			target:0,
			t:30,
			step:10,
			fn:function(){
				screen.unlock();
			}
		});
	});
	
	//发文框拖拽流程：
	 blog.drag($('#blog h2').first());
	 
//发文表单验证
	$('form').getElement(2).form('sub').click(function(){
		if(trim($('form').getElement(2).form('title').value()).length<=0||trim($('form').getElement(2).form('content').value()).length<=0){//发表失败
			$('#blog .info').html('发表失败：标题或内容不得为空！');
		}else{//发表成功
			//alert('成功');
			var _this=this;
			$('#loading').css('display','block').center(200,40);
			$('#loading p').html('正在发表文章...');
			_this.disabled=true;//设置不可点击
			$(_this).css('background','#ccc');
			//AJAX方式提交
			ajax({
				 method:'post',
				 url:'add_content.php',
				 data:$('form').getElement(2).serialize(),
				 success:function(text){
					 $('#loading').css('display','none');
					 //alert(text);
					 if(text==1){//发文成功
						 $('#blog .info').html('');
						 $('#suc').css('display','block').center(200,40);
						 $('#suc p').html('发表成功');
						 	setTimeout(function(){
								$('#suc').css('display','none');
								$('#blog').css('display','none');
								$('form').getElement(2).first().reset();
								//表单初始化清空所有内容
								screen.animate({//锁屏消失
									attr:'o',
									target:0,
									t:30,
									step:10,
									fn:function(){
										screen.unlock();
									//1.5秒后自动刷新列表
									//获取发布文章列表
										$('#index').html('<span class="loading"></span>');
										$('#index .loading').css('display','block');
										//Ajax获取文章
										 ajax({
											 method:'post',
											 url:'get_content.php',
											 data:{},
											 success:function(text){
												 $('#index .loading').css('display','none');
												var json=JSON.parse(text);
												var html='';
												for(var i=0;i<json.length;i++){
													html+='<div class="content"><h2>'+json[i].title+'<em>'+json[i].date+'</em></h2><p>'+json[i].content+'</p></div>'
												}
												$('#index').html(html);
												for(var i=0;i<json.length;i++){
													$('#index .content').getElement(i).animate({
														attr:'o',
														target:100,
														t:30,
														step:10
													})
												}
											 },
											 async:true
										 });
									}
								});
						    },1500);
					 };
					 _this.disabled=false;//还原可点击提交状态
			         $(_this).css('background','#33cc66');
				 },
				 async:true
			 });
		}
	})

//获取发布文章列表
	$('#index').html('<span class="loading"></span>');
	$('#index .loading').css('display','block');
	//Ajax获取文章
	ajax({
		 method:'post',
		 url:'get_content.php',
		 data:{},
		 success:function(text){
			 $('#index .loading').css('display','none');
			 var json=JSON.parse(text);
			 var html='';
			 for(var i=0;i<json.length;i++){
				html+='<div class="content"><h2>'+json[i].title+'<em>'+json[i].date+'</em></h2><p>'+json[i].content+'</p></div>'
			}
			$('#index').html(html);
			for(var i=0;i<json.length;i++){
				$('#index .content').getElement(i).animate({
					attr:'o',
					target:100,
					t:30,
					step:10
				})
			}
		},
		 async:true
	 });		
	
	
//换肤框
	//换肤框居中
	var skin=$('#skin');
	skin.center(650,360).resize(function(){
		if(skin.css('display')=='block'){
			screen.lock();
		}
	});
	
	//开启换肤框
	$('#header .skin').click(function(){
		skin.center(650,360).css('display','block');
		//显示遮罩
		screen.lock().animate({
			attr:'o',
			start:0,
			target:30,
			t:30,
			step:10
		});
		$('#skin .skin_bg').html('<span class="loading"></span>');
		ajax({
			 method:'post',
			 url:'get_skin.php',
			 data:{
				 'type':'all'
			 },
			 success:function(text){
				 var json=JSON.parse(text);
				 var html='';
				 for(var i=0;i<json.length;i++){
					 html+='<dl><dt><img src="img/'+json[i].small_bg+'" big_bg="'+json[i].big_bg+'"  bg_color="'+json[i].bg_color+'"  alt="" /><dd>'+json[i].bg_text+'</dd></dt></dl>'
				 }
				 $('#skin .skin_bg').html(html).opacity(0).animate({
					 attr:'o',
					 target:100,
					 t:30,
					 step:10
				 });
				 //实现点击更换皮肤
				 $('#skin dl dt img').click(function(){
					 $('body').css('background',$(this).attr('bg_color')+' '+'url(img/'+$(this).attr('big_bg')+')'+' '+'repeat-x');
					 ajax({
						 method:'post',
						 url:'get_skin.php',
						 data:{
								 'type':'set',
								 'big_bg':$(this).attr('big_bg')
					     },
						 success:function(text){
							  $('#suc').css('display','block').center(200,40);
							  $('#suc p').html('皮肤更换成功');
							  setTimeout(function(){
								  $('#suc').css('display','none');
							  },1500);
							 },
							 async:true
					 });
				 });
			 },
			 async:true
		 });
	});
	
	//设置默认皮肤
	ajax({
		 method:'post',
		 url:'get_skin.php',
		 data:{
			 'type':'main'
		 },
		 success:function(text){
			 var json=JSON.parse(text);  
			 $('body').css('background',json.bg_color+' '+'url(img/'+json.big_bg+')'+' '+'repeat-x');
			 },
			 async:true
		 });
	
	
	
	
	//关闭换肤框
	$('#skin .close').click(function(){
		skin.css('display','none');
		//遮罩消失
		//先执行渐变动画再关闭遮罩
		screen.animate({
			attr:'o',
			target:0,
			t:30,
			step:10,
			fn:function(){
				screen.unlock();
			}
		});
	});
	
	//换肤框拖拽流程：
	 skin.drag($('#skin h2').first());
//换肤功能的实现
	 
	 


	
	
//轮播器
	//轮播器初始化
		//非透明方式
	//$('#banner img').css('display','none');
	//$('#banner img').getElement(0).css('display','block');
		//透明方式
	$('#banner img').opacity(0);
	$('#banner img').getElement(0).opacity(100);
	$('#banner ul li').getElement(0).css('color','orange');
	$('#banner strong').html($('#banner img').getElement(0).attr('alt'));
	
	//轮播器计数器
	var banner_index=1;
	
	//轮播器的种类
	var banner_type=1;//1表示透明度类型，2表示上下滚动
	
	//自动轮播
	var banner_timer=setInterval(banner_fn,2000);
	
	//手动轮播器(静态的)
	$('#banner ul li').hover(function(){
		//alert($(this).index());
		clearInterval(banner_timer);
		//alert($(this).css('color'));
		if($(this).css('color')!='rgb(255, 165, 0)'&&$(this).css('color')!='orange'){//防止鼠标重复悬浮在同一个上面时重复加载
			banner(this,banner_index==0?$('#banner ul li').length()-1:banner_index-1);
		}	
	},function(){
		banner_index=$(this).index()+1;
		banner_timer=setInterval(banner_fn,3000);
	});
	//封装
	function banner(obj,prev){
		//非透明方式
		//$('#banner img').css('display','none');
		//$('#banner img').getElement($(obj).index()).css('display','block');
		//透明方式
		if(banner_type==1){
			$('#banner img').getElement(prev).animate({//执行到的前一张图片
				attr:'o',
				target:0,
				t:30,
				step:10
			}).css('zIndex',1);
			
			$('#banner img').getElement($(obj).index()).animate({
				attr:'o',
				target:'100',
				t:30,
				step:10
			}).css('zIndex',2).opacity(100);
		}else if(banner_type==2){
			$('#banner img').getElement(prev).animate({//执行到的前一张图片
				attr:'y',
				target:150,
				t:30,
				step:10
			}).css('zIndex',1);
			
			$('#banner img').getElement($(obj).index()).animate({
				attr:'y',
				target:0,
				t:30,
				step:10
			}).css('top','-150px').css('zIndex',2).opacity(100);
			
		}
		$('#banner ul li').css('color','#999');
		$('#banner ul li').getElement($(obj).index()).css('color','orange');
		$('#banner strong').html($('#banner img').getElement($(obj).index()).attr('alt'));
	}
	function banner_fn(){
		if(banner_index>=$('#banner ul li').length()){
			banner_index=0;
		}
		banner($('#banner ul li').getElement(banner_index).first(),banner_index==0?$('#banner ul li').length()-1:banner_index-1);//传递的参数还是li本体
		banner_index++;
	}
	
	
//延迟加载
  //问题1：将xsrc地址换到src上
	 //当图片进入可视区域的时候，将图片的xsrc的地址替换到src即可
	//alert($('.wait_load').getElement(0).attr('xsrc'));
	//$('.wait_load').getElement(0).attr('src',$('.wait_load').getElement(0).attr('xsrc'));
	
  //问题2：获取图片元素到最外层顶点元素的距离
	//alert(offsetTop($('.wait_load').first()));
	
  //问题3：获取页面可视区域的最低点的位置
	//alert(getInner().height+getScroll().top);
	//alert($('.wait_load'))
	var wait_load=$('.wait_load');
		wait_load.opacity(0);
	$(window).bind('scroll',_wait_load);
	$(window).bind('resize',_wait_load);
	$(window).bind('refresh',_wait_load);
	//封装延迟加载函数
	function _wait_load(){
		setTimeout(function(){
			for(var i=0;i<wait_load.length();i++){
				var _this=wait_load.getE(i);
				if(getInner().height+getScroll().top>=offsetTop(_this)){//浏览器屏幕高加滚动了的高度 和 元素到可视区顶部的距离 作比较
					$(_this).attr('src',$(_this).attr('xsrc')).animate({
						attr:'o',
						target:'100',
						t:30,
						step:10
					})
				}
			}
		},100)
	}
	
	
//预加载图片
	//图片弹窗
		var photo_big=$('#photo_big');
		//var photo_height=parseInt(photo_big.css('height'))+(getScroll().top);
		//alert( photo_height);
	photo_big.center(620,511).resize(function(){
		if(photo_big.css('display')=='block'){
			screen.lock();
		}
	});
	
	//开启预加载图片框
	$('#photo dl dt img').click(function(){
		photo_big.center(620,511).css('display','block');
		//显示遮罩
		screen.lock().animate({
			attr:'o',
			start:0,
			target:30,
			t:30,
			step:10	
		});
		var temp_img=new Image();//创建一个临时区域的图片对象
		//temp_img.src = 'img/t1.jpg';//src属性可以在后台加载这张图片到本地缓存
		 $(temp_img).bind('load',function(){//判断图片是否加载完
			//图片加载
			$('#photo_big .big img').attr('src', temp_img.src).css('height','450px').css('width','600px').css('top','0').opacity(0).animate({
				attr:'o',
				target:100,
				t:30,
				step:10
			});	
		});
		//IE必须把src这个属性放在load事件的下面
		temp_img.src =$(this).attr('bigsrc') ;//预加载图片地址
		var children=this.parentNode.parentNode;
		prev_next_img(children);
	});
	
	//关闭预加载图片框
	$('#photo_big .close').click(function(){
		photo_big.css('display','none');
		//遮罩消失
		//先执行渐变动画再关闭遮罩
		screen.animate({
			attr:'o',
			target:0,
			t:30,
			step:10,
			fn:function(){
				screen.unlock();
			}
		});
		$('#photo_big .big img').attr('src','img/loading2.gif').css('width','32px').css('height','32px').css('top','190px');
	});
	
	//预加载图片框拖拽流程：
	 photo_big.drag($('#photo_big h2').first());
	 
	 //预加载图片框的图片鼠标滑过
	 $('#photo_big .big .left').hover(function(){//左边
		 $('#photo_big .big .sl').animate({
			 attr:'o',
			 target:50,
			 t:30,
			 step:10
		 });
	 },function(){
		  $('#photo_big .big .sl').animate({
			 attr:'o',
			 target:0,
			 t:30,
			 step:10
		 });
		 
	 })
	 
	 $('#photo_big .big .right').hover(function(){//右边
		 $('#photo_big .big .sr').animate({
			 attr:'o',
			 target:50,
			 t:30,
			 step:10
		 });
	 },function(){
		  $('#photo_big .big .sr').animate({
			 attr:'o',
			 target:0,
			 t:30,
			 step:10
		 });
		 
	 })
	 
	 //图片上一张
	$('#photo_big .big .left').click(function(){
		$('#photo_big .big img').attr('src','img/loading2.gif').css('width','32px').css('height','32px').css('top','190px');
		
		var current_img=new Image();
		$(current_img).bind('load',function(){
			$('#photo_big .big img').attr('src',$(this).attr('src')).opacity(0).animate({
				attr:'o',
				target:100,
				t:30,
				step:10
			}).css('width','600px').css('height','450px').css('top','0');
		})
		current_img.src=$(this).attr('src');
		
		var children=$('#photo dl dt img').getE(prevIndex($('#photo_big .big img').attr('index'),$('#photo').first())).parentNode.parentNode;
		prev_next_img(children);
	});
	 
	 //图片下一张
	 $('#photo_big .big .right').click(function(){
		$('#photo_big .big img').attr('src','img/loading2.gif').css('width','32px').css('height','32px').css('top','190px');
		
		var current_img=new Image();
		$(current_img).bind('load',function(){
			$('#photo_big .big img').attr('src',$(this).attr('src')).opacity(0).animate({
				attr:'o',
				target:100,
				t:30,
				step:10
			}).css('width','600px').css('height','450px').css('top','0');
		})
		current_img.src=$(this).attr('src');
		
		var children=$('#photo dl dt img').getE(nextIndex($('#photo_big .big img').attr('index'),$('#photo').first())).parentNode.parentNode;
		prev_next_img(children);
	});
	
	//封装预存图片上一张和后一张图片
	function prev_next_img(children){
		var prev=prevIndex($(children).index(),children.parentNode);
		var next=nextIndex($(children).index(),children.parentNode);
		
		var prev_img=new Image();
		var next_img=new Image();
		
		//加载前一张图片
		prev_img.src=$('#photo dl dt img').getElement( prev).attr('bigsrc');
		//加载后一张图片
		next_img.src=$('#photo dl dt img').getElement(next).attr('bigsrc');
		
		$('#photo_big .big .left').attr('src',prev_img.src);//给span创建一个属性保存前一张图片地址
		$('#photo_big .big .right').attr('src',next_img.src);//给span创建一个属性保存后一张图片地址
		$('#photo_big .big img').attr('index',$(children).index());//把当前小图片的索引赋给大图的新建属性index
		
		//图片张数
		$('#photo_big .big em').html(parseInt($(children).index())+1+'/'+$('#photo dl dt img').length());	
	}
	
/*
//Ajax 
	 //调用ajax
	 $(document).click(function(){
		 ajax({
			 method:'get',
			 url:'demo.php',
			 data:{
				 'name':'Lee',
				 'age':100
			 },
			 success:function(text){
				alert(text);
			 },
			 async:true
		 });
	 });
	 
*/	 
	 
	



	
	 /*
	//图片加载
	$('#photo_big .big img').attr('src','img/t1.jpg').css('height','450px').css('width','600px').css('top','0').opacity(0).animate({
		attr:'o',
		target:100,
		t:30,
		step:10
	});
	//问题1：loading2.gif的样式 被加载图片的宽和高 改变了
	//问题2：动画的渐变效果没有出现
	
	//创建一个临时的图片对象，用于保存图片
	var temp_img=new Image();//创建一个临时区域的图片对象
	temp_img.src = 'img/t1.jpg';//src属性可以在后台加载这张图片到本地缓存
	//onload 事件方法表示图片加载成功
	//onerror 事件方法表示图片加载失败
	
	 $(temp_img).bind('load',function(){//解决上两个问题
		$('#photo_big .big img').attr('src', temp_img.src).css('height','450px').css('width','600px').css('top','0').opacity(0).animate({
			attr:'o',
			target:100,
			t:30,
			step:10
		});
	});
	//IE必须把src这个属性放在load事件的下面
		//temp_img.src = 'img/t1.jpg';
	*/
	
	
	
	
	
	
	/*
	//test1 div测试
	$('.test1').hover(function(){
		$(this).animate({//这里一定要是this，不能用$('.test1')，因为这里的是数组，只有用this才可以指定到操作的对象上
			attr:'w',
			target:300,
			step:10
		});
	},function(){
		$(this).animate({
			attr:'w',
			target:100,
			step:10,
			
		});
	})
	
	//同步test测试
	$('#test').click(function(){
		$(this).animate({
			t:30,
			step:20,
			//mul参数是一个对象，只有两种值，属性：目标值
			mul:{
				w:101,
				h:150,
				o:30
			},
			fn:function(){
				alert('123');
			}
			
		})
	})
	*/
	
	
});











/*

window.onload=function(){
	//个人中心下拉单显示与隐藏
	$().getClass('member').hover(function(){
		$(this).css('background','url(img/003a_52.png)no-repeat 55px center');
		$().getClass('member_ul').show();
	},function(){
		$().getClass('member_ul').hide();
		$(this).css('background','url(img/003a_50.png)no-repeat 55px center');
	});
		
	var login=$().getId('login');
	var screen=$().getId('screen');
	//登录框居中
	login.center(350,250).resize(function(){
		if(login.css('display')=='block'){
			screen.lock();
		}
		
	});
	//开启登录框
	$().getClass('login').click(function(){
		login.css('display','block');
		//显示遮罩
		screen.lock();
		login.center(350,250);
	});
	
	//关闭登录框
	$().getClass('close').click(function(){
		login.css('display','none');
		//遮罩消失
		screen.unlock();
	});

	//$().addRule(0,'html','font-size:200px',0);
	//$().removeRule(0,0);
	
	
	//拖拽流程：
	//1.先点下去
	//2.在点下的物体被选中，进行move移动
	//3.抬起鼠标，停止移动
	//点击某个物体，用oDiv即可，move和up是全局区域，也就是整个文档通用，应该用document
	
	login.drag([$().getTagName('h2').getE(0),$().getTagName('span').getE(0)]);
	
	
};
*/
















