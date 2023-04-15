//Imports from other modules
import { initMap } from "./map.js";
import { readCSV } from "./inventory.js";

let app = {
    currentAddress: null,
    currentSpread: null,
  };

let map = initMap();
let predictions = [];

let markers = L.layerGroup().addTo(map);

//Load Data
function onInventoryLoadSuccess(data) {
    predictions = data;
    console.log(data);
}

readCSV(onInventoryLoadSuccess);

let addressInput = document.querySelector('#addressInput');
let searchBtn = document.querySelector('#addressLoadButton')

function getAddressData() {
    // search through the data for the input of addressInput,
    // return that array's data
    const text = addressInput.value;
    let filteredPredictions = predictions.filter(addr => {
        return addr.address.toUpperCase().includes(text.toUpperCase());
    })
    console.log(filteredPredictions)
    return filteredPredictions[0];
}

function addMarker(lnglat){
    // Add marker to map at search location
    let marker = new L.marker(lnglat).addTo(markers);
}

function flyToAddress() {
    let location = getAddressData()
    console.log(location);
    let lnglat = [location.lon, location.lat]
    markers.clearLayers()
    addMarker(lnglat)
    map.flyTo(lnglat, 18)
}

searchBtn.addEventListener("click", flyToAddress);

window.app = app;
window.map = map;