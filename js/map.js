import { cityCenters, restaurantsData } from "./data.js";

let map;
let markers = [];

const makeMarkerEl = (text) => {
  const el = document.createElement("div");
  el.style.width = "14px";
  el.style.height = "14px";
  el.style.borderRadius = "50%";
  el.style.background = "#c9a03d";
  el.style.border = "2px solid #0a0a0a";
  el.title = text;
  return el;
};

const clearMarkers = () => {
  if (!map) return;
  markers.forEach((marker) => map.removeChild(marker));
  markers = [];
};

const placeCityMarkers = (city) => {
  if (!window.ymaps3 || !map) return;
  const { YMapMarker } = window.ymaps3;
  clearMarkers();

  restaurantsData[city].forEach((restaurant, idx) => {
    const base = cityCenters[city];
    const marker = new YMapMarker(
      {
        coordinates: [base[0] + (idx % 5) * 0.01, base[1] + Math.floor(idx / 5) * 0.006]
      },
      makeMarkerEl(`${restaurant.address}, ${restaurant.phone}`)
    );

    markers.push(marker);
    map.addChild(marker);
  });
};

export const initMap = async (city) => {
  if (!window.ymaps3) {
    document.getElementById("map").innerHTML = "Не удалось загрузить Яндекс.Карты.";
    return null;
  }

  await window.ymaps3.ready;
  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } = window.ymaps3;

  map = new YMap(document.getElementById("map"), {
    location: { center: cityCenters[city], zoom: 11 }
  });

  map.addChild(new YMapDefaultSchemeLayer());
  map.addChild(new YMapDefaultFeaturesLayer());
  placeCityMarkers(city);

  return {
    setCity(nextCity) {
      map.setLocation({ center: cityCenters[nextCity], zoom: 11, duration: 240 });
      placeCityMarkers(nextCity);
    }
  };
};
