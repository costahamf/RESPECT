const PHONE_RE = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const initModal = () => {
  const modal = document.getElementById("modal");
  const close = document.getElementById("modalClose");
  const form = document.getElementById("stickerForm");
  const phone = document.getElementById("phone");

  const openModal = () => {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  };

  const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  };

  const setError = (key, text) => {
    const errorEl = form.querySelector(`[data-error="${key}"]`);
    const inputEl = form.elements[key] || (key === "agree" ? document.getElementById("agree") : null);
    if (!errorEl || !inputEl) return;
    errorEl.textContent = text;
    inputEl.classList.toggle("invalid", Boolean(text));
  };

  const validate = () => {
    const values = {
      name: form.name.value.trim(),
      phone: form.phone.value.trim(),
      email: form.email.value.trim(),
      city: form.city.value.trim(),
      agree: document.getElementById("agree").checked
    };

    setError("name", values.name ? "" : "Введите имя");
    setError("phone", PHONE_RE.test(values.phone) ? "" : "Неверный формат телефона");
    setError("email", EMAIL_RE.test(values.email) ? "" : "Неверный email");
    setError("city", values.city ? "" : "Выберите город");
    setError("agree", values.agree ? "" : "Требуется согласие");

    return values.name && PHONE_RE.test(values.phone) && EMAIL_RE.test(values.email) && values.city && values.agree;
  };

  phone.addEventListener("input", (event) => {
    const digits = event.target.value.replace(/\D/g, "").replace(/^7/, "").slice(0, 10);
    let value = "+7";
    if (digits.length > 0) value += ` (${digits.slice(0, 3)}`;
    if (digits.length >= 3) value += `) ${digits.slice(3, 6)}`;
    if (digits.length >= 6) value += `-${digits.slice(6, 8)}`;
    if (digits.length >= 8) value += `-${digits.slice(8, 10)}`;
    event.target.value = value;
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-open-modal]")) openModal();
  });

  close.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
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
