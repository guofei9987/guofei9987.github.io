
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
  