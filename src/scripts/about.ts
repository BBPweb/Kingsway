export function initAbout() {
  const events = new AbortController();
  const { signal } = events;
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const reveals = document.querySelectorAll<HTMLElement>("[data-about-reveal]");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
  );
  reveals.forEach((element) => revealObserver.observe(element));

  const storyStages = [
    ...document.querySelectorAll<HTMLElement>("[data-story-stage]"),
  ];
  const storyLinks = [
    ...document.querySelectorAll<HTMLAnchorElement>("[data-story-link]"),
  ];
  const setStoryStage = (index: number) => {
    document
      .querySelectorAll<HTMLElement>("[data-story-image]")
      .forEach((image, imageIndex) =>
        image.classList.toggle("is-active", imageIndex === index),
      );
    storyLinks.forEach((link, linkIndex) => {
      if (linkIndex === index) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "step");
      } else {
        link.classList.remove("is-active");
        link.removeAttribute("aria-current");
      }
    });
    const progress = document.querySelector<HTMLElement>(".about-story-progress");
    progress?.style.setProperty("transform", `translateX(${index * 100}%)`);
  };

  if (storyStages.length && !reducedMotion.matches) {
    const storyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number((entry.target as HTMLElement).dataset.storyStage);
          if (Number.isInteger(index)) setStoryStage(index);
        });
      },
      { rootMargin: "-35% 0px -45% 0px" },
    );
    storyStages.forEach((stage) => storyObserver.observe(stage));
    events.signal.addEventListener("abort", () => storyObserver.disconnect(), {
      once: true,
    });
  }

  const missionViewport = document.querySelector<HTMLElement>(
    "[data-mission-viewport]",
  );
  const missionItems = [
    ...document.querySelectorAll<HTMLElement>("[data-mission-item]"),
  ];
  const missionCount = document.querySelector<HTMLElement>("[data-mission-count]");
  const missionDots = [
    ...document.querySelectorAll<HTMLButtonElement>("[data-mission-go]"),
  ];
  const missionControls = document.querySelector<HTMLElement>(
    "[data-mission-controls]",
  );
  let currentMission = 0;
  const selectMission = (index: number) => {
    if (!missionViewport || !missionItems.length) return;
    currentMission = Math.max(0, Math.min(index, missionItems.length - 1));
    missionViewport.scrollTo({
      left: missionItems[currentMission].offsetLeft - missionItems[0].offsetLeft,
      behavior: reducedMotion.matches ? "instant" : "smooth",
    });
    if (missionCount)
      missionCount.textContent = String(currentMission + 1).padStart(2, "0");
    missionDots.forEach((dot, dotIndex) =>
      dot.setAttribute("aria-pressed", String(dotIndex === currentMission)),
    );
  };

  if (missionControls && missionViewport && missionItems.length) {
    missionControls.hidden = false;
    missionDots.forEach((dot) =>
      dot.addEventListener(
        "click",
        () => selectMission(Number(dot.dataset.missionGo)),
        { signal },
      ),
    );
    document
      .querySelector<HTMLButtonElement>("[data-mission-prev]")
      ?.addEventListener("click", () => selectMission(currentMission - 1), {
        signal,
      });
    document
      .querySelector<HTMLButtonElement>("[data-mission-next]")
      ?.addEventListener("click", () => selectMission(currentMission + 1), {
        signal,
      });
    missionViewport.addEventListener(
      "scroll",
      () => {
        const viewportCenter =
          missionViewport.scrollLeft + missionViewport.clientWidth / 2;
        const nearest = missionItems.reduce(
          (best, item, index) => {
            const center = item.offsetLeft - missionItems[0].offsetLeft + item.offsetWidth / 2;
            return Math.abs(center - viewportCenter) < best.distance
              ? { index, distance: Math.abs(center - viewportCenter) }
              : best;
          },
          { index: 0, distance: Number.POSITIVE_INFINITY },
        );
        if (nearest.index !== currentMission) {
          currentMission = nearest.index;
          if (missionCount)
            missionCount.textContent = String(currentMission + 1).padStart(2, "0");
          missionDots.forEach((dot, index) =>
            dot.setAttribute("aria-pressed", String(index === currentMission)),
          );
        }
      },
      { passive: true, signal },
    );
  }

  if (!reducedMotion.matches) {
    let frame = 0;
    const updateSource = () => {
      frame = 0;
      const path = document.querySelector<HTMLElement>("[data-source-path]");
      const line = document.querySelector<HTMLElement>("[data-source-line]");
      const ingredient = document.querySelector<HTMLElement>("[data-source-ingredient]");
      if (!path || !line || !ingredient) return;
      const rect = path.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (innerHeight * 0.78 - rect.top) / (rect.height * 0.72)));
      line.style.setProperty("--source-progress", `${progress * 100}%`);
      const targets = [...path.querySelectorAll<HTMLElement>("[data-source-target]")];
      if (!targets.length) return;
      const index = Math.min(targets.length - 1, Math.floor(progress * targets.length));
      const pathRect = path.getBoundingClientRect();
      const targetRect = targets[index].getBoundingClientRect();
      ingredient.style.setProperty(
        "--ingredient-x",
        `${Math.max(0, targetRect.left - pathRect.left)}px`,
      );
    };
    window.addEventListener(
      "scroll",
      () => {
        if (!frame) frame = requestAnimationFrame(updateSource);
      },
      { passive: true, signal },
    );
    window.addEventListener("resize", updateSource, { passive: true, signal });
    updateSource();
    events.signal.addEventListener(
      "abort",
      () => cancelAnimationFrame(frame),
      { once: true },
    );
  }

  window.addEventListener(
    "pagehide",
    (event) => {
      if (event.persisted) return;
      events.abort();
      revealObserver.disconnect();
    },
    { once: true, signal },
  );
  return () => {
    events.abort();
    revealObserver.disconnect();
  };
}