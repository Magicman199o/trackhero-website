// Shared behaviour for the Product and Security pages.

// The ruler needle follows scroll position.
const needle = document.querySelector(".ruler i");
if (needle) {
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    needle.style.top = `${(scrollY / Math.max(1, max)) * (innerHeight - 10)}px`;
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

// Reveal sections as they come into view.
const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))), { threshold: 0.12 });
document.querySelectorAll(".rise").forEach((el) => io.observe(el));

// Oscilloscope: a smooth signal scrolling left, with occasional error spikes. Demo data only.
const cv = document.getElementById("scope");
if (cv) {
  const ctx = cv.getContext("2d");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const N = 160, pts = [], errs = [];
  let W = 0, H = 0, t = 0, last = 0;
  const sig = (x) => 0.55 + 0.16 * Math.sin(x / 11) + 0.08 * Math.sin(x / 3.7) + 0.05 * Math.sin(x / 1.9 + 1);
  for (let i = 0; i < N; i++) { pts.push(sig(i)); errs.push(0); }
  const size = () => { const r = cv.getBoundingClientRect(); W = cv.width = r.width * devicePixelRatio; H = cv.height = r.height * devicePixelRatio; draw(); };
  function draw() {
    if (!W) return;
    ctx.clearRect(0, 0, W, H);
    const step = W / (N - 1);
    ctx.beginPath(); ctx.moveTo(0, H);
    pts.forEach((p, i) => ctx.lineTo(i * step, H - p * H * 0.8));
    ctx.lineTo(W, H); ctx.closePath(); ctx.fillStyle = "rgba(139,120,255,0.12)"; ctx.fill();
    ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(i * step, H - p * H * 0.8) : ctx.moveTo(0, H - p * H * 0.8)));
    ctx.strokeStyle = "#8b78ff"; ctx.lineWidth = 2 * devicePixelRatio; ctx.stroke();
    errs.forEach((e, i) => { if (e > 0) { ctx.fillStyle = "#ff8a73"; ctx.fillRect(i * step - devicePixelRatio, H - e * H * 0.5, 2 * devicePixelRatio, e * H * 0.5); } });
    ctx.beginPath(); ctx.arc(W - 4 * devicePixelRatio, H - pts[N - 1] * H * 0.8, 5 * devicePixelRatio, 0, Math.PI * 2); ctx.fillStyle = "#c6f24e"; ctx.fill();
  }
  function tick(now) {
    if (now - last > 90) {
      last = now; t++;
      pts.shift(); pts.push(sig(N + t) + (Math.random() - 0.5) * 0.04);
      errs.shift(); errs.push(Math.random() < 0.025 ? 0.2 + Math.random() * 0.4 : 0);
      draw();
    }
    requestAnimationFrame(tick);
  }
  size(); addEventListener("resize", size);
  if (!reduce) requestAnimationFrame(tick);
}
