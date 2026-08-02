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

// Funcionalidade de busca na documentação
var searchBox = document.querySelector('.search-box');
if (searchBox) {
  // Índice de conteúdo das páginas
  var searchIndex = [
    { page: 'visao-geral.html', title: 'Visão Geral', content: 'O Splithub traz governança sobre recolhimento fornecedor RAD conciliação financeira' },
    { page: 'autenticacao.html', title: 'Autenticação', content: 'JSON Web Token JWT credenciais token autenticação Bearer' },
    { page: 'fornecedores.html', title: 'Fornecedores', content: 'CNPJ fornecedor endereço contato representante fiscal CRUD' },
    { page: 'ingestao-dfs.html', title: 'Ingestão DFs', content: 'documentos fiscais NF-e NFCe CTe imposto tributo IBS CBS' },
    { page: 'rad.html', title: 'RAD', content: 'recolhimento adquirente DARF webhook comprovante pagamento Pix' },
    { page: 'garantia-credito.html', title: 'Garantia de Crédito', content: 'crédito débito tributário ciclo vida apropriado extinto webhook' },
    { page: 'automacoes.html', title: 'Automações', content: 'regra automação gatilho ação dispara evento' },
    { page: 'contratos.html', title: 'Contratos', content: 'contrato CNPJ vigência valor condição pagamento RAD optante' }
  ];

  var currentPage = window.location.pathname.split('/').pop() || 'visao-geral.html';

  searchBox.addEventListener('click', function(e) {
    e.stopPropagation();
    showSearchModal();
  });

  searchBox.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeSearchModal();
  });

  // Atalho Cmd+K ou Ctrl+K para busca
  document.addEventListener('keydown', function(e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      showSearchModal();
    }
  });

  function showSearchModal() {
    var modal = document.getElementById('search-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'search-modal';
      modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);display:flex;align-items:flex-start;justify-content:center;z-index:1000;padding-top:60px;';

      var modalContent = document.createElement('div');
      modalContent.style.cssText = 'background:white;border-radius:12px;width:90%;max-width:600px;box-shadow:0 10px 40px rgba(0,0,0,0.2);overflow:hidden;';

      var searchInput = document.createElement('input');
      searchInput.type = 'text';
      searchInput.placeholder = 'Buscar na documentação...';
      searchInput.style.cssText = 'width:100%;padding:16px;border:none;font-size:16px;font-family:Inter,sans-serif;';
      searchInput.autofocus = true;

      var resultsList = document.createElement('div');
      resultsList.id = 'search-results';
      resultsList.style.cssText = 'max-height:400px;overflow-y:auto;padding:0;';

      searchInput.addEventListener('input', function() {
        var query = this.value.toLowerCase();
        resultsList.innerHTML = '';

        if (query.length < 2) return;

        var results = searchIndex.filter(function(item) {
          return item.title.toLowerCase().includes(query) ||
                 item.content.toLowerCase().includes(query);
        });

        if (results.length === 0) {
          resultsList.innerHTML = '<div style="padding:20px;text-align:center;color:#999;">Nenhum resultado encontrado</div>';
          return;
        }

        results.forEach(function(result) {
          var resultEl = document.createElement('a');
          resultEl.href = result.page;
          resultEl.style.cssText = 'display:block;padding:12px 16px;border-bottom:1px solid #eee;text-decoration:none;color:inherit;cursor:pointer;';
          resultEl.onmouseover = function() { this.style.background = '#f5f5f5'; };
          resultEl.onmouseout = function() { this.style.background = 'transparent'; };
          resultEl.textContent = result.title;
          resultsList.appendChild(resultEl);
        });
      });

      modalContent.appendChild(searchInput);
      modalContent.appendChild(resultsList);
      modal.appendChild(modalContent);
      document.body.appendChild(modal);

      modal.addEventListener('click', function(e) {
        if (e.target === modal) closeSearchModal();
      });
    } else {
      modal.style.display = 'flex';
      var input = modal.querySelector('input');
      input.focus();
      input.value = '';
      document.getElementById('search-results').innerHTML = '';
    }
  }

  function closeSearchModal() {
    var modal = document.getElementById('search-modal');
    if (modal) modal.style.display = 'none';
  }
}

// Dark mode toggle
document.addEventListener('DOMContentLoaded', function() {
  var html = document.documentElement;
  var topbarRight = document.querySelector('.topbar-right');

  // Criar botão de toggle se não existir
  var themeToggle = document.querySelector('.theme-toggle');
  if (!themeToggle && topbarRight) {
    themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
    topbarRight.insertBefore(themeToggle, topbarRight.firstChild);
  }

  // Detectar preferência salva ou do sistema
  var savedTheme = localStorage.getItem('theme');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');

  // Aplicar tema
  if (currentTheme === 'dark') {
    html.setAttribute('data-theme', 'dark');
    if (themeToggle) themeToggle.setAttribute('aria-label', 'Ativar modo claro');
  } else {
    html.removeAttribute('data-theme');
    if (themeToggle) themeToggle.setAttribute('aria-label', 'Ativar modo escuro');
  }

  // Event listener para toggle
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      var isDark = html.getAttribute('data-theme') === 'dark';
      if (isDark) {
        html.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeToggle.setAttribute('aria-label', 'Ativar modo escuro');
      } else {
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.setAttribute('aria-label', 'Ativar modo claro');
      }
    });
  }

  // Detectar mudanças de preferência do sistema
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (!localStorage.getItem('theme')) {
      var isDark = e.matches;
      if (isDark) {
        html.setAttribute('data-theme', 'dark');
      } else {
        html.removeAttribute('data-theme');
      }
    }
  });
});
