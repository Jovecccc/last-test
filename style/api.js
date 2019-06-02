(function (){
	var xhr = new XMLHttpRequest();
	xhr.open("get","https://www.tianqiapi.com/api/?version=v1",true);
	xhr.send();
	xhr.onreadystatechange = function (){
		if(xhr.readyState==4 && xhr.status==200){
			var apidata = JSON.parse(xhr.responseText);	
			dataupdata(apidata)
			
		}
	}
})();

var dataupdata = function (obj){
	document.getElementsByClassName("city")[0].innerHTML = obj.city;
	document.getElementsByClassName("climate")[0].innerHTML = obj.data[0].wea;
	document.getElementsByClassName("temperature")[0].innerHTML = obj.data[0].tem;
	document.getElementsByClassName("humidity")[0].innerHTML = "空气湿度" + "  " + obj.data[0].humidity;
	document.getElementsByClassName("tip")[0].innerHTML = obj.data[0].air_tips;
	document.getElementsByClassName("today")[0].children[0].children[0].innerHTML = obj.data[0].day;
	document.getElementsByClassName("today")[0].children[0].children[1].innerHTML = obj.data[0].tem2 + "/" + obj.data[0].tem1;
	document.getElementsByClassName("tomorrow")[0].children[0].children[0].innerHTML = obj.data[1].day;
	document.getElementsByClassName("tomorrow")[0].children[0].children[1].innerHTML = obj.data[1].tem2 + "/" + obj.data[1].tem1;
	document.getElementsByClassName("today")[0].children[1].children[0].innerHTML = obj.data[0].wea;
	document.getElementsByClassName("tomorrow")[0].children[1].children[0].innerHTML = obj.data[0].wea;


	for(i=0; i<obj.data[0].hours.length; i++){
		document.getElementsByClassName("i_time")[i].innerHTML = obj.data[0].hours[i].day;
	}
	for(i=0; i<obj.data[1].hours.length; i++){
		j=i+obj.data[0].hours.length;
		document.getElementsByClassName("i_time")[j].innerHTML = obj.data[1].hours[i].day;
	}
	if(24-obj.data[0].hours.length-obj.data[1].hours.length>8){
		for(i=0; i<obj.data[2].hours.length; i++){
			k=i+obj.data[0].hours.length+obj.data[1].hours.length;
			document.getElementsByClassName("i_time")[k].innerHTML = obj.data[2].hours[i].day;
		}
		for(i=0; i<24-obj.data[2].hours.length-obj.data[1].hours.length-obj.data[0].hours.length; i++){
			document.getElementsByClassName("i_time")[i+obj.data[2].hours.length+obj.data[1].hours.length+obj.data[0].hours.length].innerHTML = obj.data[3].hours[i].day;
		}
	}else{
		for(i=0; i<obj.data[2].hours.length; i++){
			k=i+obj.data[0].hours.length+obj.data[1].hours.length;
			document.getElementsByClassName("i_time")[k].innerHTML = obj.data[2].hours[i].day;
		}
	}

	for(i=0; i<document.getElementsByClassName("item").length; i++){
		if(i<obj.data[0].hours.length){
			var l = obj.data[0].hours[i].wea;
		}else if(i-obj.data[0].hours.length < obj.data[1].hours.length){
			var l = obj.data[1].hours[i-obj.data[0].hours.length].wea;
		}else if(i-obj.data[0].hours.length-obj.data[1].hours.length < obj.data[2].hours.length){
			var l = obj.data[2].hours[i-obj.data[0].hours.length-obj.data[1].hours.length].wea;
		}else if(i-obj.data[0].hours.length-obj.data[1].hours.length-obj.data[2].hours.length < obj.data[3].hours.length){
			var l = obj.data[3].hours[i-obj.data[0].hours.length-obj.data[1].hours.length-obj.data[2].hours.length].wea;
		}

		switch (l){
			case "晴":
				document.getElementsByClassName("item")[i].children[1].setAttribute("class","iconfont icon-qing");
				break;
			case "阴":
				document.getElementsByClassName("item")[i].children[1].setAttribute("class","iconfont icon-tianqi-1");
				break;
			case "多云":
				document.getElementsByClassName("item")[i].children[1].setAttribute("class","iconfont icon-tianqi-1");
				break;
			default :
				document.getElementsByClassName("item")[i].children[1].setAttribute("class","iconfont icon-tianqi-3");
				break;
		}
	}

	for(i=0; i<24; i++){
		if(i<obj.data[0].hours.length){
			document.getElementsByClassName("h_tem")[i].innerHTML = obj.data[0].hours[i].tem;
		}else if(i-obj.data[0].hours.length < obj.data[1].hours.length){
			document.getElementsByClassName("h_tem")[i].innerHTML = obj.data[1].hours[i-obj.data[0].hours.length].tem;
		}else if(i-obj.data[0].hours.length-obj.data[1].hours.length < obj.data[2].hours.length){
			document.getElementsByClassName("h_tem")[i].innerHTML = obj.data[2].hours[i-obj.data[0].hours.length-obj.data[1].hours.length].tem;
		}else if(i-obj.data[0].hours.length-obj.data[1].hours.length-obj.data[2].hours.length < obj.data[3].hours.length){
			document.getElementsByClassName("h_tem")[i].innerHTML = obj.data[2].hours[i-obj.data[0].hours.length-obj.data[1].hours.length-obj.data[2].hours.length].tem;
		}
	}

	for(i=0; i<6; i++){
		document.getElementsByClassName("l_items")[0].children[i].children[1].innerHTML = obj.data[0].index[i].title;
		document.getElementsByClassName("l_items")[0].children[i].children[2].innerHTML = obj.data[0].index[i].level;
		document.getElementsByClassName("l_items")[0].children[i].children[3].innerHTML = obj.data[0].index[i].desc;

	}

}
function update(){
	var xhr = new XMLHttpRequest();
	xhr.open("get","https://www.tianqiapi.com/api/?version=v1",true);
	xhr.send();
	xhr.onreadystatechange = function (){
		if(xhr.readyState==4 && xhr.status==200){
			var apidata = JSON.parse(xhr.responseText);	
			dataupdata(apidata)
			
		}
	}
}
setInterval(update(),10000);
