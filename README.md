# Dance Forrónejo — apresentação da pesquisa

Site de apresentação do Trabalho de Conclusão de Curso *“Dance Forrónejo: diagnóstico do composto de
marketing e do valor de marca sob a perspectiva dos alunos em Salvador”* — Bacharelado em Administração,
Escola de Administração, UFBA.

Sete seções, uma por aba da barra lateral, dimensionadas para uma apresentação oral de até 10 minutos:

| # | Seção | Tempo previsto |
|---|---|---|
| 1 | Estrutura da pesquisa | 1min30 |
| 2 | Quadro teórico | 1min30 |
| 3 | Caracterização metodológica | 1min30 |
| 4 | Quadro de itens | 1min30 |
| 5 | Modelo de análise | 1min30 |
| 6 | Técnicas de análise | 1min30 |
| 7 | Contribuições esperadas | 1min |

Durante a apresentação, as setas **←** e **→** do teclado navegam entre as seções.

## Rodar localmente

```bash
npm install
npm run dev
```

## Publicar no GitHub Pages

O site está publicado em <https://eusouopeu.github.io/dance-forronejo-tcc/>, servido a partir da branch
`gh-pages`.

**Para republicar depois de editar qualquer coisa:**

```bash
npm run deploy
```

Esse comando roda o build e envia o resultado para a branch `gh-pages`. Leva cerca de um minuto até o
GitHub servir a versão nova.

**Opcional — publicar automaticamente a cada `push`.** O arquivo `.github/deploy-pages.yml.exemplo` é um
workflow do GitHub Actions pronto. Para ativá-lo, o token do `gh` precisa do escopo `workflow`, que o
padrão não inclui:

```bash
gh auth refresh -s workflow
```

Depois disso, mova o arquivo para `.github/workflows/deploy.yml`, faça o commit e, em *Settings → Pages*,
troque a origem para **GitHub Actions**.

> O prefixo importa: o GitHub Pages serve o site em `https://<usuario>.github.io/<repositorio>/`, e sem o
> `base` correto os arquivos de CSS e JavaScript retornam 404. Em desenvolvimento o site roda na raiz.

## Editar o texto do site

Todo o conteúdo textual está em `src/conteudo/`, um arquivo `.json` por aba. Os componentes em
`src/sections/` apenas desenham — não guardam texto. Para mudar qualquer palavra, edite o `.json`
correspondente e salve; com `npm run dev` rodando, a página recarrega sozinha.

Comece por **[`src/conteudo/LEIA-ME.md`](src/conteudo/LEIA-ME.md)**, que mapeia cada arquivo, explica as
regras de sintaxe do JSON e lista as edições mais comuns.

As cores não ficam nos `.json`: eles usam nomes (`"cor": "terra"`) resolvidos em `src/tema.js`, que aponta
para os tokens do `@theme` em `src/index.css`.

## Origem do conteúdo

Todo o texto, os quadros e as séries dos gráficos vêm de dois arquivos do trabalho:

- `ENTREGAS/Dance Forrónejo (versão de trabalho).odt` — texto, objetivos, metodologia e apêndices;
- `ENTREGAS/5. Planilhas/Analise Principal (versão de trabalho).xlsx` — abas `Sumarização`, `Tabela 1`,
  `Associação` e `Associação A/B/C`, que alimentam as visualizações e os testes da seção 6.

## Stack

React 19, Tailwind CSS 4, Recharts e Vite.
