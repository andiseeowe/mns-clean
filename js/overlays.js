// OVERLAYS 
var d = 0;
var layers = [];
var overlays = {};
var suitOl = {};
var olThemeChk, olCropChk, chkId, olUpdate, n;
var riceJson, cornJson, banJson, cacJson, cofJson, cocJson, groupHug;
var vulRice, vulCorn, vulBan, vulCac, vulCof, vulCoc;
var chkParse = function(){};
var zoomToOl = function(){};
var olColorize = function(){};
provSel = "";
var olColor = ['#267300', '#4C7300', '#D1FF73', '#FF0000', '#FFFF00', '#1D77B8'];


// parses checkbox ID, in the format 'theme-crop' passed
chkParse = function (id) {
	var chkId = id;
	var n = chkId.indexOf('-'); // searches for the dash, which serves as separator
	olThemeChk = chkId.slice(0, n); // the first part of the checkbox's ID, could be 'suit', 'vul' or 'haz'
	olCropChk = chkId.slice(n+1, chkId.length); // the second part, gets the name of the crop selection
};

geoJsonAttribs = {
	style: function style(feature) {
		function olColorize() {
			if (feature.properties.suitab) {
				switch (feature.properties.suitab) {
					case 'high':
					return olColor[0];
					break;
					case 'mod':
					return olColor[1];
					break;
					case 'low':
					return olColor[2];
					break;
				}
			}
			if (feature.properties.vulner || feature.properties.hazard) {
				switch (feature.properties.vulner || feature.properties.hazard) {
					case 'high':
					return olColor[3]; // red
					break;
					case 'mod':
					return olColor[4]; // yellow
					break;
					case 'low':
					return olColor[5]; // green like high suitability
					break;
				}
			};
		};
		
		return {
			fillColor: olColorize(),
			fillOpacity: 1,
			opacity: 0
		}
	},

	filter: function filter(feature, layer) {
		// returns true if provSelect is empty string (meaning, show all features - overlay all the Phil)
		// else, returns only true selected province from dropdown is equal to the 'province' of the feature
		return (provSel === "") ? true : (provSel === feature.properties.province);
	}
};

// tamad style
/*
overlays = {

	suit: {
		rice: {
			source: riceJson
		},
		corn: {
			source: cornJson
		},
		ban: {
			source: banJson
		},
		cac: {
			source: cacJson
		},
		cof: {
			source: cofJson
		},
		coc: {
			source: cocJson
		}
	},

	vul: {
		rice: {
			source: vulRice
		},
		corn: {
			source: vulCorn
		},
		ban: {
			source: vulBan
		},
		cac: {
			source: vulCac
		},
		cof: {
			source: vulCof
		},
		coc: {
			source: vulCoc
		}
	},

	haz: {
		rice: {
			source: riceJson
		},
		corn: {
			source: cornJson
		},
		ban: {
			source: banJson
		},
		cac: {
			source: cacJson
		},
		cof: {
			source: cofJson
		},
		coc: {
			source: cocJson
		}
	},
};
*/

groupHug = new L.featureGroup();

olUpdate = {
	addOl: function(id) { // add
		layers[id] = L.geoJson(overlays[olThemeChk][olCropChk].source, geoJsonAttribs).addTo(mns);
		groupHug.addLayer(layers[id]);
	},

	remOl: function(id) { // remove
		mns.removeLayer(layers[id]);
		groupHug.removeLayer(layers[id]);
	},

	redOl: function(id) { // redraw
		chkParse(id);
		mns.removeLayer(layers[id]);
		groupHug.removeLayer(layers[id]);
		layers[id] = null;
		layers[id] = L.geoJson(overlays[olThemeChk][olCropChk].source, geoJsonAttribs).addTo(mns);
		groupHug.addLayer(layers[id]);

	}
};

zoomToOl = function(event) {
	if (groupHug.getLayers().length !== 0 ) {
		mns.fitBounds(groupHug.getBounds());
	}
}

// Select listener
// specifically made for province-select
$("#province-select").change(function(event) {
	provSel = this.value;

	$(".overlay-check:checked").each(function() {
		var chkId = this.id;
		// redraw the checked layers with province localized
		olUpdate.redOl(chkId);
		zoomToOl(event);

	});

});

// Checkbox/select event listeners and handlers
$(":checkbox").change(function(event) {
	if ($(event.target).hasClass('overlay-check')) {

		var chkId = event.target.id;

		if ($(this).is(':checked')) {

			chkParse(chkId);
			
			// call the overlay 
			olUpdate.addOl(chkId);

			zoomToOl(event);

		} else {
			olUpdate.remOl(chkId);
		};

	}
});