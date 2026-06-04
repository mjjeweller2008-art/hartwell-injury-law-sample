(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const faqItems = document.querySelectorAll(".faq-item");
  const forms = document.querySelectorAll("[data-consult-form]");

  if (header) {
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", () => {
      const open = mobileNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  faqItems.forEach((item) => {
    const btn = item.querySelector(".faq-question");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const isOpen = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(isOpen));
      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove("is-open");
          const otherBtn = other.querySelector(".faq-question");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
        }
      });
    });
  });

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn ? btn.textContent : "";
      if (btn) {
        btn.textContent = "Thank you - we'll call shortly";
        btn.disabled = true;
      }
      form.reset();
      setTimeout(() => {
        if (btn) {
          btn.textContent = original;
          btn.disabled = false;
        }
      }, 4000);
    });
  });

  const chatBtn = document.querySelector(".chat-placeholder");
  if (chatBtn) {
    chatBtn.addEventListener("click", () => {
      const contact = document.getElementById("contact");
      if (contact) {
        contact.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = "contact.html";
      }
    });
  }

  /* Hero entrance */
  const hero = document.querySelector(".hero--editorial");
  if (hero && !prefersReduced) {
    requestAnimationFrame(() => {
      hero.classList.add("is-ready");
    });
  } else if (hero) {
    hero.classList.add("is-ready");
  }

  /* Count-up stats in hero */
  function animateValue(el, end, duration, decimals) {
    const start = 0;
    const startTime = performance.now();
    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = start + (end - start) * eased;
      el.textContent = decimals ? val.toFixed(decimals) : Math.floor(val);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = decimals ? end.toFixed(decimals) : String(end);
    };
    requestAnimationFrame(step);
  }

  function runCounters(root) {
    root.querySelectorAll("[data-count]").forEach((el) => {
      const end = parseFloat(el.getAttribute("data-count"), 10);
      const decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
      if (!Number.isNaN(end)) animateValue(el, end, 1400, decimals);
    });
  }

  if (hero) {
    if (prefersReduced) {
      hero.querySelectorAll("[data-count]").forEach((el) => {
        const end = el.getAttribute("data-count");
        const decimals = el.getAttribute("data-decimals");
        el.textContent = decimals ? parseFloat(end, 10).toFixed(parseInt(decimals, 10)) : end;
      });
    } else {
      const counterObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              runCounters(entry.target);
              counterObs.disconnect();
            }
          });
        },
        { threshold: 0.3 }
      );
      counterObs.observe(hero);
    }
  }

  /* Scroll reveal */
  const revealEls = document.querySelectorAll(".reveal, .stagger-children");
  if (revealEls.length) {
    if (prefersReduced) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
      );
      revealEls.forEach((el) => observer.observe(el));
    }
  }
})();
