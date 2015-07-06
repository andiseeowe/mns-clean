// BASEMAP
	mns = function(){};
	var additional_attrib = ''; // attribute

	mns = L.map('mns-map', {
		maxBounds: L.latLngBounds([22, 114], [3, 129])
	}).setView([12.121, 121.21], 6);

	// tile sources

	// OSM basemap
	var basemap_0 = L.tileLayer('http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		maxZoom: 12
	});
	basemap_0.addTo(mns);