
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
// 仅对以"caption:" 开头的内容生效
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('#content img').forEach(img => {
    const alt = img.getAttribute('alt') || '';
    const match = alt.match(/^caption:\s*(.+)/i);
    if (!match) return;

    const caption = match[1].trim();

    const figure = document.createElement('figure');
    const figcaption = document.createElement('figcaption');
    figcaption.innerText = caption;

    const parent = img.parentNode;
    figure.appendChild(img.cloneNode(true));
    figure.appendChild(figcaption);
    parent.replaceChild(figure, img);
  });
});


// 自动给外链加 target，这样点击还会留在本网站
document.addEventListener("DOMContentLoaded", () => {
  const currentHost = location.hostname;

  document.querySelectorAll('#content a[href]').forEach(a => {
    const href = a.getAttribute('href');
    try {
      const linkHost = new URL(href, location.href).hostname;
      // 链接里含有 hostname， 并且 hostname 不等于 currentHost
      if (linkHost && linkHost !== currentHost) {
        // 并且没有 target 时，添加 target = _blank
        if (!a.hasAttribute('target')) {
          a.setAttribute('target', '_blank');
        }

        // ✅ 无论如何都建议加上安全性标记
        a.setAttribute('rel', 'noopener noreferrer');
      }
    } catch (e) {
      // 跳过格式错误的 href，比如锚点 #xxx
    }
  });
});
