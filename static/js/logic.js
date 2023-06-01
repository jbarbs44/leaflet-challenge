//Initial Map

let myMap = L.map("map", {
    center: [
    37.7829, -105.2534
    ],
    zoom: 5,
});

//Add tile layer to map
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Store our API endpoint as queryUrl.
let queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Perform a GET request to the query URL/
d3.json(queryURL).then(function (data) {
    function mapStyle(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            weight: 1,
            fillColor: circleColor(feature.geometry.coordinates[2]),
            color: "white",
            radius: circleRadius(feature.properties.mag),


        }
    };
    // Return the colors for each of the earthquakes
    function circleColor(depth) {
        switch(true) {
            case depth > 90:
                return "#FF0000";
            case depth > 70:
                return "#FF4500";
            case depth > 50:
                return "#FFA500";
            case depth > 30:
                return "#FFFF00";
            case depth > 10:
                return "#9ACD32";
            default:
                return "#ADFF2F";
        }
    };
    //Return the radius of the earthquakes multipled by 4
    function circleRadius(mag){
        return mag * 4;
    };

        // Adding the data to the map
        L.geoJson(data, {

        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },

        style: mapStyle,

        // Popups that provide addtional info for earthquake Title and Depth.
        onEachFeature: function(feature, layer) {
            layer.bindPopup( "Title:" + feature.properties.title + "<br>Depth: " + feature.geometry.coordinates[2]);

        }
    }).addTo(myMap);

    let legend = L.control({postion: "bottomright"});

  });


// function createFeatures(earthquakeData) {
//     // Define a function that we want to run once for each feature in the features array.
//     // Give each feature a popup that describes the place and time of the earthquake.
//     function onEachFeature(feature, layer) {
//         layer.bindPopup(""Title:" + feature.properties.title + "<br>Depth: " + feature.geometry.coordinates[2]);
//   }
//   // Create a GeoJSON layer that contains the features array on the earthquakeData object.
//   // Run the onEachFeature function once for each piece of data in the array.
//     let earthquakes = L.geoJSON(earthquakeData, {
//         onEachFeature: onEachFeature
//   });

//   // Send our earthquakes layer to the createMap function/
//   createMap(earthquakes);
// }

// function createMap(earthquakes) {

//     // Create the base layers.
//     let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//   });
//     //Create baseMaps object
//     let baseMaps = {
//         "Street Map": street
//     };
//     //Creat overlayMaps object
//     let overlayMaps = {
//         Earthquakes: earthquakes
//     };

//     // Create our map, giving it the streetmap and earthquakes layers to display on load.
//     let myMap = L.map("map", {
//         center: [
//         37.7829, -105.2534
//         ],
//         zoom: 5,
//         layers: [street, earthquakes]
//   });

//     // Create a layer control.
//     // Pass it our baseMaps and overlayMaps.
//     // Add the layer control to the map.
//     L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//     }).addTo(myMap);






