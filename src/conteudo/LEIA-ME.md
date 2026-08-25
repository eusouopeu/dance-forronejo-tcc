# Onde mexer no texto

Todo o conteúdo textual do site vive nesta pasta, em arquivos `.json`. Os componentes em
`src/sections/` só desenham — não guardam texto. Para mudar qualquer palavra da apresentação,
edite o arquivo correspondente aqui e salve: com `npm run dev` rodando, a página recarrega sozinha.

| Arquivo | O que controla |
|---|---|
| `site.json` | Nome do trabalho, autor, as 7 abas da barra lateral e os textos da moldura |
| `s1-estrutura.json` | Aba 01 — cascata do problema, objetivo geral e objetivos específicos |
| `s2-teorico.json` | Aba 02 — conceitos, definições, fontes e os filtros por camada |
| `s3-metodologia.json` | Aba 03 — ficha, instrumentos, validação, planos amostrais e coleta |
| `s4-itens.json` | Aba 04 — os 27 itens do instrumento e as colunas da tabela |
| `s5-modelo.json` | Aba 05 — a cadeia objetivo → dimensão → itens → técnica |
| `s6-tecnicas.json` | Aba 06 — técnicas, títulos dos gráficos, séries numéricas e testes |
| `s7-contribuicoes.json` | Aba 07 — números de fecho, eixos, limitações e agenda futura |

## Regras que evitam quebrar a página

**Mantenha a estrutura.** Troque o que está *depois* dos dois-pontos, não o nome do campo.

```json
"titulo": "A cadeia dedutiva do problema"
          └── pode mudar à vontade
```

**Aspas duplas sempre.** JSON não aceita aspas simples nem vírgula sobrando no último item da lista.

**Aspas dentro do texto** precisam de barra invertida: `"ele disse \"sim\""`. Aspas curvas
(`“ ”`) não precisam e ficam mais bonitas.

**Cores são nomes, não códigos.** Onde aparecer `"cor": "terra"`, os valores aceitos estão em
`src/tema.js`: `terra`, `terraEscuro`, `terraProfundo`, `brasa`, `brasaEscuro`, `ambar`,
`milho`, `milhoClaro`, `rubro`, `areia`, `branco`. Para mudar o tom em si — e não onde ele é
usado — edite os tokens no `@theme` de `src/index.css`.

**Campos que começam com `_`** (como `_leiaMe`) são anotações para você. O site os ignora.

## Coisas que talvez você queira fazer

**Renomear uma aba** — em `site.json`, dentro de `secoes`: `titulo` e `subtitulo` aparecem na
barra lateral, `subtituloLongo` aparece no cabeçalho da aba e `tempo` é a estimativa de fala.
Não mude o `id`, que é o endereço da aba na URL.

**Reordenar as abas** — mova o bloco inteiro dentro de `secoes` e acerte o campo `n`.

**Acrescentar um conceito, item ou objetivo** — copie um bloco vizinho inteiro (das chaves `{` até
`}`), cole depois dele com uma vírgula entre os dois e troque o conteúdo. Todas as listas do site
crescem sozinhas; os contadores e as barras de proporção se recalculam.

**Reordenar as colunas da tabela de itens** — em `s4-itens.json`, mova os blocos dentro de
`colunas`. Cada um tem `titulo` (o cabeçalho, livre) e `campo` (a chave do dado, que precisa
continuar existindo nos itens).

**Corrigir um número de gráfico** — em `s6-tecnicas.json`, sob `dados`. Os títulos e as notas
dos mesmos gráficos ficam em `graficos`, logo acima.

**Reabrir uma seção escondida** — `s1-estrutura.json` guarda, em `secoesOcultas`, as questões
correlatas e os pressupostos, que foram tirados da apresentação. O texto está preservado, mas
voltar a exibi-los exige mexer no componente — peça ajuda para isso.

## Se a página ficar em branco

Quase sempre é vírgula a mais, vírgula a menos ou aspas não fechadas. O terminal do `npm run dev`
aponta o arquivo e a linha. Para conferir um arquivo antes de salvar, cole o conteúdo em
<https://jsonlint.com>.
