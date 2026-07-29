// Copia o conteúdo do bloco de código para a área de transferência
document.querySelectorAll('.code-block').forEach(function (block) {
  var button = block.querySelector('.code-head button');
  var pre = block.querySelector('pre');
  if (!button || !pre) return;
  button.addEventListener('click', function () {
    navigator.clipboard.writeText(pre.textContent).then(function () {
      var original = button.innerHTML;
      button.innerHTML = 'Copiado';
      button.classList.add('copied');
      setTimeout(function () {
        button.innerHTML = original;
        button.classList.remove('copied');
      }, 1500);
    });
  });
});

// Abre/fecha a sidebar em telas pequenas
var toggle = document.querySelector('.menu-toggle');
var sidebar = document.querySelector('.sidebar');
if (toggle && sidebar) {
  toggle.addEventListener('click', function () {
    sidebar.classList.toggle('open');
  });
}

// Destaca o link do índice (TOC) conforme a seção visível
var tocLinks = document.querySelectorAll('.toc-link');
if (tocLinks.length) {
  var sections = Array.prototype.map.call(tocLinks, function (link) {
    return document.querySelector(link.getAttribute('href'));
  });
  window.addEventListener('scroll', function () {
    var pos = window.scrollY + 100;
    var activeIndex = 0;
    sections.forEach(function (section, i) {
      if (section && section.offsetTop <= pos) activeIndex = i;
    });
    tocLinks.forEach(function (link, i) {
      link.classList.toggle('active', i === activeIndex);
    });
  });
}
