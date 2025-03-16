
// 代码copy+代码语言显示
document.addEventListener('DOMContentLoaded', function() {
// 遍历所有 Rouge 输出的代码块容器
document.querySelectorAll('.highlighter-rouge').forEach(function(container) {
    // 提取语言信息（比如 language-python）
    let lang = '';
    container.classList.forEach(function(cls) {
    if (cls.indexOf('language-') === 0) {
        lang = cls.replace('language-', '');
    }
    });
    
    // 找到内部的 .highlight 容器（作为操作基准）
    var highlightDiv = container.querySelector('.highlight');
    if (!highlightDiv) return;
    
    // 确保 .highlight 设置为 relative 以便绝对定位子元素
    highlightDiv.style.position = 'relative';
    
    // ① 添加语言标签（显示在左上角）
    if (lang) {
    var langLabel = document.createElement('span');
    langLabel.className = 'code-language-label';
    // langLabel.textContent = lang.toUpperCase();
    langLabel.textContent = lang;
    // 插入到 highlightDiv 内部
    highlightDiv.appendChild(langLabel);
    }
    
    // ② 添加复制按钮（显示在右上角）
    var copyButton = document.createElement('button');
    copyButton.className = 'copy-code';
    copyButton.type = 'button';
    copyButton.ariaLabel = 'Copy code to clipboard';
    copyButton.innerText = 'Copy';
    highlightDiv.appendChild(copyButton);
    
    // 绑定复制事件：复制 pre.highlight 中的 <code> 文本
    copyButton.addEventListener('click', function () {
    // 找到内部 <pre class="highlight"> 下的 <code>
    var codeEl = container.querySelector('pre.highlight code');
    if (!codeEl) return;
    var codeText = codeEl.innerText.trim();
    
    window.navigator.clipboard.writeText(codeText).then(function() {
        copyButton.innerText = 'Copied';
        setTimeout(function() {
        copyButton.innerText = 'Copy';
        }, 4000);
    }).catch(function(err){
        console.error('Copy failed: ', err);
    });
    });
});
});
  

// 修改 content 下的图片，把 alt 内容复制到图片注释
// document.addEventListener("DOMContentLoaded", function () {
//   const content = document.getElementById('content');
//   if (!content) return;  // 若没有content区域则跳过

//   content.querySelectorAll('img').forEach(img => {
//     const alt = img.getAttribute('alt');
    
//     // 如果 alt 为空或以 '_' 开头，则跳过
//     if (!alt || alt.startsWith('_')) return;

//     // 如果图片已经在figure中，则跳过
//     if (img.parentNode.tagName.toLowerCase() === 'figure') return;

//     // 创建figure和figcaption标签
//     const figure = document.createElement('figure');
//     const figcaption = document.createElement('figcaption');
//     figcaption.innerText = alt;

//     // 插入DOM中
//     img.parentNode.insertBefore(figure, img);
//     figure.appendChild(img);
//     figure.appendChild(figcaption);
//   });
// });


// 修改 content 下的图片，把 alt 内容复制到图片注释，
// 只对 content>p>img, content>p>a>img 起作用
document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById('content');
  if (!content) return;

  content.querySelectorAll(':scope > p').forEach(p => {
    const el = p.firstElementChild;
    if (!el) return;

    const isImg = el.tagName === 'IMG';
    const isLinkWithImg = el.tagName === 'A' && el.firstElementChild?.tagName === 'IMG';
    const img = isImg ? el : isLinkWithImg ? el.firstElementChild : null;

    if (!img) return;
    const alt = img.getAttribute('alt');
    if (!alt || alt.startsWith('_')) return;

    const figure = document.createElement('figure');
    figure.innerHTML = p.outerHTML + `<figcaption>${alt}</figcaption>`;
    p.replaceWith(figure);
  });
});
