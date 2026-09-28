// beelito's portfolio — tiny playful interactions. no libraries.

// Boop the ghost: click makes it do a happy spin
(function () {
  var orb = document.getElementById("heroOrb");
  if (!orb) return;
  orb.addEventListener("click", function () {
    orb.animate(
      [
        { transform: "scale(1) rotate(0deg)" },
        { transform: "scale(1.12) rotate(-8deg)" },
        { transform: "scale(0.96) rotate(8deg)" },
        { transform: "scale(1.06) rotate(-4deg)" },
        { transform: "scale(1) rotate(0deg)" }
      ],
      { duration: 650, easing: "ease-out" }
    );
  });
})();

// Gentle reveal on scroll (uses `translate` property so it never fights hover transforms)
(function () {
  var els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || !els.length) {
    els.forEach(function (el) { el.classList.add("in"); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  els.forEach(function (el) { io.observe(el); });
})();

// Subtle parallax: the hero orb leans toward the cursor, like it's floating in liquid
(function () {
  var orb = document.getElementById("heroOrb");
  if (!orb || !window.matchMedia("(pointer: fine)").matches) return;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;
  var raf = null, tx = 0, ty = 0, cx = 0, cy = 0;
  document.addEventListener("mousemove", function (e) {
    tx = (e.clientX / window.innerWidth - 0.5) * 14;
    ty = (e.clientY / window.innerHeight - 0.5) * 10;
    if (!raf) raf = requestAnimationFrame(tick);
  }, { passive: true });
  function tick() {
    cx += (tx - cx) * 0.08;
    cy += (ty - cy) * 0.08;
    orb.style.translate = cx.toFixed(2) + "px " + cy.toFixed(2) + "px";
    if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) {
      raf = requestAnimationFrame(tick);
    } else { raf = null; }
  }
})();
