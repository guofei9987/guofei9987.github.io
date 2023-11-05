
function addMindmap() {
    // 最外层 的 ul，增加 mindmap 对象
    const outerUls = document.querySelectorAll('ul:not(ul ul)');
    // 可能有多组
    outerUls.forEach(ul => {
        ul.classList.add('mindmap');
    });

}



function addStickyDivToText(node) {
    // 检查节点是否为文本节点
    if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent.trim() === '') {
            // 不知道为啥会有这么多空 div，跳过就行了
            return
        }

        // 创建一个 <div> 元素
        const div = document.createElement('div');
        div.classList.add('sticky')

        // 将原始文本包裹在 <div> 元素中
        const text = node.textContent;

        div.textContent = text;

        // 用新的 <div> 元素替换原始文本节点
        node.parentNode.replaceChild(div, node);
    }
    else if (node.nodeType === Node.ELEMENT_NODE) {
        // 遍历子节点并递归调用 addStickyDivToText 函数
        const childNodes = node.childNodes;
        for (let i = 0; i < childNodes.length; i++) {
            addStickyDivToText(childNodes[i]);
        }
    }
}

function addStickyDiv() {
    // 获取所有的 <li> 元素
    const liElements = document.querySelectorAll('li:not(li li)');

    // 对每个 <li> 元素进行操作
    liElements.forEach((liElement) => {
        addStickyDivToText(liElement);
    });
}
