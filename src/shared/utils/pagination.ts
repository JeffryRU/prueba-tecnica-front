export type PageItem = number | 'ellipsis'

/**
 * Números de página a mostrar con elipsis: [1, 'ellipsis', 4, 5, 6, 'ellipsis', 20].
 * Siempre incluye la primera, la última y `siblings` páginas a cada lado de la actual.
 */
export function getPageItems(current: number, totalPages: number, siblings = 1): PageItem[] {
  const pages = new Set([1, totalPages])
  for (let page = current - siblings; page <= current + siblings; page++) {
    if (page > 1 && page < totalPages) pages.add(page)
  }

  const sorted = [...pages].filter((page) => page >= 1).sort((a, b) => a - b)
  return sorted.flatMap((page, index) =>
    index > 0 && page - sorted[index - 1]! > 1 ? ['ellipsis' as const, page] : [page],
  )
}

export function clampPage(page: number, totalPages: number): number {
  return Math.min(Math.max(1, page), Math.max(1, totalPages))
}
