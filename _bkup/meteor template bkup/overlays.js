// TODO: GeoJSON parsing

Template.overlays.rendered = function () {

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

};