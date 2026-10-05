import { initHeroSlider } from "./hero-slider";

export function initHome() {
  if (
    !document.body.classList.contains("home-page") ||
    document.body.classList.contains("home-ready")
  )
    return;
  document.body.classList.add("home-ready");
  const events = new AbortController();
  const { signal } = events;
  const header = document.querySelector<HTMLElement>("[data-home-header]")!;
  const dialog = document.querySelector<HTMLDialogElement>("#home-menu")!;
  const open = document.querySelector<HTMLButtonElement>("[data-menu-open]")!;
  const close = document.querySelector<HTMLButtonElement>("[data-menu-close]")!;
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  let frame = 0,
    closeTimer = 0;
  const updateHeader = () => {
    header.classList.toggle("is-tinted", scrollY > 8);
    header.classList.toggle("is-solid", scrollY > 96);
    frame = 0;
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!frame) frame = requestAnimationFrame(updateHeader);
    },
    { passive: true, signal },
  );
  updateHeader();
  open.addEventListener(
    "click",
    () => {
      clearTimeout(closeTimer);
      dialog.showModal();
      document.body.classList.add("menu-is-open");
      open.setAttribute("aria-expanded", "true");
      requestAnimationFrame(() => dialog.classList.add("is-open"));
      close.focus();
    },
    { signal },
  );
  const closeMenu = () => {
    if (!dialog.open) return;
    dialog.classList.remove("is-open");
    closeTimer = window.setTimeout(
      () => dialog.close(),
      motion.matches ? 0 : 320,
    );
  };
  close.addEventListener("click", closeMenu, { signal });
  dialog.addEventListener(
    "keydown",
    (event) => {
      if (event.key !== "Tab") return;
      const focusable = [
        ...dialog.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])",
        ),
      ];
      const first = focusable[0],
        last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    { signal },
  );
  dialog.addEventListener(
    "cancel",
    (event) => {
      event.preventDefault();
      closeMenu();
    },
    { signal },
  );
  dialog.addEventListener(
    "click",
    (event) => {
      if (event.target === dialog) {
        const rect = dialog.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right)
          closeMenu();
      }
    },
    { signal },
  );
  dialog.addEventListener(
    "close",
    () => {
      document.body.classList.remove("menu-is-open");
      open.setAttribute("aria-expanded", "false");
      open.focus({ preventScroll: true });
    },
    { signal },
  );
  dialog
    .querySelectorAll("a")
    .forEach((link) => link.addEventListener("click", closeMenu, { signal }));
  matchMedia("(min-width: 1200px)").addEventListener(
    "change",
    (event) => {
      if (event.matches && dialog.open) dialog.close();
    },
    { signal },
  );
  const stopSlider = initHeroSlider();
  const orbit = document.querySelector<HTMLElement>("[data-category-orbit]");
  if (orbit) {
    const orbitItems = [...orbit.querySelectorAll<HTMLButtonElement>("[data-orbit-category]")];
    const activeLabel = orbit.querySelector<HTMLElement>("[data-category-active-label]");
    const categoryLink = orbit.querySelector<HTMLAnchorElement>("[data-category-link]");
    const desktopPositions = [
      [-35, 0],
      [-21, 7],
      [21, 7],
      [35, 0],
    ];
    const wideDesktopPositions = [
      [-37, 0],
      [-28, 18],
      [28, 18],
      [37, 0],
    ];
    const mobilePositions = [
      [-39, 0],
      [-20, -19],
      [20, -19],
      [39, 0],
    ];
    let orbitTimer = 0;
    const scheduleOrbit = () => {
      window.clearTimeout(orbitTimer);
      if (
        motion.matches ||
        document.hidden ||
        orbit.matches(":hover, :focus-within")
      )
        return;
      orbitTimer = window.setTimeout(() => {
        const currentIndex = orbitItems.findIndex((item) =>
          item.classList.contains("is-active"),
        );
        selectCategory(orbitItems[(currentIndex + 1) % orbitItems.length]);
      }, 5000);
    };
    const selectCategory = (selected: HTMLButtonElement) => {
      const inactive = orbitItems.filter((item) => item !== selected);
      selected.classList.add("is-active");
      selected.setAttribute("aria-pressed", "true");
      selected.style.setProperty("--orbit-x", "0%");
      selected.style.setProperty("--orbit-y", "0%");
      const positions = matchMedia("(max-width: 767px)").matches
        ? mobilePositions
        : matchMedia("(min-width: 1200px)").matches
          ? wideDesktopPositions
        : desktopPositions;
      inactive.forEach((item, index) => {
        const [x, y] = positions[index];
        item.classList.remove("is-active");
        item.setAttribute("aria-pressed", "false");
        item.style.setProperty("--orbit-x", `${x}%`);
        item.style.setProperty("--orbit-y", `${y}%`);
      });
      if (activeLabel) activeLabel.textContent = selected.dataset.categoryTitle || "";
      if (categoryLink) {
        categoryLink.href = selected.dataset.categoryHref || "/products/";
        categoryLink.setAttribute(
          "aria-label",
          `Explore ${selected.dataset.categoryTitle || "product"}`,
        );
      }
      scheduleOrbit();
    };
    orbitItems.forEach((item) => {
      item.addEventListener("click", () => selectCategory(item), { signal });
    });
    const initial = orbitItems.find((item) => item.classList.contains("is-active"));
    if (initial) selectCategory(initial);
    orbit.addEventListener("pointerenter", () => window.clearTimeout(orbitTimer), {
      signal,
    });
    orbit.addEventListener("pointerleave", scheduleOrbit, { signal });
    orbit.addEventListener(
      "focusin",
      () => window.clearTimeout(orbitTimer),
      { signal },
    );
    orbit.addEventListener("focusout", scheduleOrbit, { signal });
    document.addEventListener("visibilitychange", scheduleOrbit, { signal });
    motion.addEventListener("change", scheduleOrbit, { signal });
    window.addEventListener(
      "pagehide",
      () => window.clearTimeout(orbitTimer),
      { once: true, signal },
    );
  }
  const ingredients = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) =>
        entry.target.classList.toggle(
          "in-view",
          entry.isIntersecting && !document.hidden,
        ),
      ),
    { rootMargin: "30px" },
  );
  document
    .querySelectorAll("[data-ingredient]")
    .forEach((element) => ingredients.observe(element));
  document.addEventListener(
    "visibilitychange",
    () => {
      document
        .querySelectorAll<HTMLElement>("[data-ingredient]")
        .forEach((element) => {
          const rect = element.getBoundingClientRect();
          element.classList.toggle(
            "in-view",
            !document.hidden && rect.bottom > 0 && rect.top < innerHeight,
          );
        });
    },
    { signal },
  );
  let stopScroll: (() => void) | undefined;
  let loading = false,
    destroyed = false;
  const loadMotion = async () => {
    if (motion.matches || loading || stopScroll || destroyed) return;
    loading = true;
    try {
      const module = await import("./scroll-animations");
      if (!destroyed) stopScroll = module.initScrollAnimations();
    } catch (error) {
      // Static content and navigation remain available when the enhancement fails.
      console.warn("Homepage motion could not be loaded.", error);
    } finally {
      loading = false;
    }
  };
  const start = () => {
    window.setTimeout(() => void loadMotion(), 150);
  };
  if (document.readyState === "complete") start();
  else window.addEventListener("load", start, { once: true, signal });
  motion.addEventListener(
    "change",
    () => {
      if (!motion.matches) void loadMotion();
    },
    { signal },
  );
  window.addEventListener(
    "pagehide",
    (event) => {
      if (event.persisted) return;
      destroyed = true;
      stopSlider();
      stopScroll?.();
      ingredients.disconnect();
      events.abort();
      cancelAnimationFrame(frame);
      clearTimeout(closeTimer);
    },
    { once: true, signal },
  );
}
