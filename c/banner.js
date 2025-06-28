/* 控制文章章节列表按钮：显示或隐藏 TOC */
function content_click(is_show) {
  const content_toc = document.getElementById('content_toc');
  const toc_btn = document.getElementById('toc_btn');
  if (is_show) {
    content_toc.style.display = 'block';
    toc_btn.textContent = '▲';
  } else {
    content_toc.style.display = 'none';
    toc_btn.textContent = '▼';
  }
}

/* 生成文章目录 TOC 的函数 */
function contentEffects() {
  const nav = document.getElementById('nav');
  const toc_btn = document.getElementById('toc_btn');

  if (nav) {
    const headings = document.querySelectorAll("#content > h2, #content > h3, #content > h4, #content > h5, #content > h6");
    headings.forEach((current, i) => {
      const title_name = current.innerHTML;

      // 为标题元素设置 id 以便锚点定位
      current.id = title_name;

      // 修改标题内容为一个链接，点击后可以跳转到自身位置
      current.innerHTML = `<a class='title_in_contend' href='#${title_name}'>${title_name}</a>`;

      // 根据标题级别计算缩进
      const tag = current.tagName.substr(-1);
      const div = document.createElement('div');
      div.style.marginLeft = (15 * (tag - 2)) + 'px';
      div.innerHTML = `<a id='link${i}' href='#${title_name}'>${title_name}</a>`;
      nav.appendChild(div);
    });

    // 如果生成的导航内容为空，则隐藏 TOC 按钮，否则显示
    if (nav.children.length === 0) {
      toc_btn.classList.add('hidden');
    } else {
      toc_btn.classList.remove('hidden');
    }
  } else {
    // 如果没有目录容器，则隐藏 TOC 按钮
    toc_btn.style.display = 'none';
  }
}

/* 初始化：绑定 TOC 按钮点击事件，并在文档加载完成后生成 TOC */
document.addEventListener('DOMContentLoaded', () => {
  const toc_btn = document.getElementById('toc_btn');
  if (toc_btn) {
    toc_btn.addEventListener('click', function() {
      const isClicked = this.dataset.clicked === 'true';
      content_click(!isClicked);
      this.dataset.clicked = (!isClicked).toString();
    });
  }

  // 页面加载完后生成文章目录
  contentEffects();

  // Latex 支持
  // 下面是 KaTex版本
  // renderMathInElement(document.body)

  // 需要展示单 dollar 符号
  renderMathInElement(document.body, {
    delimiters: [
      { left: '$$', right: '$$', display: false },
      { left: '$', right: '$', display: false },
      { left: '\\(', right: '\\)', display: false }
    ]
  });
});
