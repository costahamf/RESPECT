export const initLazyLoad = () => {
  const lazyElements = document.querySelectorAll("img.lazy, .fade-in");

  if (!("IntersectionObserver" in window)) {
    lazyElements.forEach((element) => {
      if (element.dataset.src) element.src = element.dataset.src;
      element.classList.add("visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const element = entry.target;
        if (element.dataset.src) {
          element.src = element.dataset.src;
          element.removeAttribute("data-src");
        }

        element.classList.add("visible");
        obs.unobserve(element);
      });
    },
    { rootMargin: "200px 0px", threshold: 0.1 }
  );

  lazyElements.forEach((element) => observer.observe(element));
};
