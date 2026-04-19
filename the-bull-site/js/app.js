import { restaurants } from "./cities.js";
import { renderCities, renderRestaurants } from "./render.js";
import { initMap } from "./map.js";
import { initStickerModal } from "./modal.js";
import { initBurger } from "./burger.js";
import { initLazyLoad } from "./lazy-load.js";
import { initBackToTop, initScrollSpy } from "./scroll-spy.js";

const cityListElement = document.getElementById("cityList");
const restaurantsGridElement = document.getElementById("restaurantsGrid");
const restaurantsTitleElement = document.getElementById("restaurantsTitle");
const showMoreButton = document.getElementById("showMoreButton");

let activeCity = localStorage.getItem("selectedCity") || "Москва";
if (!restaurants[activeCity]) activeCity = "Москва";

let showAllMoscow = false;
let mapController = null;

const rerender = () => {
  renderCities({ cityListElement, activeCity });
  renderRestaurants({
    gridElement: restaurantsGridElement,
    titleElement: restaurantsTitleElement,
    showMoreButton,
    city: activeCity,
    showAllMoscow
  });
  initLazyLoad();
};

const selectCity = (city) => {
  activeCity = city;
  showAllMoscow = city !== "Москва";
  localStorage.setItem("selectedCity", city);
  rerender();
  if (mapController) mapController.setCity(city);
};

const setupCityEvents = () => {
  cityListElement.addEventListener("click", (event) => {
    const button = event.target.closest(".city-btn");
    if (!button) return;
    selectCity(button.dataset.city);
  });

  showMoreButton.addEventListener("click", () => {
    showAllMoscow = true;
    rerender();
  });
};

const init = async () => {
  rerender();
  setupCityEvents();

  initBurger();
  initStickerModal();
  initScrollSpy();
  initBackToTop();

  mapController = await initMap(activeCity);
};

init();
