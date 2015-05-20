var additional_attrib = '';
var map = L.map('map').setView([12.121, 121.21], 6);

L.tileLayer('https://{s}.tiles.mapbox.com/v4/technick.lhbeglg8/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidGVjaG5pY2siLCJhIjoiNDMxclhDUSJ9.35_fzvEnBhNWp6Ldf4qrhg', { 
	attribution: additional_attrib + "<a href='https://www.mapbox.com/about/maps/' target='_blank'>&copy; Mapbox | &copy; OpenStreetMap</a> | <a class='mapbox-improve-map' href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a>",
	maxZoom: 8
}).addTo(map);

var popup = L.popup();
function onMapClick(e) {
	popup
	.setLatLng(e.latlng)
	.setContent("You clicked the map at " + e.latlng.toString())
	.openOn(map);
}
map.on('click', onMapClick);