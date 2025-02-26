document.addEventListener('DOMContentLoaded', function() {
    let numeq = 0;
    const content = document.querySelector('.content');
    content.innerHTML = content.innerHTML.replace(/numeq/g, function() {
      return ++numeq;
    });
  });