//./data/predictions_full_subset.csv
//https://storage.cloud.google.com/phila-fire-prediction-data/predictions_full_round.csv

function readCSV(onSuccess, onFailure) {
    fetch('./key.csv')
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

function readNHoodCSV(nhood, onSuccess, onFailure) {
    fetch(`./data/predictionsByNhood/${nhood}.csv`)
    .then(resp => {
        if (resp.status === 200){
            return resp.text();
        } else {
            alert('Failure to Load Data');
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
    readNHoodCSV
};