$().extend('serialize',function(){
	for(var i=0;i<this.elements.length;i++){
		//表单序列化
		var form=this.elements[i];
		 var parts={};
		 for(var j=0;j<form.elements.length;j++){
			 var filed=form.elements[j];
			 switch(filed.type){
				 case undefined:
				 case 'submt':
				 case 'reset':
				 case 'file':
				 case 'button':
					break;
				 case 'radio':
				 case 'checkbox':
					if(!filed.selected) break;
				 case 'select-one':
				 case 'select-multiple':
					for(var x=0;x<filed.options.length;x++){
						var option=filed.options[x];
						if(option.selected){
							var optValue='';
							if(option.hasAttribute){//非IE
								optValue=(option.hasAttribute('value')?option.value:option.text);
							}else{//IE 
								optValue=(option.attributes('value').specified ?option.value:option.text);
							}
							parts[filed.name]=optValue;
						}
					}
					break;
				 default:
					parts[filed.name]=filed.value;
			 }
		 }
		 return parts;
	}
	return this;

});