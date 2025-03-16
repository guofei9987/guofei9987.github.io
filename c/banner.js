
/* 控制文章章节列表按钮：显示或隐藏 TOC */
function content_click(is_show) {
  if (is_show) {
    $('#content_toc').show();
    $('#toc_btn').text('▲');
  } else {
    $('#content_toc').hide();
    $('#toc_btn').text('▼');
  }
}
  
/* 生成文章目录 TOC 的函数 */
function contentEffects(){
// 如果存在导航容器则生成目录
if($("#nav").length > 0){
    // 遍历文章内容中所有标题（h2～h6）
    $("#content > h2, #content > h3, #content > h4, #content > h5, #content > h6").each(function(i) {
    var current = $(this);
    var title_name = current.html();

    // 为标题元素设置 id 以便锚点定位
    current.attr("id", title_name);
    // 修改标题内容为一个链接，点击后可以跳转到自身位置
    current.html("<a class='title_in_contend' href='#" + title_name + "'>" + title_name + "</a>");

    // 根据标题的级别计算缩进（例如 h2 无缩进，h3 缩进 15px，依此类推）
    var tag = current.prop('tagName').substr(-1);
    $("#nav").append("<div style='margin-left:" + (15 * (tag - 2)) + "px'><a id='link" + i + "' href='#" + title_name + "'>" + title_name + "</a></div>");
    });

    // 如果生成的导航内容为空，则隐藏 TOC 按钮，否则显示
    if ($("#nav").children().length === 0) {
      document.getElementById('toc_btn').classList.add('hidden'); // 按钮解除隐藏
    } else {
      document.getElementById('toc_btn').classList.remove('hidden'); // 按钮解除隐藏
    }
} else {
    // 如果没有目录容器，则隐藏 TOC 按钮
    $('#toc_btn').hide();
}
}

/* 初始化：绑定 TOC 按钮点击事件，并在文档加载完成后生成 TOC */
$(document).ready(function() {


// 点击右上角的 TOC 按钮
$("#toc_btn").on('click', function(){
    var isClicked = $(this).data('clicked');
    content_click(!isClicked);
    $(this).data('clicked', !isClicked);
});

// 页面加载完后生成文章目录
contentEffects();


// Latex 支持
// 下面是 KaTex版本
// renderMathInElement(document.body)

// 需要展示单dollar 符号
renderMathInElement(document.body,{delimiters: [
    {left: '$$', right: '$$', display: false},
      {left: '$', right: '$', display: false},
      {left: '\\(', right: '\\)', display: false}
  ]});
});
  


