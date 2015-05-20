markerMap = {}; //a global variable unless you extend L.GeoJSON

//Add the marker id as a data item (called "data-artId") to the "a" element
function addToList(data) {
    for (var i = 0; i < data.features.length; i++) {
        var art = data.features[i];
        $('div#infoContainer').append('<a href="#" class="list-link" data-artId=\"' + art.id + '\" title="' + art.properties.descfin + '"><div class="info-list-item">' + '<div class="info-list-txt">' + '<div class="title">' + art.properties.wrknm + '</div>' + '<br />' + art.properties.location + '</div>' + '<div class="info-list-img">' + art.properties.img_src + '</div>' + '<br />' + '</div></a>')
    }

    $('a.list-link').click(function (e) {
        alert('now you see what happens when you click a list item!');

        //Get the id of the element clicked
        var artId = $(this).data( 'artId' );
        var marker = markerMap[artId];

        //since you're using CircleMarkers the OpenPopup method requires
        //a latlng so I'll just use the center of the circle
        marker.openPopup(marker.getLatLng());
        e.preventDefault()
    })
}

// var map = L.map('map').setView([39.74739, -105], 3);

// var esriWorldImageryTileLayer = new L.TileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
//     maxZoom: 18,
//     attribution: 'Tiles &copy; Esri',
//     subdomains: ['1', '2', '3', '4']
// });

// esriWorldImageryTileLayer.addTo(map);

// var regions = [{
//     "type": "Feature",
//         "properties": {
//         "FID": 0,
//         "Name": "Feature 1"
//     },
//         "geometry": {
//         "type": "Polygon",
//             "coordinates": [
//             [
//                 [-104.05, 48.99],
//                 [-97.22, 48.98],
//                 [-96.58, 45.94],
//                 [-104.03, 45.94],
//                 [-104.05, 48.99]
//             ]
//         ]
//     }
// }, {
//     "type": "Feature",
//         "properties": {
//         "FID": 1,
//         "Name": "Feature 2"
//     },
//         "geometry": {
//         "type": "Polygon",
//             "coordinates": [
//             [
//                 [-109.05, 41.00],
//                 [-102.06, 40.99],
//                 [-102.03, 36.99],
//                 [-109.04, 36.99],
//                 [-109.05, 41.00]
//             ]
//         ]
//     }
// }];

// var geojson;

// function style_region(feature) {
//     return {
//         fillColor: 'white',
//         weight: 2,
//         opacity: 1,
//         color: 'blue',
//         dashArray: '3',
//         fillOpacity: 0.7
//     };
// }

// function highlightFeature(e) {
//     var layer = e.target;
//     $('.information').html('your info');
//     layer.setStyle({
//         weight: 5,
//         color: '#666',
//         dashArray: '',
//         fillOpacity: 0.7
//     });

//     if (!L.Browser.ie && !L.Browser.opera) {
//         layer.bringToFront();
//     }
// }

// function resetHighlight(e) {
//     geojson.resetStyle(e.target);
//     $('.information').html('');
// }

// function zoomToFeature(e) {
//     map.fitBounds(e.target.getBounds());
// }

// function onEachFeature(feature, layer) {
//     layer.on({
//         mouseover: highlightFeature,
//         mouseout: resetHighlight,
//         click: zoomToFeature
//     });
// }

// geojson = L.geoJson(regions, {
//     style: style_region,
//     onEachFeature: onEachFeature
// }).addTo(map);