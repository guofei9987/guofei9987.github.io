// 初始化一个数据空间
window.guofei = window.guofei || {};

// “技术”、“开源”
function generateSidebar(data) {
  const sidebarList = document.getElementById('sidebar-list');
  // 清空原有内容
  sidebarList.innerHTML = '';

  data.forEach(category => {
  const [tagName, posts] = category; // 解构数组

  // 创建一个 li 元素用来包装当前分类
  const li = document.createElement('li');

  // 创建 details 元素，实现折叠效果
  const details = document.createElement('details');
  const summary = document.createElement('summary');

  // 用一个 span 存放分类名称
  const textSpan = document.createElement('span');
  textSpan.textContent = tagName;
  summary.appendChild(textSpan);

  // 用另一个 span 显示数据数量，并加上自定义类以便样式控制
  const countSpan = document.createElement('span');
  countSpan.textContent = posts.length;
  countSpan.className = 'summary-count';
  summary.appendChild(countSpan);

  details.appendChild(summary);

  // 创建 posts 列表
  const postsUl = document.createElement('ul');
  posts.forEach(post => {
    const [title, url] = post; // 解构 title 和 url
    const postLi = document.createElement('li');
    const link = document.createElement('a');
    link.textContent = title;
    link.href = url;
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
    const [l1, l2List] = category; // 解构一级分类名和二级列表
    // 每个 category 对象对应一个一级分类，使用 l1 作为标题，放入一个 li 中
    const li = document.createElement('li');

    // 创建一级标题 <h2>，放入 li 内
    const h2Title = document.createElement('h2');
    h2Title.textContent = l1;
    li.appendChild(h2Title);
    sidebarList.appendChild(li);

    l2List.forEach(post => {
      const [l3, cnt, h2List] = post; // 解构二级类名、字数、三级标题列表

      const li = document.createElement('li');
      const detailsElem = document.createElement('details');
      // 如果需要默认展开，可以设置：detailsElem.setAttribute('open', '');

      const summaryElem = document.createElement('summary');
      summaryElem.innerHTML = `${l3}<sup class="wordcnt">${cnt}字</sup>`;
      detailsElem.appendChild(summaryElem);

      // 如果该帖子下有 h2（三级导航），生成子列表
      if (h2List && h2List.length > 0) {
        const subUl = document.createElement('ul');
        h2List.forEach(subTitle => {
          const subLi = document.createElement('li');
          const subLink = document.createElement('a');

          subLink.href = `/reading/${l3}.html#${encodeURIComponent(subTitle)}`;
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



/*事件：同一层级下只能展开一个*/
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


document.addEventListener('DOMContentLoaded', function() {
  const dropdown = document.querySelector('.dropdown');
  const dropdownButton = document.querySelector('.dropdown-button');
  const dropdownList = document.querySelector('.dropdown-list');

  if (!dropdown || !dropdownButton || !dropdownList) {
    return;
  }

  const closeDropdown = ({ blurButton = false } = {}) => {
    if (!dropdown.classList.contains('open')) {
      return;
    }

    dropdown.classList.remove('open');
    dropdownButton.setAttribute('aria-expanded', 'false');

    if (blurButton) {
      dropdownButton.blur();
    }
  };

  dropdownButton.addEventListener('click', function() {
    const isOpen = dropdown.classList.toggle('open');
    dropdownButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

    if (!isOpen) {
      dropdownButton.blur();
    }
  });

  document.addEventListener('click', function(event) {
    if (!dropdown.contains(event.target)) {
      closeDropdown({ blurButton: true });
    }
  });

  document.addEventListener('focusin', function(event) {
    if (!dropdown.contains(event.target)) {
      closeDropdown();
    }
  });

  dropdown.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' || event.key === 'Esc') {
      closeDropdown();
      dropdownButton.focus();
    }
  });

  dropdownList.addEventListener('click', function() {
    closeDropdown();
  });
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
    jsonURL = '/reading.json';
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
