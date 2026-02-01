(function(){
  const dlg = document.getElementById('lightbox');
  if (!dlg) return;
  const lbImg = dlg.querySelector('#lb-img');
  const btnPrev = dlg.querySelector('#lb-prev');
  const btnNext = dlg.querySelector('#lb-next');
  const btnClose = dlg.querySelector('#lb-close');
  const allImgs = Array.from(document.querySelectorAll('.card-thumb img'));
  let current = -1;

  function openAt(idx){
    current = idx;
    const img = allImgs[current];
    const src = img.getAttribute('data-full') || img.src;
    lbImg.src = src;
    if (dlg.showModal) dlg.showModal(); else window.open(src, '_blank');
  }

  function move(step){
    if (current === -1 || allImgs.length === 0) return;
    current = (current + step + allImgs.length) % allImgs.length;
    const img = allImgs[current];
    lbImg.src = img.getAttribute('data-full') || img.src;
  }

  allImgs.forEach((img, idx) => img.addEventListener('click', () => openAt(idx)));
  if (btnPrev) btnPrev.addEventListener('click', () => move(-1));
  if (btnNext) btnNext.addEventListener('click', () => move(1));
  if (btnClose) btnClose.addEventListener('click', () => dlg.close());

  dlg.addEventListener('click', (e) => {
    const rect = lbImg.getBoundingClientRect();
    const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
    if (!inside) dlg.close();
  });

  document.addEventListener('keydown', (e) => {
    if (!dlg.open) return;
    if (e.key === 'Escape') dlg.close();
    else if (e.key === 'ArrowLeft') move(-1);
    else if (e.key === 'ArrowRight') move(1);
  });
})();
