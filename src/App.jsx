import { useEffect, useState, useCallback } from "react";
import site from "./conteudo/site.json";
import { cor } from "./tema";
import S1Estrutura from "./sections/S1Estrutura";
import S2Teorico from "./sections/S2Teorico";
import S3Metodologia from "./sections/S3Metodologia";
import S4Itens from "./sections/S4Itens";
import S5Modelo from "./sections/S5Modelo";
import S6Tecnicas from "./sections/S6Tecnicas";
import S7Contribuicoes from "./sections/S7Contribuicoes";

const { secoes: SECOES, meta: META, barraLateral: BARRA, rodape: RODAPE } = site;
const FUNDO_BARRA = cor(BARRA.corFundo);
const ABA_ATIVA = cor(BARRA.corAbaAtiva);

const COMPONENTES = {
  estrutura: S1Estrutura,
  teorico: S2Teorico,
  metodologia: S3Metodologia,
  itens: S4Itens,
  modelo: S5Modelo,
  tecnicas: S6Tecnicas,
  contribuicoes: S7Contribuicoes,
};

function idDoHash() {
  const h = window.location.hash.replace("#", "");
  return SECOES.some((s) => s.id === h) ? h : SECOES[0].id;
}

export default function App() {
  const [ativa, setAtiva] = useState(idDoHash);
  const [menuAberto, setMenuAberto] = useState(false);

  const indice = SECOES.findIndex((s) => s.id === ativa);
  const Secao = COMPONENTES[ativa];

  const ir = useCallback((id) => {
    setAtiva(id);
    setMenuAberto(false);
    window.location.hash = id;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    const aoMudarHash = () => setAtiva(idDoHash());
    window.addEventListener("hashchange", aoMudarHash);
    return () => window.removeEventListener("hashchange", aoMudarHash);
  }, []);

  // Setas do teclado navegam entre as abas — útil durante a apresentação.
  useEffect(() => {
    const aoTeclar = (e) => {
      if (e.target.matches("input, textarea")) return;
      if (e.key === "ArrowRight" && indice < SECOES.length - 1) ir(SECOES[indice + 1].id);
      if (e.key === "ArrowLeft" && indice > 0) ir(SECOES[indice - 1].id);
    };
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [indice, ir]);

  return (
    <div className="flex min-h-screen bg-areia-50 font-sans">
      {/* ─────────── Barra lateral ─────────── */}
      <aside
        className={`no-print fixed inset-y-0 left-0 z-40 flex w-72 shrink-0 flex-col text-white transition-transform duration-300 lg:translate-x-0 ${
          menuAberto ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor: FUNDO_BARRA }}
      >
        <div className="border-b border-white/20 px-6 py-6">
          <p className="text-[10px] font-semibold tracking-[0.22em] text-milho-100 uppercase">
            {BARRA.chapeu}
          </p>
          <h1 className="mt-2 font-display text-3xl leading-none font-bold">{META.titulo}</h1>
          <p className="mt-2 text-xs leading-relaxed text-white/80">{META.subtitulo}</p>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {SECOES.map((s) => {
              const ativo = s.id === ativa;
              return (
                <li key={s.id}>
                  <button
                    onClick={() => ir(s.id)}
                    className={`group flex w-full cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                      ativo ? "text-white shadow-md ring-1 ring-white/25" : "hover:bg-white/15"
                    }`}
                    style={ativo ? { backgroundColor: ABA_ATIVA } : undefined}
                  >
                    <span
                      className={`font-display text-lg leading-tight font-bold tabular-nums ${
                        ativo ? "text-milho-100" : "text-white"
                      }`}
                    >
                      {String(s.n).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm leading-snug font-semibold">{s.titulo}</span>
                      <span
                        className={`block text-[11px] leading-snug ${
                          ativo ? "text-white/80" : "text-white/85"
                        }`}
                      >
                        {s.subtitulo}
                      </span>
                    </span>
                    <span
                      className={`mt-0.5 shrink-0 text-[10px] font-semibold tabular-nums ${
                        ativo ? "text-white/75" : "text-white/80"
                      }`}
                    >
                      {s.tempo}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-white/20 px-6 py-4">
          <p className="text-xs font-semibold text-white">{META.autor}</p>
          <p className="mt-0.5 text-[11px] leading-snug text-white/75">{META.curso}</p>
          <p className="mt-2 text-[10px] text-white/60">
            {BARRA.dicaTeclado}
          </p>
        </div>
      </aside>

      {/* Véu para o menu no mobile */}
      {menuAberto && (
        <div
          className="no-print fixed inset-0 z-30 bg-terra-950/50 lg:hidden"
          onClick={() => setMenuAberto(false)}
        />
      )}

      {/* ─────────── Conteúdo ─────────── */}
      <div className="flex min-w-0 flex-1 flex-col lg:pl-72">
        {/* Cabeçalho mobile */}
        <header className="no-print sticky top-0 z-20 flex items-center gap-3 border-b border-areia-200 bg-areia-50/95 px-4 py-3 backdrop-blur lg:hidden">
          <button
            onClick={() => setMenuAberto(true)}
            className="cursor-pointer rounded-md border border-areia-200 bg-white p-2"
            aria-label={BARRA.rotuloAbrirMenu}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-terra-900">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <span className="font-display text-lg font-bold text-terra-900">
            {String(SECOES[indice].n).padStart(2, "0")}. {SECOES[indice].titulo}
          </span>
        </header>

        {/* Barra de progresso da apresentação */}
        <div className="no-print h-1 w-full bg-areia-200">
          <div
            className="h-full bg-brasa-500 transition-all duration-500"
            style={{ width: `${((indice + 1) / SECOES.length) * 100}%` }}
          />
        </div>

        <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-10 sm:px-8 lg:py-14">
          <Secao />
        </main>

        {/* Rodapé de navegação */}
        <footer className="no-print border-t border-areia-200 bg-white">
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
            <button
              onClick={() => indice > 0 && ir(SECOES[indice - 1].id)}
              disabled={indice === 0}
              className="cursor-pointer rounded-lg border border-areia-200 px-4 py-2 text-sm font-semibold text-terra-900 transition-colors hover:border-ambar-400 disabled:cursor-default disabled:opacity-30"
            >
              ← {indice > 0 ? SECOES[indice - 1].titulo : RODAPE.inicio}
            </button>
            <span className="shrink-0 text-xs font-semibold tabular-nums text-terra-700/50">
              {indice + 1} / {SECOES.length}
            </span>
            <button
              onClick={() => indice < SECOES.length - 1 && ir(SECOES[indice + 1].id)}
              disabled={indice === SECOES.length - 1}
              className="cursor-pointer rounded-lg bg-terra-900 px-4 py-2 text-sm font-semibold text-areia-100 transition-colors hover:bg-brasa-500 disabled:cursor-default disabled:opacity-30"
            >
              {indice < SECOES.length - 1 ? SECOES[indice + 1].titulo : RODAPE.fim} →
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
