/* toc.js – TOC 相关功能 */

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

    // ???是否可删去
    // 对代码块和图片做样式处理
    $("pre").addClass("prettyprint");
    prettyPrint();
    $('#content img').addClass('img-thumbnail').parent('p').addClass('center');

    // 显示 TOC 按钮（如果之前隐藏）
    $('#toc_btn').show();

    // // 渲染数学公式（使用 renderMathInElement 函数，确保已经加载相应的数学渲染库）
    // renderMathInElement(document.body, {
    // delimiters: [
    //     {left: '$$', right: '$$', display: false},
    //     {left: '$', right: '$', display: false},
    //     {left: '\\(', right: '\\)', display: false}
    // ]
    // });

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
  



// 代码拷贝
// https://remarkablemark.org/blog/2021/06/01/add-copy-code-to-clipboard-button-to-jeyll-site/
var codeBlocks = document.querySelectorAll('pre.highlight');

codeBlocks.forEach(function (codeBlock) {
  var copyButton = document.createElement('button');
  copyButton.className = 'copy';
  copyButton.type = 'button';
  copyButton.ariaLabel = 'Copy code to clipboard';
  copyButton.innerText = 'Copy';

  codeBlock.append(copyButton);


  copyButton.addEventListener('click', function () {
    var code = codeBlock.querySelector('code').innerText.trim();
    window.navigator.clipboard.writeText(code);

    copyButton.innerText = 'Copied';
    var fourSeconds = 4000;

    setTimeout(function () {
      copyButton.innerText = 'Copy';
    }, fourSeconds);
  });
});
