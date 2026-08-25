import { useState } from "react";
import {
  ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid,
  Tooltip, ReferenceLine, BarChart, Bar, Cell, LabelList, Legend,
} from "recharts";
import c from "../conteudo/s6-tecnicas.json";
import { cor } from "../tema";
import { TituloSecao, Cartao, Reveal, Nota, Sanfona } from "../components/ui";

const G = c.graficos;
const D = c.dados;
const eixo = { fontSize: 11, fill: "var(--color-terra-800)" };

function CaixaTooltip({ active, payload, label, render }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-areia-200 bg-white px-3 py-2 text-xs shadow-lg">
      {render ? render(payload, label) : (
        <>
          <p className="font-bold text-terra-900">{label}</p>
          {payload.map((p) => (
            <p key={p.name} style={{ color: p.color }}>
              {p.name}: <span className="font-semibold">{Number(p.value).toFixed(2)}</span>
            </p>
          ))}
        </>
      )}
    </div>
  );
}

function CabecalhoGrafico({ g }) {
  return (
    <>
      <h3 className="font-display text-lg font-bold text-terra-900">{g.titulo}</h3>
      <p className="mb-3 text-xs text-terra-700/75">{g.nota}</p>
    </>
  );
}

/* Cor do ponto conforme o quadrante — segue a ordem de graficos.ipa.quadrantes no JSON. */
function quadranteIPA(d) {
  const [manutencao, atencao, excesso, baixa] = G.ipa.quadrantes.map((q) => cor(q.cor));
  if (d.importancia >= D.ipaCortes.importancia)
    return d.desempenho >= D.ipaCortes.desempenho ? manutencao : atencao;
  return d.desempenho >= D.ipaCortes.desempenho ? excesso : baixa;
}

export default function S6Tecnicas() {
  const [aba, setAba] = useState(0);

  return (
    <>
      <TituloSecao id="tecnicas" />

      {/* As quatro técnicas */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {c.tecnicas.map((t, i) => {
          const ativo = aba === i;
          return (
            <Reveal key={t.nome} delay={i * 70}>
              <button
                onClick={() => setAba(i)}
                className={`h-full w-full cursor-pointer rounded-xl border-2 p-4 text-left transition-all ${
                  ativo ? "border-brasa-500 bg-white shadow-md" : "border-areia-200 bg-areia-100 hover:border-ambar-400"
                }`}
              >
                <span className="font-display text-xs font-bold tracking-wider text-brasa-500 uppercase">
                  0{i + 1}
                </span>
                <h3 className="font-display text-lg leading-snug font-bold text-terra-900">{t.nome}</h3>
                <p className="mt-1 text-xs leading-relaxed text-terra-800/80">{t.resumo}</p>
              </button>
            </Reveal>
          );
        })}
      </div>

      <Reveal key={aba}>
        <Cartao tom="escuro" className="mt-4 p-6">
          <p className="text-xs font-semibold tracking-[0.18em] text-ambar-300 uppercase">{c.tecnicas[aba].nome}</p>
          <ul className="mt-3 space-y-2">
            {c.tecnicas[aba].detalhes.map((d) => (
              <li key={d} className="flex items-start gap-3 text-sm leading-relaxed">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ambar-400" />
                {d}
              </li>
            ))}
          </ul>
        </Cartao>
      </Reveal>

      {/* Aplicações */}
      <Reveal>
        <h2 className="mt-12 font-display text-2xl font-bold text-terra-800">{c.aplicacoes.titulo}</h2>
        <p className="mt-1 mb-5 max-w-3xl text-sm text-terra-700/80">{c.aplicacoes.descricao}</p>
      </Reveal>

      {/* IPA — linha inteira */}
      <Reveal>
        <Cartao className="p-5">
          <CabecalhoGrafico g={G.ipa} />
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart margin={{ top: 20, right: 40, bottom: 30, left: 10 }}>
              <CartesianGrid stroke="var(--color-areia-200)" />
              <XAxis
                type="number" dataKey="importancia" domain={[1.5, 5]}
                tick={eixo} stroke="var(--color-areia-200)"
                label={{ value: G.ipa.eixoX, position: "insideBottom", offset: -18, ...eixo }}
              />
              <YAxis
                type="number" dataKey="desempenho" domain={[82, 98]}
                tick={eixo} stroke="var(--color-areia-200)"
                label={{ value: G.ipa.eixoY, angle: -90, position: "insideLeft", offset: 16, ...eixo }}
              />
              <ZAxis range={[320, 320]} />
              <ReferenceLine
                x={D.ipaCortes.importancia} stroke={cor("rubro")} strokeDasharray="4 4"
                label={{ value: G.ipa.corteImportancia, position: "top", fontSize: 10, fill: cor("rubro") }}
              />
              <ReferenceLine
                y={D.ipaCortes.desempenho} stroke={cor("rubro")} strokeDasharray="4 4"
                label={{ value: G.ipa.corteDesempenho, position: "insideRight", fontSize: 10, fill: cor("rubro") }}
              />
              <Tooltip
                content={
                  <CaixaTooltip
                    render={(p) => (
                      <>
                        <p className="font-bold text-terra-900">{p[0].payload.atributo}</p>
                        <p className="text-terra-700">{G.ipa.rotulosTooltip.importancia}: {p[0].payload.importancia}</p>
                        <p className="text-terra-700">{G.ipa.rotulosTooltip.desempenho}: {p[0].payload.desempenho}</p>
                      </>
                    )}
                  />
                }
              />
              <Scatter data={D.ipa}>
                {D.ipa.map((d) => <Cell key={d.atributo} fill={quadranteIPA(d)} />)}
                <LabelList
                  dataKey="atributo" position="top" offset={14}
                  style={{ fontSize: 11, fill: "var(--color-terra-800)", fontWeight: 600 }}
                />
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 border-t border-areia-200 pt-3 text-[11px]">
            {G.ipa.quadrantes.map((q) => (
              <span key={q.rotulo} className="flex items-center gap-1.5 text-terra-800">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: cor(q.cor) }} />
                {q.rotulo}
              </span>
            ))}
          </div>
        </Cartao>
      </Reveal>

      {/* Os outros quatro, em grade 2×2 */}
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        {/* Gap competitivo */}
        <Reveal>
          <Cartao className="p-5">
            <CabecalhoGrafico g={G.gap} />
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={D.desempenho} layout="vertical" margin={{ top: 4, right: 30, bottom: 4, left: 8 }}>
                <CartesianGrid stroke="var(--color-areia-200)" horizontal={false} />
                <XAxis type="number" domain={[-9, 9]} tick={eixo} stroke="var(--color-areia-200)" />
                <YAxis type="category" dataKey="atributo" width={132} tick={{ ...eixo, fontSize: 10 }} stroke="var(--color-areia-200)" />
                <ReferenceLine x={0} stroke="var(--color-terra-800)" />
                <Tooltip
                  cursor={{ fill: "var(--color-areia-100)" }}
                  content={
                    <CaixaTooltip
                      render={(p) => (
                        <>
                          <p className="font-bold text-terra-900">{p[0].payload.atributo}</p>
                          <p className="text-terra-700">{G.fatores.series.qdfa}: {p[0].payload.qdfa.toFixed(1)}</p>
                          <p className="text-terra-700">{G.fatores.series.qzc}: {p[0].payload.qzc.toFixed(1)}</p>
                          <p className="font-semibold text-brasa-600">
                            {G.gap.rotuloGap}: {p[0].payload.gap > 0 ? "+" : ""}{p[0].payload.gap.toFixed(2)}
                          </p>
                        </>
                      )}
                    />
                  }
                />
                <Bar dataKey="gap" radius={[3, 3, 3, 3]}>
                  {D.desempenho.map((d) => (
                    <Cell key={d.atributo} fill={d.gap >= 0 ? cor("brasa") : cor("rubro")} />
                  ))}
                  <LabelList
                    dataKey="gap" position="right"
                    formatter={(v) => `${v > 0 ? "+" : ""}${v.toFixed(1)}`}
                    style={{ fontSize: 10, fill: "var(--color-terra-800)", fontWeight: 700 }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="mt-1 text-[11px] text-terra-700/70">{G.gap.rodape}</p>
          </Cartao>
        </Reveal>

        {/* Conveniência em Likert */}
        <Reveal delay={90}>
          <Cartao className="p-5">
            <CabecalhoGrafico g={G.conveniencia} />
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={D.conveniencia} layout="vertical" margin={{ top: 8, right: 12, bottom: 8, left: 8 }} stackOffset="expand">
                <XAxis type="number" hide domain={[0, 1]} />
                <YAxis type="category" dataKey="dim" width={104} tick={{ ...eixo, fontSize: 10 }} stroke="var(--color-areia-200)" />
                <Tooltip
                  cursor={{ fill: "var(--color-areia-100)" }}
                  content={
                    <CaixaTooltip
                      render={(p, l) => (
                        <>
                          <p className="font-bold text-terra-900">{l}</p>
                          {p.map((x) => (
                            <p key={x.name} style={{ color: x.color }}>
                              {x.name}: {Number(x.payload[x.dataKey]).toFixed(2)}%
                            </p>
                          ))}
                        </>
                      )}
                    />
                  }
                />
                {D.faixasLikert.map((f, i) => (
                  <Bar key={f.chave} dataKey={f.chave} name={f.rotulo} stackId="a" fill={cor(f.cor)}>
                    <LabelList
                      dataKey={f.chave}
                      formatter={(v) => (v >= 8 ? `${Math.round(v)}%` : "")}
                      style={{ fontSize: 10, fontWeight: 700, fill: i === 3 ? "var(--color-terra-900)" : "#fff" }}
                    />
                  </Bar>
                ))}
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px]">
              {D.faixasLikert.map((f) => (
                <span key={f.chave} className="flex items-center gap-1 text-terra-800">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: cor(f.cor) }} />
                  {f.rotulo}
                </span>
              ))}
            </div>
          </Cartao>
        </Reveal>

        {/* Fatores de adesão */}
        <Reveal>
          <Cartao className="p-5">
            <CabecalhoGrafico g={G.fatores} />
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={D.fatoresAdesao} margin={{ top: 8, right: 8, bottom: 44, left: 0 }}>
                <CartesianGrid stroke="var(--color-areia-200)" vertical={false} />
                <XAxis dataKey="fator" tick={{ ...eixo, fontSize: 9 }} interval={0} angle={-22} textAnchor="end" height={56} stroke="var(--color-areia-200)" />
                <YAxis domain={[0, 5]} tick={eixo} stroke="var(--color-areia-200)" />
                <Tooltip cursor={{ fill: "var(--color-areia-100)" }} content={<CaixaTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 4 }} />
                <Bar dataKey="qdfa" name={G.fatores.series.qdfa} fill={cor("terra")} radius={[3, 3, 0, 0]} />
                <Bar dataKey="qzc" name={G.fatores.series.qzc} fill={cor("ambar")} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Cartao>
        </Reveal>

        {/* Faixa etária */}
        <Reveal delay={90}>
          <Cartao className="p-5">
            <CabecalhoGrafico g={G.faixaEtaria} />
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={D.faixaEtaria} margin={{ top: 8, right: 8, bottom: 24, left: 0 }}>
                <CartesianGrid stroke="var(--color-areia-200)" vertical={false} />
                <XAxis dataKey="faixa" tick={eixo} stroke="var(--color-areia-200)" />
                <YAxis tick={eixo} unit="%" stroke="var(--color-areia-200)" />
                <Tooltip
                  cursor={{ fill: "var(--color-areia-100)" }}
                  content={
                    <CaixaTooltip
                      render={(p, l) => (
                        <>
                          <p className="font-bold text-terra-900">{l} {G.faixaEtaria.sufixoTooltip}</p>
                          {p.map((x) => (
                            <p key={x.name} style={{ color: x.color }}>
                              {x.name}: {Number(x.value).toFixed(2)}%
                            </p>
                          ))}
                        </>
                      )}
                    />
                  }
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="qdfa" name={G.faixaEtaria.series.qdfa} fill={cor("brasa")} radius={[3, 3, 0, 0]} />
                <Bar dataKey="qzc" name={G.faixaEtaria.series.qzc} fill={cor("milho")} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="mt-1 text-[11px] text-terra-700/70">{G.faixaEtaria.rodape}</p>
          </Cartao>
        </Reveal>
      </div>

      {/* Testes — recolhido por padrão */}
      <div className="mt-12">
        <Sanfona
          titulo={c.testes.titulo}
          subtitulo={c.testes.subtitulo}
          cor={cor("terraEscuro")}
          contagem={c.testes.amostraCompleta.linhas.length + c.testes.porGrupo.linhas.length}
        >
          <div className="p-5">
            <p className="mb-4 max-w-3xl text-sm text-terra-700/85">{c.testes.introducao}</p>

            <h4 className="mb-2 font-display text-base font-bold text-terra-900">
              {c.testes.amostraCompleta.titulo}
            </h4>
            <div className="overflow-x-auto rounded-lg border border-areia-200">
              <table className="w-full min-w-[36rem] border-collapse text-sm">
                <thead>
                  <tr className="bg-areia-200 text-left text-terra-900">
                    {c.testes.amostraCompleta.colunas.map((h) => (
                      <th key={h} className="px-4 py-2.5 text-xs font-semibold tracking-wider uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {c.testes.amostraCompleta.linhas.map((t, i) => (
                    <tr key={t.variavel} className={i % 2 ? "bg-areia-100" : "bg-white"}>
                      <td className="px-4 py-2.5 font-mono font-bold text-brasa-600">{t.teste}</td>
                      <td className="px-4 py-2.5 text-terra-900">{t.variavel}</td>
                      <td className="px-4 py-2.5 tabular-nums text-terra-800">{t.valor}</td>
                      <td className="px-4 py-2.5 tabular-nums text-terra-800">{t.p}</td>
                      <td className="px-4 py-2.5 tabular-nums text-terra-800">{t.gl}</td>
                      <td className="px-4 py-2.5 tabular-nums text-terra-800">{t.n}</td>
                      <td className="px-4 py-2.5">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                            t.sig ? "bg-rubro-600 text-white" : "bg-areia-200 text-terra-800"
                          }`}
                        >
                          {t.sig
                            ? c.testes.amostraCompleta.rotuloSignificativo
                            : c.testes.amostraCompleta.rotuloNaoSignificativo}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h4 className="mt-7 mb-1 font-display text-base font-bold text-terra-900">
              {c.testes.porGrupo.titulo}
            </h4>
            <p className="mb-2 text-xs text-terra-700/75">{c.testes.porGrupo.descricao}</p>
            <div className="overflow-x-auto rounded-lg border border-areia-200">
              <table className="w-full min-w-[52rem] border-collapse text-sm">
                <thead>
                  <tr className="bg-areia-200 text-left text-terra-900">
                    {c.testes.porGrupo.colunas.map((h) => (
                      <th key={h} className="px-3 py-2.5 text-xs font-semibold tracking-wider uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {c.testes.porGrupo.linhas.map((t, i) => (
                    <tr key={`${t.grupo}-${t.variavel}`} className={i % 2 ? "bg-areia-100" : "bg-white"}>
                      <td className="px-3 py-2.5 align-top">
                        <span className="rounded-full bg-rubro-600 px-2 py-0.5 font-mono text-xs font-bold text-white">
                          {t.grupo}
                        </span>
                        <span className="mt-1 block text-[11px] leading-tight text-terra-700/70">{t.rotulo}</span>
                      </td>
                      <td className="px-3 py-2.5 align-top font-mono text-xs font-bold text-brasa-600">{t.survey}</td>
                      <td className="px-3 py-2.5 align-top text-terra-900">
                        {t.variavel}
                        <span className="mt-0.5 block text-[11px] leading-snug text-terra-700/70 italic">{t.leitura}</span>
                      </td>
                      <td className="px-3 py-2.5 align-top font-semibold tabular-nums text-terra-900">{t.dentro}</td>
                      <td className="px-3 py-2.5 align-top tabular-nums text-terra-800">{t.fora}</td>
                      <td className="px-3 py-2.5 align-top tabular-nums text-terra-800">{t.valor}</td>
                      <td className="px-3 py-2.5 align-top tabular-nums text-terra-800">{t.gl}</td>
                      <td className="px-3 py-2.5 align-top font-bold tabular-nums text-rubro-600">{t.p}</td>
                      <td className="px-3 py-2.5 align-top tabular-nums text-terra-800">{t.n}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-3 border-l-2 border-rubro-600 pl-3 text-xs leading-relaxed text-terra-800/85">
              <strong>{c.testes.ressalva.rotulo}</strong> {c.testes.ressalva.texto}
            </p>
          </div>
        </Sanfona>
      </div>

      <Nota>{c.nota}</Nota>
    </>
  );
}
