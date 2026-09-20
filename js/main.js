/* =========================================================
   Hammad Razzaq — DevOps portfolio
   Shared script: navbar + footer (single source of truth),
   scroll animations, terminal typing, contact form.
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Site data: edit here, every page updates ---------- */
  var SITE = {
    name: "Hammad Razzaq",
    email: "hammadrazzaq2k@gmail.com",
    github: "https://github.com/hammadrazzaq2k",
    linkedin: "https://www.linkedin.com/in/hammad-razzaq-2501302b8"
  };

  var NAV = [
    { href: "index.html", label: "Home" },
    { href: "about.html", label: "About" },
    { href: "projects.html", label: "Projects" },
    { href: "experience.html", label: "Experience" },
    { href: "contact.html", label: "Contact" }
  ];

  var ICONS = {
    github:
      '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>',
    linkedin:
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    mail:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6.5L20.5 7"/></svg>',
    menu:
      '<svg class="icon-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close:
      '<svg class="icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>'
  };

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Current page ---------- */
  function currentPage() {
    var file = window.location.pathname.split("/").pop();
    return file === "" ? "index.html" : file;
  }

  /* ---------- Navbar ---------- */
  function renderHeader() {
    var host = document.getElementById("site-header");
    if (!host) return;
    var page = currentPage();

    var links = NAV.map(function (item) {
      var current = item.href === page ? ' aria-current="page"' : "";
      return '<li><a href="' + item.href + '"' + current + ">" + item.label + "</a></li>";
    }).join("");

    host.classList.add("site-header");
    host.innerHTML =
      '<nav class="nav" aria-label="Main">' +
      '<a class="brand" href="index.html" aria-label="' + SITE.name + ', home">' +
      '<span class="brand-mark" aria-hidden="true">&gt;_</span>' + SITE.name +
      "</a>" +
      '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-links" aria-label="Toggle menu">' +
      ICONS.menu + ICONS.close +
      "</button>" +
      '<ul class="nav-links" id="nav-links">' + links + "</ul>" +
      "</nav>";

    var toggle = host.querySelector(".nav-toggle");
    var list = host.querySelector(".nav-links");

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      list.classList.toggle("open", open);
    }
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    list.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });

    function onScroll() {
      host.classList.toggle("scrolled", window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Footer ---------- */
  function renderFooter() {
    var host = document.getElementById("site-footer");
    if (!host) return;

    var navLinks = NAV.map(function (item) {
      return '<li><a href="' + item.href + '">' + item.label + "</a></li>";
    }).join("");

    host.classList.add("site-footer");
    host.innerHTML =
      '<div class="footer-grid">' +
      '<div class="footer-brand">' +
      '<a class="brand" href="index.html"><span class="brand-mark" aria-hidden="true">&gt;_</span>' + SITE.name + "</a>" +
      "<p>Junior DevOps Engineer from Pakistan, based in the Netherlands. I automate builds, deployments and cloud infrastructure.</p>" +
      "</div>" +
      '<div class="footer-col"><h4>Pages</h4><ul>' + navLinks + "</ul></div>" +
      '<div class="footer-col"><h4>Elsewhere</h4><ul>' +
      '<li><a href="' + SITE.github + '" target="_blank" rel="noopener">GitHub</a></li>' +
      '<li><a href="' + SITE.linkedin + '" target="_blank" rel="noopener">LinkedIn</a></li>' +
      '<li><a href="mailto:' + SITE.email + '">Email</a></li>' +
      "</ul></div>" +
      "</div>" +
      '<div class="footer-bottom">' +
      "<span>&copy; " + new Date().getFullYear() + " " + SITE.name + "</span>" +
      '<span class="mono">Built and deployed with CI/CD on AWS</span>' +
      "</div>";
  }

  /* ---------- Icons in page content: <span data-icon="github"> ---------- */
  function fillIcons() {
    document.querySelectorAll("[data-icon]").forEach(function (el) {
      var svg = ICONS[el.getAttribute("data-icon")];
      if (svg) el.innerHTML = svg;
    });
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    document.querySelectorAll("[data-stagger]").forEach(function (group) {
      Array.prototype.forEach.call(group.children, function (child, i) {
        child.classList.add("reveal");
        child.style.setProperty("--d", i);
      });
    });

    var items = document.querySelectorAll(".reveal, .step");
    if (!items.length) return;

    if (!("IntersectionObserver" in window) || reducedMotion) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Terminal typing ---------- */
  function initTerminals() {
    document.querySelectorAll(".terminal[data-typing]").forEach(function (term) {
      var lines = Array.prototype.slice.call(term.querySelectorAll(".t-line"));

      if (reducedMotion) {
        lines.forEach(function (l) { l.classList.add("shown"); });
        return;
      }

      var queue = lines.map(function (line) {
        var target = line.querySelector(".t-text");
        var full = target ? target.textContent : "";
        if (target) target.textContent = "";
        return { line: line, target: target, full: full };
      });

      function next(i) {
        if (i >= queue.length) return;
        var item = queue[i];
        item.line.classList.add("shown");

        if (item.target && item.full) {
          var n = 0;
          (function type() {
            n += 1;
            item.target.textContent = item.full.slice(0, n);
            if (n < item.full.length) {
              setTimeout(type, 34);
            } else {
              setTimeout(function () { next(i + 1); }, 380);
            }
          })();
        } else {
          setTimeout(function () { next(i + 1); }, 320);
        }
      }
      setTimeout(function () { next(0); }, 700);
    });
  }

  /* ---------- Profile photo fallback ---------- */
  function initPhotoFallback() {
    document.querySelectorAll("img[data-fallback]").forEach(function (img) {
      function swap() {
        var box = document.createElement("div");
        box.className = "photo-fallback";
        box.setAttribute("role", "img");
        box.setAttribute("aria-label", img.getAttribute("alt") || "Profile photo");
        var initials = document.createElement("span");
        initials.className = "text-grad";
        initials.textContent = img.getAttribute("data-fallback");
        box.appendChild(initials);
        img.replaceWith(box);
      }
      if (img.complete && img.naturalWidth === 0) swap();
      else img.addEventListener("error", swap, { once: true });
    });
  }

  /* ---------- Contact form (mailto) ---------- */
  function initContactForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;
    var status = document.getElementById("form-status");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.elements.name.value.trim();
      var email = form.elements.email.value.trim();
      var subject = form.elements.subject.value.trim() || "Message from " + name + " via your portfolio";
      var message = form.elements.message.value.trim();

      var body = message + "\n\n--\n" + name + "\n" + email;
      var href =
        "mailto:" + SITE.email +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      status.textContent = "Opening your email app. If nothing opens, copy my address below and write to me directly.";
      window.location.href = href;
    });

    var copyBtn = document.getElementById("copy-email");
    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        function done() {
          var old = copyBtn.textContent;
          copyBtn.textContent = "Copied";
          setTimeout(function () { copyBtn.textContent = old; }, 2000);
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(SITE.email).then(done, function () {
            window.prompt("Copy my email address:", SITE.email);
          });
        } else {
          window.prompt("Copy my email address:", SITE.email);
        }
      });
    }
  }

  /* ---------- Boot ---------- */
  renderHeader();
  renderFooter();
  fillIcons();
  initPhotoFallback();
  initReveal();
  initTerminals();
  initContactForm();
})();
