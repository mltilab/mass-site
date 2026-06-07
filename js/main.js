/* MASS site — theme toggle, mobile nav, reveal-on-scroll, contact form stub */

(function () {
  "use strict";

  /* ----- theme toggle (initial theme is set inline in <head> to avoid FOUC) ----- */
  var toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var root = document.documentElement;
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("mass-theme", next);
      } catch (e) {
        /* storage unavailable — theme just won't persist */
      }
    });
  }

  /* ----- mobile nav ----- */
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav__links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navLinks.addEventListener("click", function (e) {
      if (e.target.tagName === "A") navLinks.classList.remove("is-open");
    });
  }

  /* ----- reveal on scroll ----- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ----- contact form (prototype: no backend yet) ----- */
  var form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector(".form__status");
      if (status) {
        status.textContent =
          "Thanks — this prototype isn't wired to a backend yet, but your interest is noted!";
      }
      form.reset();
    });
  }

  /* ----- footer year ----- */
  var year = document.querySelector("#year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
