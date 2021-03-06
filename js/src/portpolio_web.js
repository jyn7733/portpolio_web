//filename

(function($){
//jQuery start
var win = $(window);
var headBox = $('#headBox');
var navBox = headBox.children('#navBox');

// mobile 메뉴 나타내기
var sizeWin = win.outerWidth(true);
var menuBtnArea = headBox.children('.meun_btn')
var menuBtn = menuBtnArea.find('button')
var closeBtn = navBox.children('.close_btn')

var headTop = headBox.offset().top;

if(sizeWin <= 600){
  menuBtn.on('click',function(e){
    e.preventDefault();
    navBox.fadeIn();
  });

  closeBtn.on('click',function(e){
    e.preventDefault()
    navBox.fadeOut();
  })
// }else{// headBox가 일정 높이 이상 떨어졌을 때 포지션 바꾸기

//   win.on('scroll',function(){
//     var winSt = win.scrollTop();
//     console.log(winSt)

//     if(headTop < winSt){
//       headBox.css({'position' :'fixed', 'top':0, 'z-index' : 1500,'backgroundColor' :'rgba(255, 253, 230, 0.7)'});
//     }else{
//       headBox.removeAttr('style');
//     }
//   });
  
}
// view에서 loading글씨 일정 시간이 지나고 사라지게 하기
var viewBox = $('#viewBox');
var viewTextArea = viewBox.find('.text_area');
var timed = 3000;

viewTextArea.fadeOut(timed)


// project영역 프로젝트 list 생성
var projectBox = $('#projectBox');
var projectArea = projectBox.children('.project_area');
var imgUrl = "../img/";
var listcode = '<li><div class="project_img"><a href="" target="_blank"></a></div><div class="project_title"><p></p><span></span></div><div class="more_btn"><button type="button"><span>준비과정</span></button></div></li>';
var projectUl = projectArea.children('ul');
var projectLi,projectImg,projectTitle,moreBtn; 




$.ajax({

  url:"../json/list_data.json",
  dataType:'json',
  context:document.body

  }).done(function(data){
    var listData = data;
    var i=0;
    for(; i<listData.length; i++){
      projectUl.append(listcode);

      projectLi = projectUl.children('li');
      projectImg = projectLi.children('.project_img');
      projectTitle = projectLi.children('.project_title');

      projectImg.eq(i).css({backgroundImage : 'url(' + imgUrl + listData[i].img + ')'});
      projectImg.eq(i).children('a').attr("href", listData[i].link)
      projectTitle.eq(i).children('p').text(listData[i].title)
      projectTitle.eq(i).children('span').text(listData[i].text)
    }
  })

  projectLi = projectUl.children('li');
  projectImg = projectLi.children('.project_img');
  projectTitle = projectLi.children('.project_title');

  //project list 과정보기 modal로 세부 내용 삽입
  var projectCode ='<div class="more_box"><div class="more_area"><div class="more_close"><button type="button"><span>닫기</span></button></div><div class="project_tap"><ul class="project_nav"></ul></div><div class="project_content"></div>';
  var projectDataLiCode = '<li><a href="#"></a></li>'
  var projectDataConCode= '<div class="project_con_list"><div class="project_list_img"></div><p></p></div>'
  // <div class="project_content"><div class="project_con_list"><h3></h3><div class="project_list_img"></div><p></p></div></div>



  $.ajax({
    url:"../json/project_data.json",
    dataType:'json',
    context:document.body
  
    }).done(function(data){
      var projectNav = [
        {title : 'style guide'},
        {title : 'sketch'},
        {title : 'prototype'},
        {title : 'desing'},
        {title : 'coding'}
      ]//project 모달 영역에서 네비게이션 역할을 할 요소의 text를 배열화 한 것

      var moreBox,moreArea,projectTap,projectDataUl,projectDataLi;
      var projectContent,projectConList,projectListImg

      var projectData = data;
      projectBox.append(projectCode);

      moreBox = projectBox.children('.more_box');      
      moreArea = moreBox.children('.more_area');
      projectTap = moreArea.children('.project_tap');
      projectDataUl = projectTap.children('.project_nav');
      projectContent = moreArea.children('.project_content');

      var i=0;
      for(; i < 5; i++){
        projectDataUl.append(projectDataLiCode);
        projectDataLi = projectDataUl.children('li');
        projectDataLi.eq(i).children('a').text(projectNav[i].title);

        projectDataLi.eq(0).addClass('action');

        projectContent.append(projectDataConCode);
      }

      projectConList = projectContent.children('.project_con_list');
      projectConList.hide();
      projectConList.eq(0).show();

      projectListImg = projectConList.children('.project_list_img');


      var ModalData = function(i){
        var h = i || 0; 
        projectListImg.eq(0).css({backgroundImage:'url('+ imgUrl + projectData[h].styleGuide.img +')'});
        projectConList.eq(0).find('p').text(projectData[h].styleGuide.text);

        projectListImg.eq(1).css({backgroundImage:'url('+ imgUrl + projectData[h].sketch.img +')'});
        projectConList.eq(1).find('p').text(projectData[h].sketch.text);

        projectListImg.eq(2).css({backgroundImage:'url('+ imgUrl + projectData[h].prototype.img +')'});
        projectConList.eq(2).find('p').text(projectData[h].prototype.text);

        projectListImg.eq(3).css({backgroundImage:'url('+ imgUrl + projectData[h].desing.img +')'});
        projectConList.eq(3).find('p').text(projectData[h].desing.text);

        projectListImg.eq(4).css({backgroundImage:'url('+ imgUrl + projectData[h].coding.img +')'});
        projectConList.eq(4).find('p').text(projectData[h].coding.text);
        
      }//ModalData end

      //과정보기 버튼 클릭시 modal 창 띄우기
      var projectUl = projectArea.children('ul');
      var projectLi = projectUl.children('li');
      moreBtn = projectLi.find('button');
      var indexCheck;
      var closeBtn = moreBox.find('button');
      // var close = moreArea.children('button');

      moreBtn.on('click',function(e){
        e.preventDefault();
        var it = $(this).parents('li');
        var itI = it.index();
        indexCheck = itI; 
        ModalData(indexCheck);
        
        moreBox.fadeIn();    
      });
      closeBtn.on('click',function(e){
        e.preventDefault();
        moreBox.fadeOut(); 
      })

      projectDataLi.on('click',function(e){
        e.preventDefault();
        var it = $(this);
        var itI = it.index();
    
        projectConList.eq(itI).show();
        projectConList.eq(itI).siblings().hide();
        
        projectDataLi.eq(itI).addClass('action');
        projectDataLi.eq(itI).siblings().removeClass('action');
           
      });

    })

    //source영역 dt 클릭시 dd가 나오게 하기
    var sourceBox = $('#sourceBox');
    var sourceDl = sourceBox.find('dl');
    var sourceDt = sourceDl.children('dt');
    var sourceDd = sourceDl.children('dd');

    sourceDt.on('click',['a'],function(e){
      e.preventDefault();
      var it = $(this);
      it.next('dd').stop().slideToggle(function(){
        var itDdDisplay = it.next('dd').css('display');
        if(itDdDisplay === 'block'){
          it.addClass('action');
          it.siblings().removeClass('action');
        }else if(itDdDisplay === 'none'){
          it.removeClass('action');
        }
      });
      it.siblings('dt').next('dd').stop().slideUp();
    });

})(jQuery);
//jQuery end
