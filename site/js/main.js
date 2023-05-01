//Imports from other modules
import { initMap } from "./map.js";
import { readCSV, readNHoodCSV, readExclusion } from "./inventory.js";
import { addMarker, createPopup } from "./popup.js";
import { showToast, initToast } from "./toast.js"

let app = {
    currentAddress: null,
    currentSpread: 1,
  };

let map = initMap();
let markers = L.layerGroup().addTo(map);
let key = [];
let currentAddressData = [];
let exclusion = [];
const colorSpread = ["#F1C82B", "#E19825", "#D55816", "#7B230B", "#401307"]

//Load Data
function onInventoryLoadSuccess(data) {
    key = data;
}

readCSV(onInventoryLoadSuccess);

//Load Exclusion Data
function onExclusionLoadSuccess(data) {
    exclusion = data;
}

readExclusion(onExclusionLoadSuccess);

let addressInput = document.querySelector('#addressInput');
let searchBtn = document.querySelector('#addressLoadButton');
let spreadRange = document.querySelector('#spreadRange')
let spreadLabel = document.querySelector('#spreadLabel')

app.currentSpread = spreadRange.value;

const spreadText = ["Limited to object of origin", "Limited to room of origin", "Limited to floor of origin", "Limited to building of origin", "Spread beyond the building"];

function updateSpreadLabel(){
    app.currentSpread = spreadRange.value;
    spreadLabel.innerHTML = `Spread Level: ${app.currentSpread} <span style="background-color: ${colorSpread[app.currentSpread-1]}"> </span><br>${spreadText[app.currentSpread-1]}`;
}

updateSpreadLabel();

function getSingleAddress(data){
    const text = addressInput.value;
    const excludeCheck = exclusion.filter(addr => {
        return addr.address.toUpperCase().includes(text.toUpperCase());
    })
    if (excludeCheck.length > 0) {
        showToast("Sorry, address was excluded from our predictions.");
    } else {
        let singleAddress = data.filter(location => {
            return location.address.toUpperCase().includes(text.toUpperCase());
        })
        flyToAddress(singleAddress[0]);
    } 
}

async function getAddressData() {
    // search through the data for the input of addressInput,
    // return that array's data
    const text = addressInput.value;
    const excludeCheck = exclusion.filter(addr => {
        return addr.address.toUpperCase().includes(text.toUpperCase());
    });
    let nhoodKey = key.filter(addr => {
        return addr.address.toUpperCase().includes(text.toUpperCase());
    })
    //Check for length, if greater than 0, return a warning that says "please refine your search"
    //If length is 0, then say "No Address Found"
    if (nhoodKey.length == 1) {
        //Get address's neighborhood from key csv
        //load csv by that address
        currentAddressData = readNHoodCSV(nhoodKey[0].neighborhood, getSingleAddress);
        //filter to just that address
    } else if (nhoodKey.length > 1) {
        showToast("Please refine your search.");
    } else if (nhoodKey.length == 0) {
        if (excludeCheck.length > 0) {
            showToast("This address was excluded from our predictions due to its building type, or it's vacant land.");
        } else {
            showToast("No address found.");
        }
    } ;
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

spreadRange.addEventListener("input", updateSpreadLabel)
searchBtn.addEventListener("click", getAddressData);

addressInput.addEventListener('keypress', function(event) {
  // Check if the 'Enter' key was pressed
  if (event.keyCode === 13) {
    // Call your function here
    getAddressData();
  }
});

initToast();

window.markers = markers;
window.key = key;
window.addressInput = addressInput;
window.app = app;
window.map = map;
window.exclusion = exclusion;
