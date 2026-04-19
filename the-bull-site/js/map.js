import { cityCenters, restaurants } from "./cities.js";

let mapInstance;
let markerRefs = [];

const createMarkerElement = (restaurant) => {
  const marker = document.createElement("button");
  marker.type = "button";
  marker.style.width = "20px";
  marker.style.height = "20px";
  marker.style.borderRadius = "50%";
  marker.style.border = "2px solid #fff";
  marker.style.boxShadow = "0 0 0 2px #b22222";
  marker.style.background = "#b22222";
  marker.style.cursor = "pointer";
  marker.title = `${restaurant.address} • ${restaurant.phone}`;
  marker.addEventListener("click", () => {
    alert(`${restaurant.address}\n${restaurant.phone}`);
  });
  return marker;
};

const clearMarkers = () => {
  if (!mapInstance) return;
  markerRefs.forEach((marker) => mapInstance.removeChild(marker));
  markerRefs = [];
};

const addMarkers = (ymaps3, city) => {
  const { YMapMarker } = ymaps3;
  clearMarkers();

  (restaurants[city] || []).forEach((restaurant, index) => {
    const center = cityCenters[city];
    const offsetX = (index % 5) * 0.01;
    const offsetY = Math.floor(index / 5) * 0.006;

    const marker = new YMapMarker(
      {
        coordinates: [center[0] + offsetX, center[1] + offsetY],
        draggable: false
      },
      createMarkerElement(restaurant)
    );

    markerRefs.push(marker);
    mapInstance.addChild(marker);
  });
};

export const initMap = async (initialCity) => {
  const mapContainer = document.getElementById("map");
  const apiKey = window.YANDEX_MAPS_API_KEY || "";

  if (!apiKey) {
    mapContainer.innerHTML =
      '<div style="padding:16px">Укажите window.YANDEX_MAPS_API_KEY перед загрузкой js/app.js для работы карты.</div>';
    return null;
  }

  await new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://api-maps.yandex.ru/v3/?apikey=${apiKey}&lang=ru_RU`;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.append(script);
  }).catch(() => {
    mapContainer.innerHTML =
      '<div style="padding:16px">Не удалось загрузить Яндекс Карты. Проверьте ключ и сетевое подключение.</div>';
  });

  if (!window.ymaps3) return null;

  await window.ymaps3.ready;
  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } = window.ymaps3;

  mapInstance = new YMap(mapContainer, {
    location: {
      center: cityCenters[initialCity],
      zoom: 11
    }
  });

  mapInstance.addChild(new YMapDefaultSchemeLayer());
  mapInstance.addChild(new YMapDefaultFeaturesLayer());

  addMarkers(window.ymaps3, initialCity);

  return {
    setCity(city) {
      if (!mapInstance) return;
      mapInstance.setLocation({ center: cityCenters[city], zoom: 11, duration: 350 });
      addMarkers(window.ymaps3, city);
    }
  };
};
