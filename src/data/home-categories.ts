import type { ImageMetadata } from "astro";
import lentilsImage from "../assets/home/categories/lentils.png";
import spicesImage from "../assets/home/categories/spices.png";
import riceImage from "../assets/home/categories/rice-poha-mamra.png";
import flourImage from "../assets/home/categories/flour.png";
import nutsImage from "../assets/home/categories/nuts.png";
import podiumBackground from "../assets/home/categories/stone-podium.webp";

export interface HomeFeaturedCategory {
  id: string;
  name: string;
  href: string;
  image: ImageMetadata;
  alt: string;
}

// Homepage only: this list does not read from or update the product catalogue.
// Replace/reorder these five entries to change the existing five-circle display.
// For another image, import its file above and assign it to the relevant entry.
// Links are explicit so a future entry can also point to a nested category.
export const homeFeaturedCategories: {
  backgroundImage: ImageMetadata;
  initialCategoryId: string;
  items: HomeFeaturedCategory[];
} = {
  backgroundImage: podiumBackground,
  initialCategoryId: "spices",
  items: [
    {
      id: "lentils",
      name: "Lentils",
      href: "/products/lentils/",
      image: lentilsImage,
      alt: "Kingsway chana dal, brown lentils and chick peas packs",
    },
    {
      id: "spices",
      name: "Spices",
      href: "/products/spices/",
      image: spicesImage,
      alt: "Kingsway fenugreek seeds, coriander powder and chilli powder packs",
    },
    {
      id: "rice-poha-mamra",
      name: "Rice Poha Mamra",
      href: "/products/rice-poha-mamra/",
      image: riceImage,
      alt: "Kingsway golden rice, thick powa and basmati rice packs",
    },
    {
      id: "flour",
      name: "Flour",
      href: "/products/flour/",
      image: flourImage,
      alt: "Swarnam puttu podi and rice powder with Talod khaman flour",
    },
    {
      id: "nuts",
      name: "Nuts",
      href: "/products/nuts/",
      image: nutsImage,
      alt: "Kingsway cashew, pistachio kernels and green sultana packs",
    },
  ],
};
