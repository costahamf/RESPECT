import { restaurantsData } from "./data.js";
import { initMap } from "./map.js";
import { initModal } from "./modal.js";

const restaurantsEl = document.getElementById("restaurants");
const cityButtons = document.querySelectorAll(".city-btn");

let activeCity = "Москва";
let mapController;

const toTel = (phone) => phone.replace(/[^\d+]/g, "");

const routeLink = (city, address) =>
  `https://yandex.ru/maps/?rtext=~${encodeURIComponent(`${city}, ${address}`)}`;

const renderRestaurants = () => {
  restaurantsEl.innerHTML = "";

  restaurantsData[activeCity].forEach((restaurant, index) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <p class="card-index">#${index + 1}</p>
      <p class="card-address">${restaurant.address}</p>
      <p class="card-meta">Часы: ${restaurant.hours}</p>
      <p class="card-meta">Телефон: <a href="tel:${toTel(restaurant.phone)}">${restaurant.phone}</a></p>
      <a class="btn btn-accent" target="_blank" rel="noopener" href="${routeLink(activeCity, restaurant.address)}">Построить маршрут</a>
    `;
    restaurantsEl.append(card);
  });
};

const setupCitySwitch = () => {
  cityButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const city = button.dataset.city;
      if (!restaurantsData[city]) return;

      activeCity = city;
      cityButtons.forEach((b) => b.classList.toggle("active", b === button));
      renderRestaurants();
      if (mapController) mapController.setCity(city);
    });
  });
};

const init = async () => {
  renderRestaurants();
  setupCitySwitch();
  initModal();
  mapController = await initMap(activeCity);
};

init();
