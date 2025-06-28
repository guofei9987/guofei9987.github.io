function rollDiceAndRandom() {
  const btn = document.querySelector('.random-btn');
  btn.classList.add('spin');

  // 移除动画 class 以便下次点击可重新触发
  btn.addEventListener('animationend', () => {
    btn.classList.remove('spin');
  }, { once: true });

  // 触发 random
  window.dispatchEvent(new Event('sidebarDataLoaded'));
}

window.addEventListener('sidebarDataLoaded', function() {
  const type = window.guofei.sidebarType;
  const data = window.guofei.sidebarData;
  let posts = [];

  if (type === 'reading') {
    data.forEach(cat => {
      const [l1, l2List] = cat; // 解构一级类名和二级列表
      if (Array.isArray(l2List)) {
        posts = posts.concat(l2List);
      }
    });
  } else {
    data.forEach(cat => {
      const [tagName, postList] = cat; // 解构 tagName 和 posts 列表
      if (Array.isArray(postList)) {
        posts = posts.concat(postList);
      }
    });
  }

  if (posts.length === 0) {
    document.getElementById('randomResult').textContent = '未找到文章';
    return;
  }

  const post = posts[Math.floor(Math.random() * posts.length)];
  let title = '';
  let link = '';

  if (type === 'reading') {
    const [l3, cnt, h2List] = post; // 解构二级类名、计数、h2列表
    title = l3.replace('.md', '');
    link = '/reading/' + title + '.html';

    if (h2List && h2List.length > 0) {
      const randomH2 = h2List[Math.floor(Math.random() * h2List.length)];
      title += ' #' + randomH2;
      link += '#' + encodeURIComponent(randomH2);
    }
  } else {
    const [postTitle, url] = post; // 解构 title 和 url
    title = postTitle || '无标题';
    link = url || '#';
  }

  document.getElementById('randomResult').innerHTML = `<a href="${link}" target="_blank">${title}</a>`;
});