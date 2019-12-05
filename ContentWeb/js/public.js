$(function(){
    if($(window).width() >= 1000) {
        var theUA = window.navigator.userAgent.toLowerCase();
        if((theUA.match(/msie\s\d+/) && theUA.match(/msie\s\d+/)[0]) || (theUA.match(/trident\s?\d+/) && theUA.match(/trident\s?\d+/)[0])) {
            var ieVersion = theUA.match(/msie\s\d+/)[0].match(/\d+/)[0] || theUA.match(/trident\s?\d+/)[0];
            if(ieVersion < 9) {
                alert('您的浏览器版本太低！ 推荐使用:谷歌,火狐,其他双核极速模式如果你的使用的是双核浏览器,请切换到极速模式访问');
            }
        }
        $('.cn .headerNav li').each(function(){
            $(this).width($(this).width()+($(window).width()*0.01));
        })
        $('.headerNav li').hover(function(){
            $(this).find('div').css({'height':$(this).find('div a').length*51+'px','opacity':'1'});
        },function(){
            $(this).find('div').css({'height':'0','opacity':'0'});
        })
        $('.cn-btn').click(function(){
            $('.cn').show();
            $('.en').hide();
            $('.cn .headerNav li').css('width','auto');
            $('.cn .headerNav li').each(function(){
                $(this).width($(this).width()+($(window).width()*0.01));
            })
        })
        $('.en-btn').click(function(){
            $('.cn').hide();
            $('.en').show();
            $('.en .headerNav li').css('width','auto');
            $('.en .headerNav li').each(function(){
                $(this).width($(this).width()+($(window).width()*0.015));
            })
        })
    }else{
        resize();
        $(window).resize(function() {
            resize();
        });
        $('.wap-btn').click(function(){
            $(this).hide();
            $(this).parent().find('.r').show();
            $(this).parent().find('.r').animate({'opacity':'1'},300);
        });
        $('.wap-close').click(function(){
            var _this = this;
            $(_this).parent().animate({'opacity':'0'},300,function(){
                $('.wap-btn').show();     
                $(_this).parent().hide();
            });
        });
        $('.headerNav li').hover(function(){
            $(this).find('div').css({'height':$(this).find('div a').length*($(this).find('div a').height())+'px','opacity':'1','margin-top':'1rem'});
        },function(){
            $(this).find('div').css({'height':'0','opacity':'0','margin-top':'0'});
        })
        $('.cn-btn').click(function(){
            $('.cn').show();
            $('.en').hide();
            $('.cn .headerNav li').css('width','auto');
            $('.cn .headerNav li').each(function(){
                $(this).width($(this).width()+($(window).width()*0.01));
            })
        })
        $('.en-btn').click(function(){
            $('.cn').hide();
            $('.en').show();
            $('.en .headerNav li').css('width','auto');
            $('.en .headerNav li').each(function(){
                $(this).width($(this).width()+($(window).width()*0.015));
            })
        })
    }
})
function resize(){
    document.getElementsByTagName("html")[0].style.fontSize = document.documentElement.clientWidth / 32 + "px";
}