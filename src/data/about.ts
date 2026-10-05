// Copy adapted from the existing About page, homepage and Quality Charter.
// Product destinations follow the live, build-time adaptation catalogue.
export const about = {
  seo: {
    title: 'Kingsway International | Our Story, Mission & Values',
    description: 'Meet Kingsway International, a UK trading and distribution company connecting authentic spices, rice, pulses and ethnic groceries with the British trade.',
    image: '/images/about/social.jpg',
  },
  hero: {
    eyebrow: 'Good food brings us together',
    title: ['Good food.', 'Happy moments.'],
    description: 'The joy of a home-cooked meal. The comfort of familiar flavours. At Kingsway, we bring carefully sourced rice, spices and everyday essentials to the tables where happy memories are made.',
    image: '/images/aboutbannernew.webp',
    imageSrcSet: '/images/about/aboutbannernew-960.webp 960w, /images/about/aboutbannernew-1440.webp 1440w, /images/aboutbannernew.webp 1980w',
    alt: 'A smiling family sharing rice and curries around a sunlit kitchen table',
    caption: 'A little flavour. A lot of togetherness.',
    notes: ['Authentic flavours', 'Carefully sourced', 'Made for sharing'],
  },
  story: {
    eyebrow: '01 / Our journey',
    title: 'A world of flavour.\nA sense of purpose.',
    intro: 'The United Kingdom is home to one of the world’s most diverse food cultures. Behind every kitchen is a simple expectation: food that tastes the way it should.',
    body: 'Kingsway International was founded to meet that expectation. Our name reflects our ambition: a trusted King’s way — a reliable, principled route by which authentic ingredients travel from their source to the British consumer.',
    stages: [
      { title: 'Origin', subtitle: 'It starts with authenticity.', body: 'From South Asian and African kitchens to Caribbean, Middle Eastern and South-East Asian traditions, we believe ingredients should stay true to their origin and character.', image: 'pepper-origin', alt: 'Green peppercorns growing on a vine', label: 'Rooted in the places flavour begins' },
      { title: 'Sourcing', subtitle: 'Relationships make the difference.', body: 'A sack of rice is the work of a farmer, a miller, a shipper and many more. We build direct, durable relationships with the people behind what we trade.', image: 'rice-story', alt: 'Rice fields and the landscape behind an everyday staple', label: 'People and origins, connected' },
      { title: 'Quality', subtitle: 'Care, at every stage.', body: 'Quality is a framework we follow: origin selection, pre-shipment control, UK intake, warehousing and customer feedback. Every case is a promise made in our name.', image: 'whole-spices', alt: 'A selection of whole spices in wooden bowls', label: 'The details are the difference' },
      { title: 'Distribution', subtitle: 'The promise travels with us.', body: 'Dates, documents, storage and dispatch: distribution is a business of details. Operational discipline protects the freshness, accuracy and honest value of what we deliver.', image: 'wholesale', alt: 'Pallets of packaged goods ready for distribution', label: 'From the warehouse to your business' },
      { title: 'British trade', subtitle: 'Made for the kitchens we serve.', body: 'We serve the authentic ethnic food needs of British retail, wholesale and foodservice buyers, with a portfolio that reflects the real diversity of British kitchens.', image: 'foodservice', alt: 'Food preparation in a professional kitchen', label: 'A place in Britain’s food story' },
    ],
  },
  mission: {
    eyebrow: '02 / Our mission',
    title: 'Trust is earned.\nEvery single day.',
    description: 'Five commitments. One shared purpose. This is how we earn that trust, case by case and customer by customer.',
    items: [
      { title: 'Start at the source.', text: 'Sourcing directly from reputable origin markets and producers who share our standards.', image: 'whole-spices', alt: 'Whole spices selected for their origin and character', label: 'Responsible sourcing' },
      { title: 'Deliver with care.', text: 'Operating a UK distribution network that is accurate, responsive and commercially fair.', image: 'wholesale', alt: 'Goods organised for warehouse distribution', label: 'Reliable distribution' },
      { title: 'Reflect real kitchens.', text: 'Offering a product portfolio that reflects the real diversity of British kitchens.', image: 'pulses', alt: 'A variety of colourful pulses and lentils', label: 'A considered portfolio' },
      { title: 'Put people first.', text: 'Treating every partner — supplier, customer and colleague — with honesty and respect.', image: 'rice-story', alt: 'The rice-growing origins behind a familiar ingredient', label: 'Honest partnerships' },
      { title: 'Earn the next order.', text: 'Measuring our success by the confidence customers place in reordering from us.', image: 'ground-spices', alt: 'Richly coloured ground spices ready for the kitchen', label: 'Lasting confidence' },
    ],
  },
  values: {
    eyebrow: '03 / What we stand for',
    title: 'Quality isn’t a promise we make. It’s a framework we follow.',
    items: [
      { title: 'Integrity first', body: 'Commercial decisions are tested against one question before any other: is it honest? We walk away from opportunities that require us to compromise our word.' },
      { title: 'Only the best quality', body: 'We would rather miss a sale than sell a product we cannot stand behind. Our specifications, testing regime and grievance procedures are designed to reinforce that posture.' },
      { title: 'Customer partnership', body: 'We build plans around our buyers’ businesses — category insight, promotional calendars, packaging preferences and payment terms — so that our success is linked to theirs.' },
      { title: 'Respect for people and origins', body: 'Authentic food is created by farmers, processors and culinary traditions that deserve acknowledgement. We source in a way that respects those people, and expect the same from our partners.' },
      { title: 'Operational discipline', body: 'Distribution is a business of details: dates, temperatures, documents, dimensions. Getting those details right, every time, is what makes a reliable distributor.' },
    ],
  },
  source: {
    eyebrow: '04 / The care behind the ingredient',
    title: 'From source to shelf.',
    description: 'Follow a small ingredient through a bigger story. Our five-stage quality framework connects the care at origin with confidence at the counter.',
    stages: [
      { title: 'Source', body: 'Origin partners assessed against written criteria before the first order.', detail: 'Origin selection' },
      { title: 'Select', body: 'Goods inspected and documents checked before the shipment leaves origin.', detail: 'Pre-shipment control' },
      { title: 'Quality', body: 'Arrival samples reconciled with the agreed product specification.', detail: 'UK arrival & intake' },
      { title: 'Distribution', body: 'Storage, stock rotation, picking and dispatch handled with care.', detail: 'Warehousing & fulfilment' },
      { title: 'British shelf', body: 'Customer feedback turns every delivery into a chance to improve.', detail: 'Customer feedback' },
    ],
  },
  portfolio: {
    eyebrow: '05 / A range with purpose',
    title: 'Familiar ingredients.\nExtraordinary possibilities.',
    description: 'From the everyday staple to the distinctive finishing touch, our range reflects the way Britain really cooks.',
    items: [
      { title: 'Spices', detail: 'Whole, ground & full of character', image: 'whole-spices', alt: 'Whole spices in wooden bowls', slug: 'spices' },
      { title: 'Rice & grains', detail: 'The foundation of everyday cooking', image: 'rice', alt: 'A selection of rice varieties', slug: 'rice-poha-mamra' },
      { title: 'Pulses & lentils', detail: 'Traditional staples, thoughtfully chosen', image: 'pulses', alt: 'Bowls of dried lentils, beans and pulses', slug: 'lentils' },
      { title: 'The wider pantry', detail: 'Flours, oils, sauces & ethnic groceries', image: 'portfolio', alt: 'An assortment of spices and pantry ingredients', slug: '' },
    ],
  },
  global: {
    eyebrow: '06 / Global perspective. Local understanding.',
    title: 'From origins around the world to the British trade.',
    body: 'South Asian, African, Caribbean, Middle Eastern and South-East Asian food traditions are part of Britain’s everyday life. Our role is to keep that connection to authentic ingredients strong.',
    vision: 'To be the United Kingdom’s most trusted trading and distribution partner for authentic ethnic food ingredients — known equally for the quality of what we sell and the integrity of how we sell it.',
  },
  quality: {
    eyebrow: '07 / Our quality promise',
    title: 'A commitment,\nnot a slogan.',
    quote: 'If a product does not match the quality we have promised, we will replace it, refund it, or make it right — without debate.',
    detail: 'Our five-stage quality framework is how we keep that promise.',
  },
  partnership: {
    eyebrow: '08 / People & partnership',
    title: 'People behind\nthe supply.',
    body: 'A farmer. A miller. A warehouse team. A shopkeeper. Good food reaches the right place because people care about the next link in the chain.',
    detail: 'Our founding team brings an understanding of origin markets, international trade and UK retail distribution. We believe lasting relationships are how quality and reliability are maintained.',
  },
  cta: {
    eyebrow: 'The next chapter starts with a conversation',
    title: 'Let’s build a better\nsupply together.',
    body: 'Start a conversation with Kingsway International.',
    label: 'Start a trade conversation', href: '/contact',
  },
};
