// these are probably where main.html's helpers are to be declared
// probably

Template.mapMain.rendered = function () {
	var mns = L.map('mns-map', {
		maxBounds: L.latLngBounds([22, 114], [3, 129])
	}).setView([12.121, 121.21], 6);

	var hash = new L.Hash(map); //add hashes to html address to easy share locations

	// attribute
	var additional_attrib = '';

	var basemap_0 = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
				attribution: additional_attrib + '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
				maxZoom: 8
	});
	basemap_0.addTo(map);

	var title = new L.Control();

	title.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
		this.update();
		return this._div;
	};

	title.update = function () {
		this._div.innerHTML = '<h2>mapa ni sarai</h2> alpha preview';
	};

	title.addTo(map);

	// basemaps switcher
	var basemaps = {
		// 'Mapbox': basemap_0,
		'OpenStreetMap': basemap_0,
		// 'Stamen Watercolor': basemap_2
		}

	// 'controller' of the layers switcher
	L.control.layers(basemaps, {
		collapsed: false
	}).addTo(map);

	// map scale on bottom left of screen
	L.control.scale({
		options:
		{
			position: 'bottomleft',
			maxWidth: 100,
			metric: true,
			imperial: false,
			updateWhenIdle: false
		}
	}).addTo(map);

	Meteor.setTimeout(function(){
		mns-map.invalidateSize()
	}, 500)
};