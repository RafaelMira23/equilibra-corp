(() => {
  'use strict';
  const toggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  function setMenu(open, returnFocus = false) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    navigation.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    if (returnFocus) toggle.focus();
  }
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setMenu(false, true);
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header') && toggle.getAttribute('aria-expanded') === 'true') setMenu(false);
  });
  const mobile = window.matchMedia('(max-width: 650px)');
  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  const tablist = document.querySelector('[role="tablist"]');
  function updateOrientation() {
    tablist.setAttribute('aria-orientation', mobile.matches ? 'horizontal' : 'vertical');
    if (!mobile.matches) setMenu(false);
  }
  mobile.addEventListener('change', updateOrientation);
  updateOrientation();
  function activateTab(tab, focus = false) {
    tabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
    });
    if (focus) tab.focus({ preventScroll: true });
    if (mobile.matches) tab.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'auto' });
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', event => {
      const previous = mobile.matches ? 'ArrowLeft' : 'ArrowUp';
      const next = mobile.matches ? 'ArrowRight' : 'ArrowDown';
      let target;
      if (event.key === previous) target = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === next) target = (index + 1) % tabs.length;
      else if (event.key === 'Home') target = 0;
      else if (event.key === 'End') target = tabs.length - 1;
      else return;
      event.preventDefault();
      activateTab(tabs[target], true);
    });
  });
})();
