(function(){
  function bindFilter(section){
    const chips = Array.from(document.querySelectorAll(section.filterSel));
    const items = Array.from(document.querySelectorAll(section.gridSel + ' ' + section.itemCls));
    const countEl = document.querySelector(section.countSel);

    function updateCounts(active='all'){
      const total = items.length;
      const visible = items.filter(it => active==='all' || it.dataset.cat===active).length;
      if (countEl) countEl.textContent = section.countText(total, visible);
      const cats = {};
      items.forEach(it => { cats[it.dataset.cat] = (cats[it.dataset.cat]||0) + 1; });
      chips.forEach(ch => {
        const cat = ch.dataset.cat;
        const numEl = ch.querySelector('.num');
        if (!numEl) return;
        numEl.textContent = (cat==='all') ? total : (cats[cat]||0);
      });
    }

    if (!chips.length) return;
    updateCounts();

    chips.forEach(ch => ch.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      ch.classList.add('active');
      const cat = ch.dataset.cat;
      items.forEach(it => { it.style.display = (cat==='all' || it.dataset.cat===cat) ? '' : 'none'; });
      updateCounts(cat);
      if (section.hashPrefix) location.hash = section.hashPrefix + encodeURIComponent(cat);
    }));

    if (section.hashPrefix && location.hash.startsWith(section.hashPrefix)){
      const cat = decodeURIComponent(location.hash.replace(section.hashPrefix,''));
      const chip = chips.find(c => c.dataset.cat===cat);
      if (chip) chip.click();
    }
  }

  window.cardList = { bindFilter };
})();
