import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Anchor coordinates are measured in their actual containing block. No viewport
 * guesses: fonts, responsive layout, pin spacing and image changes are refreshed. */
export function initIngredientJourney() {
  const path = document.querySelector<HTMLElement>("[data-ingredient-path]");
  const ingredient = path?.querySelector<HTMLElement>(
    "[data-travelling-ingredient]",
  );
  const anchors = [
    ...(path?.querySelectorAll<HTMLElement>("[data-ingredient-target]") || []),
  ];
  if (!path || !ingredient || anchors.length < 2) return;
  let points: { x: number; y: number }[] = [];
  const measure = () => {
    const container = path.getBoundingClientRect();
    points = anchors.map((anchor) => {
      const rect = anchor.getBoundingClientRect();
      return {
        x:
          rect.left -
          container.left +
          rect.width / 2 -
          ingredient.offsetWidth / 2,
        y:
          rect.top -
          container.top +
          rect.height / 2 -
          ingredient.offsetHeight / 2,
      };
    });
  };
  measure();
  const progress = { value: 0 };
  const paint = () => {
    const position = progress.value * (points.length - 1);
    const i = Math.min(Math.floor(position), points.length - 2);
    const fraction = position - i;
    const from = points[i],
      to = points[i + 1];
    gsap.set(ingredient, {
      x: from.x + (to.x - from.x) * fraction,
      y: from.y + (to.y - from.y) * fraction,
      rotation:
        progress.value * (matchMedia("(max-width: 767px)").matches ? 12 : 35),
      visibility: "visible",
    });
  };
  gsap.to(progress, {
    value: 1,
    ease: "none",
    onUpdate: paint,
    scrollTrigger: {
      trigger: path,
      start: "top 80%",
      end: "bottom 38%",
      scrub: 0.5,
      invalidateOnRefresh: true,
      onRefresh: () => {
        measure();
        paint();
      },
    },
  });
  paint();
  const observer = new ResizeObserver(() => {
    measure();
    paint();
  });
  observer.observe(path);
  ScrollTrigger.addEventListener("refreshInit", measure);
  return () => {
    observer.disconnect();
    ScrollTrigger.removeEventListener("refreshInit", measure);
    ingredient.removeAttribute("style");
  };
}
