// Инициализация карты
var map = L.map('map').setView([51.505, -0.09], 13);

// Добавление тайлов OpenStreetMap
var streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19
}).addTo(map);

// Добавление маркеров
var marker1 = L.marker([51.5, -0.09]).addTo(map);
marker1.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

var marker2 = L.marker([51.515, -0.1]).addTo(map);
marker2.bindPopup("<b>Another place!</b><br>This is a second popup.");

// Добавление пользовательской иконки для маркера
var customIcon = L.icon({
  iconUrl: 'path_to_icon.png',  // Замените на путь к вашей иконке
  iconSize: [38, 38],  // Размер иконки
  iconAnchor: [22, 38],  // Точка привязки маркера к координатам
});
var marker3 = L.marker([51.525, -0.12], { icon: customIcon }).addTo(map);
marker3.bindPopup("<b>Custom Icon!</b><br>This is a custom icon marker.");

// Добавление управления слоями
var satellite = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png');
var baseMaps = {
  "Streets": streets,
  "Satellite": satellite
};
L.control.layers(baseMaps).addTo(map);

// Функция для геокодирования и поиска мест
function geocodeLocation(location) {
  var geocodingAPI = 'https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(location);
  
  fetch(geocodingAPI)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        var lat = data[0].lat;
        var lon = data[0].lon;
        map.setView([lat, lon], 13);  // Центрируем карту на найденном месте
        L.marker([lat, lon]).addTo(map)
          .bindPopup("<b>" + location + "</b>")
          .openPopup();
      } else {
        alert("Location not found.");
      }
    })
    .catch(error => {
      console.error("Error fetching location:", error);
    });
}

// Обработчик события для формы
document.getElementById('searchForm').addEventListener('submit', function(e) {
  e.preventDefault();  // Предотвращаем перезагрузку страницы
  var location = document.getElementById('locationInput').value;
  geocodeLocation(location);
});

// Обработка события клика на карте
map.on('click', function(e) {
  var clickedLocation = e.latlng;
  L.marker(clickedLocation).addTo(map)
    .bindPopup("You clicked here: " + clickedLocation)
    .openPopup();
});
