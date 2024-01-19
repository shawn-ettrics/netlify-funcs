const mapContainers = document.querySelectorAll('map-container');

mapContainers.forEach(container => {
    const mapDiv = document.createElement('div');

    const gradientDiv = document.createElement('div');
    gradientDiv.className = 'gradient-overlay';

    // Append both divs to the 'map-container' element
    container.appendChild(mapDiv);
    container.appendChild(gradientDiv);
})



// Initialize the map
mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhd25jaGkyMDciLCJhIjoiY2t2eDM4eHVoMDBmazJucnBuODFtc3VnZCJ9.FWq9XiUtIMdqiS1wXqzzjQ'; // Your Mapbox Access Token
// var map = new mapboxgl.Map({
//   container: 'map',
//   style: 'mapbox://styles/shawnchi207/clohoh80p000a01r6eb5uf1ym', // Your style URL
//   center: [-114.4995, 41.1391], // Initial position [lng, lat]
//   zoom: 3 // Initial zoom
// });

// function updateInfo() {
//   var zoom = map.getZoom().toFixed(2);
//   var center = map.getCenter();
//   document.getElementById('info').innerHTML = 'Zoom Level: ' + zoom + '<br>Center: ' + center.lng.toFixed(4) + ', ' + center.lat.toFixed(4);
// }

// // Initial info update
// updateInfo();

// // Add an event listener for the 'moveend' event
// map.on('moveend', updateInfo);

// Coordinates and details for the markers
var locationsArr = [
    {name: 'Tahoe National Forest', coordinates: [-120.56273155319109, 39.56316074131553], color: 'green'},
    {name: 'Umatilla National Forest', coordinates: [-118.66602297418554, 45.194747601460605], color: 'yellow'},
    {name: 'Arapaho and Roosevelt National Forest', coordinates: [-105.70830509936006, 40.137517186737234], color: 'orange'},
    {name: 'Klamath National Forest', coordinates: [-123.32754649610563, 41.501407226051214], color: 'red'},
    {name: 'San Bernadino National Forest', coordinates: [-116.94719510161978, 34.05698272339319], color: 'green'},
    {name: 'Tonto National Forest', coordinates: [-111.26987236420881, 33.87463158944263], color: 'yellow'},
    {name: 'Malheur National Forest', coordinates: [-118.83517923780556, 44.12200961141153], color: 'orange'},
    {name: 'Colville National Forest', coordinates: [-117.63219929951526, 48.63556603918802], color: 'red'}
];

  
function createMap(containerId, locationsArr) {
    var map = new mapboxgl.Map({
        container: containerId,
        style: 'mapbox://styles/shawnchi207/clohoh80p000a01r6eb5uf1ym', // Your style URL
    });


    if (locationsArr.length === 1) {
        // If there's only one location, center the map on it
        map.setCenter(locationsArr[0].coordinates);
        map.setZoom(3); // You can adjust this zoom level

        // Add a marker for the single location
        new mapboxgl.Marker()
            .setLngLat(locationsArr[0].coordinates)
            .addTo(map);
    } else {
        // If there are multiple locations, adjust the view to include all locations
        var bounds = new mapboxgl.LngLatBounds();

        locationsArr.forEach(function(location) {
            // Create a marker and add it to the map
            new mapboxgl.Marker()
                .setLngLat(location.coordinates)
                .addTo(map);

            // Extend the bounds to include each location's coordinates
            bounds.extend(location.coordinates);
        });

        // Adjust the map view to contain all the bounds
        map.on('load', function() {
            map.fitBounds(bounds, {
                padding: {top: 50, bottom:50, left: 50, right: 50}
            });
        });
    }

}

// Example usage with multiple locations
createMap('tl-m0', locationsArr)
createMap('tl-m1', [locationsArr[0]])
createMap('tl-m2', [locationsArr[1]])



