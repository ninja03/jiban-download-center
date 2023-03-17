const tile = "https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png";
const attribution =
  '<a href="https://maps.gsi.go.jp/development/ichiran.html">国土地理院</a>';
const maxZoom = 18;
const opt = { attribution, maxZoom };

const latlon = [35.91172, 136.187928];
const zoom = 10;
const map = L.map("map").setView(latlon, zoom);
L.tileLayer(tile, opt).addTo(map);

const mapE = document.getElementById("map");
const borings = JSON.parse(mapE.dataset.borings);

for (const b of borings) {
  new L.Marker([b.lat, b.lng]).addTo(map);
}
