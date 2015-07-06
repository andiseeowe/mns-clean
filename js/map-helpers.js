// INFOs

// Info divs on top right
var staticInfo = new L.control();
var dynaInfo = new L.control();
var lblStaticInfo, lblDynaInfoProv, lblDynaInfoCrop;
var provHoverJson;


/*
staticInfo.onAdd = function (mns) {
	this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
	this.update();
	return this._div;
}

staticInfo.update = function () {
	var lblStaticInfo = '<h6><em>Mapa Ni SARAI</em></h6>';
	this._div.innerHTML = lblStaticInfo;
};
staticInfo.addTo(mns);
*/

dynaInfo.onAdd = function (mns) {
	this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
	this.update();
	return this._div;
};

dynaInfo.update = function (props) {

	this._div.innerHTML = "Province: </br>" + (props ? "<b>" + props.Name + "</b>" : "Hover over a province");
	// this._div.innerHTML += lblDynaInfoProv;
	// this._div.innerHTML += lblDynaInfoCrop;

};

// Legend control on the bottom left

var legend = L.control({position: 'bottomleft'});

legend.onAdd = function () { // should receive olTheme, legend should change depending on theme

	var div = L.DomUtil.create('div', 'info legend');

	div.innerHTML += '<i style="background: #267300"></i> High <i style="background: #FF0000"></i><br>' +
	'<i style="background: #4C7300"></i> Moderate <i style="background: #FFFF00"></i><br>' +
	'<i style="background: #D1FF73"></i> <i style="background: #1D77B8"></i>Least <br>'

	return div;
};

legend.addTo(mns);

// HELPERS

// Border hover

function highlightFeature(e) {
	var layer = e.target;

	layer.setStyle({
		weight: 1.5,
		color: 'white',
		opacity: 1
	});

	dynaInfo.update(layer.feature.properties)
};

function resetHighlight(e) {
	provHoverJson.resetStyle(e.target);
};

function zoomToFeature(e) {
	mns.fitBounds(e.target.getBounds());
};


function onEachFeature(feature, layer) {
	layer.on({
		mouseover: highlightFeature,
		mouseout: resetHighlight,
		click: zoomToFeature			
	})
};


$("#province-hover").change(function(event) {

	if ($(this).is(':checked')) {
		// provHoverJson = new L.geoJson.ajax("data/prov.json", {
		// dataType: "jsonp",

		dynaInfo.addTo(mns); 

		provHoverJson = new L.geoJson(provsJson,{

			style: {
				weight: 0,
				opacity: 0,
				fillOpacity: 0,
			},

			onEachFeature: function onEachFeature(feature, layer) {
				layer.on({
					mouseover: highlightFeature,
					mouseout: resetHighlight,
					click: zoomToFeature			
				});
			}

		}).addTo(mns);

		// provHoverJson.addTo(mns);
	} else {
		mns.removeLayer(provHoverJson);
		dynaInfo.removeFrom(mns);
	}
});
