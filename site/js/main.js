//Imports from other modules
import { initMap } from "./map.js";
import { readCSV } from "./inventory.js";
import { addMarker, createPopup } from "./popup.js";

let app = {
    currentAddress: null,
    currentSpread: null,
  };

let map = initMap();
let markers = L.layerGroup().addTo(map);

let predictions = [];

//Load Data
function onInventoryLoadSuccess(data) {
    predictions = data;
    console.log(data);
}

readCSV(onInventoryLoadSuccess);

let addressInput = document.querySelector('#addressInput');
let searchBtn = document.querySelector('#addressLoadButton');
let spreadInput = document.querySelector('#spread-select')

app.currentSpread = spreadInput.value;

//Update the fire spread value whenever the dropdown is changed
function updateSpread(){
    app.currentSpread = spreadInput.value;
    console.log(app.currentSpread);
}


function getAddressData() {
    // search through the data for the input of addressInput,
    // return that array's data
    const text = addressInput.value;
    let filteredPredictions = predictions.filter(addr => {
        return addr.address.toUpperCase().includes(text.toUpperCase());
    })
    return filteredPredictions[0];
}

function flyToAddress() {
    //function that takes in search input and flies to address
    //creates marker and a tooltip at that location after clearing others
    let location = getAddressData()
    let lnglat = [location.lon, location.lat]
    markers.clearLayers()
    addMarker(lnglat, markers)
    createPopup(location, lnglat, markers)
    map.flyTo(lnglat, 18)
}

spreadInput.addEventListener("input", updateSpread)

searchBtn.addEventListener("click", flyToAddress);

window.markers = markers;
window.predictions = predictions;
window.addressInput = addressInput;
window.app = app;
window.map = map;
