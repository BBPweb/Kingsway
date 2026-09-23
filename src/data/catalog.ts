import part1 from './catalog-part-1';
import part2 from './catalog-part-2';
import part3 from './catalog-part-3';

export type CatalogProduct = {
  name: string;
  size: string;
};

export type CatalogCategory = {
  name: string;
  slug: string;
  image: string;
  products: CatalogProduct[];
};

function parseCatalogue(parts: string[]): CatalogCategory[] {
  const categories: CatalogCategory[] = [];
  let current: CatalogCategory | null = null;

  for (const line of parts.join('\n').split(/\r?\n/)) {
    if (!line.trim()) continue;

    const columns = line.split('\t');

    if (line.startsWith('@')) {
      current = {
        name: (columns[0] ?? '').slice(1).trim(),
        slug: (columns[1] ?? '').trim(),
        image: (columns[2] ?? '').trim(),
        products: [],
      };

      categories.push(current);
      continue;
    }

    if (!current) continue;

    current.products.push({
      name: (columns[0] ?? '').trim(),
      size: (columns[1] ?? '').trim(),
    });
  }

  return categories;
}

export const catalog = parseCatalogue([part1, part2, part3]);

export default catalog;
