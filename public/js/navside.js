/* 控制导航按钮动作 */
function nav_click(is_show) {
    if (is_show) {
      /* 显示左侧aside */
      $('.aside')
        .addClass('visible-md visible-lg')
        .removeClass('hidden-md hidden-lg')
      /* 调整右侧内容 */
      $('.aside3')
        .removeClass('col-md-13 col-lg-13')
        .addClass('col-md-13 col-lg-13');
      /* 调整文字内容格式 */
      $('.aside3-content')
        .removeClass('col-md-10 col-lg-8 col-md-offset-1 col-lg-offset-2')
        .addClass('col-md-13');
    } else {
      /* 隐藏左侧aside */
      $('.aside')
        .removeClass('visible-md visible-lg')
        .addClass('hidden-md hidden-lg');
      /* 右侧内容最大化 */
      $('.aside3')
        .removeClass('col-md-13 col-lg-13')
        .addClass('col-md-13 col-lg-13');
      /* 修改文字排版 */
      $('.aside3-content')
        .removeClass('col-md-13')
        .addClass('col-md-10 col-lg-8 col-md-offset-1 col-lg-offset-2');
    }  /*col-md-offset-1 col-lg-offset-2*/
  }



$(document).ready(function() {
    /* 控制左侧 aside 的动作 */
    // 点击三横
    $("#nav_btn").on('click', function() {
      isClicked = $(this).data('clicked');
  
      nav_click(isClicked);
  
      $(this).data('clicked', !isClicked);
    });
  
    // 点击加号
    $("#content_btn").on('click', function(){
      isClicked = $(this).data('clicked');
  
      content_click(!isClicked);
  
      $(this).data('clicked',!isClicked);
  
    });
  });