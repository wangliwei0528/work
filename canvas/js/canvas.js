$(function(){
	var canvas=document.getElementsByTagName("canvas")[0];
	var copy=document.getElementsByClassName("canvasCopy")[0];
	var cObj=canvas.getContext("2d");
	var shapes=new Shape(cObj,canvas,copy);
	//画图类型
	$(".toolsone:eq(1)").find("i").not(".sanjiao").click(function(){
		 shapes.type=$(this).attr("data-role");
		 shapes.draw();
		clear.css("display","none");
	 });

	$(".sanjiao").click(function(){
		shapes.type="polygons";
		shapes.sidenum=$(this).attr("data-role");
		shapes.draw();
		clear.css("display","none");
	});
	//画图方式
	$(".drawstyle").find(".option").click(function(){
		 shapes.style=$(this).attr("data-role");
		 shapes.draw();
		clear.css("display","none");
	 });

	//线条粗细
	$(".cuxi").find("li").click(function(){
		 shapes.lineWidth=$(this).attr("data-role");
		 shapes.draw();
		clear.css("display","none");
	 });

	//描边颜色
	$("input:eq(0)").change(function(){
		 shapes.strokeStyle=$(this).val();
		 shapes.draw();
		clear.css("display","none");
	 });
	//填充颜色
	$("input:eq(1)").change(function(){
		 shapes.fillStyle=$(this).val();
		 shapes.draw();
		clear.css("display","none");
	 });

	//多边
	$(".duobian").find("li").click(function(){
		shapes.type="polygons";
		shapes.sidenum=$(this).attr("data-role");
		shapes.draw();
		clear.css("display","none");
	});
	//角
	$(".duojiao").find("li").click(function(){
		shapes.type="polygonsa";
		shapes.anglenum=$(this).attr("data-role");
		shapes.draw();
		clear.css("display","none");
	});


	$(".file").find("li").click(function(){
		 var index=$(".file li").index(this);
		//新建
		if(index==0){
			if(shapes.history.length>0) {
				$(".isSave").css({transform: "scale(1)", display: "block"});
			}
				$(".isSave a:eq(0)").click(function(){
					var str=canvas.toDataURL().replace("data:image/png","data:stream/octet");
					location.href=str;
					$(".isSave").css({transform:"scale(0)"});
					shapes.cObj.clearRect(0, 0, 800, 470);
					shapes.history=[];
				});
				$(".isSave a:eq(1)").click(function(){
					$(".isSave").css({transform:"scale(0)"});
					shapes.cObj.clearRect(0, 0, 800, 470);
					shapes.history=[];
				});
			}

		//返回
		if(index==1){
			if(shapes.history.length==0){
				shapes.cObj.clearRect(0, 0, 800, 470);
				alert("不能返回");
				return;
			}else{
					var last=shapes.history.pop();
					cObj.putImageData(last,0,0);
			}
		}

		//保存
		if(index==2){
			var str=canvas.toDataURL().replace("data:image/png","data:stream/octet");
			location.href=str;
		}
		clear.css("display","none");
	 });

	//改变画板颜色
	$(".toolsone:eq(0)").find("i:eq(1)").click(function(){
		var color=$("input:eq(1)").val();
		$("canvas").css("background",color);
		clear.css("display","none");
	});

	//铅笔
	$(".toolsone:eq(0)").find("i:eq(0)").click(function(){
		shapes.qianbi();
		clear.css("display","none");
	});

	//清空
	$(".toolsone:eq(0)").find("i:eq(2)").click(function(){
			cObj.clearRect(0,0,shapes.width,shapes.height);
			shapes.history=[];
		clear.css("display","none");
	})

	//快捷撤销
	$(".toolsone:eq(0)").find("i:eq(3)").click(function(){
		if(shapes.history.length==0){
			alert("不能返回");
			return;
		}else{
			var OBJ=shapes.history.pop();
			cObj.putImageData(OBJ,0,0)
		}
		clear.css("display","none");
	})

	//快捷新建
	$(".toolsone:eq(0)").find("i:eq(4)").click(function(){
		if(shapes.history.length>0) {
			$(".isSave").css({transform: "scale(1)", display: "block"});
			clear.css("display","none");
		}
		$(".isSave a:eq(0)").click(function(){
			clear.css("display","none");
			var str=canvas.toDataURL().replace("data:image/png","data:stream/octet");
			location.href=str;
			$(".isSave").css({transform:"scale(0)"});
			shapes.cObj.clearRect(0, 0, 800, 470);
			shapes.history=[];
		});
		$(".isSave a:eq(1)").click(function(){
			clear.css("display","none");
			$(".isSave").css({transform:"scale(0)"});
			shapes.cObj.clearRect(0, 0, 800, 470);
			shapes.history=[];
		});
	})

	//快捷保存
	$(".toolsone:eq(0)").find("i:eq(5)").click(function(){
		var str=canvas.toDataURL().replace("data:image/png","data:stream/octet");
		location.href=str;
		clear.css("display","none");
	})

	//橡皮
	var clear=$(".clear");
	$(".canvasCopy").mousedown(function(e){
		e.preventDefault()
	});
	clear.mousedown(function(e){
		e.preventDefault();
	});

	$(".toolsone:eq(0)").find("i:eq(6)").click(function(){
		clear.css({display:"block"});
		copy.addEventListener("mousemove",aa,false);
		function aa(e){
			var x=e.offsetX;
			var y=e.offsetY;
			clear.css({top:y,left:x});
		}
		copy.onmousedown=function(e){
			copy.onmousemove=function(e){
				var x= e.offsetX;
				var y= e.offsetY;
				clear.css({top:y,left:x});
				shapes.cObj.clearRect(x-10, y-10, 10, 10)
			}
		}
		copy.onmouseup=function(){
			copy.onmousemove=function(e){
				var x= e.offsetX;
				var y= e.offsetY;
				clear.css({top:y,left:x})
			}
		}

	})

	//阻止浏览器的默认行为
	function stopDefault( e ) {
		//阻止默认浏览器动作(W3C)
		if ( e && e.preventDefault )
			e.preventDefault();
		//IE中阻止函数器默认动作的方式
		else
			window.event.returnValue = false;
		return false;
	}

	//ctrl+z
	function z(e){
		if(e.ctrlKey==true && e.keyCode==90){
			if(shapes.history.length==0){
				alert("不能返回");
				return;
			}else{
				var OBJ=shapes.history.pop();
				cObj.putImageData(OBJ,0,0)
			}
		}
	}
document.addEventListener("keydown",z,false);


//ctrl+n
	function n(e){
		if(e.ctrlKey==true && e.shiftKey==true  && e.altKey==true  && e.keyCode==78){
			stopDefault();
			if(shapes.history.length>0) {
				$(".isSave").css({transform: "scale(1)", display: "block"});
				clear.css("display","none");
			}
			$(".isSave a:eq(0)").click(function(){
				clear.css("display","none");
				var str=canvas.toDataURL().replace("data:image/png","data:stream/octet");
				location.href=str;
				$(".isSave").css({transform:"scale(0)"});
				shapes.cObj.clearRect(0, 0, 800, 470);
				shapes.history=[];
			});
			$(".isSave a:eq(1)").click(function(){
				clear.css("display","none");
				$(".isSave").css({transform:"scale(0)"});
				shapes.cObj.clearRect(0, 0, 800, 470);
				shapes.history=[];
			});
		}
	}
	document.addEventListener("keydown",n,false);

	//ctrl+s
	document.addEventListener("keydown",s,false);
	function s(e) {
		if(e.ctrlKey==true && e.keyCode==83) {
			var str = canvas.toDataURL().replace("data:image/png", "data:stream/octet");
			location.href = str;
		}
	}

});