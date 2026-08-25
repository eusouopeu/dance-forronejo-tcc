import { useState } from "react";
import c from "../conteudo/s5-modelo.json";
import { cor, ehEscura } from "../tema";
import { TituloSecao, Cartao, Reveal, Nota } from "../components/ui";

const corDim = (d) => cor(c.coresDimensao[d] ?? "terra");
const escuraDim = (d) => ehEscura(c.coresDimensao[d] ?? "terra");

export default function S5Modelo() {
  const [sel, setSel] = useState(0);
  const atual = c.objetivos[sel];
  const tinta = escuraDim(atual.dimensao) ? "#fff" : "var(--color-terra-950)";

  return (
    <>
      <TituloSecao id="modelo" />

      <Reveal>
        <p className="max-w-3xl text-base leading-relaxed text-terra-800/90">{c.introducao}</p>
      </Reveal>

      {/* Seletor de objetivos */}
      <div className="mt-7 grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {c.objetivos.map((m, i) => {
          const ativo = sel === i;
          return (
            <button
              key={m.oe}
              onClick={() => setSel(i)}
              className={`cursor-pointer rounded-lg border-2 px-3 py-3 text-left transition-all ${
                ativo ? "shadow-md" : "border-areia-200 bg-white hover:border-ambar-400"
              }`}
              style={ativo ? { borderColor: corDim(m.dimensao), backgroundColor: "#fff" } : undefined}
            >
              <span
                className="font-display text-xl font-bold"
                style={{ color: ativo ? corDim(m.dimensao) : "var(--color-terra-700)" }}
              >
                {m.oe}
              </span>
              <span className="block text-xs font-semibold text-terra-700/70">{m.dimensao}</span>
            </button>
          );
        })}
      </div>

      {/* Cadeia */}
      <Reveal key={sel}>
        <Cartao className="mt-6 overflow-hidden p-0">
          <div className="px-6 py-5" style={{ backgroundColor: corDim(atual.dimensao) }}>
            <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: tinta, opacity: 0.75 }}>
              {atual.oe} · {c.rotulos.prefixoDimensao} {atual.dimensao}
            </p>
            <h2 className="mt-1 font-display text-3xl font-bold" style={{ color: tinta }}>
              {atual.pergunta}
            </h2>
          </div>

          <div className="grid gap-px bg-areia-200 md:grid-cols-3">
            <div className="bg-white p-5">
              <p className="mb-3 text-xs font-semibold tracking-wider text-terra-700/60 uppercase">
                {c.rotulos.variaveis}
              </p>
              <ul className="space-y-1.5">
                {atual.variaveis.map((v) => (
                  <li key={v} className="flex items-start gap-2 text-sm text-terra-900">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: corDim(atual.dimensao) }} />
                    {v}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-5">
              <p className="mb-3 text-xs font-semibold tracking-wider text-terra-700/60 uppercase">
                {c.rotulos.itens}
              </p>
              <p className="font-mono text-lg leading-relaxed font-bold text-brasa-600">{atual.itens}</p>
            </div>
            <div className="bg-white p-5">
              <p className="mb-3 text-xs font-semibold tracking-wider text-terra-700/60 uppercase">
                {c.rotulos.tecnica}
              </p>
              <p className="text-sm leading-relaxed text-terra-900">{atual.tecnica}</p>
            </div>
          </div>
        </Cartao>
      </Reveal>

      {/* Visão geral */}
      <Reveal>
        <h2 className="mt-12 font-display text-2xl font-bold text-terra-800">{c.matriz.titulo}</h2>
      </Reveal>
      <div className="mt-4 overflow-x-auto rounded-xl border border-areia-200">
        <table className="w-full min-w-[52rem] border-collapse text-sm">
          <thead>
            <tr className="bg-terra-900 text-left text-areia-100">
              {c.matriz.colunas.map((h) => (
                <th key={h} className="px-4 py-3 text-xs font-semibold tracking-wider uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {c.objetivos.map((m, i) => (
              <tr
                key={m.oe}
                onClick={() => setSel(i)}
                className={`cursor-pointer transition-colors ${
                  sel === i ? "bg-milho-100" : i % 2 ? "bg-areia-100" : "bg-white"
                } hover:bg-milho-100`}
              >
                <td className="px-4 py-3 align-top font-display font-bold whitespace-nowrap" style={{ color: corDim(m.dimensao) }}>
                  {m.oe}
                </td>
                <td className="px-4 py-3 align-top font-semibold text-terra-900">{m.dimensao}</td>
                <td className="px-4 py-3 align-top text-terra-800">{m.pergunta}</td>
                <td className="px-4 py-3 align-top font-mono text-xs text-brasa-600">{m.itens}</td>
                <td className="px-4 py-3 align-top text-terra-800/85">{m.tecnica}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Nota>{c.nota}</Nota>
    </>
  );
}
