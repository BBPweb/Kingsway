// All homepage copy, destinations and imagery live here. Asset keys map to
// home-assets.json; run npm run images:home after changing a source photograph.
export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Quality", href: "/quality" },
  { label: "Products", href: "/products" },
  { label: "Who We Serve", href: "/who-we-serve" },
  { label: "Food Stories", href: "/food-stories" },
  { label: "Policies", href: "/policies" },
];

export const ingredients = {
  pepper: {
    image: "/images/ingredients/01_black_pepper.png",
    name: "Black pepper",
  },
  cardamom: { image: "/images/ingredients/02_cardamom.png", name: "Cardamom" },
  cinnamon: { image: "/images/ingredients/03_cinnamon.png", name: "Cinnamon" },
  anise: { image: "/images/ingredients/04_star_anise.png", name: "Star anise" },
  chilli: { image: "/images/ingredients/05_chilli.png", name: "Chilli" },
  turmeric: { image: "/images/ingredients/06_turmeric.png", name: "Turmeric" },
  cumin: { image: "/images/ingredients/07_cumin_seed.png", name: "Cumin" },
  coriander: {
    image: "/images/ingredients/08_coriander_seed.png",
    name: "Coriander",
  },
  clove: { image: "/images/ingredients/09_clove.png", name: "Cloves" },
  rice: { image: "/images/ingredients/10_rice_grain.png", name: "Rice" },
};

const tradeLink = { label: "Start a trade conversation", href: "/contact" };
export const home = {
  seo: {
    title: "Kingsway International | UK Ethnic Food Trading & Distribution",
    description:
      "Authentic spices, rice, pulses and ethnic grocery. Kingsway International is a UK trading and distribution partner for British retail, wholesale and foodservice.",
    image: "/images/home/social.jpg",
  },
  brand: {
    name: "Kingsway International",
    descriptor: "Trading & distribution",
    logo: "/images/home/logo.webp",
  },
  tradeLink,
  hero: {
    interval: 6500,
    scrollLabel: "Discover Kingsway",
    secondary: { label: "Explore our products", href: "/products" },
    slides: [
      {
        eyebrow: "Kingsway International",
        title: ["Authentic Spices,", "Global Standards"],
        description:
          "A UK trading and distribution partner for spices, rice, pulses and ethnic grocery — built for the British trade.",
        image: "hero-spices",
        alt: "Whole spices, rice and pulses arranged on a stone surface",
        chapter: "The ingredients",
        cta: tradeLink,
      },
      {
        eyebrow: "From source to shelf",
        title: ["A world of flavour.", "Closer to home."],
        description:
          "Sourced directly from origin, for the authentic ethnic food needs of British retail, wholesale and foodservice.",
        image: "hero-origin",
        alt: "Whole spices being carefully selected by hand",
        chapter: "The origins",
        cta: { label: "Discover our journey", href: "/about" },
      },
      {
        eyebrow: "Our quality promise",
        title: ["A commitment.", "Not a slogan."],
        description:
          "A five-stage quality framework. And a promise to replace, refund or make it right when a product falls short.",
        image: "hero-quality",
        alt: "An ingredient quality check at a distribution warehouse",
        chapter: "The promise",
        cta: { label: "Explore our quality charter", href: "/quality" },
      },
      {
        eyebrow: "Chosen with purpose",
        title: ["A focused portfolio.", "A world of possibility."],
        description:
          "Spices, rice, pulses and ethnic groceries. Every line chosen with the needs of the British trade in mind.",
        image: "hero-portfolio",
        alt: "A selection of whole and ground spices on a wooden surface",
        chapter: "The portfolio",
        cta: { label: "Explore our portfolio", href: "/products" },
      },
    ],
  },
  intro: {
    eyebrow: "Rooted in origin. Built for Britain.",
    title: ["Authentic food.", "Thoughtfully sourced.", "Reliably delivered."],
    body: "Kingsway International is a UK-based trading and distribution company serving the authentic ethnic food needs of British retail, wholesale and foodservice buyers.",
    detail:
      "We source directly from origin, operate quality as a framework, and treat every case we deliver as a promise made in our name.",
    link: { label: "The story behind Kingsway", href: "/about" },
    note: "Good ingredients. Lasting relationships.",
  },
  threads: {
    eyebrow: "The Kingsway approach",
    title: "Three threads that run through everything we do.",
    items: [
      {
        number: "01",
        eyebrow: "Our journey",
        title: "A company built on conviction.",
        description:
          "Why we started Kingsway International — and the convictions the company was built on.",
        image: "journey",
        alt: "A map of the world formed from spices and grains",
        link: { label: "Read our story", href: "/about" },
      },
      {
        number: "02",
        eyebrow: "From source to shelf",
        title: "Quality at every step.",
        description:
          "Our five-stage quality framework — observable, auditable, lived.",
        image: "quality",
        alt: "A food professional checking ingredients in a kitchen",
        link: { label: "Explore the quality charter", href: "/quality" },
      },
      {
        number: "03",
        eyebrow: "What we trade",
        title: "A range with purpose.",
        description:
          "A focused portfolio across spices, rice, pulses and ethnic groceries.",
        image: "portfolio",
        alt: "Baskets of colourful spices, grains and dried pulses",
        link: { label: "See our portfolio", href: "/products" },
      },
    ],
  },
  quality: {
    eyebrow: "Our quality promise",
    title: ["A commitment,", "not a slogan."],
    quote:
      "If a product does not match the quality we have promised, we will replace it, refund it, or make it right — without debate.",
    detail: "Our five-stage quality framework is how we keep that promise.",
    link: { label: "How the framework works", href: "/quality" },
    image: "quality-promise",
    alt: "Spices being carefully prepared by hand",
  },
  channels: {
    eyebrow: "Who we serve",
    title: "Built for every corner of the British trade.",
    description:
      "Each channel has its own rhythm, price expectation and service requirement. Each is served by a dedicated commercial approach.",
    link: { label: "Find your trade channel", href: "/who-we-serve" },
    items: [
      {
        number: "01",
        title: "Independent retail",
        description:
          "Flexible pack sizes, reliable weekly delivery, competitive wholesale pricing.",
        image: "retail",
        alt: "A commercial handshake in a food shop",
        label: "Your everyday essentials",
        future: false,
      },
      {
        number: "02",
        title: "Cash & carry and wholesale",
        description: "Bulk formats, promotional activity, clear trading terms.",
        image: "wholesale",
        alt: "Pallets of packaged goods in a wholesale warehouse",
        label: "Built around your business",
        future: false,
      },
      {
        number: "03",
        title: "Food service",
        description:
          "Catering packs, consistency of supply, provenance-led category advice.",
        image: "foodservice",
        alt: "A chef working with ingredients in a commercial kitchen",
        label: "From our range to your kitchen",
        future: false,
      },
      {
        number: "04",
        title: "Multiples & export",
        description:
          "Approached once our own-brand programme is proven and track record established.",
        image: "export",
        alt: "Goods being prepared for distribution",
        label: "Our next chapter · Phase two",
        future: true,
      },
    ],
  },
  journey: {
    eyebrow: "Small ingredient. A remarkable journey.",
    title: ["A world behind", "every peppercorn."],
    description:
      "From the hills of Kerala to British kitchens. Follow the ingredient, and the care that goes into every stage.",
    image: "pepper-origin",
    caption: "Piper nigrum · Kerala, India",
    alt: "Peppercorns growing on a vine at harvest",
    link: {
      label: "The journey of a peppercorn",
      href: "/food-stories/journey-of-a-peppercorn",
    },
    stages: [
      {
        title: "Whole spice",
        description: "It begins with a peppercorn.",
        target: "ingredientHeroTarget",
      },
      {
        title: "Source",
        description: "Grown in the hills of Kerala.",
        target: "ingredientStoryTarget",
      },
      {
        title: "Process",
        description: "Dried, cleaned and graded.",
        target: "ingredientProcessTarget",
      },
      {
        title: "Product",
        description: "Prepared for the British trade.",
        target: "ingredientProductTarget",
      },
      {
        title: "Kitchen",
        description: "A familiar ingredient. A world of flavour.",
        target: "ingredientFoodTarget",
      },
    ],
  },
  showcase: {
    productLinkLabel: "Explore product",
    closingNote: "Selected with purpose",
    eyebrow: "The ingredients of your business",
    title: "Good food starts here.",
    description:
      "A considered range of authentic ingredients, for the shelves and kitchens you serve.",
    link: { label: "Explore the full portfolio", href: "/products" },
    // No unverified country-of-origin claims: replace these notes only with verified sourcing information.
    items: [
      {
        title: "Whole spices",
        category: "Aromatic & distinctive",
        origin: "Origin: enquire for individual lines",
        description:
          "The character of whole spice. Explore our current spice range.",
        image: "whole-spices",
        alt: "Whole spices in a brass bowl",
        href: "/products/spices/",
        ingredient: "anise",
      },
      {
        title: "Ground spices",
        category: "Depth & warmth",
        origin: "Origin: enquire for individual lines",
        description:
          "Colour, warmth and flavour for everyday cooking and professional kitchens.",
        image: "ground-spices",
        alt: "Ground spice in a brass bowl",
        href: "/products/spices/",
        ingredient: "turmeric",
      },
      {
        title: "Rice",
        category: "The foundation of a meal",
        origin: "Origin: enquire for individual lines",
        description:
          "From everyday meals to shared feasts. Discover our rice, poha and mamra.",
        image: "rice",
        alt: "Long-grain rice in a brass bowl",
        href: "/products/rice-poha-mamra/",
        ingredient: "rice",
      },
      {
        title: "Pulses & lentils",
        category: "Everyday nourishment",
        origin: "Origin: enquire for individual lines",
        description:
          "A kitchen essential, with a place in food traditions across the world.",
        image: "pulses",
        alt: "Red split lentils in a brass bowl",
        href: "/products/lentils/",
        ingredient: "cumin",
      },
    ],
  },
  stories: {
    eyebrow: "The Kingsway journal",
    title: "Beyond the ingredient.",
    description:
      "Recipes, origin stories and cooking tips. The food behind the ingredients — stories from the kitchens we trade for.",
    link: { label: "Visit Food Stories", href: "/food-stories" },
    items: [
      {
        category: "Recipe",
        title: "A basic rice recipe, done right",
        description:
          "Basmati rice, from the everyday table to the centre of a feast.",
        image: "rice-story",
        alt: "A bowl of cooked basmati rice with a selection of dishes",
        href: "/food-stories/basic-rice-recipe",
      },
      {
        category: "Origin story",
        title: "The journey of a peppercorn",
        description:
          "From the hills of Kerala to the shelves of British kitchens.",
        image: "pepper-origin",
        alt: "A hand harvesting peppercorns from a green vine",
        href: "/food-stories/journey-of-a-peppercorn",
      },
      {
        category: "Cooking tip",
        title: "Three things to know about turmeric",
        description:
          "Fresh vs dried, how much to use, and why heat changes its character.",
        image: "turmeric-story",
        alt: "Ground turmeric and fresh turmeric root on a kitchen worktop",
        href: "/food-stories/three-things-turmeric",
      },
    ],
  },
  cta: {
    alt: "A conversation about ingredients and trade around a table",
    eyebrow: "Let’s build something lasting",
    title: ["Start a trade", "conversation."],
    description: "We answer every enquiry within one business day.",
    link: { label: "Send an enquiry", href: "/contact" },
    image: "trade",
  },
};
