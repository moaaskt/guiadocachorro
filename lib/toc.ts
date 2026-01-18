/**
 * Utilitários para processamento de Table of Contents (TOC)
 * Extração e injeção de IDs em cabeçalhos HTML para navegação
 */

export interface TOCItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface ProcessedContent {
  content: string;
  toc: TOCItem[];
}

/**
 * Converte um texto em slug (URL-friendly)
 * Remove acentos, caracteres especiais, converte para minúsculas e substitui espaços por hifens
 * 
 * @param text - Texto a ser convertido
 * @returns Slug normalizado (ex: "Saúde e Cuidados" -> "saude-e-cuidados")
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    // Remove acentos e caracteres diacríticos
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    // Remove caracteres especiais, mantém apenas letras, números, espaços e hífens
    .replace(/[^a-z0-9\s-]/g, "")
    // Substitui múltiplos espaços por um único espaço
    .replace(/\s+/g, " ")
    .trim()
    // Substitui espaços por hífens
    .replace(/\s/g, "-")
    // Remove múltiplos hífens consecutivos
    .replace(/-+/g, "-")
    // Remove hífen no início e fim
    .replace(/^-+|-+$/g, "");
}

/**
 * Processa HTML de conteúdo, injeta IDs nos cabeçalhos (H2 e H3) e extrai estrutura para TOC
 * 
 * @param html - String HTML bruta do artigo
 * @returns Objeto contendo HTML modificado com IDs e array de TOC
 */
export function processContent(html: string): ProcessedContent {
  if (!html || typeof html !== "string") {
    return { content: html || "", toc: [] };
  }

  const toc: TOCItem[] = [];
  let processedHtml = html;

  // Regex para encontrar tags <h2> e <h3> com qualquer atributo
  // Captura: tag completa, atributos existentes (se houver), conteúdo interno
  const headingRegex = /<(h[23])([^>]*)>(.*?)<\/h[23]>/gi;

  processedHtml = processedHtml.replace(headingRegex, (match, tag, attributes, innerText) => {
    // Extrai apenas o texto, removendo tags HTML internas (se houver)
    const textOnly = innerText.replace(/<[^>]+>/g, "").trim();

    if (!textOnly) {
      return match; // Se não houver texto, retorna sem modificar
    }

    // Gera ID único baseado no texto
    let baseId = slugify(textOnly);
    let finalId = baseId;
    let counter = 1;

    // Garante unicidade: se já existe no TOC, adiciona sufixo numérico
    while (toc.some((item) => item.id === finalId)) {
      finalId = `${baseId}-${counter}`;
      counter++;
    }

    // Determina o nível (2 para H2, 3 para H3)
    const level = tag === "h2" ? (2 as const) : (3 as const);

    // Adiciona ao TOC
    toc.push({
      id: finalId,
      text: textOnly,
      level,
    });

    // Verifica se já existe um atributo id
    const hasId = /id\s*=\s*["'][^"']*["']/i.test(attributes);

    if (hasId) {
      // Se já tem ID, substitui pelo novo
      const newAttributes = attributes.replace(/id\s*=\s*["'][^"']*["']/i, `id="${finalId}"`);
      return `<${tag}${newAttributes}>${innerText}</${tag}>`;
    } else {
      // Se não tem ID, adiciona antes do fechamento do atributo
      // Se não tem atributos, adiciona espaço antes
      const attrSeparator = attributes.trim() ? " " : "";
      return `<${tag}${attributes}${attrSeparator}id="${finalId}">${innerText}</${tag}>`;
    }
  });

  return {
    content: processedHtml,
    toc,
  };
}
