import { useState } from "react";
import c from "../conteudo/s4-itens.json";
import { cor, ehEscura } from "../tema";
import { TituloSecao, Cartao, Reveal, Etiqueta, Nota } from "../components/ui";

const corDim = (d) => cor(c.coresDimensao[d]);
const escuraDim = (d) => ehEscura(c.coresDimensao[d]);

/* Uma célula por coluna declarada em conteudo/s4-itens.json → colunas[].campo */
function Celula({ item, campo }) {
  if (campo === "dim")
    return <Etiqueta cor={corDim(item.dim)} escura={escuraDim(item.dim)}>{item.dim}</Etiqueta>;

  if (campo === "escala")
    return (
      <>
        <span className="block font-medium">{item.tipo}</span>
        <span className="text-xs text-terra-700/70">{item.escala}</span>
      </>
    );

  if (campo === "pergunta")
    return (
      <>
        <span className="italic">“{item.pergunta}”</span>
        {item.exclusivo && (
          <span className="mt-1 block text-[11px] font-semibold tracking-wide text-rubro-600 uppercase">
            {item.exclusivo}
          </span>
        )}
      </>
    );

  return item[campo];
}

const CLASSE_CELULA = {
  cod: "font-mono text-xs font-bold whitespace-nowrap text-brasa-600",
  variavel: "font-semibold text-terra-900",
  escala: "text-terra-800",
  codificacao: "text-terra-800/85",
  pergunta: "text-terra-800/85",
  fundamentacao: "text-xs leading-snug text-terra-700/85",
};

export default function S4Itens() {
  const [dim, setDim] = useState(c.dimensoes[0]);
  const lista = dim === c.rotuloTodas ? c.itens : c.itens.filter((i) => i.dim === dim);
  const contagem = c.dimensoes.map((d) => ({ d, n: c.itens.filter((i) => i.dim === d).length }));

  return (
    <>
      <TituloSecao id="itens" />

      <Reveal>
        <p className="max-w-3xl text-base leading-relaxed text-terra-800/90">
          {c.introducao.antes}{" "}
          {c.introducao.exemplos.map((e, i) => (
            <span key={e}>
              <span className="font-mono text-sm text-brasa-600">{e}</span>
              {i < c.introducao.exemplos.length - 1 ? ", " : ""}
            </span>
          ))}
          {c.introducao.depois}{" "}
          <span className="font-mono text-sm text-brasa-600">{c.introducao.prefixoObservacao}</span>{" "}
          {c.introducao.fim}
        </p>
      </Reveal>

      {/* Distribuição por dimensão */}
      <Reveal>
        <div className="mt-7 flex h-10 overflow-hidden rounded-lg border border-areia-200">
          {contagem.map((x, i) => (
            <div
              key={x.d}
              className="flex origin-left animate-grow-x items-center justify-center text-xs font-bold whitespace-nowrap"
              style={{
                width: `${(x.n / c.itens.length) * 100}%`,
                backgroundColor: corDim(x.d),
                color: escuraDim(x.d) ? "#fff" : "var(--color-terra-900)",
                animationDelay: `${i * 70}ms`,
              }}
              title={`${x.d}: ${x.n} itens`}
            >
              {x.n}
            </div>
          ))}
        </div>
      </Reveal>

      {/* Filtros */}
      <div className="my-6 flex flex-wrap gap-2">
        {[...c.dimensoes, c.rotuloTodas].map((d) => {
          const ativo = dim === d;
          const todas = d === c.rotuloTodas;
          return (
            <button
              key={d}
              onClick={() => setDim(d)}
              className={`cursor-pointer rounded-full border px-4 py-1.5 text-sm font-semibold transition-all ${
                ativo ? "border-transparent shadow-sm" : "border-areia-200 bg-white text-terra-800 hover:border-ambar-400"
              }`}
              style={
                ativo
                  ? {
                      backgroundColor: todas ? cor("terraEscuro") : corDim(d),
                      color: todas || escuraDim(d) ? "#fff" : "var(--color-terra-900)",
                    }
                  : undefined
              }
            >
              {d}
              <span className="ml-1.5 opacity-60">
                {todas ? c.itens.length : c.itens.filter((i) => i.dim === d).length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tabela em telas largas */}
      <div className="hidden overflow-x-auto rounded-xl border border-areia-200 lg:block">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-terra-900 text-left text-areia-100">
              {c.colunas.map((col) => (
                <th key={col.campo} className="px-3 py-3 text-xs font-semibold tracking-wider uppercase">
                  {col.titulo}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lista.map((it, i) => (
              <tr
                key={`${it.cod}-${it.variavel}`}
                className={`${i % 2 ? "bg-areia-100" : "bg-white"} transition-colors hover:bg-milho-100`}
              >
                {c.colunas.map((col) => (
                  <td key={col.campo} className={`px-3 py-3 align-top ${CLASSE_CELULA[col.campo] ?? ""}`}>
                    <Celula item={it} campo={col.campo} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cartões em telas estreitas */}
      <div className="grid gap-3 lg:hidden">
        {lista.map((it, i) => (
          <Reveal key={`${it.cod}-${it.variavel}-m`} delay={i * 30}>
            <Cartao className="p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-brasa-600">{it.cod}</span>
                <Etiqueta cor={corDim(it.dim)} escura={escuraDim(it.dim)}>{it.dim}</Etiqueta>
              </div>
              <h3 className="font-display text-base font-bold text-terra-900">{it.variavel}</h3>
              <p className="mt-1 text-sm text-terra-800/85 italic">“{it.pergunta}”</p>
              <dl className="mt-3 space-y-1 border-t border-areia-200 pt-3 text-xs">
                <div className="flex gap-2">
                  <dt className="shrink-0 font-semibold text-terra-700/70">{c.rotulosCartao.base}</dt>
                  <dd className="text-terra-900">{it.fundamentacao}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="shrink-0 font-semibold text-terra-700/70">{c.rotulosCartao.escala}</dt>
                  <dd className="text-terra-900">{it.tipo} — {it.escala}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="shrink-0 font-semibold text-terra-700/70">{c.rotulosCartao.tratamento}</dt>
                  <dd className="text-terra-900">{it.codificacao}</dd>
                </div>
              </dl>
            </Cartao>
          </Reveal>
        ))}
      </div>

      <Nota>{c.nota}</Nota>
    </>
  );
}
