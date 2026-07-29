# Documentação Splithub

Site estático de documentação da API da Splithub. HTML, CSS e JS puros — sem build, sem dependências de node.

## Estrutura

```
splithub-docs/
├── index.html              → Home (landing com links para os guias)
├── visao-geral.html         → Guia: Visão geral da API
├── autenticacao.html        → Guia: Autenticação (JWT)
├── ingestao-dfs.html        → Recurso: Ingestão DFs
├── rad.html                 → Recurso: RAD (Recolhimento pelo Adquirente)
├── garantia-credito.html    → Recurso: Garantia de crédito
├── automacoes.html          → Recurso: Automações
├── contratos.html           → Recurso: Contratos
├── em-breve.html            → Placeholder para páginas ainda não escritas
├── assets/
│   ├── style.css            → Estilos compartilhados por todas as páginas
│   └── script.js            → Copiar código, menu mobile, destaque do índice
└── README.md
```

## Rodar localmente

Não precisa de servidor, mas para evitar bloqueios de CORS ao abrir os arquivos direto (`file://`), rode um servidor simples:

```bash
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000` no navegador.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub (ex: `splithub-docs`) e envie esta pasta:

   ```bash
   git init
   git add .
   git commit -m "Documentação inicial da Splithub"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/splithub-docs.git
   git push -u origin main
   ```

2. No GitHub, vá em **Settings → Pages**.
3. Em **Build and deployment**, selecione **Deploy from a branch**.
4. Escolha a branch `main` e a pasta `/ (root)`.
5. Salve. Em alguns minutos o site estará em:

   ```
   https://SEU_USUARIO.github.io/splithub-docs/
   ```

## Adicionar uma nova página

1. Duplique `autenticacao.html` como base.
2. Atualize `<title>`, `.breadcrumb`, `<h1>`, e o conteúdo dentro de `<main class="content">`.
3. Marque o item correspondente na sidebar com a classe `active` (procure por `nav-item`).
4. Atualize os links "Anterior/Próximo" em `.page-footer-nav`.
5. Se a página tiver seções (`<h2>`), adicione os links correspondentes em `.toc` para o índice funcionar.

## Próximos passos sugeridos

- Revisar o conteúdo de exemplo das páginas de Recursos (Ingestão DFs, RAD, Garantia de crédito, Automações, Contratos) com os detalhes reais de cada endpoint
- Adicionar uma seção de Referência de endpoints
- Trocar o `search-box` visual por uma busca funcional (ex: Lunr.js ou Algolia DocSearch)
