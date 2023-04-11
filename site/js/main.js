

//sk.eyJ1Ijoia2VlbGJuIiwiYSI6ImNsZ2JzM3RnczF1MXgzbG41MGtvaHZmdWUifQ.x06_5V6rM6MuEKg13RIuBw

mapboxgl.accessToken = 'pk.eyJ1Ijoia2VlbGJuIiwiYSI6ImNqaWVseGZjZzA3emMzdnAxM296OTFjNG8ifQ.W2j9Y2mz4t6vGRyKJk_Nyw';
const map = new mapboxgl.Map({
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/light-v11',
    center: [-75.175, 39.973],
    minZoom: 8,
    zoom: 11
});

const zoomThreshold = 4;

map.on('load', async () => {
    
    //const geojson = await getData();

    map.addSource('vacancies', {
        'type': 'geojson',
        'data': './data/phila_vacant_predictions.geojson'
    });

    map.addLayer({
            'id': 'predVacancy',
            'source': 'vacancies',
            'type': 'circle'
        },
        'road-label-simple' // Add layer below labels
    );
/*
    map.addLayer(
        {
            'id': 'county-population',
            'source': 'population',
            'source-layer': 'state_county_population_2014_cen',
            'minzoom': zoomThreshold,
            'type': 'fill',
            // only include features for which the "isCounty"
            // property is "true"
            'filter': ['==', 'isCounty', true],
            'paint': {
                'fill-color': [
                    'interpolate',
                    ['linear'],
                    ['get', 'population'],
                    0,
                    '#F2F12D',
                    100,
                    '#EED322',
                    1000,
                    '#E6B71E',
                    5000,
                    '#DA9C20',
                    10000,
                    '#CA8323',
                    50000,
                    '#B86B25',
                    100000,
                    '#A25626',
                    500000,
                    '#8B4225',
                    1000000,
                    '#723122'
                ],
                'fill-opacity': 0.75
            }
        },
        'road-label-simple' // Add layer below labels
    );*/

    /*
    async function getData(){

        const response = await fetch(
            'C:/Users/Beeel/Downloads/Neighborhoods_Philadelphia.geojson',
            { method: 'GET' }
        )
        console.log("loading data");
        return response
    }*/
});

const stateLegendEl = document.getElementById('state-legend');
const countyLegendEl = document.getElementById('county-legend');
map.on('zoom', () => {
    if (map.getZoom() > zoomThreshold) {
        stateLegendEl.style.display = 'none';
        countyLegendEl.style.display = 'block';
    } else {
        stateLegendEl.style.display = 'block';
        countyLegendEl.style.display = 'none';
    }
});