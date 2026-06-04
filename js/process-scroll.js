(function () {
  "use strict";

  const track = document.querySelector("[data-process-scroll]");
  if (!track) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  const cards = Array.from(track.querySelectorAll("[data-process-card]"));
  const copies = Array.from(track.querySelectorAll("[data-process-copy]"));
  const total = cards.length;
  if (!total || copies.length !== total) return;

  function mapRange(progress, inMin, inMax, outMin, outMax) {
    if (progress <= inMin) return outMin;
    if (progress >= inMax) return outMax;
    const t = (progress - inMin) / (inMax - inMin);
    return outMin + (outMax - outMin) * t;
  }

  function getScrollProgress() {
    const rect = track.getBoundingClientRect();
    const trackTop = rect.top + window.scrollY;
    const trackHeight = track.offsetHeight;
    const viewport = window.innerHeight;
    const scrollable = trackHeight - viewport;
    if (scrollable <= 0) return 0;
    const scrolled = window.scrollY - trackTop;
    return Math.min(1, Math.max(0, scrolled / scrollable));
  }

  function applyCardTransform(card, index, progress) {
    const startInterval = index / total;
    const endInterval = (index + 1) / total;
    const isLast = index === total - 1;
    const fadeEnd = endInterval + 0.05;
    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    const exitX = isMobile ? -120 : -360;
    const exitRotate = isMobile ? -8 : -18;

    let opacity;
    if (progress < startInterval) {
      opacity = 0;
    } else if (isLast) {
      opacity = 1;
    } else if (progress >= fadeEnd) {
      opacity = 0;
    } else {
      opacity = mapRange(progress, startInterval, fadeEnd, 1, 0);
    }

    const x =
      isLast || progress < startInterval
        ? 0
        : mapRange(progress, startInterval, endInterval, 0, exitX);
    const rotate =
      isLast || progress < startInterval
        ? 0
        : mapRange(progress, startInterval, endInterval, 0, exitRotate);
    const scale = mapRange(
      progress,
      startInterval,
      Math.min(startInterval + 0.1, endInterval),
      0.96,
      1
    );

    card.style.zIndex = String(index + 1);
    card.style.opacity = String(opacity);
    card.style.visibility = opacity > 0.02 ? "visible" : "hidden";
    card.style.transform =
      progress >= startInterval
        ? `translate3d(${x}px, 0, 0) scale(${scale}) rotate(${rotate}deg)`
        : "translate3d(0, 0, 0) scale(0.96) rotate(0deg)";
  }

  /** Only one copy visible at a time — synced to its matching card window. */
  function applyCopyTransform(copy, index, progress) {
    const startInterval = index / total;
    const endInterval = (index + 1) / total;
    const isLast = index === total - 1;
    const fadeEnd = endInterval + 0.05;
    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    const exitX = isMobile ? 20 : 40;

    let opacity;
    if (progress < startInterval) {
      opacity = 0;
    } else if (isLast) {
      opacity = 1;
    } else if (progress >= fadeEnd) {
      opacity = 0;
    } else {
      opacity = mapRange(progress, startInterval, fadeEnd, 1, 0);
    }

    let x = 0;
    if (opacity > 0 && !isLast && progress >= startInterval) {
      x = mapRange(progress, startInterval, endInterval, 0, exitX);
    }

    copy.style.zIndex = String(index + 1);
    copy.style.opacity = String(opacity);
    copy.style.visibility = opacity > 0.02 ? "visible" : "hidden";
    copy.style.pointerEvents = opacity > 0.02 ? "auto" : "none";
    copy.style.transform = `translate3d(${x}px, 0, 0)`;
  }

  function update() {
    const progress = getScrollProgress();

    cards.forEach((card, index) => {
      applyCardTransform(card, index, progress);
    });

    copies.forEach((copy, index) => {
      applyCopyTransform(copy, index, progress);
    });
  }

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      update();
      ticking = false;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();
})();
