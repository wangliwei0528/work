$(function(){
    //商品缩略图
    var $gallery=$(".gallery");
    var $cover=$('.gallery .cover');
    var $show=$('.show');
    var imgArr = [];//用来存放图片宽高比属性
    var index = 0;
    $(".controller li").hover(function(){
        $(this).addClass("current").siblings().removeClass("current");
        $(".gallery img").attr("src",$(this).find("img").attr("src"));
        $show.css("background-image","url("+$(this).find("img").attr("src")+")");
    }),
        $gallery.mouseover(function(){
            $cover.show();
            $show.show();
        }).mousemove(function(e){
            var e = e||window.event;
            var x = e.pageX;
            var y = e.pageY;
            var galleryX = $gallery.offset().left;
            var galleryY = $gallery.offset().top;
            var minusX = x -galleryX - $cover.width()/2;
            var minusY = y - galleryY - $cover.height()/2;
            var maxX = $gallery.width() - $cover.width();
            var maxY = $gallery.height() - $cover.height();

            if(minusX<0)minusX=0;
            if(minusY<0)minusY=0;
            if(minusX>maxX)minusX = maxX;
            if(minusY>maxY)minusY = maxY;
            $cover.css({
                left:minusX,
                top:minusY
            });
            function init(){
                $(".controller img").each(function(i){
                    //获取图片的宽度
                    var imgWidth = $(this).width();
                    //获取图片的高度
                    var imgHeight = $(this).height();
                    if(imgWidth >= imgHeight){
                        $(this).css({
                            width:44,
                            height:44/imgWidth*imgHeight,
                            top:(44-50/imgWidth*imgHeight)/2
                        });
                        imgArr[i] = {width:1,height:imgHeight/imgWidth,imgW:imgWidth,imgH:imgHeight};
                    }else{
                        $(this).css({
                            width:44/imgHeight*imgWidth,
                            height:44,
                            left:(44-(44/imgHeight*imgWidth))/2
                        });
                        imgArr[i] = {width:imgWidth/imgHeight,height:1,imgW:imgWidth,imgH:imgHeight};
                    }
                });
            };
            init();

            //将show跟随鼠标移动
            var bitX = minusX/$gallery.width();
            var bitY = minusY/$gallery.height();
            var imgWidth = imgArr[index].imgW;
            var imgHeight = imgArr[index].imgH;
            $show.css("background-position",-bitX*imgWidth+"px "+(-bitY*imgHeight)+"px");


        }).mouseout(function(){
            //遮盖层隐藏
            $cover.hide();
            $show.hide();
        });
    //鼠标移入到show的时候
    $show.mouseover(function(){
        //遮盖层隐藏
        $cover.hide();
        $show.hide();
    }).mousemove(function(){
        return false;
    });








//    添加购物车
    $addcart=$(".addcart");
    $addcart.click(function(){
        $(".ncs-cart-popup").show();
    })

    var val=$("#quantity").val();
    val=parseInt(val);
    $(".increase").click(function(){
        val+=1;
        $("#quantity").attr("value",val);
    })
    $(".decrease").click(function(){
        val-=1;
        if(val<=0){
            val=1;
        }
        $("#quantity").attr("value",val);
    })


})