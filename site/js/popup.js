
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

//Interpretive descriptions for each combination of outcome
const descriptionArray = {
    //order is vacancy, sale, repair
    "low-low-low": "This property likely won't have reported outcomes from the fire, probably due to the low severity of the emergency.",
    "low-low-mid": "This property may be repaired by the owner with little intervention.",
    "low-low-high": "This property will likely be repaired by the owner and will recover with little intervention.",
    "low-mid-low": "This property has a slightly elevated risk of being sold because of the fire. If the fire was small enough, the property may be repaired without a permit.",
    "low-mid-mid": "This property may be repaired by the owner with little intervention. If the damage was significant and the owner lacks resources for repair, it may be sold and repaired instead.",
    "low-mid-high": "This property will likely recover quickly, but may be sold to an investor rather than be kept by the owner. This sale could happen before or after repairs depending on the fire severity and the owner's resources.",
    "low-high-low": "This property is more likely than others to be sold within two years, but will probably not report major repairs or vacancy.",
    "low-high-mid": "This property is more likely than others to be sold within two years, either repaired beforehand or after depending on the owner's resources.",
    "low-high-high": "This property will likely be sold and repaired by an investor to meet the evident demand of the area, or repaired and sold as a benefit to the owner.",
    "mid-low-low": "This property may sit vacant for a while after the fire, unless the owner has the resources to repair it. If the fire was severe, intervention may increase the likelihood of repairs and owners returning.",
    "mid-low-mid": "This property could either see recovery within two years or be left vacant for a longer term given no intervention. Moderate amounts of assistance could help this property recover quicker.",
    "mid-low-high": "This property may sit vacant for a while after the fire, but will likely be repaired by the owner with little intervention.",
    "mid-mid-low": "This property has a lower chance of being repaired, so it may sit vacant and be sold to an investor.",
    "mid-mid-mid": "This property could either be repaired by the owner or sold to an investor to repair. It may take a while though, and has some risk of staying vacant for a while.",
    "mid-mid-high": "This property will likely be repaired. It could take a while though, increaasing its risk of vacancy or sale to an investor.",
    "mid-high-low": "This property is more likely than others to be sold, and may sit vacant until this happens.",
    "mid-high-mid": "This property has a high likelihood of being sold to an investor for repairs, but the repairs may take a while to happen. As such, it could sit vacant while development slowly happens.",
    "mid-high-high": "This property is more likely than others to be sold, either before or after repairs depending on the owner's resources. It may sit vacant until this happens, especially if the owner intends to sell..",
    "high-low-low": "The high vacancy risk, combined with the low repair or sales likelihood, imply that this building is more likely than others to become a blighted property if there is no intervention. ",
    "high-low-mid": "This property is likely sit vacant until repairs given no intervention, but the owner may repair it eventually.",
    "high-low-high": "This property is likely sit vacant until repairs given no intervention, but the owner is likely to repair it eventually.",
    "high-mid-low": "The high vacancy risk implies that this building could stay vacant for a while if given no intervention. However, it may be sold within two years and repaired over the long term.",
    "high-mid-mid": "This property is more likely than others to be reported as vacant after a fire. It has a moderate chance of being repaired by the owner or an investor, but that process may take a while.",
    "high-mid-high": "This property is more likely than others to be reported as vacant after a fire, but will likely be repaired by the owner or an investor. The process may take a while, depending on the owner's resources.",
    "high-high-low": "The high vacancy risk implies that this building could stay vacant for a while if given no intervention. However, it is likely to be sold within two years and repaired over the long term.",
    "high-high-mid": "This property is more likely than others to be reported vacant and sold, and has a moderate chance of being repaired quicky by an investor or the owner. If this is due to the fire's high severity, then the nature of the damage and the owner's resoures will determine the speed of recovery",
    "high-high-high": "This property is more likely than others to be vacant, sold, and repaired within two years of a fire. If this is due to the fire's high severity, then the nature of the damage and the owner's resoures will determine the speed of recovery."
}

function zoomOut() {
    console.log("zooming out");
    markers.clearLayers();
    map.flyTo([39.95, -75.2], 11);
}

function addMarker(lnglat, markerLayer){
    // Add marker to map at search location
    new L.marker(lnglat).addTo(markerLayer);
}

function getPrediction(info, outcome){
    //get type of variable from info
    let column = `spread${document.getElementById("spreadRange").value}_${outcome}`
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

function getDescription(rep, sale, vac) {
    const propertyName = `${vac}-${sale}-${rep}`;
    const description = descriptionArray[propertyName];
    console.log(description);
    return description;
}

function createPopup(info, lnglat, markerLayer){
    let spread = document.getElementById("spreadRange").value;

    //predictions
    let vac = labelPrediction(info, "vacant");
    let rep = labelPrediction(info, "permit");
    let sale = labelPrediction(info, "transfer");

    L.popup(lnglat, {
        content: 
        `<div class="popup-content-container">
            <div class="popup-title-container">
                <h5>${info.address}</h5><br>
                <h6>in ${info.neighborhood}</h6>
                <p class="interpretiveDescr">2 Year Outcomes with Level ${spread} Fire:</p>
            </div>
            <div class="indicator-container">
                <div class="category"> 
                    <p class="note">REPAIRS</p>
                    <span class="pred-label">${rep}</span>
                </div>
                <div class="category">
                    <p class="note">SALE</p>
                    <span class="pred-label">${sale}</span>
                </div>
                <div class="category">
                    <p class="note">VACANCY</p>
                    <span class="pred-label">${vac}</span>
                </div>
            </div>
            <div>
                <p class="interpretiveDescr">${getDescription(rep, sale, vac)}</p>
                <hr>
                <p class="footer-note">Read our <a href="index.html#scrolly">Case Study</a> and <a href="index.html#recommendations">Recommendations</a> to learn more about these different outcomes and interventions.</p>
            </div>
            <button type="button" id="popupClose" class="control-button-small">Close & Zoom Out</button>
        </div>`,
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