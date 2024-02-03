const mapContainers = document.querySelectorAll('.map-container');
console.log(mapContainers)

mapContainers.forEach((container, i) => {
    
    const mapDiv = document.createElement('div');
    mapDiv.id = `tl-m${i}`
    mapDiv.className = 'map'

    const gradientDiv = document.createElement('div');
    gradientDiv.className = 'gradient-overlay';

    // Append both divs to the 'map-container' element
    container.appendChild(mapDiv);
    container.appendChild(gradientDiv);
})



// Initialize the map
mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhd25jaGkyMDciLCJhIjoiY2t2eDM4eHVoMDBmazJucnBuODFtc3VnZCJ9.FWq9XiUtIMdqiS1wXqzzjQ'; // Your Mapbox Access Token


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
function createMap(containerId, locationOrArray) {
    var locations = Array.isArray(locationOrArray) ? locationOrArray : [locationOrArray];

    var mapOptions = {
        container: containerId,
        style: 'mapbox://styles/shawnchi207/clohoh80p000a01r6eb5uf1ym', // Your style URL
        // dragPan: false,
        // scrollZoom: false,
        // Add other map options as needed
    };

    // If there's only one location, set the map center and zoom level
    if (locations.length === 1) {
        mapOptions.center = locations[0].coordinates;
        mapOptions.zoom = 3; // Adjust zoom level as needed
    }

    var map = new mapboxgl.Map(mapOptions);

    map.on('load', function() {

        locations.forEach(function(location) {
            var svgMarker = document.createElement('div');
            svgMarker.innerHTML = `<img src="https://ettrics.github.io/wildfires/assets/marker-${location.color}.svg">`;
        
            // Define the HTML content for the popup
            var popupContent = `
                <div class="map-popup-content">
                    <div class="popup-title text-weight-semibold">${location.name}</div>
                    <div class="stats text-style-mono"><span class="heading-xsmall">400</span>acres assisted</div>
                    <div class="stats text-style-mono"><span class="heading-xsmall">240</span>staff hours saved</div>
                    <div class="stats text-style-mono"><span class="heading-xsmall">400</span>dollars saved</div>
                </div>
            `;
        
            // Create a new marker and set its popup
            new mapboxgl.Marker({
                element: svgMarker.firstChild
            })
            .setLngLat(location.coordinates)
            .setPopup(new mapboxgl.Popup({ offset: 25 })
            .setHTML(popupContent)) // Use setHTML instead of setText
            .addTo(map);
        });
        

        // For multiple locations, fit the map to the bounds
        if (locations.length > 1) {
            var bounds = new mapboxgl.LngLatBounds();
            locations.forEach(location => {
                bounds.extend(location.coordinates);
            });

            map.fitBounds(bounds, {
                padding: {top: 100, bottom: 100, left: 50, right: 50}
            });

            // Add a one-time event listener to zoom out after the 'fitBounds' completes
            map.once('zoomend', () => {
                map.zoomOut();
            });
        }
    });
}

createMap('tl-m0', locationsArr)
createMap('tl-m1', locationsArr[0])
createMap('tl-m2', locationsArr[0])
createMap('tl-m3', locationsArr[1])


const endpoint = 'https://webflow-cms-test.netlify.app/.netlify/functions/getCMS';

fetch(endpoint)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    // Console log the data
    console.log(data);
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });
