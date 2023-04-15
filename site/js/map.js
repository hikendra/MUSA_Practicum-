function initMap() {
    //Making base tile layer
    const map = L.map('map', {maxZoom:22}).setView([39.95, -75.15], 11);

    L.tileLayer('https://api.mapbox.com/styles/v1/keelbn/cl8c2nvmq003114li896sf85z/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia2VlbGJuIiwiYSI6ImNqaWVseGZjZzA3emMzdnAxM296OTFjNG8ifQ.W2j9Y2mz4t6vGRyKJk_Nyw', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        zoomControl: false
    }).addTo(map);

    //Setting the position of the zoom control to the bottom right
    L.control.zoom({
        position: 'bottomright'
    }).addTo(map);

    return map;
}


export {
    initMap,
}