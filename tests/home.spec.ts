import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const sizes = [
  [1920, 1080],
  [1440, 900],
  [1366, 768],
  [1280, 720],
  [1024, 900],
  [768, 1024],
  [430, 932],
  [390, 844],
  [375, 812],
  [360, 800],
];

for (const [width, height] of sizes) {
  test(`homepage layout and reverse scroll at ${width}x${height}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/");
    await expect(page.locator("body")).toHaveClass(/home-ready/);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("[data-home-header]")).not.toHaveClass(
      /is-tinted/,
    );
    await page.locator('[data-slide-select="3"]').click();
    await expect(page.locator('[data-slide="3"]')).toHaveClass(/is-active/);
    const heroFits = await page
      .locator('[data-slide="3"] .hero-title')
      .evaluate(
        (el) =>
          el.scrollWidth <= el.clientWidth + 1 &&
          el.getBoundingClientRect().top > 80,
      );
    expect(heroFits).toBe(true);
    await page.locator('[data-slide-select="0"]').click();
    for (const selector of [
      ".home-intro",
      ".home-quality",
      ".home-channels",
      ".home-journey",
      ".home-showcase",
      ".home-stories",
      ".home-trade",
      ".site-footer",
    ]) {
      // Pinned elements deliberately move during scrolling; use native scrolling
      // instead of Playwright's actionability wait for a motionless bounding box.
      await page
        .locator(selector)
        .evaluate((el) =>
          el.scrollIntoView({ block: "start", behavior: "instant" }),
        );
      await page.waitForTimeout(100);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
      ).toBe(true);
    }
    await expect(page.locator("[data-home-header]")).toHaveClass(/is-solid/);
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(page.locator("[data-home-header]")).not.toHaveClass(
      /is-tinted/,
    );
    expect(
      await page.evaluate(() =>
        [...document.images]
          .filter((i) => i.src && i.complete && !i.naturalWidth)
          .map((i) => i.src),
      ),
    ).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test("carousel coordinates copy, images, keyboard, pause and autoplay", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator("[data-hero-controls]")).toBeVisible();
  await page.mouse.move(0, 0);
  await expect(page.locator('[data-slide="1"]')).toHaveClass(/is-active/, {
    timeout: 10000,
  });
  await page.locator('[data-slide-select="2"]').click();
  await expect(page.locator('[data-slide="2"]')).toHaveClass(/is-active/);
  await expect(page.locator('[data-backdrop="2"]')).toHaveClass(/is-active/);
  await expect(page.locator('[data-slide="2"] .hero-title')).toContainText(
    "A commitment.",
  );
  await expect(page.locator("[data-hero-pause]")).toHaveAttribute(
    "aria-label",
    "Play slideshow",
  );
  await page.keyboard.press("ArrowRight");
  await expect(page.locator('[data-slide="3"]')).toHaveClass(/is-active/);
  await page.keyboard.press("ArrowRight");
  await expect(page.locator('[data-slide="0"]')).toHaveClass(/is-active/);
  expect(
    await page
      .locator('[data-slide="1"]')
      .evaluate((el) => (el as HTMLElement).inert),
  ).toBe(true);
});

test("full-screen desktop orbit categories remain selectable", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const [width, height] of [
    [1920, 1080],
    [1440, 900],
    [1280, 720],
  ]) {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    const categories = page.locator("[data-orbit-category]");
    const count = await categories.count();

    for (let index = 0; index < count; index++) {
      const category = categories.nth(index);
      const title = await category.getAttribute("data-category-title");
      await category.click();
      await expect(category).toHaveAttribute("aria-pressed", "true");
      await expect(page.locator("[data-category-active-label]")).toHaveText(
        title!,
      );
      await expect(page.locator("[data-category-link]")).toHaveAttribute(
        "href",
        await category.getAttribute("data-category-href"),
      );
      await expect(page.locator(".orbit-category-link")).toHaveCount(0);
    }
  }
});

test("category orbit automatically advances after five seconds", async ({
  page,
}) => {
  await page.clock.install();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const categories = page.locator("[data-orbit-category]");
  const currentIndex = await categories.evaluateAll((items) =>
    items.findIndex((item) => item.classList.contains("is-active")),
  );
  const nextIndex = (currentIndex + 1) % (await categories.count());
  await page.clock.fastForward(5000);
  await expect(categories.nth(nextIndex)).toHaveAttribute("aria-pressed", "true");
});

test("mobile dialog traps focus, restores focus, and responds to Escape", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const opener = page.getByRole("button", { name: "Open navigation menu" });
  await opener.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Close navigation menu" }),
  ).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  expect(
    await page.evaluate(() => !!document.activeElement?.closest("dialog")),
  ).toBe(true);
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("button", { name: "Close navigation menu" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();
  await expect(opener).toHaveAttribute("aria-expanded", "false");
});

test("mobile swipe changes chapters and vertical touch remains native", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("body")).toHaveClass(/home-ready/);
  const cdp = await context.newCDPSession(page);
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x: 340, y: 400 }],
  });
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchMove",
    touchPoints: [{ x: 200, y: 400 }],
  });
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  await expect(page.locator('[data-slide="1"]')).toHaveClass(/is-active/);
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x: 190, y: 650 }],
  });
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchMove",
    touchPoints: [{ x: 190, y: 350 }],
  });
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(50);
  await context.close();
});

test("reduced motion keeps static content and avoids loading GSAP", async ({
  page,
}) => {
  const scripts: string[] = [];
  await page.emulateMedia({ reducedMotion: "reduce" });
  page.on("request", (request) => {
    if (request.resourceType() === "script") scripts.push(request.url());
  });
  await page.goto("/");
  await expect(page.locator("[data-hero-pause]")).toHaveAttribute(
    "aria-label",
    "Play slideshow",
  );
  await page.locator(".home-showcase").scrollIntoViewIfNeeded();
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  expect(scripts.some((src) => src.includes("scroll-animations"))).toBe(false);
  await page.locator(".home-stories").scrollIntoViewIfNeeded();
  await expect(page.locator("#stories-title")).toBeVisible();
});

test("homepage and menu pass automated WCAG checks", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  const menu = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(menu.violations).toEqual([]);
});

test("SEO metadata, image derivatives and internal links resolve", async ({
  page,
  request,
}) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Kingsway International \| UK Ethnic Food/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://www.kingswayinternational.co.uk/",
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /social.jpg$/,
  );
  expect(
    JSON.parse(
      (await page
        .locator('script[type="application/ld+json"]')
        .textContent()) || "{}",
    )["@type"],
  ).toBe("Organization");
  const links = await page
    .locator('a[href^="/"]')
    .evaluateAll((elements) => [
      ...new Set(elements.map((e) => e.getAttribute("href")!)),
    ]);
  for (const href of [
    ...links,
    "/robots.txt",
    "/sitemap-index.xml",
    "/images/home/social.jpg",
  ])
    expect((await request.get(href)).ok(), href).toBe(true);
  await page.goto("/products");
  await expect(page.locator("body")).not.toHaveClass(/home-page/);
  await expect(page.locator(".site-header")).toBeVisible();
  await expect(page.locator("[data-home-header]")).toHaveCount(0);
});

test("without JavaScript, content, navigation and product links remain usable", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator(".home-nojs-nav")).toBeVisible();
  await page.locator(".home-showcase").scrollIntoViewIfNeeded();
  await expect(page.locator(".showcase-item")).toHaveCount(4);
  expect(
    await page
      .locator(".showcase-track")
      .evaluate((el) => getComputedStyle(el).display),
  ).toBe("grid");
  await context.close();
});

test("ingredient reaches measured anchors after resize and reversing scroll", async ({
  page,
}) => {
  await page.goto("/");
  for (const [width, height] of [
    [1440, 900],
    [390, 844],
  ]) {
    await page.setViewportSize({ width, height });
    await page.waitForTimeout(800);
    const path = page.locator("[data-ingredient-path]");
    const coords = await path.evaluate((el) => {
      const r = el.getBoundingClientRect();
      return {
        start: r.top + scrollY - innerHeight * 0.8,
        end: r.bottom + scrollY - innerHeight * 0.38,
      };
    });
    for (const [position, target] of [
      [coords.end, "ingredientFoodTarget"],
      [coords.start, "ingredientHeroTarget"],
    ] as const) {
      await page.evaluate((y) => window.scrollTo(0, y), position);
      await page.waitForTimeout(850);
      const difference = await page.evaluate((id) => {
        const a = document.getElementById(id)!.getBoundingClientRect();
        const b = document
          .querySelector("[data-travelling-ingredient]")!
          .getBoundingClientRect();
        return Math.hypot(
          a.left + a.width / 2 - b.left - b.width / 2,
          a.top + a.height / 2 - b.top - b.height / 2,
        );
      }, target);
      expect(difference).toBeLessThan(4);
    }
  }
});

test("product strip responds to native scroll, keyboard focus and motion changes", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator(".is-scroll-showcase")).toHaveCount(1);
  const section = page.locator("[data-showcase]");
  const top = await section.evaluate(
    (el) => el.getBoundingClientRect().top + scrollY,
  );
  await page.evaluate((y) => scrollTo(0, y), top);
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(900);
  expect(
    await page
      .locator("[data-showcase-track]")
      .evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m41),
  ).toBeLessThan(-200);
  const before = await section.boundingBox();
  await page.waitForTimeout(600);
  const after = await section.boundingBox();
  expect(Math.abs(before!.y - after!.y)).toBeLessThan(1);
  const links = page.locator(".showcase-copy a");
  for (let i = 0; i < 4; i++) {
    await links.nth(i).focus();
    await page.waitForTimeout(800);
    const box = await links.nth(i).boundingBox();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(1440);
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator(".is-scroll-showcase")).toHaveCount(1);
});
