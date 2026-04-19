import { restaurants } from "./cities.js";

const sanitizePhoneForTel = (phone) => phone.replace(/[^\d+]/g, "");

const yandexRoute = (city, address) =>
  `https://yandex.ru/maps/?rtext=~${encodeURIComponent(`${city}, ${address}`)}`;

const yandexSearch = (city, address) =>
  `https://yandex.ru/maps/?text=${encodeURIComponent(`${city}, ${address}`)}`;

const buildPlaceholderSrc = (label) => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'><rect width='100%' height='100%' fill='#e6e6e6'/><text x='50%' y='50%' text-anchor='middle' dominant-baseline='middle' font-family='Arial' font-size='22' fill='#666'>${label}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const createRestaurantCard = (restaurant, index) => {
  const article = document.createElement("article");
  article.className = "restaurant-card";

  article.innerHTML = `
    <img
      class="restaurant-image lazy"
      data-src="${buildPlaceholderSrc(`${restaurant.city} ${index + 1}`)}"
      src="${buildPlaceholderSrc("loading...")}" 
      loading="lazy"
      alt="Ресторан ${restaurant.city} ${index + 1}"
      width="600"
      height="400"
    />
    <div class="restaurant-body">
      <p class="restaurant-index">#${index + 1}</p>
      <p class="restaurant-address">
        <a href="${yandexSearch(restaurant.city, restaurant.address)}" target="_blank" rel="noopener">${restaurant.address}</a>
      </p>
      <p class="restaurant-meta">🕒 ${restaurant.hours}</p>
      <p class="restaurant-meta">📞 <a href="tel:${sanitizePhoneForTel(restaurant.phone)}">${restaurant.phone}</a></p>
      <p class="restaurant-meta">📍 ${restaurant.city}</p>
      <a class="btn btn-red" href="${yandexRoute(restaurant.city, restaurant.address)}" target="_blank" rel="noopener">Построить маршрут</a>
    </div>
  `;

  return article;
};

export const renderCities = ({ cityListElement, activeCity }) => {
  cityListElement.innerHTML = "";
  Object.keys(restaurants).forEach((city) => {
    const button = document.createElement("button");
    button.className = `city-btn ${city === activeCity ? "active" : ""}`;
    button.type = "button";
    button.dataset.city = city;
    button.textContent = `${city} →`;
    cityListElement.append(button);
  });
};

export const renderRestaurants = ({ gridElement, titleElement, showMoreButton, city, showAllMoscow }) => {
  const source = restaurants[city] ?? [];
  const visible = city === "Москва" && !showAllMoscow ? source.slice(0, 6) : source;

  titleElement.textContent = `Рестораны: ${city}`;
  gridElement.innerHTML = "";
  visible.forEach((restaurant, index) => {
    gridElement.append(createRestaurantCard(restaurant, index));
  });

  if (city === "Москва" && source.length > 6 && !showAllMoscow) {
    showMoreButton.hidden = false;
    showMoreButton.textContent = "Показать все 23 ресторана";
  } else {
    showMoreButton.hidden = true;
  }
};
