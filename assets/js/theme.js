const toggle = document.getElementById('themeToggle');

toggle?.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

document.getElementById('footerYear').textContent =
  `© ${new Date().getFullYear()} Calculator Suite`;
