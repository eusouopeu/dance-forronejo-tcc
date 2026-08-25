import c from "../conteudo/s3-metodologia.json";
import { cor } from "../tema";
import { TituloSecao, Cartao, Reveal, Contador, Nota, Etiqueta } from "../components/ui";

const R = c.amostragem.rotulos;

function PlanoAmostral({ plano, executado }) {
  return (
    <Cartao tom={executado ? "claro" : "areia"} className={`h-full p-5 ${executado ? "" : "opacity-75"}`}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-bold text-terra-900">{plano.titulo}</h3>
        <Etiqueta cor={executado ? cor("brasa") : cor("areia")} escura={executado}>
          {executado ? R.executado : R.naoExecutado}
        </Etiqueta>
      </div>
      <dl className="mt-4 space-y-2 text-sm">
        {[
          [R.unidade, plano.unidade],
          [R.tipo, plano.tipo],
          [R.N, plano.N],
          [R.minimo, plano.minimo],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 border-b border-areia-200 pb-1.5">
            <dt className="shrink-0 text-terra-700/70">{k}</dt>
            <dd className="text-right font-semibold text-terra-900">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-xs leading-relaxed text-terra-700/75">{plano.justificativa}</p>
    </Cartao>
  );
}

export default function S3Metodologia() {
  const totalN = c.coleta.grupos.reduce((s, g) => s + g.n, 0);
  const maxN = Math.max(...c.coleta.grupos.map((g) => g.n));

  return (
    <>
      <TituloSecao id="metodologia" />

      {/* Ficha */}
      <Reveal>
        <div className="grid gap-px overflow-hidden rounded-xl border border-areia-200 bg-areia-200 sm:grid-cols-2 lg:grid-cols-3">
          {c.ficha.map((f) => (
            <div key={f.rotulo} className="bg-white p-4">
              <p className="text-xs font-semibold tracking-wider text-terra-700/60 uppercase">{f.rotulo}</p>
              <p className="mt-1 font-display text-lg leading-snug font-bold text-terra-900">{f.valor}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Instrumentos */}
      <Reveal>
        <h2 className="mt-12 font-display text-2xl font-bold text-terra-800">{c.instrumentos.titulo}</h2>
        <p className="mt-1 mb-4 max-w-3xl text-sm text-terra-700/80">{c.instrumentos.descricao}</p>
      </Reveal>
      <div className="overflow-x-auto rounded-xl border border-areia-200">
        <table className="w-full min-w-[46rem] border-collapse text-sm">
          <thead>
            <tr className="bg-terra-900 text-left text-areia-100">
              {c.instrumentos.colunas.map((h) => (
                <th key={h} className="px-4 py-3 text-xs font-semibold tracking-wider uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {c.instrumentos.itens.map((it, i) => (
              <tr key={it.sigla} className={i % 2 ? "bg-areia-100" : "bg-white"}>
                <td className="px-4 py-3 align-top">
                  <span className="font-display font-bold text-brasa-600">{it.sigla}</span>
                  <p className="text-xs text-terra-700/75">{it.nome}</p>
                </td>
                <td className="px-4 py-3 align-top text-terra-800">{it.publico}</td>
                <td className="px-4 py-3 align-top text-terra-800">{it.natureza}</td>
                <td className="px-4 py-3 align-top text-terra-800">{it.uso}</td>
                <td className="px-4 py-3 align-top whitespace-nowrap text-terra-800">{it.duracao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Validação */}
      <Reveal>
        <h2 className="mt-12 font-display text-2xl font-bold text-terra-800">{c.validacao.titulo}</h2>
      </Reveal>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {c.validacao.etapas.map((v, i) => (
          <Reveal key={v.etapa} delay={i * 80}>
            <Cartao className="relative h-full p-5">
              <span className="font-display text-5xl leading-none font-bold text-ambar-300">{v.etapa}</span>
              <h3 className="mt-1 font-display text-base font-bold text-terra-900">{v.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-terra-800/85">{v.detalhe}</p>
            </Cartao>
          </Reveal>
        ))}
      </div>

      {/* Amostragem */}
      <Reveal>
        <h2 className="mt-12 font-display text-2xl font-bold text-terra-800">{c.amostragem.titulo}</h2>
      </Reveal>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Reveal><PlanoAmostral plano={c.amostragem.planoA} executado /></Reveal>
        <Reveal delay={100}><PlanoAmostral plano={c.amostragem.planoB} executado={false} /></Reveal>
      </div>

      <Reveal>
        <Cartao tom="areia" className="mt-4 p-5">
          <p className="text-xs font-semibold tracking-wider text-terra-700/60 uppercase">{c.formula.rotulo}</p>
          <p className="mt-2 text-center font-mono text-base text-terra-900">{c.formula.expressao}</p>
          <p className="mt-2 text-center text-xs text-terra-700/75">{c.formula.parametros}</p>
        </Cartao>
      </Reveal>

      {/* Coleta realizada */}
      <Reveal>
        <h2 className="mt-12 font-display text-2xl font-bold text-terra-800">{c.coleta.titulo}</h2>
        <p className="mt-1 mb-5 max-w-3xl text-sm text-terra-700/80">{c.coleta.descricao}</p>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Cartao className="p-6">
          <div className="space-y-4">
            {c.coleta.grupos.map((g, i) => (
              <Reveal key={g.grupo} delay={i * 80}>
                <div>
                  <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
                    <span className="font-semibold text-terra-900">
                      <span className="font-display text-brasa-600">{g.grupo}</span>{" "}
                      <span className="font-normal text-terra-700/75">— {g.rotulo}</span>
                    </span>
                    <span className="font-display text-lg font-bold tabular-nums text-terra-900">n = {g.n}</span>
                  </div>
                  <div className="h-7 overflow-hidden rounded-md bg-areia-100">
                    <div
                      className="h-full origin-left animate-grow-x rounded-md"
                      style={{
                        width: `${Math.max((g.n / maxN) * 100, g.n === 0 ? 1.5 : 0)}%`,
                        backgroundColor: cor(g.cor),
                        animationDelay: `${i * 90}ms`,
                      }}
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Cartao>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
          <Cartao tom="brasa" className="flex flex-col justify-center p-6">
            <p className="font-display text-6xl leading-none font-bold"><Contador valor={totalN} /></p>
            <p className="mt-1 text-sm font-semibold">{c.coleta.rotuloTotal}</p>
          </Cartao>
          <Cartao tom="escuro" className="flex flex-col justify-center p-6">
            <p className="font-display text-6xl leading-none font-bold text-ambar-300">
              <Contador valor={c.amostragem.planoA.minimo} />
            </p>
            <p className="mt-1 text-sm">{c.coleta.rotuloMinimo}</p>
          </Cartao>
        </div>
      </div>

      <Nota>{c.nota}</Nota>
    </>
  );
}
