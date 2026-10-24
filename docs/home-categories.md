# Homepage featured categories

Edit `src/data/home-categories.ts` to change the homepage hero's category names, links, images, descriptions (`alt`), or order. Keep five entries for the current five-circle layout. Each entry needs a unique `id`.

Set `initialCategoryId` to choose the category initially shown in the centre. If it does not match an entry, the first entry is selected.

The `backgroundImage` setting supplies the common wood background behind all five transparent product images. Source images live in `src/assets/home/categories/`; import replacements in the data file. Astro creates responsive WebP copies during `npm run build`.

This list is exposed through `home.hero.featuredCategories` and used only by the homepage hero. It is independent of the shared product catalogue; editing it does not change images or category lists on other pages.
