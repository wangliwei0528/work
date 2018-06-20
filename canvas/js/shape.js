function Shape(cObj, canvas,copy) {
	if (!cObj) {
		console.log("请传入2d对象");
		return;
	}
	this.cObj = cObj;//保存2d对象供方法使用
	this.canvas = canvas;//获取canvas的宽高
	this.copy=copy;
	this.width = canvas.width;
	this.height = canvas.height;
	this.type = "line";//画图类型 line rect arc
	this.lineWidth = 1;//画边框的宽度
	this.fillStyle = "#000";//填充的颜色
	this.strokeStyle = "#000";//边框的颜色
	this.style = "stroke"; //画图方式 边框 填充
	this.history = [];//存放历史记录
	this.sidenum=5;
	this.anglenum=5;
}
Shape.prototype = {
	//初始化样式
	init: function () {
		this.cObj.lineWidth = this.lineWidth;
		this.cObj.fillStyle = this.fillStyle;
		this.cObj.strokeStyle = this.strokeStyle;
	},
	//画图
	draw: function () {
		var that = this;
		var canvas=that.copy;
		canvas.onmousedown = function (e) {
			var startX = e.offsetX;
			var startY = e.offsetY;
			that.data=that.cObj.getImageData(0,0,that.width,that.height);
			canvas.onmousemove = function (e) {
				var endX = e.offsetX;
				var endY = e.offsetY;
				that.cObj.clearRect(0, 0, that.width, that.height);
				if(that.data.data.length>0){
					that.cObj.putImageData(that.data,0,0);
				}
				that.init();
				that[that.type](startX, startY, endX, endY);
			};
			canvas.onmouseup = function (e) {
				canvas.onmouseup = null;
				canvas.onmousemove = null;
				that.history.push(that.data);
			}
		}
	},
	//画线
	line: function (sx, sy, ex, ey) {
		this.cObj.beginPath();
		this.cObj.moveTo(sx, sy);
		this.cObj.lineTo(ex, ey);
		this.cObj.closePath();
		this.cObj.stroke();
	},
	//画矩形
	rect: function (sx, sy, w, h) {
		this.cObj.beginPath();
		this.cObj.rect(sx, sy, w - sx, h - sy);//四个参数分别为起始点x、y、宽、高
		this.cObj.closePath();
		this.cObj[this.style]();
	},
	//画圆
	arc: function (sx, sy, ex,ey) {
		this.cObj.beginPath();
		var r=Math.sqrt((ex-sx)*(ex-sx)+(ey-sy)*(ey-sy));
		this.cObj.arc(sx, sy, r ,0,2*Math.PI);
		this.cObj.closePath();
		this.cObj[this.style]();
	},
	//画多边形
	polygons:function(sx, sy, ex,ey){
		var r=Math.sqrt((ex-sx)*(ex-sx)+(ey-sy)*(ey-sy));
		var a=360/this.sidenum;
		this.cObj.beginPath();
		for(var i=0;i<this.sidenum;i++){
			this.cObj.lineTo(sx+Math.cos((a*i+55)*Math.PI/180)*r,sy+Math.sin((a*i+55)*Math.PI/180)*r);
		}
		this.cObj.closePath();
		this.cObj[this.style]();
	},
	polygonsa:function(x,y,x1,y1){
		var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
		var r1=r/3;
		var a=360/(this.anglenum*2);
		this.cObj.beginPath();
		for(var i=0;i<this.anglenum*2;i++){
			if(i%2==0){
				this.cObj.lineTo(x+Math.cos((a*i+55)*Math.PI/180)*r,y+Math.sin((a*i+55)*Math.PI/180)*r);
			}else{
				this.cObj.lineTo(x+ Math.cos((a*i+55)*Math.PI/180)*r1, y+Math.sin((a*i+55)*Math.PI/180)*r1);
			}
		}
		this.cObj.closePath();
		this.cObj[this.style]();
	},
	qianbi:function(){
		var that = this;
		var canvas=that.copy;
		canvas.onmousedown = function (e) {
			var startX = e.offsetX;
			var startY = e.offsetY;
			that.cObj.beginPath();
			that.cObj.moveTo(startX,startY); 
			canvas.onmousemove = function (e) {
				var endX = e.offsetX;
				var endY = e.offsetY;
				that.data=that.cObj.getImageData(0,0,800,470);
				that.cObj.lineTo(endX,endY);
				that.cObj.stroke();
			};
			canvas.onmouseup = function (e) {
				canvas.onmouseup = null;
				canvas.onmousemove = null;
				that.cObj.closePath();
				if(that.data.data.length>0){
					that.cObj.putImageData(that.data,0,0);
				}
				that.history.push(that.data);
			}
		}
	},
	era:function(){
		
	}
}