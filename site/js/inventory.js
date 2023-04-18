//./data/predictions_full_subset.csv
//https://storage.cloud.google.com/phila-fire-prediction-data/predictions_full_round.csv

const myHeaders = new Headers();
myHeaders.append('Access-Control-Allow-Origin', '*');

function readCSV(onSuccess, onFailure) {
    fetch('./data/predictions_full_subset.csv', { myHeaders })
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