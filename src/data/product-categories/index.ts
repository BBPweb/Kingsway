import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import metadata from './adaptation-metadata.json';

export type ProductItem = { name: string; image: string; sourceFile: string };
export type ProductCategory = {
  name: string; slug: string; description: string; image: string;
  products: ProductItem[];
};

// Discover products at build time from the original adaptation folder structure.
// PSD design sources are not browser product assets; the supplied PNGs are unchanged.
const assetRoot = resolve(process.cwd(), 'public/images/products/adaptations');
const publicRoot = '/images/products/adaptations/';
const corrections: Record<string, string> = {
  chmapion: 'Champion', cocunut: 'Coconut', desicated: 'Desiccated',
  cummin: 'Cumin', blck: 'Black', tamrind: 'Tamarind', straberry: 'Strawberry',
  pinapple: 'Pineapple', plantatain: 'Plantain', oroginal: 'Original',
  varirety: 'Variety', supara: 'Supari', watr: 'Water', spiricha: 'Sriracha',
  laouiriana: 'Louisiana', indain: 'Indian', nd: 'and', glas: 'Glass',
  pck: 'Pack', swrnm: 'Swarnam',
};
function productName(filename: string): string {
  return filename.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ').trim()
    .split(/\s+/).map((word) => corrections[word.toLowerCase()] ??
      (/^(MAGGI|ENO|HING|DG|BBQ|FP|WI|TG|MD)$/i.test(word) ? word.toUpperCase() :
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())).join(' ');
}
const categoryOrder = ['lentils', 'spices', 'canned-foods', 'flour', 'rice-poha-mamra', 'ghee-oil', 'nuts', 'milk-powder', 'paste-sauces', 'supari-pan-masala', 'jaggery-salt-sugar', 'papad-noodles', 'food-colour-essence-additives', 'incense-stick-agarbatti', 'toiletries', 'grace-products', 'encona-sauces', 'grace-tropical-rythms', 'grace-coconut-water', 'grace-beverages', 'grace-aloevera-drinks', 'grace-plantain-chips', 'grace-coconut-products', 'grace-sauces-condiments', 'grace-fish-meat-products', 'grace-soups', 'grace-jerk-ingredients', 'dunns-river-ingredients', 'dunns-river-spices-seasonings', 'dunns-river-dried-powders-pulses', 'sunshine-snacks', 'brunswick-sardines', 'dalgety-teas', 'frozen'];
const folders = readdirSync(assetRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory()).map((entry) => entry.name);
export const productCategories: ProductCategory[] = folders.map((name) => {
  const details = metadata[name as keyof typeof metadata];
  if (!details) throw new Error(`Missing category metadata for ${name}`);
  const products = readdirSync(`${assetRoot}/${name}`)
    .filter((file) => /\.(png|jpe?g|webp|avif)$/i.test(file))
    .sort((a, b) => a.localeCompare(b, 'en')).map((sourceFile) => ({
      name: productName(sourceFile), sourceFile,
      image: `${publicRoot}${encodeURIComponent(name)}/${encodeURIComponent(sourceFile)}`,
    }));
  if (!products.length) throw new Error(`No product images in ${name}`);
  return { name, ...details, products };
}).sort((a, b) => categoryOrder.indexOf(a.slug) - categoryOrder.indexOf(b.slug));
export const getProductCategoryBySlug = (slug: string) =>
  productCategories.find((category) => category.slug === slug);


export type ProductCategoryGroup = {
  name: string; slug: string; image: string; description: string;
  categories: ProductCategory[];
};

// The existing adaptation folders remain the product source of truth.
// Only folders explicitly branded Grace belong to this extra category level.
export const graceProducts: ProductCategoryGroup = {
  name: 'Grace Products',
  slug: 'grace',
  image: '/images/Ethnicgroceryjpeg.jpeg',
  description: 'Explore our range of Grace branded food, beverages, snacks, sauces, ingredients and specialty products.',
  categories: productCategories.filter((category) => category.name.startsWith('Grace '))
    .map((category) => ({
      ...category,
      slug: category.name.slice('Grace '.length).toLowerCase()
        .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    })),
};

export const mainProductCategories: (ProductCategory | ProductCategoryGroup)[] = [];
let graceGroupAdded = false;
for (const category of productCategories) {
  if (category.name.startsWith('Grace ')) {
    if (!graceGroupAdded) mainProductCategories.push(graceProducts);
    graceGroupAdded = true;
  } else {
    mainProductCategories.push(category);
  }
}

export const getGraceCategoryPath = (category: ProductCategory) => {
  const nested = graceProducts.categories.find((item) => item.name === category.name);
  return nested ? `/products/grace/${nested.slug}/` : undefined;
};
