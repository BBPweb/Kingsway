import { productCategoriesPart1 } from './part1';
import { productCategoriesPart2 } from './part2';
import { productCategoriesPart3 } from './part3';
import { productCategoriesPart4 } from './part4';

export type { ProductItem, ProductCategory } from './types';

const categoryOrder = [
  'LENTILS',
  'SPICES',
  'CANNED FOODS',
  'FLOUR',
  'RICE | POHA | MAMRA',
  'GHEE | OIL',
  'NUTS',
  'MILK POWDER',
  'PASTE | SAUCES',
  'SUPARI | PAN MASALA',
  'JAGGERY | SALT | SUGAR',
  'PAPAD | NOODLES',
  'FOOD COLOUR | ESSENCE | ADDITIVES',
  'INCENSE STICK (AGARBATTI)',
  'TOILETRIES',
  'GRACE PRODUCTS',
  'ENCONA SAUCES',
  'GRACE TROPICAL RYTHMS',
  'GRACE COCONUT WATER',
  'GRACE BEVERAGES',
  'GRACE ALOEVERA DRINKS',
  'GRACE PLANTAIN CHIPS',
  'GRACE COCONUT PRODUCTS',
  'GRACE SAUCES & CONDIMENTS',
  'GRACE FISH & MEAT PRODUCTS',
  'GRACE SOUPS',
  'GRACE JERK & INGREDIENTS',
  "DUNN'S RIVER INGREDIENTS",
  "DUNN'S RIVER SPICES & SEASONINGS",
  "DUNN'S RIVER DRIED POWDERS & PULSES",
  'SUNSHINE SNACKS',
  'BRUNSWICK SARDINES',
  'DALGETY TEAS',
  'FROZEN',
];

const allCategories = [
  ...productCategoriesPart1,
  ...productCategoriesPart2,
  ...productCategoriesPart3,
  ...productCategoriesPart4,
];

export const productCategories = categoryOrder
  .map((name) => allCategories.find((category) => category.name === name))
  .filter((category): category is NonNullable<typeof category> => Boolean(category));

export const getProductCategoryBySlug = (slug: string) =>
  productCategories.find((category) => category.slug === slug);
