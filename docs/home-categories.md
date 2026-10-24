# Homepage featured categories

Edit `src/data/home-categories.ts` to change the homepage hero's category names, links, images, descriptions (`alt`), or order. Keep five entries for the current five-circle layout. Each entry needs a unique `id`.

Set `initialCategoryId` to choose the category initially shown in the centre. If it does not match an entry, the first entry is selected.

The `backgroundImage` setting supplies the common stone podium background behind all five transparent product images. The generated `src/assets/home/categories/stone-podium.webp` is a 1024 × 1024 WebP kept below 300 KB. Its dark studio setting, light stone surface and soft smoke follow the supplied reference. The product images are positioned at `center 44%` in `HeroSlider.astro` so the packs sit on the podium. Source images live in `src/assets/home/categories/`; import replacements in the data file. Astro creates responsive WebP copies during `npm run build`.

The background was generated with the built-in imagegen tool, then encoded as WebP with Sharp. The complete generation prompt is in [stone-podium-prompt.md](stone-podium-prompt.md).

This list is exposed through `home.hero.featuredCategories` and used only by the homepage hero. It is independent of the shared product catalogue; editing it does not change images or category lists on other pages.
