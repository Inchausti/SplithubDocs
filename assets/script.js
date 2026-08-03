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

// Colapsável das seções de navegação (nav-group)
document.querySelectorAll('.nav-group-title').forEach(function(title) {
  title.addEventListener('click', function(e) {
    e.preventDefault();
    var navGroup = this.closest('.nav-group');
    var navItems = navGroup.querySelector('.nav-items');

    if (navItems) {
      navItems.classList.toggle('collapsed');
      this.classList.toggle('collapsed');
    }
  });

  // Adicionar cursor pointer
  title.style.cursor = 'pointer';
});

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

// Theme selector with dropdown menu
document.addEventListener('DOMContentLoaded', function() {
  var html = document.documentElement;
  var topbarRight = document.querySelector('.topbar-right');

  if (topbarRight) {
    // Criar container do seletor de tema
    var selector = document.createElement('div');
    selector.className = 'theme-selector';

    var toggle = document.createElement('button');
    toggle.className = 'theme-toggle';
    toggle.setAttribute('aria-label', 'Seletor de tema');
    toggle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg> Tema';

    var menu = document.createElement('div');
    menu.className = 'theme-menu';

    var themes = [
      { id: 'light', label: 'Claro' },
      { id: 'dark', label: 'Escuro' },
      { id: 'green', label: 'Verde' }
    ];

    themes.forEach(function(theme) {
      var btn = document.createElement('button');
      btn.setAttribute('data-theme', theme.id);
      btn.textContent = theme.label;
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        setTheme(theme.id);
        updateMenuState();
        menu.classList.remove('open');
      });
      menu.appendChild(btn);
    });

    toggle.addEventListener('click', function(e) {
      e.stopPropagation();
      menu.classList.toggle('open');
    });

    document.addEventListener('click', function(e) {
      if (!selector.contains(e.target)) {
        menu.classList.remove('open');
      }
    });

    selector.appendChild(toggle);
    selector.appendChild(menu);
    topbarRight.insertBefore(selector, topbarRight.firstChild);
  }

  function setTheme(theme) {
    if (theme === 'light') {
      html.removeAttribute('data-theme');
    } else {
      html.setAttribute('data-theme', theme);
    }
    localStorage.setItem('theme', theme);
  }

  function updateMenuState() {
    var currentTheme = html.getAttribute('data-theme') || 'light';
    var buttons = document.querySelectorAll('.theme-menu button');
    buttons.forEach(function(btn) {
      if (btn.getAttribute('data-theme') === currentTheme) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Detectar preferência salva ou do sistema
  var savedTheme = localStorage.getItem('theme');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');

  setTheme(currentTheme);
  setTimeout(updateMenuState, 100);

  // Detectar mudanças de preferência do sistema
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
      updateMenuState();
    }
  });
});
