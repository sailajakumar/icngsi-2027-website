
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

const header = document.querySelector('[data-header]');
const progress = document.querySelector('.scroll-progress span');
function onScroll(){
  const y = window.scrollY || document.documentElement.scrollTop;
  if(header) header.classList.toggle('scrolled', y > 8);
  if(progress){
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = max > 0 ? `${Math.min(100, (y / max) * 100)}%` : '0%';
  }
}
window.addEventListener('scroll', onScroll, {passive:true});
onScroll();

function updateCountdown(){
  document.querySelectorAll('[data-countdown]').forEach(box => {
    const target = new Date(box.dataset.countdown).getTime();
    let diff = Math.max(0, target - Date.now());
    const days = Math.floor(diff / 86400000); diff -= days * 86400000;
    const hours = Math.floor(diff / 3600000); diff -= hours * 3600000;
    const minutes = Math.floor(diff / 60000); diff -= minutes * 60000;
    const seconds = Math.floor(diff / 1000);
    const set = (sel,val) => { const el = box.querySelector(sel); if(el) el.textContent = String(val).padStart(2,'0'); };
    set('[data-days]', days); set('[data-hours]', hours); set('[data-minutes]', minutes); set('[data-seconds]', seconds);
  });
}
updateCountdown();
setInterval(updateCountdown, 1000);

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('in-view'));
}
