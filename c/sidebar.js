
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


// “读书”
function generateReadingSidebar(data) {
  const sidebarList = document.getElementById('sidebar-list');
  // 清空原有内容
  sidebarList.innerHTML = '';

  data.forEach(category => {
    // 每个 category 对象对应一个一级分类，使用 l1 作为标题，放入一个 li 中
    const li = document.createElement('li');

    // 创建一级标题 <h2>，放入 li 内
    const h2Title = document.createElement('h2');
    h2Title.textContent = category.l1;
    li.appendChild(h2Title);
    sidebarList.appendChild(li);

    category.l2.forEach(post => {
      const li = document.createElement('li');
      const detailsElem = document.createElement('details');
      // 如果需要默认展开，可以设置：detailsElem.setAttribute('open', '');

      const summaryElem = document.createElement('summary');
      summaryElem.innerHTML = `${post.l3}<sup class="wordcnt">${post.cnt}字</sup>`;
      detailsElem.appendChild(summaryElem);

      // 如果该帖子下有 h2（三级导航），生成子列表
      if (post.h2 && post.h2.length > 0) {
        const subUl = document.createElement('ul');
        post.h2.forEach(subTitle => {
          const subLi = document.createElement('li');
          const subLink = document.createElement('a');

          subLink.href = `/reading/${post.l3}.html#${encodeURIComponent(subTitle)}`;
          // 显示时将下划线替换为空格
          subLink.textContent = subTitle.replace('_', ' ');
          subLi.appendChild(subLink);
          subUl.appendChild(subLi);
        });
        detailsElem.appendChild(subUl);
      }

    li.appendChild(detailsElem);
    sidebarList.appendChild(li);

    });

  });
}


/**
 事件：同一层级下只能展开一个
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


// 高亮 banner 中对应的 logo
function activeTop(sidebarType){
  let targetHref = '';
  if (sidebarType === 'reading') {
    targetHref = '/reading.html';
  } else if (sidebarType === 'open_source') {
    targetHref = '/open_source.html';
  } else if (sidebarType === 'post') {
    targetHref = '/';
  }else{
    targetHref = '/';
  }

  const navLinks = document.querySelectorAll('.top-banner .logo a');
  navLinks.forEach(link => {
    const linkUrl = new URL(link.href, window.location.origin);
    if (linkUrl.pathname === targetHref) {
      link.classList.add('active-logo');
    }
  });
}


document.addEventListener('DOMContentLoaded', function() {
  const sidebarTypeElement = document.getElementById('sidebar_type');
  const sidebarType = sidebarTypeElement ? sidebarTypeElement.classList[0] : null;


  let jsonURL = '';
  let sidebarGenerator = null;

  if (sidebarType === 'reading') {
    jsonURL = '/pages/reading.json';
    sidebarGenerator = generateReadingSidebar;
  } else if (sidebarType === 'open_source') {
    jsonURL = '/os.json';
    sidebarGenerator = generateSidebar;
  } else {
    jsonURL = '/tags.json';
    sidebarGenerator = generateSidebar;
  }

  fetch(jsonURL)
    .then(response => {
      if (!response.ok) throw new Error(`加载 ${jsonURL} 失败`);
      return response.json();
    })
    .then(data => {
      activeTop(sidebarType);
      sidebarGenerator(data);
      attachToggleHandlers();   
      highlightCurrentLink();     
      document.getElementById('nav_btn').click(); 
      document.getElementById('nav_btn').classList.remove('hidden'); 

      // 🚀🚀 将数据挂载到 window 上
      window.guofei.sidebarType=sidebarType;
      window.guofei.sidebarData = data;
      window.dispatchEvent(new Event('sidebarDataLoaded'));
      

    })
    .catch(error => {
      console.error('加载侧边栏数据出错：', error);
    });
});


// 点击“更多链接”
document.addEventListener('DOMContentLoaded', function() {
  const dropdown = document.querySelector('.dropdown');
  const dropdownButton = document.querySelector('.dropdown-button');
  const dropdownList = document.querySelector('.dropdown-list');

  // 点击按钮时，切换下拉菜单的显示状态，并阻止冒泡
  dropdownButton.addEventListener('click', function(e) {
    e.stopPropagation();
    dropdownList.classList.toggle('hidden1');
  });

  // 点击下拉菜单内部时，阻止冒泡，避免触发 document 的点击事件
  dropdownList.addEventListener('click', function(e) {
    e.stopPropagation();
  });

  // 点击页面其他区域时，隐藏下拉菜单
  document.addEventListener('click', function(e) {
    // 如果点击目标不在 dropdown 内，则隐藏下拉菜单
    if (!dropdown.contains(e.target)) {
      dropdownList.classList.add('hidden1');
    }
  });
});
