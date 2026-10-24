export interface HomeFeaturedCategory {
  id: string;
  name: string;
  href: string;
  image: string;
  alt: string;
}

// Homepage only: this list does not read from or update the product catalogue.
// Replace/reorder these five entries to change the existing five-circle display.
// Image assets are served statically from /public/images/home/categories/.
// Links are explicit so a future entry can also point to a nested category.
export const homeFeaturedCategories: {
  backgroundImage: string;
  initialCategoryId: string;
  items: HomeFeaturedCategory[];
} = {
  backgroundImage: "/images/home/categories/stone-podium.webp",
  initialCategoryId: "spices",
  items: [
    {
      id: "lentils",
      name: "Lentils",
      href: "/products/lentils/",
      image: "/images/home/categories/lentils.png",
      alt: "Kingsway chana dal, brown lentils and chick peas packs",
    },
    {
      id: "spices",
      name: "Spices",
      href: "/products/spices/",
      image: "/images/home/categories/spices.png",
      alt: "Kingsway fenugreek seeds, coriander powder and chilli powder packs",
    },
    {
      id: "rice-poha-mamra",
      name: "Rice Poha Mamra",
      href: "/products/rice-poha-mamra/",
      image: "/images/home/categories/rice-poha-mamra.png",
      alt: "Kingsway golden rice, thick powa and basmati rice packs",
    },
    {
      id: "flour",
      name: "Flour",
      href: "/products/flour/",
      image: "/images/home/categories/flour.png",
      alt: "Swarnam puttu podi and rice powder with Talod khaman flour",
    },
    {
      id: "nuts",
      name: "Nuts",
      href: "/products/nuts/",
      image: "/images/home/categories/nuts.png",
      alt: "Kingsway cashew, pistachio kernels and green sultana packs",
    },
  ],
};
