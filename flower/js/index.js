$(function(){
		/*购物车商品显示与隐藏*/
	$(".my-cart").hover(function(){
		$('.good').css({display:"block","zIndex":99999})
	},function(){
		$('.good').css({display:"none"})
	})
	/*导航*/
	$(".site-menu>li").hover(function(){
		$(this).children(".site-menu>li>a").addClass("current")	
	},function(){
		$(".site-menu>li>a").removeClass("current")
	})








	/*返回顶部*/
	$(".backbar").click(function() {
      $("html,body").animate({scrollTop:0}, 2000);
  	});
   /*隐藏于显示返回顶部按钮*/
  	(function gotopHover() {
		$(document).scroll(function () {
			if($(document).scrollTop() >= 100) {
				$('.backbar').stop().css('display','block');
			} else {
				$('.backbar').stop().css('display','none');
			}
		});		
	})();



  	//删除购物车商品
	var $goods=$(".goods");
	var $goods_handle=$(".goods-handle");
    $goods_handle.click(function(){
        $goods.remove();
	});
})