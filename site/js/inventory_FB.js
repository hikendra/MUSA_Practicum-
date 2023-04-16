import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyAx_d1yWpCK0LjdEgccu3x7BUiv5ycks94",
    authDomain: "philadelphia-fire-recovery.firebaseapp.com",
    projectId: "philadelphia-fire-recovery",
    storageBucket: "philadelphia-fire-recovery.appspot.com",
    messagingSenderId: "305969832218",
    appId: "1:305969832218:web:48ffe2d2691a650f99cca3",
    measurementId: "G-FW7EGXQN4Z"
  };

const app = initializeApp(firebaseConfig);

function readCSV(onSuccess, onFailure) {
    fetch('./data/predictions_full_subset.csv')
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