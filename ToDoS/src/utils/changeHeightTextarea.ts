const changeHeightTextarea = () => {
  document.querySelectorAll('textarea').forEach((el) => {
    el.style.height = el.scrollHeight - 0.2 + 'px';
    el.classList.add('auto');
    el.addEventListener('input', (e) => {
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
    });
  });
};
export default changeHeightTextarea;
