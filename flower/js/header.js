$(function(){
	/*购物车商品显示与隐藏*/
	$(".my-cart").hover(function(){
		$('.good').css({display:"block"})
	},function(){
		$('.good').css({display:"none"})
	})



	/*导航*/
	$(".site-menu>li").hover(function(){
		$(this).children(".site-menu>li>a").addClass("current")	
	},function(){
		$(".site-menu>li>a").removeClass("current")
	})

	$('.all-category').hover(function(){
		$('.public-nav-layout .category').css({display:"block"})
	},function(){
		$('.public-nav-layout .category').css({display:"none"})
	})
})