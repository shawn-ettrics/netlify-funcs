const mapContainer = document.getElementById('map-container');

const mapDiv = document.createElement('div');
mapDiv.id = 'map';

const gradientDiv = document.createElement('div');
gradientDiv.className = 'gradient-overlay';

// Append both divs to the 'map-container' element
mapContainer.appendChild(mapDiv);
mapContainer.appendChild(gradientDiv);

// Initialize the map
mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhd25jaGkyMDciLCJhIjoiY2t2eDM4eHVoMDBmazJucnBuODFtc3VnZCJ9.FWq9XiUtIMdqiS1wXqzzjQ'; // Your Mapbox Access Token
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/shawnchi207/clohoh80p000a01r6eb5uf1ym', // Your style URL
  center: [-114.4995, 41.1391], // Initial position [lng, lat]
  zoom: 3.6 // Initial zoom
});


// Coordinates and details for the markers
var locations = [
    {name: 'Tahoe National Forest', coordinates: [-120.56273155319109, 39.56316074131553], color: 'green'},
    {name: 'Umatilla National Forest', coordinates: [-118.66602297418554, 45.194747601460605], color: 'yellow'},
    {name: 'Arapaho and Roosevelt National Forest', coordinates: [-105.70830509936006, 40.137517186737234], color: 'orange'},
    {name: 'Klamath National Forest', coordinates: [-123.32754649610563, 41.501407226051214], color: 'red'},
    {name: 'San Bernadino National Forest', coordinates: [-116.94719510161978, 34.05698272339319], color: 'green'},
    {name: 'Tonto National Forest', coordinates: [-111.26987236420881, 33.87463158944263], color: 'yellow'},
    {name: 'Malheur National Forest', coordinates: [-118.83517923780556, 44.12200961141153], color: 'orange'},
    {name: 'Colville National Forest', coordinates: [-117.63219929951526, 48.63556603918802], color: 'red'}
];

  
// Add markers to the map
locations.forEach(function(location) {
    if (Array.isArray(location.coordinates) && location.coordinates.length === 2) {
        // Create a new SVG element for the marker
        var svgMarker = document.createElement('div');
        svgMarker.innerHTML = `<img src="https://ettrics.github.io/wildfires/assets/marker-${location.color}.svg">`;

        // Create the marker
        new mapboxgl.Marker({
            element: svgMarker.firstChild
        })
        .setLngLat(location.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
        .setText(location.name))
        .addTo(map);
    } else {
        console.log(`Invalid coordinates for location: ${location.name}`);
    }
});

