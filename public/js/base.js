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
/* 控制文章章节列表按钮 */
function content_click(is_show){
  if (is_show) {
    $('#content_table').show();
    $('#content_btn i').removeClass('fa-plus').addClass('fa-minus');
  } else {
    $('#content_table').hide();
    $('#content_btn i').removeClass('fa-minus').addClass('fa-plus');
  }
}

$(document).ready(function() {
  /* 控制左侧 aside 的动作 */
  $("#nav_btn").on('click', function() {
    isClicked = $(this).data('clicked');

    nav_click(isClicked);

    $(this).data('clicked', !isClicked);
  });

  $("#content_btn").on('click', function(){
    isClicked = $(this).data('clicked');

    content_click(!isClicked);

    $(this).data('clicked',!isClicked);

  });

  $(document).pjax('.pjaxlink', '#pjax', { fragment: "#pjax", timeout: 10000 });
  $(document).on("pjax:end", function() {
    if($("body").find('.container').width() < 992)
      $('#nav_btn').click();
    $('.aside3').scrollTop(0);
    contentEffects();
  });
  $('body').on('click', '.show-commend', function(){
    var ds_loaded = false;
    window.disqus_shortname = $('.show-commend').attr('name');
    $.ajax({
      type: "GET",
      url: "http://" + disqus_shortname + ".disqus.com/embed.js",
      dataType: "script",
      cache: true
    });
  });
  contentEffects();
});
function contentEffects(){
  //remove the asidebar
  $('.row-offcanvas').removeClass('active');
  if($("#nav").length > 0){
    $("#content > h2,#content > h3,#content > h4,#content > h5,#content > h6").each(function(i) {
        // i是从0开始的整数，以前是title0这种格式，我给改成标题了
        var current = $(this);
        var title_name=current.html();
        current.attr("id", title_name);
        current.html("<a class='title_in_contend' href='#" + title_name + "'>" + title_name + "</a>");
        tag = current.prop('tagName').substr(-1);
        $("#nav").append("<div style='margin-left:"+15*(tag-1)+"px'><a id='link" + i + "' href='#" + title_name + "'>" + title_name + "</a></div>");
    });
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    $("pre").addClass("prettyprint");
    prettyPrint();
    $('#content img').addClass('img-thumbnail').parent('p').addClass('center');
    $('#content_btn').show();
  }else{
    $('#content_btn').hide();
  }
}
