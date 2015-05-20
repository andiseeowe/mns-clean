	mns = function(){};
	// var basemaps = {};
	var additional_attrib = ''; // attribute

// basemap stuffs start
	mns = L.map('mns-map', {
		maxBounds: L.latLngBounds([22, 114], [3, 129])
	}).setView([12.121, 121.21], 6);

	// tile sources

	// OSM basemap
	// var basemap_0 = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
	// 			attribution: additional_attrib + '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
	// 			maxZoom: 8
	// });
	// basemap_0.addTo(mns);

	// MapBox basemap
	var basemap_0 = L.tileLayer('https://{s}.tiles.mapbox.com/v4/technick.lhbeglg8/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidGVjaG5pY2siLCJhIjoiNDMxclhDUSJ9.35_fzvEnBhNWp6Ldf4qrhg', { 
				attribution: additional_attrib + "<a href='https://www.mapbox.com/about/maps/' target='_blank'>&copy; Mapbox | &copy; OpenStreetMap</a> | <a class='mapbox-improve-map' href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a>",
				maxZoom: 8
	});
	basemap_0.addTo(mns);
	// TODO: Add basemap for offline

	// Info divs on top right
	var staticInfo = new L.control();
	staticInfo.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
		this.update();
		return this._div;
	};

	staticInfo.update = function () {
		this._div.innerHTML = '<h6><em>Static info here</em></h6>';
	};

	staticInfo.addTo(mns);

	var dynaInfo = new L.control();
	dynaInfo.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
		this.update();
		return this._div;
	};

	dynaInfo.update = function () {
		this._div.innerHTML = '<h6><em>Dynamic info here</em></h6>';
	};

	dynaInfo.addTo(mns);

	// Legend control on the bottom left

	var legend = L.control({position: 'bottomleft'});

	function getColorD(d) {
		return d > 1000 ? '#800026' :
		d > 500  ? '#BD0026' :
		d > 200  ? '#E31A1C' :
		d > 100  ? '#FC4E2A' :
		d > 50   ? '#FD8D3C' :
		d > 20   ? '#FEB24C' :
		d > 10   ? '#FED976' :
		'#FFEDA0';
	}

	legend.onAdd = function (mns) {

		var div = L.DomUtil.create('div', 'info legend'),
		grades = [0, 10, 20, 50, 100, 200, 500, 1000],
		labels = [];

    	// loop through our density intervals and generate a label with a colored square for each interval
	    for (var i = 0; i < grades.length; i++) {
	    	div.innerHTML +=
	    	'<i style="background:' + getColorD(grades[i] + 1) + '"></i> ' +
	    	grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
	    }

    	return div;
	};

	legend.addTo(mns);

// overlays stuffs start
	var d = 0;
	var idata = [];
	var overlays = {};
	var feature_group, olControl, someLayer;
	var layerOrder = []; // ??? this was from the original file, deleting and re-adding feature layers

	// returns random 1-1000 int, to be removed later
	var randomT = function () {
		return Math.floor((Math.random() * 1000) + 1);
	};

	// gets color for choropleth map with data intensity
	var getColor = function () {
		// TODO: remove this, replace with legit data variable
		d = randomT(); // stores random number from randomT()

		return d > 1000 ? ['#800026', d] :
	           d > 750  ? ['#BD0026', d] :
	           d > 500  ? ['#E31A1C', d] :
	           d > 250  ? ['#FC4E2A', d] :
	           d > 100  ? ['#FD8D3C', d] :
	           d > 50   ? ['#FEB24C', d] :
	           d > 10   ? ['#FED976', d] :
	           ['#FFEDA0', d];
	}

	// supposed land use layer, but actually just provinces boundaries
	overlays = {
		'suitability' : suitability = new L.geoJson(provBoundsJson, {
				onEachFeature: function (feature, layer) {
					idata = getColor();
					popupContent = feature.properties.html_exp;
					layer.bindPopup(popupContent + "Total Agricultural Land Use: <strong>" + idata[1] + " ha.</strong>");
				},
				style: function (feature) {
					return {
						color: 'white',
						fillColor: idata[0],
						weight: 1.5,
						opacity: 1,
						dashArray: '3',
						fillOpacity: 0.7
					};
				}
			}),

		'visSuit' : visSuit = new L.geoJson(provBoundsJson, {
				onEachFeature: function (feature, layer) {
					idata = getColor();
					popupContent = feature.properties.html_exp;
					layer.bindPopup(popupContent + "Total Agricultural Land Use: <strong>" + idata[1] + " ha.</strong>");
				},
				style: function (feature) {
					return {
						color: 'white',
						fillColor: idata[0],
						weight: 1.5,
						opacity: 1,
						dashArray: '3',
						fillOpacity: 0.7
					};
				}
			})	
	};

	// checkbox listener for data overlays
	$(":checkbox.filled-in").change( // if a checkbox with class .filled-in has changed
		function() {
			someLayer = event.target.id;

			if ($(this).is(':checked')) { // if it was checked
				overlays[someLayer].addTo(mns);
			} else {
				mns.removeLayer(overlays[someLayer]);
			}

			// TODO: create logic to get the corresponding checkbox's ID and call that layer
		}
	);

