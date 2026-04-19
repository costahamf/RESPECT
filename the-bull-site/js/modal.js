const PHONE_REGEX = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const initStickerModal = () => {
  const modalOverlay = document.getElementById("stickerModal");
  const closeButton = document.getElementById("modalCloseButton");
  const form = document.getElementById("stickerForm");
  const phoneInput = document.getElementById("phone");

  const openModal = () => {
    modalOverlay.classList.add("open");
    modalOverlay.setAttribute("aria-hidden", "false");
  };

  const closeModal = () => {
    modalOverlay.classList.remove("open");
    modalOverlay.setAttribute("aria-hidden", "true");
  };

  const setError = (fieldName, message) => {
    const input = form.elements[fieldName];
    const errorNode = form.querySelector(`[data-error-for="${fieldName}"]`);
    if (!input || !errorNode) return;

    input.classList.toggle("invalid", Boolean(message));
    errorNode.textContent = message || "";
  };

  const validate = () => {
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const email = form.email.value.trim();
    const city = form.city.value.trim();
    const agree = document.getElementById("agree").checked;

    setError("name", name ? "" : "Введите имя");
    setError("phone", PHONE_REGEX.test(phone) ? "" : "Введите телефон в формате +7 (___) ___-__-__");
    setError("email", EMAIL_REGEX.test(email) ? "" : "Введите корректный email");
    setError("city", city ? "" : "Выберите город");
    setError("agree", agree ? "" : "Необходимо согласие на обработку персональных данных");

    return Boolean(name && PHONE_REGEX.test(phone) && EMAIL_REGEX.test(email) && city && agree);
  };

  phoneInput.addEventListener("input", (event) => {
    const digits = event.target.value.replace(/\D/g, "").replace(/^7/, "").slice(0, 10);
    let formatted = "+7";

    if (digits.length > 0) formatted += ` (${digits.slice(0, 3)}`;
    if (digits.length >= 3) formatted += `) ${digits.slice(3, 6)}`;
    if (digits.length >= 6) formatted += `-${digits.slice(6, 8)}`;
    if (digits.length >= 8) formatted += `-${digits.slice(8, 10)}`;

    event.target.value = formatted;
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-open-sticker]")) openModal();
  });

  closeButton.addEventListener("click", closeModal);

  modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validate()) return;

    alert("Спасибо! Стикер будет отправлен на указанный адрес");
    form.reset();
    closeModal();
  });
};
