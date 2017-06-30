
//浏览器检测
(function (){ //闭包
	 window.sys={};   //让外部可以访问，保存浏览器信息对象
	 var ua=navigator.userAgent.toLowerCase(); //获取浏览器信息字符串
	 var s;          //作为数组保存浏览器 名称和版本号；
	
	  //alert(ua);
	 //alert(ua.match(/msie ([\d.]+)/));
	 //IE
	/* if((/msie ([\d.]+)/).test(ua)){ 
		 s=ua.match(/msie ([\d.]+)/);
		 sys.ie=s[1];
	 }
	 //firefox
	 if((/firefox\/([\d.]+)/).test(ua)){  
		 s=ua.match(/firefox\/([\d.]+)/);
		 sys.firefox=s[1];
	 }
	 //chrome
	if((/chrome\/([\d.]+)/).test(ua)){  
		 s=ua.match(/chrome\/([\d.]+)/);
		 sys.chrome=s[1];
	 }
		//opera
	if((/opera\/.*version\/([\d.]+)/).test(ua)){  
		 s=ua.match(/opera\/.*version\/([\d.]+)/);
		 sys.opera=s[1];
	 }
	 //safari
	 if((/version\/([\d.]+).*safari/).test(ua)){  
		 s=ua.match(/version\/([\d.]+).*safari/);
		 sys.safari=s[1];
	 }*/
	 //三元表示方式
	
	 (s=ua.match(/msie ([\d.]+)/))?sys.ie=s[1]:
	 (s=ua.match(/firefox\/([\d.]+)/))?sys.firefox=s[1]:
	 (s=ua.match(/chrome\/([\d.]+)/))?sys.chrome=s[1]:
	 (s=ua.match(/opera\/.*version\/([\d.]+)/))?sys.opera=s[1]:
	 (s=ua.match(/version\/([\d.]+).*safari/))?sys.safari=s[1]:0;
	 if(/webkit/.test(ua)) sys.webkit=ua.match(/webkit\/([\d.]+)/)[1];
	})();

//DOM加载
function addDomLoaded(fn){
	var isReady=false;
	var timer=null;
	function doReady(){
		if(timer) clearInterval(timer);
		if(isReady) return;
		isReady=true;
		fn();	
	}
	if((sys.opera&&sys.opera<9)||(sys.firefox&&sys.firefox<3)||(sys.webkit&&sys.webkit<538)){
		timer=setInterval(function(){
			if(document&&document.getElementById&&document.getElementsByTagName&&document.body){
				doReady();
			}
		},1);
	}else if(document.addEventListener){	
		addEvent(document,'DOMContentLoaded',function(){
			fn();
			removeEvent(document,'DOMContentLoaded',arguments.callee);//arguments.callee获取传给函数的参数
		});
	}else if(sys.ie&&sys.ie<9){
		var timer=null;
		timer=setInterval(function(){
			try{
				document.documentElement.doScroll('left');//IE中我们根据document.documentElement.doScroll("left")出错，来判断DOM加载完毕
				doReady();	
			}catch(e){
			};
		});
	}
}	
	
//跨浏览器添加事件绑定
function addEvent(obj,type,fn){	
	if(typeof obj.addEventListener!='undefined'){//W3C添加事件
		obj.addEventListener(type,fn,false);//true表示捕获事件，false表示冒泡事件
	}else {//传统事件绑定解决IE的问题
		//创建一个存放事件的哈希表（散列表）
		
		if(!obj.events)obj.events={};
		
		//第一次执行时执行
		if(!obj.events[type]){
			//创建一个存放事件处理函数的数组
			obj.events[type]=[];
			//把第一次的事件处理函数先储存到第一个位置上
			if(obj['on'+type])obj.events[type][0]=fn;
		}else{
			//同一个注册函数进行屏蔽，不添加到计数器中
			if(addEvent.equal(obj.events[type],fn))return false;
		}
		//从第二个开始我们用事件计数器来存储
		obj.events[type][addEvent.ID++]=fn;
		//执行事件处理函数
		obj['on'+type]=addEvent.exec;
	}
}

//为每个函数分配一个计数器
addEvent.ID=1;

//执行事件处理函数
addEvent.exec=function(event){
	var e=event||addEvent.fixEvent(window.event);
	var es=this.events[e.type];
	for(var i in es){
		es[i].call(this,e);
	}
}

//同一个注册函数进行屏蔽
addEvent.equal=function(es,fn){
	for(var i in es){
		if(es[i]==fn)return true;
	}
	return false;
}

//把IE常用的Event对象配对到W3C中去
addEvent.fixEvent=function(event){
	event.preventDefault=addEvent.fixEvent.preventDefault;//阻止默认行为
	event.stopPropagation=addEvent.fixEvent.stopPropagation;//阻止冒泡
	event.target=event.srcElement;
	return event;
}
//IE阻止默认行为
addEvent.fixEvent.preventDefault=function(){
	this.returnValue=false;
}
//IE取消冒泡 
addEvent.fixEvent.stopPropagation=function(){
	this.cancelBubble=true;
}


//跨浏览器删除事件
function removeEvent(obj,type,fn){
	if(typeof obj.removeEventListener!='undefined'){//W3C
		obj.removeEventListener(type,fn,false);
	}else {
		if(obj.events){
			for(var i in obj.events[type]){
				if(obj.events[type][i]==fn){
					delete obj.events[type][i];
				}
			}
		}
		
	}
}


//跨浏览器获取视口大小
function getInner(){
	if(typeof window.innerWidth!='undefined'){//W3C
		return {
			width:window.innerWidth,
			height:window.innerHeight
		}
	}else{
		return{//IE
			width:document.documentElement.clientWidth,
			height:document.documentElement.clientHeight
		}
	}
	
}


//跨浏览器获取滚动条位置

function getScroll(){
	return{
top:document.documentElement.scrollTop||document.body.scrollTop,//后面的谷歌浏览器支持，前面的它不支持
left:document.documentElement.scrollLeft||document.body.scrollLeft
	}
}

//滚动条固定
function fixedScroll(){
	window.scrollTo(fixedScroll.left,fixedScroll.top);
}


//跨浏览器获取计算后的Style
function getStyle(element,attr){
	if(typeof window.getComputedStyle!='undefined'){//W3C
		return window.getComputedStyle(element,null)[attr];
	}else if(typeof element.currentStyle!='undefined'){//IE
		return element.currentStyle[attr];
	}
}
//判断class是否存在
function hasClass(element,className){
	return element.className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'));
}

//跨浏览器添加link规则
function insertRule(sheet,selectorText,cssText,position){
	if(typeof sheet.insertRule!='undefined'){//W3C
		 sheet.insertRule(selectorText+'{'+cssText+'}',position);
	 }else if(typeof sheet.addRule!='undefined'){//IE
		 sheet.addRule(selectorText,cssText,position);
	 }
}

//跨浏览器删除link规则
function deleteRule(sheet,index){
	if(typeof sheet.deleteRule!='undefined'){//W3C
		sheet.deleteRule(index);
	}else if(typeof sheet.removeRule!='undefined'){//IE
		sheet.removeRule(index);
	}
}

//跨浏览器获取innerText
 function getInnerText(element){
	 return(typeof element.textContent=='string' )?element.textContent:element.innerText;
 }

//跨浏览器设置innerText
function setInnerText(element,text){
	if(typeof element.textContent=='string'){
		element.textContent=text;
	}else{
		element.innerText=text;
	}
}

//删除左右空白
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g,'');
}

//获取某一个元素到最外层顶点的位置
function offsetTop(element){
	var top=element.offsetTop;
	var parent=element.offsetParent;//获得element的父元素
	while(parent!=null){
		top+=parent.offsetTop;
		parent=parent.offsetParent;//获得父元素的父元素
	}
	return top;
}

//滚动条清零
function scrollTop(){
	document.documentElement.scrollTop=0;
	document.body.scrollTop=0;
}

//判断value是否在数组array里
function inArray(array,value){
	for(var i in array){
		if(array[i]===value) return true;
	}
	return false;
}


//跨浏览阻止默认行为

function preDef(e){
	e.preventDefault();
}

//获取某一个节点的上一个节点的索引
function prevIndex(current,parent){//current是当前节点的索引，parent是当前元素的父节点
	var length=parent.children.length;
	if(current==0) return length-1;
	return parseInt(current)-1;
}

//获取某一个节点的上一个节点的索引
function nextIndex(current,parent){//current是当前节点的索引，parent是当前元素的父节点
	var length=parent.children.length;
	if(current==length-1) return 0;
	return parseInt(current)+1;
}

//创建Cookie
function setCookie(name,value,expires,path,domain,secure){
	var cookieText=encodeURIComponent(name)+'='+encodeURIComponent(value);//防止乱码
	if(expires instanceof Date){
		cookieText+=';expires'+expires;
	}
	if(path){
		cookieText+=';path'+path;
	}
	if(domain){
		cookieText+=';domain'+domain;
	}
	if(secure){
		cookieText+=';secure'+secure;
	}
	document.cookie=cookieText;
}

//获取Cookie
function getCookie(name){
	var cookieName=encodeURIComponent(name)+'=';
	var cookieStart=document.cookie.indexOf(cookieName);
	var cookieValue=null;
	if(cookieStart>-1){
		var cookieEnd=document.cookie.indexOf(';',cookieStart);
		if(cookieEnd==-1){
			cookieEnd=document.cookie.length;
		}
		cookieValue=decodeURIComponent(document.cookie.substring(cookieStart+cookieName.length,cookieEnd));
	}
	return cookieValue;
}

//删除Cookie
function unsetCookie(name){
	document.cookie=name+"=;expires="+new Date(0);
}





/*
//跨浏览器获取Event对象
function getEvent(event){
	return event||window.event;
}

//跨浏览阻止默认行为

function preDef(event){
	var e=getEvent(event);
	if(typeof e.preventDefault!='undefined'){//W3C
		e.preventDefault();
	}else{//IE
		e.returnValue=false;
	}
}
*/















