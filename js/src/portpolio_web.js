//filename

(function($){
//jQuery start

var win = $(window);
var headBox = $('#headBox');
var navBox = headBox.children('#navBox');

// mobile 메뉴 나타내기
var sizeWin = win.outerWidth(true);
var menuBtnArea = headBox.children('.meun_btn')
var menuBtn = menuBtnArea.children('button')
var closeBtn = navBox.children('.close_btn')

if(sizeWin <= 600){
  menuBtn.on('click',function(e){
    e.preventDefault();
    navBox.fadeIn();
  });

  closeBtn.on('click',function(e){
    e.preventDefault()
    navBox.fadeOut();
  })
}


})(jQuery);
//jQuery end
