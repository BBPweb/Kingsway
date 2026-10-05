/** A small, progressively enhanced carousel. Image decoding precedes each
 * coordinated state change, so slow connections never separate image and copy. */
export function initHeroSlider() {
  const hero = document.querySelector<HTMLElement>("[data-hero]");
  if (!hero) return () => {};
  const slides = [...hero.querySelectorAll<HTMLElement>("[data-slide]")];
  const backgrounds = [
    ...hero.querySelectorAll<HTMLElement>("[data-backdrop]"),
  ];
  const buttons = [
    ...hero.querySelectorAll<HTMLButtonElement>("[data-slide-select]"),
  ];
  const pause = hero.querySelector<HTMLButtonElement>("[data-hero-pause]")!;
  const status = hero.querySelector<HTMLElement>("[data-slide-status]")!;
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const listeners = new AbortController();
  const { signal } = listeners;
  const interval = Number(hero.dataset.interval) || 6500;
  let current = 0,
    request = 0,
    timer = 0;
  let remaining = interval,
    startedAt = 0;
  let paused = motion.matches,
    hovering = false,
    inView = true,
    destroyed = false;
  let touchStart: { x: number; y: number } | null = null;
  hero.style.setProperty("--slide-duration", `${interval}ms`);
  hero.querySelector<HTMLElement>("[data-hero-controls]")!.hidden = false;

  async function loadImage(index: number) {
    const background = backgrounds[index];
    const img = background.querySelector<HTMLImageElement>("img")!;
    if (img.dataset.src) {
      // Set sources first to avoid fetching the WebP fallback in AVIF browsers.
      background
        .querySelectorAll<HTMLSourceElement>("source[data-srcset]")
        .forEach((source) => {
          source.srcset = source.dataset.srcset!;
          delete source.dataset.srcset;
        });
      img.loading = "eager";
      img.srcset = img.dataset.srcset!;
      img.src = img.dataset.src;
      delete img.dataset.src;
      delete img.dataset.srcset;
    }
    await img.decode();
  }
  const schedule = () => {
    window.clearTimeout(timer);
    if (startedAt)
      remaining = Math.max(0, remaining - (performance.now() - startedAt));
    startedAt = 0;
    const running = !paused && !hovering && inView && !document.hidden;
    hero.style.setProperty("--progress-state", running ? "running" : "paused");
    pause.setAttribute(
      "aria-label",
      paused ? "Play slideshow" : "Pause slideshow",
    );
    pause.setAttribute("aria-pressed", String(paused));
    pause.querySelector<HTMLElement>("[data-pause-icon]")!.textContent = paused
      ? "▶"
      : "Ⅱ";
    backgrounds.forEach((bg) => {
      bg.querySelector("img")!.style.animationPlayState = running
        ? "running"
        : "paused";
    });
    if (running) {
      startedAt = performance.now();
      timer = window.setTimeout(() => void select(current + 1), remaining);
    }
  };
  async function select(index: number, manual = false) {
    index = (index + slides.length) % slides.length;
    const token = ++request;
    window.clearTimeout(timer);
    startedAt = 0;
    if (manual) paused = true;
    try {
      await loadImage(index);
    } catch {
      if (!destroyed) schedule();
      return;
    }
    if (token !== request || destroyed) return;
    current = index;
    remaining = interval;
    slides.forEach((slide, i) => {
      const active = i === index;
      slide.classList.toggle("is-active", active);
      slide.inert = !active;
      slide.setAttribute("aria-hidden", String(!active));
      slide
        .querySelectorAll<HTMLAnchorElement>("a")
        .forEach((link) =>
          active
            ? link.removeAttribute("tabindex")
            : link.setAttribute("tabindex", "-1"),
        );
      backgrounds[i].classList.toggle("is-active", active);
      backgrounds[i].setAttribute("aria-hidden", String(!active));
      buttons[i].classList.toggle("is-active", active);
      buttons[i].setAttribute("aria-pressed", String(active));
    });
    if (manual)
      status.textContent = slides[index].getAttribute("aria-label") || "";
    schedule();
    // Warm just the following chapter after the active scene has loaded.
    void loadImage((index + 1) % slides.length).catch(() => {});
  }
  buttons.forEach((button, i) =>
    button.addEventListener("click", () => void select(i, true), { signal }),
  );
  pause.addEventListener(
    "click",
    () => {
      paused = !paused;
      schedule();
    },
    { signal },
  );
  hero.addEventListener(
    "mouseenter",
    () => {
      if (matchMedia("(hover: hover)").matches) {
        hovering = true;
        schedule();
      }
    },
    { signal },
  );
  hero.addEventListener(
    "mouseleave",
    () => {
      hovering = false;
      schedule();
    },
    { signal },
  );
  hero.addEventListener(
    "focusin",
    (event) => {
      if (event.target !== pause) {
        paused = true;
        schedule();
      }
    },
    { signal },
  );
  hero.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        void select(current + (event.key === "ArrowRight" ? 1 : -1), true);
      }
    },
    { signal },
  );
  hero.addEventListener(
    "touchstart",
    (event) => {
      if (
        (event.target as HTMLElement).closest("a, button") ||
        event.touches.length !== 1
      ) {
        touchStart = null;
        return;
      }
      touchStart = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    },
    { passive: true, signal },
  );
  hero.addEventListener(
    "touchend",
    (event) => {
      if (!touchStart || !event.changedTouches.length) return;
      const dx = event.changedTouches[0].clientX - touchStart.x;
      const dy = event.changedTouches[0].clientY - touchStart.y;
      if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5)
        void select(current + (dx < 0 ? 1 : -1), true);
      touchStart = null;
    },
    { passive: true, signal },
  );
  hero.addEventListener(
    "touchcancel",
    () => {
      touchStart = null;
    },
    { signal },
  );
  document.addEventListener("visibilitychange", schedule, { signal });
  motion.addEventListener(
    "change",
    () => {
      if (motion.matches) paused = true;
      schedule();
    },
    { signal },
  );
  const observer = new IntersectionObserver(
    ([entry]) => {
      inView = entry.isIntersecting;
      schedule();
    },
    { threshold: 0.15 },
  );
  observer.observe(hero);
  // The primary image and fonts get network priority over later chapters.
  const warmup = window.setTimeout(
    () => void loadImage(1).catch(() => {}),
    2500,
  );
  schedule();
  return () => {
    destroyed = true;
    request++;
    clearTimeout(timer);
    clearTimeout(warmup);
    observer.disconnect();
    listeners.abort();
  };
}
