// Инициализация интерактивной карты
const map = L.map('map').setView([53.484098, 64.195314], 13);

// Слои карты
const streetLayer = L.tileLayer ('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

const satelliteLayer = L.tileLayer ('https://{s}.google.com/vt?x={x}&y={y}&z={z}&s=Ga', {
    maxZoom: 20,
    attribution: '© Google Maps'
});

// Добавление слоя по умолчанию
streetLayer.addTo(map);

// Переключение слоев
const baseLayers = {
    "Map": streetLayer,
    "Satellite": satelliteLayer
};

L.control.layers(baseLayers).addTo(map);

// Инициализация маршрутизатора
const control = L.Routing.control({
    waypoints: [
        L.latLng(53.484098, 64.195314), // Начальная точка
        L.latLng(53.4870, 64.2053) // Конечная точка (пример)
    ],
    routeWhileDragging: true
}).addTo(map);

// Создание пользовательских иконок
const startIcon = L.icon({
    iconUrl: 'path/to/start-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const endIcon = L.icon({
    iconUrl: 'path/to/end-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

let startMarker, endMarker;

let startPointSet = false;
let endPointSet = false;

// Обработка кликов по карте для установки начальной и конечной точки маршрута
map.on ('click', function(e){
    const latlng = e.latlng;

    if (!startPointSet)
    {
        // Установка начальной точки маршрута
        control.spliceWaypoints(0, 1, latlng); // Обновляем начальную точку
        startPointSet = true;
    }
    else if (!endPointSet)
    {
        // Установка конечной точки маршрута
        control.spliceWaypoints(control.getWaypoints().length - 1, 1, latlng); // Обновляем конечную точку
        endPointSet = true;
    }
    else
    {
        // Если обе точки установлены, сбрасываем начальную точку и устанавливаем новую
        control.spliceWaypoints(0, 1, latlng); // Обновляем начальную точку
        // Если хотите сбросить конечную точку, раскомментируйте следующую строку
        endPointSet = false;
    }
});
