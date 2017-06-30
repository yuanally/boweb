$().extend('drag',function(){
	var tags=arguments;//用arguments获取参数赋给tags
	for(var i=0;i<this.elements.length;i++){
			addEvent(this.elements[i],'mousedown',function(e){
				if(trim(this.innerHTML).length==0) //trim函数在Btoll.js中作用是删除左右空白符
					preventDefault();//当为空时执行阻止默认行为函数
				var _this=this;
				var diffX=e.clientX-_this.offsetLeft;
				var diffY=e.clientY-_this.offsetTop;
				
				//自定义拖拽区域
				var flag=false;
				for(var i=0;i<tags.length;i++){
					if(e.target==tags[i]){
						flag=true;
						break;//只要有一个是true，就立刻返回
					}
				}
				
				if(flag){
					addEvent(document,'mousemove',move);
					addEvent(document,'mouseup',up);
					
				}else{
					removeEvent(document,'mousemove',move);
					removeEvent(document,'mouseup',up);
				}
				
				
				function move(e){
					var left=e.clientX-diffX;
					var top=e.clientY-diffY;
					if(left<0){
						left=0;
					}else if(left<=getScroll().left){//在有滚动条时 防止拖拽时 拖出了左边界
						left=getScroll().left;
					}else if(left>getInner().width+getScroll().left-_this.offsetWidth){
						left=getInner().width+getScroll().left-_this.offsetWidth;
					}
					
					if(top<0){
						top=0;
					}else if(top<=getScroll().top){//在有滚动条时 防止拖拽时 拖出了上边界
						top=getScroll().top;
					}else if(top>getInner().height+getScroll().top-_this.offsetHeight){
						top=getInner().height+getScroll().top-_this.offsetHeight;
					}
					
					_this.style.left=left+'px';
					_this.style.top=top+'px';
					if(typeof _this.setCapture!='undefined'){//阻止在IE浏览器中拖拽时底部出现空白（在鼠标按下时触发）即失去鼠标焦点 
					_this.setCapture();
				     }
					
				}
					
					function up(){
						removeEvent(document,'mousemove',move);
						removeEvent(document,'movseup',up);
						if(typeof _this.releaseCapture!='undefined'){//阻止在IE浏览器中拖拽时底部出现空白（在鼠标方开时触发）
						_this.releaseCapture();
						}
					}
			});
	 }
	 return this; 
});