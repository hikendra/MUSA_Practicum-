//Imports from other modules
import { initMap } from "./map.js";
import { readCSV, readNHoodCSV } from "./inventory.js";
import { addMarker, createPopup } from "./popup.js";

let app = {
    currentAddress: null,
    currentSpread: 1,
  };

let map = initMap();
let markers = L.layerGroup().addTo(map);
let key = [];
let currentAddressData = [];

//Load Data
function onInventoryLoadSuccess(data) {
    key = data;
    console.log(key);
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

function getSingleAddress(data){
    const text = addressInput.value;
    console.log(data);
    let singleAddress = data.filter(location => {
        return location.address.toUpperCase().includes(text.toUpperCase());
    })
    console.log(singleAddress);
    flyToAddress(singleAddress[0]);
}

async function getAddressData() {
    // search through the data for the input of addressInput,
    // return that array's data
    const text = addressInput.value;
    let nhoodKey = key.filter(addr => {
        return addr.address.toUpperCase().includes(text.toUpperCase());
    })
    console.log(nhoodKey);
    //Check for length, if greater than 0, return a warning that says "please refine your search"
    //If length is 0, then say "No Address Found"
    if (nhoodKey.length == 1) {
        //Get address's neighborhood from key csv
        //load csv by that address
        currentAddressData = readNHoodCSV(nhoodKey[0].neighborhood, getSingleAddress);
        //filter to just that address
    } 
}

function flyToWithOffset(map, latlng, zoom) {
    const height = map.getSize().y;
    let offset = map.project(latlng).subtract([0, height/2 - 300])
    console.log (map.getZoom())
    if (map.getZoom() < 12) {
        offset = map.project(latlng).subtract([0, 2]);
    }   
    map.flyTo(map.unproject(offset), zoom);
}

function flyToAddress(location) {
    //function that takes in search input and flies to address
    //creates marker and a tooltip at that location after clearing others
    let lnglat = [location.lon, location.lat]
    markers.clearLayers()
    addMarker(lnglat, markers)
    createPopup(location, lnglat, markers)
    flyToWithOffset(map, lnglat, 18)
}

spreadInput.addEventListener("input", updateSpread)
searchBtn.addEventListener("click", getAddressData);

window.markers = markers;
window.key = key;
window.addressInput = addressInput;
window.app = app;
window.map = map;
