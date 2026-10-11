(function () {
  "use strict";

  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("site-nav");
  var year = document.getElementById("y");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  if (toggle && nav) {
    var links = nav.querySelectorAll("a[href^='#']");

    function setOpen(open) {
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    }

    toggle.addEventListener("click", function () {
      setOpen(!document.body.classList.contains("nav-open"));
    });

    links.forEach(function (a) {
      a.addEventListener("click", function () {
        setOpen(false);
      });
    });
  }

  var hasViewTL =
    typeof CSS !== "undefined" &&
    typeof CSS.supports === "function" &&
    CSS.supports("animation-timeline: view()");

  if (!hasViewTL) {
    var reveals = document.querySelectorAll(".reveal");
    if (reveals.length && "IntersectionObserver" in window) {
      var obs = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              e.target.classList.add("is-inview");
            }
          });
        },
        { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
      reveals.forEach(function (el) {
        obs.observe(el);
      });
    } else {
      reveals.forEach(function (el) {
        el.classList.add("is-inview");
      });
    }
  }
})();
