// Moon / sun button: switches between light and dark and remembers the choice in this browser.
// The first visit follows the device setting (applied before paint by the inline script in <head>).
document.querySelectorAll(".theme-btn").forEach((btn) => {
  const sync = () => {
    const dark = document.documentElement.dataset.theme === "dark";
    btn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    btn.title = dark ? "Light mode" : "Dark mode";
  };
  sync();
  btn.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("th_site_theme", next); } catch {}
    document.dispatchEvent(new CustomEvent("themechange"));
    sync();
  });
});
