# FazerCriar — Site V1

Site institucional e comercial da **FazerCriar**: landing page única, estática (HTML, CSS e JavaScript puro), sem dependências e pronta para o GitHub Pages.

> **Da ideia à realidade.** Fabricação digital, impressão 3D, corte a laser, prototipagem e produtos personalizados.

---

## Estrutura

```
├── index.html              Página única (todas as seções)
├── css/
│   ├── theme.css           CONFIGURAÇÃO VISUAL: cores, fontes, raios
│   └── style.css           Estilos dos componentes (usa só as variáveis do theme.css)
├── js/
│   ├── config.js           CONFIGURAÇÃO DO SITE: WhatsApp, mensagens, Instagram, e-mail, logo, projetos
│   └── main.js             Comportamento (menu, links, galeria, animações)
├── assets/
│   ├── logo/               Logo oficial (ver LEIA-ME.txt)
│   ├── images/
│   │   ├── og-image.png    Imagem de compartilhamento (1200×630)
│   │   └── projetos/       Fotos da galeria
│   └── icons/
│       └── apple-touch-icon.png
├── favicon.svg             Ícone da aba (provisório)
├── robots.txt
├── sitemap.xml
├── .nojekyll               Faz o GitHub Pages servir os arquivos como estão
└── .gitignore
```

---

## O que você precisa substituir

| Item | Onde | Situação atual |
|---|---|---|
| **Número do WhatsApp** | `js/config.js` → `whatsappNumber` | `"WHATSAPP_NUMBER"` (placeholder) |
| Mensagens dos botões | `js/config.js` → `whatsappMessages` | Prontas; edite se quiser |
| Instagram | `js/config.js` → `instagram` | Vazio = oculto no rodapé |
| E-mail | `js/config.js` → `email` | Vazio = oculto no rodapé |
| **Logo oficial** | arquivo em `assets/logo/` + `js/config.js` → `logo.src` | Logotipo provisório em texto |
| **Favicon** | `favicon.svg` e `assets/icons/apple-touch-icon.png` | Provisório (letra "F" laranja) |
| **Fotos de projetos** | `assets/images/projetos/` + `js/config.js` → `projetos` | Cards "Foto em breve" |
| Imagem de compartilhamento | `assets/images/og-image.png` (1200×630) | Provisória, com o logotipo em texto |
| Cores e fontes | `css/theme.css` | Baseadas na apresentação de marca |

### WhatsApp
Use apenas números, com código do país e DDD:

```js
whatsappNumber: "5511912345678",
```

Todos os 10 botões de contato (cabeçalho, hero, cards, empresas, CTA final, rodapé e botão flutuante) usam esse número e a mensagem pré-preenchida correspondente.
Enquanto o número não for configurado, os links abrem o WhatsApp sem destinatário e aparece um aviso no canto da tela **somente quando o site é aberto localmente**.

### Logo
1. Salve a logo para **fundo escuro** (de preferência SVG) em `assets/logo/`.
2. Em `js/config.js`, preencha `logo.src` com o caminho, por exemplo `"assets/logo/fazercriar-logo-negativa.svg"`.
3. Se necessário, ajuste `logo.height` (altura no cabeçalho).

Se o arquivo não for encontrado, o site continua mostrando o logotipo em texto.

### Projetos
Cada item da lista `projetos` em `js/config.js` vira um card da galeria:

```js
{
  titulo: "Luminária personalizada",
  categoria: "Corte a laser",
  descricao: "Peça em MDF com gravação.",
  imagem: "assets/images/projetos/luminaria.webp",
  alt: "Luminária de MDF com padrão geométrico gravado a laser",
  icone: "laser"
}
```

- Fotos: `.webp` ou `.jpg`, proporção **4:3** (por exemplo 1200×900), até ~250 KB. Para comprimir, use o [Squoosh](https://squoosh.app).
- Sempre escreva um `alt` descrevendo a foto (acessibilidade e SEO).
- Para remover um card, apague o bloco `{ ... }`.
- Use apenas fotos de trabalhos reais da FazerCriar.

---

## Visualizar localmente

**Opção 1:** dê dois cliques em `index.html`. O site funciona direto no navegador.

**Opção 2 (recomendada, mais fiel ao site publicado):** rode um servidor local na pasta do projeto, com Node.js:

```bash
npx serve .
```

Ou com Python:

```bash
python -m http.server 5500
```

Depois acesse `http://localhost:5500` (ou o endereço indicado no terminal).
No VS Code, a extensão *Live Server* também funciona.

---

## Publicar gratuitamente no GitHub Pages

1. Crie uma conta em [github.com](https://github.com) (se ainda não tiver).
2. Crie um repositório novo, por exemplo `fazercriar-site`, **público**. Contas gratuitas só publicam Pages de repositórios públicos.
3. Envie os arquivos desta pasta para o repositório. Pode ser:
   - pelo navegador: **Add file → Upload files**, arrastando todo o conteúdo da pasta (inclusive `css/`, `js/`, `assets/`, `.nojekyll`);
   - ou pelo terminal:
     ```bash
     git init
     git add .
     git commit -m "Site FazerCriar V1"
     git branch -M main
     git remote add origin https://github.com/SEU-USUARIO/fazercriar-site.git
     git push -u origin main
     ```
4. No repositório, abra **Settings → Pages**.
5. Em **Build and deployment → Source**, escolha **Deploy from a branch**.
6. Em **Branch**, selecione `main` e a pasta `/ (root)`. Clique em **Save**.
7. Aguarde de 1 a 5 minutos. O endereço aparece no topo da página de configurações:
   `https://SEU-USUARIO.github.io/fazercriar-site/`

Para atualizar o site depois, basta enviar os arquivos alterados (commit). O GitHub publica de novo automaticamente.

---

## Conectar o domínio fazercriar.com.br

Faça isto **depois** que o site estiver publicado no endereço `github.io` e o domínio estiver registrado no [Registro.br](https://registro.br).

### 1. Verificar o domínio no GitHub (recomendado, protege contra uso indevido)
No GitHub: foto do perfil → **Settings → Pages → Add a domain**. Informe `fazercriar.com.br` e crie o registro **TXT** indicado no DNS (passo 3). Depois clique em **Verify**.

### 2. Informar o domínio no repositório
No repositório: **Settings → Pages → Custom domain** → digite `fazercriar.com.br` → **Save**.
Isso cria automaticamente um arquivo `CNAME` no repositório. Não apague esse arquivo.

### 3. Configurar o DNS no Registro.br
No painel do Registro.br, abra o domínio → **DNS → Editar zona** (se pedir, ative o *modo avançado* / DNS do Registro.br). Crie:

| Tipo | Nome | Valor |
|---|---|---|
| A | *(vazio / @)* | `185.199.108.153` |
| A | *(vazio / @)* | `185.199.109.153` |
| A | *(vazio / @)* | `185.199.110.153` |
| A | *(vazio / @)* | `185.199.111.153` |
| AAAA | *(vazio / @)* | `2606:50c0:8000::153` |
| AAAA | *(vazio / @)* | `2606:50c0:8001::153` |
| AAAA | *(vazio / @)* | `2606:50c0:8002::153` |
| AAAA | *(vazio / @)* | `2606:50c0:8003::153` |
| CNAME | `www` | `SEU-USUARIO.github.io` |

> Confira os IPs atuais na documentação oficial: [Managing a custom domain for your GitHub Pages site](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).
> Se o domínio usar outro provedor de DNS (Cloudflare, Hostinger etc.), crie os mesmos registros no painel desse provedor.

A propagação do DNS pode levar de alguns minutos a 24–48 horas.

### 4. Ativar HTTPS
Quando o GitHub confirmar o DNS (em **Settings → Pages** aparece a mensagem de DNS válido), marque **Enforce HTTPS**.
O certificado é emitido automaticamente e pode levar até 24 horas. Se a opção estiver desabilitada, aguarde e recarregue a página.

### 5. Conferir
- `https://fazercriar.com.br` abre o site com cadeado (HTTPS).
- `https://www.fazercriar.com.br` redireciona para o domínio principal.
- Envie `https://fazercriar.com.br/sitemap.xml` no [Google Search Console](https://search.google.com/search-console).

---

## SEO já implementado

- `title`, `meta description` e `canonical` (apontando para `https://fazercriar.com.br/`)
- Open Graph e Twitter Card (imagem `assets/images/og-image.png`)
- HTML semântico com um único `h1` e hierarquia `h2`/`h3`
- `robots.txt` e `sitemap.xml`
- Imagens da galeria com `loading="lazy"`, `width`/`height` e `alt`
- Ícones e botões com nomes acessíveis; animações respeitam "reduzir movimento"

Ao alterar o conteúdo, atualize a data `<lastmod>` em `sitemap.xml`.

---

## Problemas conhecidos / observações

- **Logo e favicon provisórios.** A pasta só tinha a apresentação de marca em PNG (1254×1254), sem os arquivos vetoriais da logo. O cabeçalho usa um logotipo em texto (Montserrat, nas cores da marca) e o favicon é uma letra "F". Substitua pelos arquivos oficiais.
- **Prévia de compartilhamento.** As tags Open Graph e o `canonical` apontam para `https://fazercriar.com.br`. Até o domínio ser conectado, a imagem de prévia no WhatsApp e nas redes pode não aparecer. Se o site ficar muito tempo só no endereço `github.io`, troque essas URLs no `<head>` do `index.html`.
- **Galeria via JavaScript.** Os cards de projeto são montados a partir do `config.js`. Sem JavaScript, a galeria mostra apenas um aviso; o restante do site funciona normalmente.
- **Fonte externa.** A Montserrat é carregada do Google Fonts. Sem conexão, o site usa a fonte do sistema.
- O arquivo `Apresentação de Marca FazerCriar.png` é material de referência e está no `.gitignore` para não ser publicado.
