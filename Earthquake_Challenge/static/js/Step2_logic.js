// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satellite = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create the map object with a center, zoom level and default map layer.
//this this case won't use setView() method which is setView([37.5, -122.5], 10);
let map = L.map("mapid",{
    center: [39.5,-98.5],
    zoom: 3,
    layers:[streets]
});

// Create a base layer that holds both maps.
let baseMaps = {
    Streets: streets,
    'Satellite Strets': satellite
};
// Then we add our tile layer to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the  Toronto airline routes GeoJSON URL
let earthQuakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.
function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: "#ffae42",
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
    if (magnitude === 0) {
        console.log(magnitude);
        return 1;
    }
    console.log(magnitude);
    return magnitude * 4;
}

//d3 to grabbing GeaJson data
d3.json(earthQuakeData).then(function(data) {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data, {
        style: styleInfo,
        pointToLayer: function(feature,latlng){
            console.log(feature.properties.mag);
            console.log(latlng);
            return L.circleMarker(latlng)
                    .bindPopup("<h2>mag: "+feature.properties.mag+"</h2>");
        }     
    }).addTo(map);
});





