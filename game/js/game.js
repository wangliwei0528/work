/*面向对象
 属性：描述对象特征
             掉落个数     下落速度          字符        位置         从哪开始下落            关卡            得分扣分生命值        奖励
 方法：对象可以实现的功能
             产生(几个、那些)      开始游戏             消除        进入下一关      重新开始   
             
             计分   开机动画    下一关   去重叠
  */
 function Game(){
 	//产生字符   键盘码不区分大小写故而用大写
 	this.charSheet=["Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Z","X","C","V","B","N","M"];
 	//产生个数  一次产生几个
 	this.length=5;
 	//保存页面中的元素
 	this.element=[];
 	this.position=[];
 	this.speed=10; 	
 	//初始得分
 	this.score=0;
 	//属性初始生命值
 	this.scoreObj=document.querySelector("div.score:first-child>span");
 	//定义关卡
 	this.gq=10;
 }
Game.prototype={
	start:function(){
	   //产生字符
	   this.getChars(this.length);
	   //调用下落的方法
	   this.drop();
//	   this.next();
	   //去重
//	   this.norepeat()
	   //点击键盘消字
	   let that=this;
	   document.onkeydown=function(e){
	   	//数字----字母fromCharCode（）   字母转数字   CharCodeAt（）
	   	   let keycode=String.fromCharCode(e.keyCode);
	   	   for(let i=0;i<that.element.length;i++){
	   	   	  if(keycode==that.element[i].innerText){
	   	   	  	//分值累加
	   	   	  	that.score++;
	   	   	  	//显示分值情况
	   	   	  	that.scoreObj.innerText=that.score;
	   	   	  	if(that.score==that.gq){
	   	   	  		that.next()
	   	   	  	}
	   	   	  	//从页面中移除
	   	   	  	 document.body.removeChild(that.element[i]);
	   	   	  	 //从数组中移除
				 that.element.splice(i,1)	   	   	  	   	  	 
	   	   	  }
	   	   }
	   }
	},
	getChars:function(length){
		for(let i=0;i<length;i++){
			//产生元素
			this.getChar()
		}
	},
	//元素去重
	norepeat:function(num){
		 return this.element.some(value=>value.innerText==this.charSheet[num])
	},
	//位置去重
	noPosition:function(lefts){
		 return this.position.some(function(value){
		 	 return Math.abs(value-lefts)<50;
		 })
	},
	getChar:function(){
		//随机颜色
		function color2(){
				var colors = [0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f"];//0-15
				var color = "";
				for (var i=0;i<6 ;i++ )
				{
					var n = Math.ceil(Math.random()*15);
					color += "" + colors[n]
				}
				return "#" + color;
		}
        //去重
        let num;
		do{
		     num = Math.floor(this.charSheet.length*Math.random());			
		}while(this.norepeat(num))	;
		//去重叠
		let lefts;
		do{
		   lefts=Math.random()*(window.innerWidth-400)+200		
		}while(this.noPosition(lefts))	;
		//随机下标
//		let num = Math.floor(this.charSheet.length*Math.random());
		//创建元素
		let divs = document.createElement("div");
		//添加样式
		divs.classList.add("style")
		//随机分布   元素位置
		//位置随机
//		let lefts=Math.random()*(window.innerWidth-400)+200
		let tops=Math.random()*150;
		divs.style.left=`${lefts}px`
		divs.style.top=`${tops}px`
		divs.style.backgroundColor=`${color2()}`;
        //设置内容
		divs.innerText=this.charSheet[num];
		//放入页面
		document.body.appendChild(divs);
		this.element.push(divs);		
		this.position.push(lefts);		
	},
	drop:function(){
		let that=this;
		//时间函数  循环
		this.t = setInterval(function(){
			for(let i=0;i<that.element.length;i++){
//			for(let i=0;i<that.length;i++){  //?
				let tops=that.element[i].offsetTop;
				that.element[i].style.top=`${(tops+that.speed)}px`;

				if(tops>300){
					//删掉一个元素
					document.body.removeChild(that.element[i]);
					//从数组中删除
					that.element.splice(i,1)
					that.position.splice(i,1)
				   //添加元素
				//that.getChar();
				}
			}
			//执行完在补上
			if(that.element.length<that.length){
					that.getChar();				
			}
		},200)
	},
	next:function(){
		clearInterval(this.t);
		for(let i=0;i<this.element.length;i++){
			document.body.removeChild(this.element[i]);
		}
		this.element=[];
		this.length++;
		this.score += 10;
		this.start();		
	}
}

 