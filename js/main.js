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

  /* ----- hero showcase: rotate between product mocks ----- */
  var showcase = document.querySelector(".hero-showcase");
  if (showcase) {
    var mocks = showcase.querySelectorAll(".hero-mocks .mock");
    var tabs = showcase.querySelectorAll(".hero-tab");
    var order = ["map", "labeler", "atlas"];
    var current = 0;
    var ROTATE_MS = 6000;
    var timer = null;
    var reducedMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var show = function (key) {
      current = order.indexOf(key);
      mocks.forEach(function (m) {
        m.classList.toggle("is-active", m.getAttribute("data-mock") === key);
      });
      tabs.forEach(function (t) {
        var active = t.getAttribute("data-target") === key;
        t.classList.toggle("is-active", active);
        t.setAttribute("aria-selected", active ? "true" : "false");
      });
    };
    var startRotation = function () {
      if (reducedMotion || timer) return;
      timer = setInterval(function () {
        show(order[(current + 1) % order.length]);
      }, ROTATE_MS);
    };
    var stopRotation = function () {
      if (timer) clearInterval(timer);
      timer = null;
    };

    tabs.forEach(function (t) {
      t.addEventListener("click", function () {
        stopRotation();
        show(t.getAttribute("data-target"));
        startRotation();
      });
    });
    showcase.addEventListener("mouseenter", stopRotation);
    showcase.addEventListener("mouseleave", startRotation);
    startRotation();
  }

  /* ----- contact form (prototype: no backend yet) ----- */
  var form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector(".form__status");
      if (status) {
        status.textContent =
          "Thanks! This prototype isn't wired to a backend yet, but your interest is noted.";
      }
      form.reset();
    });
  }

  /* ----- footer year ----- */
  var year = document.querySelector("#year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
