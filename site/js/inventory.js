//loading just one csv
//Future versions will have to pick up more of the data, or 
//  take in a parameter for what we want to load, based on nhood or severity
function readCSV(onSuccess, onFailure) {
    fetch('data/vacant_predictions_locations.csv')
    .then(resp => {
        if (resp.status === 200){
            return resp.text();
        } else {
            alert('Failure to Load Data');
            if (onFailure) {onFailure()}
        }
    })
    .then(text => {
        const data = Papa.parse(text, { header: true });
        return data.data;
    })
    .then(onSuccess);
}

export {
    readCSV,
};