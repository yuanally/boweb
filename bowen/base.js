
//前台调用
 var $=function(args){
	 return new Elms(args);
 }//每次返回构造函数，是为了防止不元素进行相同操作时后面的操作覆盖前面的操作
 
 //基础库
 function Elms(args){
	 //创建一个数组，来保存获取的节点和节点数组
	 this.elements=[];//必须放在里面私有化，放外面就不被共享导致掩盖
	 if(typeof args=='string'){
		 //CSS模拟
		 if(args.indexOf(' ')!=-1){//表示有空格
			 var arrs=args.split(' ');//以空格拆分节点保存到数组里
			 var childArrs=[];      //存放临时节点对象的数组,解决被覆盖的问题
			 var node=[];         //用来存放父节点用的
			 for(var i=0;i<arrs.length;i++){
				 if(node.length==0) node.push(document);//如果默认没有父节点就把document放入
				 switch(arrs[i].charAt(0)){
					 case'#':
						childArrs=[];//清理掉临时节点，以便父节点失效，子节点有效
						childArrs.push(this.getId(arrs[i].substring(1)));
						node=childArrs;//因为childArrs要清理，所以需要node保存父节点
						break;
					 case'.':
							childArrs=[];
							for(var j=0;j<node.length;j++){
							   var node1=this.getClass(arrs[i].substring(1),node[j]);
							   for(var k=0;k<node1.length;k++){
								   childArrs.push(node1[k]);
							   } 
							}
							node=childArrs;
						break;
					 default:
						childArrs=[];
						for(var j=0;j<node.length;j++){
						   var node1=this.getTagName(arrs[i],node[j]);
						   for(var k=0;k<node1.length;k++){
							   childArrs.push(node1[k]);
						   } 
						}
						node=childArrs;
					}
			 }
			 this.elements=childArrs;
		 }else{
			 //find模拟
			 switch(args.charAt(0)){
				 case'#':
					this.elements.push(this.getId(args.substring(1)));
					break;
				 case'.':
					this.elements=this.getClass(args.substring(1));
					break;
				 default:
					this.elements=this.getTagName(args);
				}
			 }
	 }else if(typeof args=='object'){
		 if(args!=undefined){//args是一个对象，undefined也是一个对象，区别与typeof返回的带单引号的undefined
			this.elements[0]=args;
		 }
	 } else if(typeof args=='function'){
		 this.ready(args);
	 }
			
 }
 
// function id(id){
//	 return document.getElementById(id);
	 
// }

Elms.prototype.ready=function(fn){
	addDomLoaded(fn);
}
 
//获取ID节点
 Elms.prototype.getId=function(id){
		// this.elements.push(id(id));//另外写函数id() 利用闭包函数
		//	this.elements.push(document.getElementById(id));
		return document.getElementById(id);
	 };
 
	 
 //获取Class节点数组
Elms.prototype.getClass=function(className,parentNode){
	 var node=null;
	 var temps=[];
	 if(parentNode!=undefined){
		// node=id(idName);//利用函数id()来传值；
		node=parentNode;
	 }else {
		 node=document;
	 }
	 var all=node.getElementsByTagName('*');//获取所有节点
	 for(var i=0;i<all.length;i++){
		 // if(all[i].className==className)
		 if((new RegExp('(\\s|^)'+className+'(\\s|$)')).test(all[i].className)){
			 temps.push(all[i]);
		 }
	 }
	return temps;
 }
 
 //获取元素节点数组
Elms.prototype.getTagName=function(tag,parentNode){
		 var node=null;
		 var temps=[];
		 if(parentNode!=undefined){
			node=parentNode;
		 }else {
			 node=document;
		 }
		 var tags=node.getElementsByTagName(tag);//获取所有节点
		 for(var i=0;i<tags.length;i++){
				 temps.push(tags[i]);
		 }
		return temps;
		
	 }
	 
	 
//获取css选择器子节点（各层的子节点）	 
Elms.prototype.find=function(str){
	var childElements=[];
	 for(var i=0;i<this.elements.length;i++){
		 switch(str.charAt(0)){
			 case'#':
					childElements.push(this.getId(str.substring(1)));
					break;
			 case'.':
				
			 /*
				 var all=this.elements[i].getElementsByTagName('*');//获取所有节点
				 for(var j=0;j<all.length;j++){
					 if(all[j].className==str.substring(1)){
						 childElements.push(all[j]);
					 }
				 }*/
				 var temps=this.getClass(str.substring(1),this.elements[i]);
				 for(var j=0;j<temps.length;j++){
					 childElements.push(temps[j]);
				 }
				 break;
			 default:
			 /*
				var tags=this.elements[i].getElementsByTagName(str);
				for(var j=0;j<tags.length;j++){
					childElements.push(tags[j]);
				}*/
				var temps=this.getTagName(str,this.elements[i]);
				for(var j=0;j<temps.length;j++){
					 childElements.push(temps[j]);
				 }
		 } 
	}
	this.elements=childElements;
	return this;
}
 
 //获取某个节点,并返回Base对象
Elms.prototype.getElement=function(num){
	 var element=this.elements[num];
	 this.elements=[];
	 this.elements[0]=element;
	 return this;
 }
 
 //获取当前节点的同级的下个节点
 Elms.prototype.next=function(){
	 for(var i=0;i<this.elements.length;i++){
		 this.elements[i]=this.elements[i].nextSibling;
		 if(this.elements[i]==null) throw new Error('找不到下一个同级元素节点！');
		 if(this.elements[i].nodeType==3) this.next();	 
	}
	return this;
 }
 
 //获取当前节点的同级的上个节点
 Elms.prototype.prev=function(){
	 for(var i=0;i<this.elements.length;i++){
		 this.elements[i]=this.elements[i].previousSibling;
		 if(this.elements[i]==null) throw new Error('找不到上一个同级元素节点！');
		 if(this.elements[i].nodeType==3)this.prev();	 
	}
	return this;
 }
  
 //获取某个节点,并返回这个节点对象
 Elms.prototype.getE=function(num){
	 return this.elements[num];
 }
 
 //获取首个节点并返回这个节点对象
  Elms.prototype.first=function(){
	  return this.elements[0];
  };
  
 //获取末尾个节点并返回这个节点对象
 Elms.prototype.last=function(){
	  return this.elements[this.elements.length-1];
  };
 
 //addDomLoaded
 Elms.prototype.ready=function(fn){
	addDomLoaded(fn);
 }
 
 
 //获取与设置css
Elms.prototype.css=function(attr,value){
	 for(var i=0;i<this.elements.length;i++){
		 if(arguments.length==1){//获取css
			 
			 return getStyle(this.elements[i],attr);//getStyle()在Btool.js文件里
		 }
		 //设置css
		 this.elements[i].style[attr]=value;
	 }
	 return this;
 }
 
 //获取某个元素的个数
 Elms.prototype.length=function(){
	 return this.elements.length;
 }
 
 //添加Class
 Elms.prototype.addClass=function(className){
	 for(var i=0;i<this.elements.length;i++){		 
		if(!hasClass(this.elements[i],className)){//hasClass()在Btool.js文件里
			this.elements[i].className+=' '+className;
		}
	 }
	 return this;
 }
 
 //移除Class
  Elms.prototype.removeClass=function(className){
	  for(var i=0;i<this.elements.length;i++){
		  if(hasClass(this.elements[i],className)){//hasClass()在Btool.js文件里
			  this.elements[i].className=this.elements[i].className.replace(new RegExp('(\\s|^)'+className+'(\\s|$)'),' ');
		  }
	  }
	  
	  return this;
  }
 
 //添加link或style的css规则
 Elms.prototype.addRule=function(num,selectorText,cssText,position){//num指的是第几条link，后面的参数是这link里的选择器，css内容和位置
	 var sheet=document.styleSheets[num];
	 insertRule(sheet,selectorText,cssText,position);//insertRule()在Btool.js文件里
	return this;
 }
 
 //移除link或style的Css规则
 Elms.prototype.removeRule=function(num,index){//num指的是第几条link，index指的是这link的CSS的第几个选择器的样式 
	 var sheet=document.styleSheets[num];
	deleteRule(sheet,index);//deleteRule()在Btool.js文件里
	 return this;
 }
 
 //设置innerHTML获取元素内容（包括元素内的元素标签）
Elms.prototype.html=function(str){
	 for(var i=0;i<this.elements.length;i++){
		 if(arguments.length==0){
			 return this.elements[i].innerHTML;
		 }
		 this.elements[i].innerHTML=str;
	 }
	 return this;
 }
 
 //设置innerText获取元素内容（不包括元素内的元素标签）
Elms.prototype.innerText=function(str){
	 for(var i=0;i<this.elements.length;i++){
		 if(arguments.length==0){
			 return getInnerText(this.elements[i]);
		 }
		  setInnerText(this.elements[i],str);
	 }
	 return this;
 }
 
 //设置某个节点的透明度
 Elms.prototype.opacity=function(num){
	 for(var i=0;i<this.elements.length;i++){
		 this.elements[i].style.opacity=num/100;
		 this.elements[i].style.filter='alpha(opacity='+num+')';
	 }
	 return this;
 }
 
 //设置表单字段元素
 Elms.prototype.form=function(name){
	  for(var i=0;i<this.elements.length;i++){
		  this.elements[i]=this.elements[i][name];
		   }
	 return this;
 }
 
 //获取表单字段内容
 Elms.prototype.value=function(str){
	 for(var i=0;i<this.elements.length;i++){
		 if(arguments.length==0){
			 return this.elements[i].value;
		 }
		 this.elements[i].value=str;
	 }
	 return this;
 }
 
 //获取和设置某节点的属性
 Elms.prototype.attr=function(attr,value){
	 for(var i=0;i<this.elements.length;i++){
		 if(arguments.length==1){
			return this.elements[0].getAttribute(attr);
		 }else if(arguments.length==2){
			  this.elements[0].setAttribute(attr,value);
		 }
	  }
	 return this;
 }
 
 //获取某个节点在整个节点组中的位置索引
 Elms.prototype.index=function(){
	 var children=this.elements[0].parentNode.children;
	 for(var i=0;i<children.length;i++){
		 if(this.elements[0]==children[i]) return i;
	 }
 }
 
 
 //设置鼠标移入移出方法
 Elms.prototype.hover=function(over,out){
	 for(var i=0;i<this.elements.length;i++){
		// this.elements[i].onmouseover=over;
		 //this.elements[i].onmouseout=out;
		 addEvent(this.elements[i],'mouseover',over);
		 addEvent(this.elements[i],'mouseout',out)
	 }
	 
	 return this;
 }
 
 
 //设置点击切换方法
 Elms.prototype.toggle=function(){
	  for(var i=0;i<this.elements.length;i++){
		 (function(element,args){//闭包防止count共用
			 var count=0;
			 addEvent(element,'click',function(){
				args[count++%args.length].call(this);//用call冒充this.elements[i]也就是this指的作用域，使操作的对象就是点击的对象
			  //count++;
			 // if(count>=args.length) count=0;
			  
		  });//arguments[i]直接放 addEvent的后面作为function不需家括号，但是在function内需要后面加括号
		 })(this.elements[i],arguments)
		 
	  }
	  return this; 
 }
 
 //设置显示函数
 Elms.prototype.show=function(){
	 for(var i=0;i<this.elements.length;i++){
		 this.elements[i].style.display='block';
	 }
	 return this;
 }
 
 //设置隐藏函数
  Elms.prototype.hide=function(){
	 for(var i=0;i<this.elements.length;i++){
		 this.elements[i].style.display='none';
	 }
	 return this;
 }
 
 //居中显示
 Elms.prototype.center=function(width,height){
	 var top=(getInner().height-height)/2+getScroll().top;
	 var left=(getInner().width-width)/2+getScroll().left;
	 for(var i=0;i<this.elements.length;i++){
		 this.elements[i].style.top=top+'px';
		 this.elements[i].style.left=left+'px';
	 }
	 return this;
 }
 
 //锁屏事件
 Elms.prototype.lock=function(){
	 for(var i=0;i<this.elements.length;i++){
		fixedScroll.top=getScroll().top;
		 fixedScroll.left=getScroll().left;
		 this.elements[i].style.width=getInner().width+getScroll().left+'px';//getInner()跨浏览器获取视口大小
		 this.elements[i].style.height=getInner().height+getScroll().top+'px';
		 this.elements[i].style.display='block';
		  parseFloat(sys.firefox)<4?document.body.style.overflow='hidden':document.documentElement.style.overflow='hidden';//防止生成滚动条
		 //addEvent(window,'scroll',scrollTop);//scrollTop函数在Btool.js文件里
		 
		 //禁止屏幕文本选中操作
		addEvent(this.elements[i],'mousedown',preDef);
		addEvent(this.elements[i],'mouseup',preDef);
		addEvent(this.elements[i],'selectstar',preDef);//IE禁止拖动
		addEvent(window,'scroll',fixedScroll);
		 
	 }
	 return this;
 }
 
 //锁屏消失
  Elms.prototype.unlock=function(){
	 for(var i=0;i<this.elements.length;i++){
		 this.elements[i].style.display='none';
		 parseFloat(sys.firefox)<4?document.body.style.overflow='auto':document.documentElement.style.overflow='auto';//有滚动条时自然生成
		 removeEvent(window,'scroll',scrollTop);//scrollTop函数在Btool.js文件里
		 
		 //移出禁止操作
		 removeEvent(this.elements[i],'mousedown',preDef);
		 removeEvent(this.elements[i],'mouseup',preDef);
		 removeEvent(this.elements[i],'selectstar',preDef);
		removeEvent(window,'scroll',fixedScroll);
	 }
	 return this;
 }
 
 //触发点击事件
Elms.prototype.click=function(fn){
	 for(var i=0;i<this.elements.length;i++){
		 this.elements[i].onclick=fn;
	 }
	 return  this;
 }
 
 //设置事件发生器
 Elms.prototype.bind=function(event,fn){
	  for(var i=0;i<this.elements.length;i++){
		addEvent(this.elements[i],event,fn);
	 }
	 return  this;
 }
 
 
 //改变浏览器窗口大小事件
Elms.prototype.resize=function(fn){
	 for(var i=0;i<this.elements.length;i++){
		 var element=this.elements[i]; 
		/*window.onresize=function(){
			fn();
			if(element.offsetLeft>getInner().width-element.offsetWidth){
				element.style.left=getInner().width-element.offsetWidth+'px';
			}
			if(element.offsetTop>getInner().height-element.offsetHeight){
				element.style.top=getInner().height-element.offsetHeight+'px';
			}
		};*/
		
		addEvent(window,'resize',function(){
			fn();
			if(element.offsetLeft>getInner().width+getScroll().left-element.offsetWidth){
				element.style.left=getInner().width+getScroll().left-element.offsetWidth+'px';
				if(element.offsetLeft<=0+getScroll().left){
					element.style.left=0+getScroll().left+'px';
				}
			}
			if(element.offsetTop>getInner().height+getScroll().top-element.offsetHeight){
				element.style.top=getInner().height+getScroll().top-element.offsetHeight+'px';
				if(element.offsetTop<=0+getScroll().top){
					element.style.top=0+getScroll().top+'px';
				}
			
			}
		});
	 }
	 return  this;
} 

//设置动画（对Css进行的操作）
Elms.prototype.animate=function(obj){
	for(var i=0;i<this.elements.length;i++){
		var em=this.elements[i];//this.elements[i]必须在setinterval外面赋值给一个变量，不能直接放到setinterval里面，否则会出错
		//var attr=obj['attr']!=undefined?obj['attr']:'left';//可选，left和top两种选其一
		var attr=obj['attr']=='x'?'left':obj['attr']=='y'?'top':obj['attr']=='w'?'width':obj['attr']=='h'?'height':obj['attr']=='o'?'opacity':obj['attr']!=undefined?obj['attr']:'left';
		
		var start=obj['start']!=undefined?obj['start']:attr=='opacity'?parseFloat(getStyle(em,attr))*100:parseInt(getStyle(em,attr));//可选，默认是css的起始值
		
		var t=obj['t']!=undefined?obj['t']:10;//可选，默认是50毫秒
		var step=obj['step']!=undefined?obj['step']:20;//可选，默认是1步
		//var target=obj['add']+start;//必选 运行的改变量
		
		var speed=obj['speed']!=undefined?obj['speed']:6;//缓冲速度可选，默认6
		var type=obj['type']==0?'constant':obj['type']==1?'buffer':'buffer';		//可选，0表示匀速，1表示缓冲，默认缓冲
		var add=obj['add'];
		var target=obj['target'];
		var mul=obj['mul'];
		
		
		if(add!=undefined&&target==undefined){
			target=add+start;
		}else if(add==undefined&&target==undefined&&mul==undefined){
			throw new Error('add增量和target目标量必须填一个!');
		}
		
	
		if(parseInt(getStyle(em,attr))>target) step=-step;
		/*
		if(attr=='opacity'){
			em.style.opacity=parseInt(start)/100;
			em.style.filter='alpha(opacity='+parseInt(target)+')';
		}else{
			em.style[attr]=start+'px';
		}*/
		 
		
		if(mul==undefined){//如果没有传mul对象而是进行一个动画只传了target或add就要创建mul对象
			mul={};
			mul[attr]=target;
		}
		
		
		clearInterval(em.timer);//每次重新运行或不停点击按钮时进来就要清空timer方式叠加加速
		em.timer=setInterval(function(){
			
			/*
				问题1：多个动画执行了多个列队动画，我们不管多少个动画只执行一个队列动画
				问题2：多个动画数值差别太大，导致动画无法执行到目标值，原因是定时器提前清理掉了
				
				解决1：不管多少个动画，只提供一次列队动画的机会
				解决2：多个动画按最后一个分动画执行完毕后再清理掉
			*/
			//创建一个布尔值，这个值可以了解多个动画是否全部执行完毕
			var flag=true; //表示都执行完毕了
			
			
			for(var i in mul){
				attr=i=='x'?'left':i=='y'?'top':i=='w'?'width':i=='h'?'height':i=='o'?'opacity':i!=undefined?i:'left';
				
				target=mul[i];
			
				if(type=='buffer'){//表示缓冲运动
					step=attr=='opacity'?(target-parseFloat(getStyle(em,attr))*100)/speed:(target-parseInt(getStyle(em,attr)))/speed;
					step=step>0?Math.ceil(step):Math.floor(step);
				}
				
				
				if(attr=='opacity'){//透明度渐变动画
					if(step==0){
						setOpacity();
					}else if(step>0&& Math.abs(parseFloat(getStyle(em,attr))*100-parseInt(target))<=step){//解决突兀
						setOpacity();
					}else if(step<0&& Math.abs(parseFloat(getStyle(em,attr))*100-parseInt(target))<Math.abs(step)){
						setOpacity();
						
					}else{//放在else里永远不会和停止运动同时执行，但是会导致突兀运动颤抖一下
						var temp=parseFloat(getStyle(em,attr))*100;
						em.style.opacity=parseInt(temp+step)/100;
						em.style.filter='alpha(opacity='+parseInt(temp+step)+')';
					}
					if(parseInt(target)!=parseInt(parseFloat(getStyle(em,attr))*100)){
						flag=false;
					} else{flag=true;
					}
					
				}else{//运动动画
					if(step==0){
						setTarget();
					}else if(step>0&& Math.abs(parseInt(getStyle(em,attr))-parseInt(target))<=step){//解决突兀
						setTarget();
					}else if(step<0&& Math.abs(parseInt(getStyle(em,attr))-parseInt(target))<Math.abs(step)){
						setTarget();
						
					}else{//放在else里永远不会和停止运动同时执行，但是会导致突兀运动颤抖一下
						em.style[attr]=parseInt(getStyle(em,attr))+step+'px';
					}
					
					if(parseInt(target)!=parseInt(getStyle(em,attr))) {
						flag=false;
					}else{
						flag=true;
					}
					//for里面，前一个flag值会被后面的for得到的值覆盖，直到最后那个动画到达时flag才为true
					
				}
				//document.getElementById('test').innerHTML+=i+'--'+flag+'<br/>';
			}	
			if(flag){//在for外在setInterval里，flag为for最后的值，然后再执行清理，最终解决多个动画执行列动画和多个动画差值大的问题
				clearInterval(em.timer);//当到达目标地点就停下
				if(obj.fn!=undefined) obj.fn();//使动画可以列队执行
			}
			//document.getElementById('aa').innerHTML+=step+'<br/>';
		},t);
		function setTarget(){
			em.style[attr]=target+'px';
			
		}
		function setOpacity(){
			em.style.opacity=parseInt(target)/100;
			em.style.filter='alpha(opacity='+parseInt(target)+')';
		}
		
	}
	//PS:参数只有left和top，没有righ和buttom，如果向左移动，step设为负值，并且target应该小于本身的left，以此类推。	
	return this;
	
}
 
 
 //插件入口
 Elms.prototype.extend=function(name,fn){
	 Elms.prototype[name]=fn;
 }
 

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 