const menuBtn = document.querySelector('[data-menu-btn]');
const navlist = document.querySelector('[data-navlist]');
const closeBtn = document.querySelector('[data-close-btn]');

menuBtn.addEventListener('click', () => {
  navlist.classList.toggle('open');

  if (navlist.classList.contains('open')) {
    menuBtn.style.display = 'none';
  } else {
    menuBtn.style.display = 'block';
  }
});
closeBtn.addEventListener('click', () => {
  navlist.classList.toggle('open');

  if (navlist.classList.contains('open')) {
    menuBtn.style.display = 'none';
  } else {
    menuBtn.style.display = 'block';
  }
});
