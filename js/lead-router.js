(function () {
  "use strict";

  const STORAGE_KEY = "hartwell-lead-router-seen";
  const FIRM_NAME = "Hartwell Injury Law";

  const OPTIONS = [
    { id: "car-accident", label: "Car Accident", href: "car-accident.html", full: false },
    { id: "slip-fall", label: "Slip & Fall", href: "practice-areas.html", full: false },
    {
      id: "commercial-vehicle",
      label: "Commercial Vehicle Accident",
      href: "practice-areas.html",
      full: true,
    },
    { id: "workplace", label: "Workplace Injury", href: "practice-areas.html", full: true },
    { id: "wrongful-death", label: "Wrongful Death", href: "practice-areas.html", full: true },
    { id: "other", label: "Other Injuries", href: "contact.html", full: false },
    { id: "existing", label: "Existing Client", href: "contact.html", full: false },
  ];

  function optionButtons() {
    return OPTIONS.map((opt) => {
      const fullClass = opt.full ? " lead-router__option--full" : "";
      return `<button type="button" class="lead-router__option${fullClass}" data-lead-option="${opt.id}" data-href="${opt.href}" role="radio" aria-checked="false">
        <span class="lead-router__radio" aria-hidden="true"></span>
        <span class="lead-router__label">${opt.label}</span>
      </button>`;
    }).join("");
  }

  const markup = `
  <div class="lead-router" id="lead-router" role="dialog" aria-modal="true" aria-labelledby="lead-router-heading" hidden>
    <div class="lead-router__backdrop" data-lead-dismiss tabindex="-1" aria-hidden="true"></div>
    <div class="lead-router__card">
      <button type="button" class="lead-router__close" data-lead-dismiss aria-label="Close greeting">&times;</button>
      <p class="lead-router__greeting" id="lead-router-heading">Hi 👋 Welcome to ${FIRM_NAME}. What kind of matter can we assist you with?</p>
      <img
        class="lead-router__avatar"
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='76' height='76' viewBox='0 0 76 76'%3E%3Ccircle fill='%23e8e4dc' cx='38' cy='38' r='38'/%3E%3Ccircle fill='%23d96b27' cx='38' cy='30' r='14'/%3E%3Cellipse fill='%23d96b27' cx='38' cy='58' rx='22' ry='16'/%3E%3C/svg%3E"
        width="38"
        height="38"
        alt=""
        role="presentation"
      >
      <div class="lead-router__options" role="radiogroup" aria-label="Select your matter type">
        ${optionButtons()}
      </div>
      <p class="lead-router__attribution">Powered by <span class="lead-router__brand">intaker</span></p>
    </div>
  </div>`;

  function getNavigationType() {
    const entry = performance.getEntriesByType("navigation")[0];
    return entry && entry.type ? entry.type : "navigate";
  }

  function shouldShow() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      if (getNavigationType() === "reload") return true;
      return !sessionStorage.getItem(STORAGE_KEY);
    } catch {
      return true;
    }
  }

  function markSeen() {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  function init() {
    if (!shouldShow()) return;

    markSeen();
    document.body.insertAdjacentHTML("beforeend", markup);

    const root = document.getElementById("lead-router");
    if (!root) return;

    const card = root.querySelector(".lead-router__card");
    const options = root.querySelectorAll("[data-lead-option]");
    let selected = null;

    function open() {
      root.hidden = false;
      requestAnimationFrame(() => {
        root.classList.add("is-open");
        document.body.style.overflow = "hidden";
        const first = options[0];
        if (first) first.focus();
      });
    }

    function close(navigateTo) {
      root.classList.remove("is-open");
      document.body.style.overflow = "";
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        root.hidden = true;
        if (navigateTo) window.location.href = navigateTo;
      };
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        finish();
      } else {
        root.addEventListener("transitionend", finish, { once: true });
        setTimeout(finish, 320);
      }
    }

    function selectOption(btn) {
      options.forEach((el) => {
        el.classList.remove("is-selected");
        el.setAttribute("aria-checked", "false");
      });
      btn.classList.add("is-selected");
      btn.setAttribute("aria-checked", "true");
      selected = btn;
    }

    root.querySelectorAll("[data-lead-dismiss]").forEach((el) => {
      el.addEventListener("click", () => close());
    });

    root.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });

    options.forEach((btn) => {
      btn.addEventListener("click", () => {
        selectOption(btn);
        const href = btn.getAttribute("data-href");
        close(href || null);
      });
    });

    if (card) {
      card.addEventListener("click", (e) => e.stopPropagation());
    }

    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 400;
    setTimeout(open, delay);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
