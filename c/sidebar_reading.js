
// “读书”
function generateReadingSidebar(data) {
const sidebarList = document.getElementById('sidebar-list');
// 清空原有内容
sidebarList.innerHTML = '';

data.forEach(category => {
    // 每个 category 对象对应一个一级分类，使用 l1 作为标题
    const li = document.createElement('li');

    // 创建一级标题 <h2>
    const h2Title = document.createElement('h2');
    h2Title.textContent = category.l1;
    li.appendChild(h2Title);

    // 创建一个 ul 用来存放该分类下的帖子（二级导航）
    const postsUl = document.createElement('ul');

    // 遍历 l2 数组，每个对象为一个帖子
    category.l2.forEach(post => {
    const postLi = document.createElement('li');

    // 提取文章名（去掉 .md 后缀）
    const article = post.l3.replace('.md', '');

    // 创建文章链接
    const postLink = document.createElement('a');
    postLink.href = `docs/${category.l1}/${article}.md`;
    // 显示格式：文章名 + 字数（使用 sup 标签）
    postLink.innerHTML = `${article}<sup style="color:red">${post.cnt}字</sup>`;
    postLi.appendChild(postLink);

    // 如果该帖子下有 h2（三级导航），生成子列表
    if (post.h2 && post.h2.length > 0) {
        const subUl = document.createElement('ul');
        post.h2.forEach(subTitle => {
        const subLi = document.createElement('li');
        const subLink = document.createElement('a');
        // 链接地址带有 ?id= 参数，使用 encodeURIComponent 编码
        subLink.href = `docs/${category.l1}/${article}.md?id=${encodeURIComponent(subTitle)}`;
        // 可选：将下划线替换为空格后显示
        subLink.textContent = subTitle.replace('_', ' ');
        subLi.appendChild(subLink);
        subUl.appendChild(subLi);
        });
        postLi.appendChild(subUl);
    }

    postsUl.appendChild(postLi);
    });

    li.appendChild(postsUl);
    sidebarList.appendChild(li);
});
}
  
// 加载 reading.json 并生成侧边栏
document.addEventListener('DOMContentLoaded', function() {
fetch('/pages/reading.json')
    .then(response => {
    if (!response.ok) {
        throw new Error('网络响应错误：' + response.status);
    }
    return response.json();
    })
    .then(data => {
    generateReadingSidebar(data);
    // 如有需要，可在此处调用折叠逻辑或高亮当前链接的函数
    })
    .catch(error => {
    console.error('加载 JSON 数据出错：', error);
    });
});
  