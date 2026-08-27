document.addEventListener('DOMContentLoaded', () => {
  if (window.AOS) {
    AOS.init({ duration: 760, once: true, offset: 90, easing: 'ease-out-cubic' });
  }

  document.querySelectorAll('.navbar-collapse .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const menu = document.querySelector('.navbar-collapse.show');
      if (menu && window.bootstrap) bootstrap.Collapse.getOrCreateInstance(menu).hide();
    });
  });
});
