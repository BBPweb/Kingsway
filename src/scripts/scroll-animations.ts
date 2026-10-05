import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initIngredientJourney } from "./ingredient-animation";

export function initScrollAnimations() {
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  media.add("(prefers-reduced-motion: no-preference)", () => {
    document
      .querySelectorAll<HTMLElement>("[data-reveal]")
      .forEach((element, i) => {
        // Never hide content that has already appeared during a slow script load.
        if (element.getBoundingClientRect().top < innerHeight * 0.9) return;
        gsap.from(element, {
          y: matchMedia("(max-width: 767px)").matches ? 18 : 32,
          opacity: 0,
          duration: 0.85,
          delay: (i % 3) * 0.06,
          ease: "power2.out",
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: element, start: "top 93%", once: true },
        });
      });
    document
      .querySelectorAll<HTMLElement>(".story-image")
      .forEach((element) => {
        gsap.from(element, {
          clipPath: "inset(0 0 10% 0)",
          duration: 1.1,
          ease: "power2.out",
          clearProps: "clipPath",
          scrollTrigger: { trigger: element, start: "top 94%", once: true },
        });
      });
    gsap.to("[data-hero-content]", {
      y: -55,
      opacity: 0.18,
      ease: "none",
      scrollTrigger: {
        trigger: "[data-hero]",
        start: "top top",
        end: "bottom 15%",
        scrub: true,
      },
    });
    gsap.to("[data-hero-scene]", {
      y: 65,
      scale: 1.035,
      ease: "none",
      scrollTrigger: {
        trigger: "[data-hero]",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    gsap.to(".hero-ingredients", {
      y: -40,
      ease: "none",
      scrollTrigger: {
        trigger: "[data-hero]",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    document
      .querySelectorAll<HTMLElement>("[data-parallax]")
      .forEach((element) => {
        gsap.fromTo(
          element,
          { scale: 1.06, yPercent: -2 },
          {
            scale: 1.1,
            yPercent: 2,
            ease: "none",
            scrollTrigger: {
              trigger: element.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    gsap.from("[data-line]", {
      scaleX: 0,
      duration: 1.1,
      ease: "power2.out",
      scrollTrigger: { trigger: "[data-line]", start: "top 85%", once: true },
    });
    return initIngredientJourney();
  });
  media.add(
    "(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)",
    () => {
      const section = document.querySelector<HTMLElement>("[data-showcase]")!;
      const viewport = section.querySelector<HTMLElement>(
        "[data-showcase-viewport]",
      )!;
      const track = section.querySelector<HTMLElement>(
        "[data-showcase-track]",
      )!;
      const header = document.querySelector<HTMLElement>("[data-home-header]")!;
      section.classList.add("is-scroll-showcase");
      const distance = () =>
        Math.max(0, track.scrollWidth - viewport.clientWidth);
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: () => `top top+=${header.offsetHeight}`,
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) =>
            gsap.set("[data-showcase-progress]", {
              scaleX: 0.25 + self.progress * 0.75,
            }),
        },
      });
      // Keyboard users can tab through the strip; the matching vertical scroll
      // position brings each focused link fully into view without trapping focus.
      const focus = (event: FocusEvent) => {
        const card = (event.target as HTMLElement).closest<HTMLElement>(
          ".showcase-item",
        );
        const trigger = tween.scrollTrigger;
        if (!card || !trigger) return;
        const rect = card.getBoundingClientRect();
        if (rect.left < 0 || rect.right > viewport.clientWidth) {
          const inset = parseFloat(getComputedStyle(track).paddingLeft);
          const cardOffset = rect.left - track.getBoundingClientRect().left;
          const ratio = Math.min(
            1,
            Math.max(0, (cardOffset - inset) / distance()),
          );
          window.scrollTo({
            top: trigger.start + ratio * (trigger.end - trigger.start),
            behavior: "instant",
          });
          ScrollTrigger.update();
          // Finish the scrub immediately for focus navigation. A link must not
          // remain outside the viewport while its animation catches up.
          trigger.getTween()?.progress(1);
          tween.progress(ratio);
        }
      };
      track.addEventListener("focusin", focus);
      return () => {
        track.removeEventListener("focusin", focus);
        section.classList.remove("is-scroll-showcase");
      };
    },
  );
  let refreshTimer = 0;
  const refresh = () => {
    clearTimeout(refreshTimer);
    refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 150);
  };
  void document.fonts.ready.then(refresh);
  window.addEventListener("load", refresh, { once: true });
  // Image dimensions are reserved, but this also supports later content edits.
  let previousWidth = 0,
    previousHeight = 0;
  const observer = new ResizeObserver(([entry]) => {
    const { width, height } = entry.contentRect;
    // Watch the document layout, not a pinned element's temporary measurements:
    // observing pins themselves can create an endless refresh/resize loop.
    if (
      Math.abs(width - previousWidth) > 1 ||
      Math.abs(height - previousHeight) > 1
    ) {
      previousWidth = width;
      previousHeight = height;
      refresh();
    }
  });
  observer.observe(document.querySelector("main")!);
  ScrollTrigger.refresh();
  return () => {
    clearTimeout(refreshTimer);
    observer.disconnect();
    window.removeEventListener("load", refresh);
    media.revert();
  };
}
