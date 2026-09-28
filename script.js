// beelito's portfolio — tiny playful interactions. no libraries.

// Ghost pupil follows the cursor (only the dot eye; the "u" eye stays chill)
(function () {
  var pupils = document.querySelectorAll(".pupil");
  if (!pupils.length) return;
  var maxShift = 5;
  document.addEventListener("mousemove", function (e) {
    pupils.forEach(function (pupil) {
      var svg = pupil.closest("svg");
      if (!svg) return;
      var r = svg.getBoundingClientRect();
      var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      var dx = e.clientX - cx, dy = e.clientY - cy;
      var dist = Math.hypot(dx, dy) || 1;
      var shift = Math.min(maxShift, dist / 40);
      pupil.setAttribute("transform", "translate(" + (dx / dist * shift).toFixed(2) + "," + (dy / dist * shift).toFixed(2) + ")");
    });
  }, { passive: true });
})();

// Boop the hero ghost: click makes it do a happy spin
(function () {
  var ghost = document.getElementById("heroGhost");
  if (!ghost) return;
  ghost.addEventListener("click", function () {
    ghost.animate(
      [
        { transform: "scale(1) rotate(0deg)" },
        { transform: "scale(1.15) rotate(-8deg)" },
        { transform: "scale(0.95) rotate(8deg)" },
        { transform: "scale(1.08) rotate(-4deg)" },
        { transform: "scale(1) rotate(0deg)" }
      ],
      { duration: 600, easing: "ease-out" }
    );
  });
})();

// Gentle reveal on scroll for cards
(function () {
  var cards = document.querySelectorAll(".card, .fun-facts li");
  if (!("IntersectionObserver" in window) || !cards.length) return;
  cards.forEach(function (el) {
    el.style.opacity = "0";
    el.style.transform += " translateY(24px)";
  });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.style.transition = "opacity .5s ease, transform .5s cubic-bezier(.34,1.56,.64,1)";
        e.target.style.opacity = "1";
        e.target.style.transform = e.target.style.transform.replace(" translateY(24px)", "");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  cards.forEach(function (el) { io.observe(el); });
})();
