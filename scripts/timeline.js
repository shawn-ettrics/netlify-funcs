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
  center: [-116.6140, 37.0713], // Initial position [lng, lat]
  zoom: 5 // Initial zoom
});



// Coordinates and details for the markers
var locations = [
    {name: 'Yosemite', coordinates: [-119.5383, 37.8651], color: 'green'},
    {name: 'Los Angeles', coordinates: [-118.2488, 34.0522], color: 'yellow'},
    {name: 'Utah', coordinates: [-111.8910, 39.3200], color: 'orange'},
    {name: 'Las Vegas', coordinates: [-115.1398, 36.1699], color: 'red'}
  ];
  
  // Add markers to the map
  locations.forEach(function(location) {
    // Create a new SVG element for the marker
    var svgMarker = document.createElement('div');
    svgMarker.innerHTML = `<img src="https://ettrics.github.io/wildfires/assets/marker-${location.color}.svg" marker">`;

    // Create the marker
    new mapboxgl.Marker({
      element: svgMarker.firstChild
    })
      .setLngLat(location.coordinates)
      .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
      .setText(location.name))
      .addTo(map);
  });
