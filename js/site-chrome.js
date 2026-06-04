(function () {
  "use strict";

  const PHONE = "(713) 555-0147";
  const PHONE_TEL = "+17135550147";
  const file = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  let page = file.replace(/\.html$/, "");
  if (!page || page === "index") page = "home";

  const nav = [
    { id: "home", label: "Home", href: "index.html" },
    { id: "practice-areas", label: "Practice Areas", href: "practice-areas.html" },
    { id: "about", label: "About", href: "about.html" },
    { id: "results", label: "Results", href: "results.html" },
    { id: "contact", label: "Contact", href: "contact.html" },
  ];

  const isActive = (id) => {
    if (id === "home" && (page === "home" || page === "index")) return true;
    if (id === "practice-areas" && (page === "practice-areas" || page === "car-accident")) return true;
    return page === id;
  };

  const navLinks = nav
    .map(
      (n) =>
        `<a href="${n.href}" class="${isActive(n.id) ? "is-active" : ""}">${n.label}</a>`
    )
    .join("");

  const mobileNavLinks = nav
    .map((n) => `<a href="${n.href}">${n.label}</a>`)
    .join("");

  const isHome = page === "home" || page === "index";
  const reviewHref = "contact.html";

  const headerHTML = `
  <header class="site-header" role="banner">
    <div class="container site-header__inner">
      <a href="index.html" class="logo" aria-label="Hartwell Injury Law - Home">
        <span class="logo__name">Hartwell Injury Law</span>
        <span class="logo__tag">Houston · Personal Injury</span>
      </a>
      <nav class="nav-desktop" aria-label="Primary">${navLinks}</nav>
      <div class="header-actions">
        <a href="tel:${PHONE_TEL}" class="header-phone" aria-label="Call 24/7">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          ${PHONE}
        </a>
        <a href="${reviewHref}" class="btn btn--primary header-cta">Free Case Review</a>
        <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
        </button>
      </div>
    </div>
    <nav id="mobile-nav" class="mobile-nav" aria-label="Mobile">
      ${mobileNavLinks}
      <a href="tel:${PHONE_TEL}">Call ${PHONE}</a>
    </nav>
  </header>`;

  const footerHTML = `
  <footer class="site-footer" role="contentinfo">
    <div class="container">
      <div class="footer-grid">
        <div>
          <p class="logo__name" style="color:#fff;font-family:var(--font-serif);font-size:1.25rem;">Hartwell Injury Law</p>
          <p style="margin-top:0.75rem;font-size:0.875rem;">Houston personal injury attorneys serving accident victims across Texas.</p>
          <p style="margin-top:1rem;"><a href="tel:${PHONE_TEL}">${PHONE}</a></p>
        </div>
        <div>
          <h4>Practice areas</h4>
          <a href="car-accident.html">Car accidents</a>
          <a href="practice-areas.html">Truck accidents</a>
          <a href="practice-areas.html">Motorcycle accidents</a>
          <a href="practice-areas.html">Wrongful death</a>
          <a href="practice-areas.html">Slip and fall</a>
          <a href="practice-areas.html">Workplace injury</a>
        </div>
        <div>
          <h4>Firm</h4>
          <a href="about.html">About us</a>
          <a href="results.html">Case results</a>
          <a href="index.html#process">How it works</a>
          <a href="index.html#faq">FAQ</a>
          <a href="contact.html">Contact</a>
        </div>
        <div>
          <h4>Resources</h4>
          <a href="docs/wireframe.html">Wireframe (demo)</a>
          <a href="docs/workflow.md">Workflow doc</a>
          <span style="display:block;font-size:0.875rem;margin-top:0.5rem;color:rgba(255,255,255,0.5);">Agency portfolio sample</span>
        </div>
      </div>
      <div class="footer-bottom">
        <p><strong>Disclaimer:</strong> Sample website for portfolio demonstration. Hartwell Injury Law is fictional. Past results are illustrative. No attorney-client relationship is formed by submitting a form.</p>
        <p style="margin-top:1rem;">© 2026 Hartwell Injury Law (Sample). All rights reserved.</p>
      </div>
    </div>
  </footer>
  <div class="mobile-cta-bar" role="navigation" aria-label="Quick actions">
    <a href="contact.html">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
      Contact Us
    </a>
    <a href="${reviewHref}">Free Case Review</a>
  </div>
  <button type="button" class="chat-placeholder" aria-label="Live chat - go to contact (demo)">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
  </button>`;

  const headerSlot = document.getElementById("site-header");
  const footerSlot = document.getElementById("site-footer");
  if (headerSlot) headerSlot.innerHTML = headerHTML;
  if (footerSlot) footerSlot.innerHTML = footerHTML;
})();
