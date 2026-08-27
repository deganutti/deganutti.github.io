# Curriculum Vitae Online - Luiz Gabriel Deganutti

Site estático profissional, pronto para GitHub Pages.

## Publicar no GitHub Pages
1. Extraia este ZIP.
2. Envie os arquivos para a raiz do repositório.
3. Acesse `Settings > Pages` no GitHub.
4. Em `Branch`, selecione `main` e `/root`.
5. Salve e aguarde a URL.

## Trocar imagens
- Topo: `assets/img/agro-background.svg`
- Foto: `assets/img/perfil-placeholder.svg`

Você pode trocar por `.jpg` ou `.png`; nesse caso, altere o caminho no `index.html`.

## Ajustar posição da imagem do topo
No arquivo `assets/css/style.css`, altere:

```css
--hero-position:center center;
```

Exemplos:

```css
--hero-position:left center;
--hero-position:right center;
--hero-position:center top;
```

## Sobre o botão "Baixar CV"
O HTML já aponta para `assets/cv-luiz-gabriel.pdf`. Para ativar, coloque o PDF do currículo nesse caminho com esse nome.


## SEO - o que fazer após publicar

Depois que o GitHub Pages gerar a URL do site, substitua em todos os arquivos:

```text
https://SEU_USUARIO.github.io/NOME_DO_REPOSITORIO/
```

pela URL real do seu site. Exemplo:

```text
https://luizgabriel.github.io/curriculo/
```

Arquivos que contêm essa URL:

- `index.html`
- `sitemap.xml`
- `robots.txt`

### Google Search Console

1. Acesse o Google Search Console.
2. Adicione a propriedade com a URL do GitHub Pages.
3. Envie o sitemap:

```text
https://SEU_USUARIO.github.io/NOME_DO_REPOSITORIO/sitemap.xml
```

### Termos estratégicos já trabalhados na página

- Luiz Gabriel Deganutti
- Técnico em Agropecuária
- Técnico em Agropecuária Sarandi PR
- Agrônomo em formação
- MIP
- Manejo de Solo
- Análise de Solo
- Auditoria Agrícola
- Controle Biológico
- Crédito Rural e PROAGRO

### Observação importante

SEO não é imediato. Após publicar e enviar o sitemap, o Google pode levar dias ou semanas para indexar e exibir alterações.


## Página adicional: Análise de Solo

Foi criada a página:

```text
analise-de-solo.html
```

Ela já possui:

- SEO próprio para análise de solo;
- Open Graph para compartilhamento;
- Schema.org do tipo `Article`;
- cards de indicadores;
- área de formulário preparada para JavaScript;
- IDs simples para futura programação:
  - `soilAnalysisForm`
  - `btnInterpretar`
  - `soilResult`
  - `ph`, `ctc`, `v`, `p`, `k`, `mo`

Lembre-se de substituir `https://SEU_USUARIO.github.io/NOME_DO_REPOSITORIO/` pela URL real também nesta nova página.
