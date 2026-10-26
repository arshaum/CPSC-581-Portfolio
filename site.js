const launch = document.querySelector('#load-demo');
launch?.addEventListener('click', () => {
  const iframe = document.createElement('iframe');
  iframe.src = 'prototype.html';
  iframe.title = 'A Family of Buttons: interactive soccer and DIY prototype';
  document.querySelector('#demo-container').replaceChildren(iframe);
  iframe.addEventListener('load', () => iframe.focus(), { once: true });
});

const dialog = document.querySelector('#sketch-dialog');
const full = document.querySelector('#sketch-full');
const caption = document.querySelector('#sketch-caption');
document.querySelectorAll('.sketch-open').forEach(button => {
  button.addEventListener('click', () => {
    full.src = button.dataset.image;
    full.alt = button.querySelector('img').alt;
    caption.textContent = button.dataset.caption;
    dialog.showModal();
  });
});
dialog?.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});

document.querySelectorAll('.preview-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.project-card');
    const active = button.getAttribute('aria-pressed') !== 'true';
    button.setAttribute('aria-pressed', String(active));
    card.classList.toggle('preview-open', active);
    button.innerHTML = active ? 'Close preview <span aria-hidden="true">×</span>' : 'Preview <span aria-hidden="true">↗</span>';
  });
});

document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  document.querySelectorAll('.preview-open').forEach(card => {
    card.classList.remove('preview-open');
    const button = card.querySelector('.preview-toggle');
    button.setAttribute('aria-pressed', 'false');
    button.innerHTML = 'Preview <span aria-hidden="true">↗</span>';
    button.focus();
  });
});
