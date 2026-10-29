/* Vanilla JS: navigazione, modali accessibili e animazioni progressive. */
'use strict';
const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
const mobileQuery = window.matchMedia('(max-width: 760px)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const dialogs = [...document.querySelectorAll('dialog')];
let returnFocus;
function updateScrollLock() {
  document.body.classList.toggle('is-locked', nav?.classList.contains('is-open') || dialogs.some(d => d.open));
}
function setMenu(open, restoreFocus = false) {
  if (!nav || !toggle) return;
  nav.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.querySelector('span').textContent = open ? 'Chiudi' : 'Menu';
  updateScrollLock();
  if (restoreFocus) toggle.focus();
}
toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
nav?.addEventListener('click', e => { if(e.target.closest('a')) setMenu(false); });
mobileQuery.addEventListener('change', () => setMenu(false));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && nav?.classList.contains('is-open')) setMenu(false, true);
  if (e.key === 'Tab' && nav?.classList.contains('is-open')) {
    const focusable = [toggle, ...nav.querySelectorAll('a')];
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});
function updateHeader(){ header?.classList.toggle('is-fixed', window.scrollY > 110); }
window.addEventListener('scroll', updateHeader, {passive:true}); updateHeader();
function openDialog(dialog, opener){ returnFocus = opener; dialog.showModal(); updateScrollLock(); }
document.querySelectorAll('[data-open-menu]').forEach(button => button.addEventListener('click', () => openDialog(document.querySelector('#menu-dialog'), button)));
document.querySelectorAll('[data-open-proposal]').forEach(button => button.addEventListener('click', () => openDialog(document.querySelector('#proposal-dialog'), button)));
dialogs.forEach(dialog => {
  dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const r = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => { updateScrollLock(); returnFocus?.focus(); });
});
if ('IntersectionObserver' in window) {
  if (!reducedMotion.matches) {
    document.documentElement.classList.add('motion-ready');
    const reveals = new IntersectionObserver(entries => entries.forEach(entry => {
      if(entry.isIntersecting){ entry.target.classList.add('is-visible'); reveals.unobserve(entry.target); }
    }), {threshold: .08});
    document.querySelectorAll('.reveal').forEach(element => reveals.observe(element));
  }
  const links = [...(nav?.querySelectorAll('a:not(.nav-reserve)') || [])];
  const activeSection = new IntersectionObserver(entries => entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    links.forEach(link => {
      if(link.hash === '#' + entry.target.id) link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    });
  }), {rootMargin:'-15% 0px -55% 0px'});
  document.querySelectorAll('main section[id]').forEach(section => activeSection.observe(section));
}

// Video: autoplay silenzioso, pausa fuori schermo e rispetto del movimento ridotto.
const wineVideo = document.querySelector('#wine-video');
const videoButton = document.querySelector('.video-toggle');
if (wineVideo && videoButton) {
  let userPaused = false;
  function syncVideoButton() {

  }
  function playVideo() { wineVideo.play().catch(syncVideoButton); }
  if (reducedMotion.matches) { wineVideo.autoplay = false; wineVideo.pause(); }
  wineVideo.addEventListener('play', syncVideoButton);
  wineVideo.addEventListener('pause', syncVideoButton);
  videoButton.addEventListener('click', () => {
    userPaused = !wineVideo.paused;
    if (wineVideo.paused) playVideo(); else wineVideo.pause();
  });
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !userPaused && !reducedMotion.matches) playVideo();
    else wineVideo.pause();
  }, {threshold:.15}).observe(wineVideo);
  reducedMotion.addEventListener('change', () => { if(reducedMotion.matches) wineVideo.pause(); });
  document.addEventListener('visibilitychange', () => { if(document.hidden) wineVideo.pause(); });
  syncVideoButton();
}
