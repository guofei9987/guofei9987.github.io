   /**
     * 根据 JSON 数据生成侧边栏内容
     * 假设每个分类对象包含 tagName 和 posts 数组，
     * posts 数组中的每个元素包含 title 与 url 字段。
     */
   function generateSidebar(data) {
    const sidebarList = document.getElementById('sidebar-list');
    // 清空原有内容
    sidebarList.innerHTML = '';

    data.forEach(category => {
      // 创建一个 li 元素用来包装当前分类
      const li = document.createElement('li');

      // 创建 details 元素，实现折叠效果
      const details = document.createElement('details');
      const summary = document.createElement('summary');

      // 用一个 span 存放分类名称
      const textSpan = document.createElement('span');
      textSpan.textContent = category.tagName;
      summary.appendChild(textSpan);

      // 用另一个 span 显示数据数量，并加上自定义类以便样式控制
      const countSpan = document.createElement('span');
      countSpan.textContent = category.posts.length;
      countSpan.className = 'summary-count';
      summary.appendChild(countSpan);

      details.appendChild(summary);

      // 创建 posts 列表
      const postsUl = document.createElement('ul');
      category.posts.forEach(post => {
        const postLi = document.createElement('li');
        const link = document.createElement('a');
        link.textContent = post.title;
        link.href = post.url;
        postLi.appendChild(link);
        postsUl.appendChild(postLi);
      });

      details.appendChild(postsUl);
      li.appendChild(details);
      sidebarList.appendChild(li);
    });
  }

  /**
   * 为侧边栏中所有一级 details 元素绑定 toggle 事件，
   * 保证同一层级下只能展开一个
   */
  function attachToggleHandlers() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    // 查询所有一级折叠导航（ul > li > details）
    const topLevelDetails = sidebar.querySelectorAll('ul > li > details');
    topLevelDetails.forEach(function(detail) {
      detail.addEventListener('toggle', function() {
        if (detail.open) {
          topLevelDetails.forEach(function(otherDetail) {
            if (otherDetail !== detail && otherDetail.open) {
              otherDetail.removeAttribute('open');
            }
          });
        }
      });
    });
  }
  

// 自动展开当前页面对应的分类，并高亮当前链接所在的 li
function highlightCurrentLink() {
const currentPath = window.location.pathname;
const links = document.querySelectorAll('.sidebar a');
links.forEach(link => {
  // 使用 URL 对象确保对 pathname 进行比较
  const url = new URL(link.href, window.location.origin);
  if (url.pathname === currentPath) {
    // 为包含该链接的 li 添加高亮样式
    const li = link.closest('li');
    if (li) {
      li.classList.add('active');
    }
    // 自动展开所有祖先的 details 元素
    let parent = link.parentElement;
    while (parent) {
      if (parent.tagName.toLowerCase() === 'details') {
        parent.setAttribute('open', '');
      }
      parent = parent.parentElement;
    }
  }
});
}

// 侧边栏切可隐藏
document.getElementById('nav_btn').addEventListener('click', function() {
document.body.classList.toggle('sidebar-hidden');
});

// 在 DOM 加载完毕后，生成侧边栏、绑定 toggle 事件后，再调用高亮函数
document.addEventListener('DOMContentLoaded', function() {
fetch('/tags.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('网络响应错误：' + response.status);
    }
    return response.json();
  })
  .then(data => {
    generateSidebar(data);    // 生成 sidebar
    attachToggleHandlers();   // 绑定点击后只展开一个的功能
    highlightCurrentLink();   // 自动展开并高亮当前页面对应的链接
    document.getElementById('nav_btn').click(); //加载完毕后自动点击一次，使其被显示
    document.getElementById('nav_btn').classList.remove('hidden'); // 按钮解除隐藏
  })
  .catch(error => {
    console.error('加载 JSON 数据出错：', error);
  });
});
