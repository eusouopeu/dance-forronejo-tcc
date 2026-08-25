// Ponte entre os nomes de cor usados nos arquivos .json de conteúdo e os tokens
// definidos em index.css. Nos JSON escreva apenas o nome ("terra", "rubro", …).
export const CORES = {
  terra: "var(--color-terra-800)",
  terraEscuro: "var(--color-terra-900)",
  terraProfundo: "var(--color-terra-950)",
  brasa: "var(--color-brasa-500)",
  brasaEscuro: "var(--color-brasa-600)",
  ambar: "var(--color-ambar-400)",
  milho: "var(--color-milho-200)",
  milhoClaro: "var(--color-milho-100)",
  rubro: "var(--color-rubro-600)",
  areia: "var(--color-areia-200)",
  branco: "#ffffff",
};

// Cores em que o texto por cima precisa ser branco.
const FUNDO_ESCURO = new Set([
  "terra", "terraEscuro", "terraProfundo", "brasa", "brasaEscuro", "rubro",
]);

export const cor = (nome) => CORES[nome] ?? CORES.terra;
export const textoSobre = (nome) => (FUNDO_ESCURO.has(nome) ? "#ffffff" : "var(--color-terra-900)");
export const ehEscura = (nome) => FUNDO_ESCURO.has(nome);
