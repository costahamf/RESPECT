export const initBurger = () => {
  const burgerButton = document.getElementById("burgerButton");
  const menu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("menuOverlay");

  const close = () => {
    menu.classList.remove("open");
    overlay.classList.remove("open");
    burgerButton.setAttribute("aria-expanded", "false");
  };

  const toggle = () => {
    menu.classList.toggle("open");
    overlay.classList.toggle("open");
    const expanded = menu.classList.contains("open");
    burgerButton.setAttribute("aria-expanded", String(expanded));
  };

  burgerButton.addEventListener("click", toggle);
  overlay.addEventListener("click", close);

  menu.addEventListener("click", (event) => {
    if (event.target.matches("a") || event.target.closest("[data-open-sticker]")) {
      close();
    }
  });
};
