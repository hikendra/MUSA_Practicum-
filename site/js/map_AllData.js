//sk.eyJ1Ijoia2VlbGJuIiwiYSI6ImNsZ2JzM3RnczF1MXgzbG41MGtvaHZmdWUifQ.x06_5V6rM6MuEKg13RIuBw

let app = {
    currentAddress: null,
    currentSpread: null,
  };


const zoomThreshold = 4;

var map = L.map('map').setView([39.95, -75.2], 15);

L.tileLayer('https://api.mapbox.com/styles/v1/keelbn/cl8c2nvmq003114li896sf85z/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia2VlbGJuIiwiYSI6ImNqaWVseGZjZzA3emMzdnAxM296OTFjNG8ifQ.W2j9Y2mz4t6vGRyKJk_Nyw', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

L.vectorGrid.protobuf("https://api.mapbox.com/v4/keelbn.test01/{z}/{x}/{y}.vector.pbf?access_token={token}", {
    vectorTileLayerStyles: {
        test01: {
            weight:0,
            fillColor: '#9bc2c4',
            fillOpacity: 1,
            fill: true,
            radius: 2
        }
    },
    token: "sk.eyJ1Ijoia2VlbGJuIiwiYSI6ImNsZ2JzM3RnczF1MXgzbG41MGtvaHZmdWUifQ.x06_5V6rM6MuEKg13RIuBw"
}).addTo(map);



// let voteList = document.querySelector('#voterList');

// const stateLegendEl = document.getElementById('state-legend');
// const countyLegendEl = document.getElementById('county-legend');
// map.on('zoom', () => {
//     if (map.getZoom() > zoomThreshold) {
//         stateLegendEl.style.display = 'none';
//         countyLegendEl.style.display = 'block';
//     } else {
//         stateLegendEl.style.display = 'block';
//         countyLegendEl.style.display = 'none';
//     }
// });