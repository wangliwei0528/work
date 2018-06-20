window.onload=function(){
	let audio=document.querySelector('audio')
	//播放
	let play=document.querySelector('.play')
	//上一首
	let back=document.querySelector('.back')
	//下一首
	let forward=document.querySelector('.forward')
	//歌词
	let Lyric=document.querySelector('.Lyric')    //ul
	let flag=document.querySelector('.flag')
	let photo=document.querySelector('.photo')
	let Song=document.querySelector('.lin-left')   //歌手/歌曲
	let tim=document.querySelector('.lin-right')  //时长
	let line=document.querySelector('.line')      //总 进度条
	let line1=document.querySelector('.line1')     //实时  进度条
	
	let i=0
	//播放完自动播放下一首
	audio.onended=function(){
		i++
		render(database[i])
	}
	//开始播放
	play.onclick=function(database){
		if(flag){
			play.classList.remove('icon-kaishi')
			play.classList.add('icon-zanting')
			flag=false
		}else{
			play.classList.add('icon-kaishi')
			play.classList.remove('icon-zanting')
			flag=true
		}
		if(audio.paused){			
			audio.play();
		}else{
			audio.pause();
		}	
	}	
	//格式化时间
	function times(ct){
		let m=Math.floor(ct/60)>=10 ? Math.floor(ct/60) : `0${Math.floor(ct/60)}`
		let s=Math.floor(ct%60)>=10 ? Math.floor(ct%60) : `0${Math.floor(ct%60)}`
		return `${m}:${s}`
	}
	
	render(database[i])
	function render(database){		
		audio.src=database.src    //
		photo.src=database.photo
		Song.innerText=`${database.songs} - ${database.name}`
			
		for(let i=0;i<database.lyrics.length;i++){
			Lyric.innerHTML +=`
				<li class='ly'>${database.lyrics[i].lyric}</li>
			`
		}
		//时间更新
		audio.ontimeupdate=function(){
			let ct=times(audio.currentTime)
			let bili=audio.currentTime/audio.duration
			tim.innerText=`${ct}/${database.alltime}`    //时长/总时长
			line1.style.width=`${bili*100}px`    //实时进度			
			database.lyrics.forEach((element,index)=>{
				if(element.time==ct){
					let a=index
					//当前歌词不在最顶部
					if(index<4){
						index=0
					}else{5
						index -=4
					}
								
					Lyric.innerHTML=''   //清空
					for(let j=index;j<database.lyrics.length;j++){
						Lyric.innerHTML +=`<li class='ly ly${j}'>${database.lyrics[j].lyric}</li>`
					}
					let obj=document.querySelector(`.ly${a}`)   //变色
					obj.style.color='#BC2F2E'
				}
			})
		}
	}	
	//音量
	let vol=document.querySelector('.vol-right')     //总的音量长度
	let vol1=document.querySelector('.vol-right1')   //可拖动长度
	vol.onmousedown=function(e){
		let ox=e.clientX
		let Left=e.offsetX
		document.onmousemove=function(e){
			let cx=e.clientX
			let lefts=cx-ox-Left
			vol1.style.width=`${lefts}px`
			audio.volume=lefts/100;//volume的值为[0,1]
		}
		document.onmouseup=function(){
			document.onmousemove=null
			document.onmouseup=null
		}
	}
}