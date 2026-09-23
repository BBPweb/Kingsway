export type ProductItem = {
  name: string;
  weight: string;
};

export type ProductCategory = {
  name: string;
  slug: string;
  image: string;
  products: ProductItem[];
};
