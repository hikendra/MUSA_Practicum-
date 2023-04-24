
//Percentiles for each Outcome
const vacant = {
    lowLine: 0.05,
    highLine: 0.11
}
const permit = {
    lowLine: 0.21,
    highLine: 0.35
}
const transfer = {
    lowLine: 0.21,
    highLine: 0.35
}

//Labels for each quantile in the above objects
let low = "low";
let mid = "mid";
let high = "high";

function zoomOut() {
    markers.clearLayers();
    map.flyTo([39.95, -75.2], 11);
}

function addMarker(lnglat, markerLayer){
    // Add marker to map at search location
    new L.marker(lnglat).addTo(markerLayer);
}

function getPrediction(info, outcome){
    //get type of variable from info
    let column = `spread${document.getElementById("spread-select").value}_${outcome}`
    let prediction = info[column];
    return prediction;
}

function labelPrediction(info, outcome) {
    let label = "";

    if (outcome == "vacant") {
        if (getPrediction(info, "vacant") < vacant.lowLine) {
            label = low
        } else if (getPrediction(info, "vacant") >= vacant.lowLine && getPrediction(info, "vacant") <= vacant.highLine) {
            label = mid
        } else {
            label = high
        }
    } else if(outcome == "transfer"){
        if (getPrediction(info, "transfer") < transfer.lowLine) {
            label = low
        } else if (getPrediction(info, "transfer") >= transfer.lowLine && getPrediction(info, "transfer") <= transfer.highLine) {
            label = mid
        } else {
            label = high
        }
    } else if (outcome == "permit") {
        if (getPrediction(info, "permit") < permit.lowLine) {
            label = low
        } else if (getPrediction(info, "permit") >= permit.lowLine && getPrediction(info, "permit") <= permit.highLine) {
            label = mid
        } else {
            label = high
        }
    };
    return label
}    

function createPopup(info, lnglat, markerLayer){
    let spread = document.getElementById("spread-select").value;

    L.popup(lnglat, {
        content: `<h3>${info.address}</h3><br>
                    <h4>in ${info.neighborhood}</h4>
                    <p>If a fire of severity level ${spread} happens here, <br>then within two years, the property has a:</p>
                    <p class="category"> 
                    <span class="pred-label ${labelPrediction(info, "permit")}-p"">${labelPrediction(info, "permit")}</span>
                    chance of major repairs</p>
                    <p class="pred-num">${getPrediction(info, "permit") * 100} %</p>
                    <p class="category">
                    <span class="pred-label ${labelPrediction(info, "transfer")}-t">${labelPrediction(info, "transfer")}</span>
                    chance of being sold</p>
                    <p class="pred-num">${getPrediction(info, "transfer") * 100} %</p>
                    <p class="category">
                    <span class="pred-label ${labelPrediction(info, "vacant")}-v">${labelPrediction(info, "vacant")}</span>
                    chance of being left vacant.</p>
                    <p class="pred-num">${getPrediction(info, "vacant") * 100} %</p>
                    <button type="button" id="popupClose" class="popup-close control-button">Close & Zoom Out</button>`,
        offset: L.point(0, -50),
        className: 'tooltip',
        closeButton: false})
        .addTo(markerLayer);
      
    const closeBtn = document.getElementById("popupClose");
    closeBtn.addEventListener("click", zoomOut);
    
}

export {
    addMarker,
    createPopup
}