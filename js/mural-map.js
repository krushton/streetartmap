

var layer;

var COLUMN_STYLES = {//fusion table styles limited to four per layer !? bizarre
        'Weighted_Income': [
          {
            'min': 0,
            'max': 20000,
            'color': '#f9fe72'
          },
          {
            'min': 20000,
            'max': 40000,
            'color': '#cdf76f'//'#f7fe40'
          },
          {
            'min': 40000,
            'max': 60000,
            'color': '#67e667'//'#cdf76f'
          },
          {
            'min': 60000,
            'max': 80000,
            'color': '#00cc00'//'#bef73e'
          }/*,
          {
            'min': 70000,
            'max': 82500,
            'color': '#008500'//'#a5ef00'
          }/*,
          {
            'min': 45000,
            'max': 50000,
            'color': '#67e667'
          },
          {
            'min': 50000,
            'max': 55000,
            'color': '#39e639'
          },
          {
            'min': 55000,
            'max': 60000,
            'color': '#00cc00'
          },
          {
            'min': 60000,
            'max': 65000,
            'color': '#269926'
          },
          {
            'min': 65000,
            'max': 80000,
            'color': '#008500'
          }*/
        ]};

$(document).ready(function() {
		
	var map;
	initializeMap();
	//loadMuralData();


	/*             EVENT HANDLERS                  */
	$('#hide-sidebar').bind('click', function() {
		console.log('click');
		if ( $(this).data('hidden') == "true" ) {
			$('#filter-content').show();
			$(this).attr('src', 'css/hide.png');
			$(this).data('hidden', 'false');
		} else {
			$('#filter-content').hide();
			$(this).attr('src', 'css/show.png');
			$(this).data('hidden', 'true');
		}
	});
	$('#date-slider').bind("slidestop", updateSliderEvent);

});

function initializeMap() {

   // Create an array of styles.
  var styles = [
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      { "hue": "#ff003b" },
      { "saturation": 54 },
      { "lightness": 100 },
      { "gamma": 3.31 },
      { "weight": 0.5 },
      { "visibility": "on" },
      { "color": "#b3b6bb" }]
  },
  {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
      { "visibility": "off" }]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      { "visibility": "on" },
      { "color": "#cdd5db" }]
  },
  {
    "featureType": "transit",
    "stylers": [
      { "visibility": "off" }]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.fill",
    "stylers": [
      { "visibility": "on" },
      { "color": "#ededeb" }]
  },
  {
    "featureType": "poi",
    "stylers": [
      { "visibility": "on" },
      { "color": "#ecffed" }]
  },
  {
    "featureType": "poi",
    "elementType": "labels",
    "stylers": [
      { "color": "#808080" },
      { "visibility": "off" }]
  }
];

	var myLatlng = new google.maps.LatLng(37.775174,-122.419186);
	var mapOptions = {
        maxZoom: 13,
        minZoom: 3,
			  zoom: 13,
        disableDefaultUI: true,
			  center: new google.maps.LatLng(37.775174,-122.419186),
			  mapTypeId: google.maps.MapTypeId.ROADMAP,
        //zoomControl: false,
        //panControl: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: false,
        //scrollwheel: false,
        disableDoubleClickZoom: true,
        styles: [{markerOptions: {fillColor: '#00FF00'}}]
	};
	
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  map.setOptions({styles: styles});

	/*var kmlLayer = new google.maps.KmlLayer('http://ischool.berkeley.edu/~derek/SFWIbyZip.kml',
    {
        suppressInfoWindows: true,
        map: map
    });*/

     var layer2011 = new google.maps.FusionTablesLayer({
          query: {
            select: 'geometry', 
            from: '1yeV1PIUk5ByXuJEz_jHKDGHfL7bB_57vnhr8kpY',
          	where: "Year = 2011"
          },
          map: map,
          suppressInfoWindows: false,
          /*styles: [{
                polygonOptions: {
                    strokeColor: "#ffffff",
                    strokeWeight: "1px",
                    fillOpacity: 0.5
              }},

              { where: "'Weighted_Income' >= 0 and 'Weighted_Income' < 12500",
               polygonOptions: {fillColor: "#f9fe72"}
              },
              { where: "'Weighted_Income' >= 12500 and 'Weighted_Income' < 25000",
                polygonOptions: {fillColor: "#f7fe40"}
              },
              { where: "'Weighted_Income' >= 25000 and 'Weighted_Income' < 37500",
                polygonOptions: {fillColor: "#cdf76f"}
              },
              { where: "'Weighted_Income' >= 37500 and 'Weighted_Income' < 50000",
                polygonOptions: {fillColor: "#bef73e"}
              },

              { where: "'Weighted_Income' >= 50000 and 'Weighted_Income' < 62500",
                polygonOptions: {fillColor: "#a5ef00"}
              },
              {where: "'Weighted_Income' >= 62500 and 'Weighted_Income' < 75000",
                polygonOptions: {fillColor: "#67e667"}
              },
              {where: "'Weighted_Income' >= 75000 and 'Weighted_Income' < 87500",
                polygonOptions: {fillColor: "#39e639"}
              }

              
            ]*/
            });

     	//layer2011.setMap(map);

     	//console.log(layer2011);

     	  column = "Weighted_Income";
        applyStyle(map, layer2011, column);

        //console.log(layer2011);
        addLegend(map);



        /*layer = new google.maps.FusionTablesLayer({
          query: {
            select: 'Address',
            from: '1i5AvxZ-dOotZOtFu_LWD_l3d3qOw6GvrnVYo63s'
          },
         // styles: [{markerOptions: {fillColor: '#00FF00'}}],
          map: map  
        });*/

        layer2 = new google.maps.FusionTablesLayer({
          query: {
            select: 'Point',
            from: '1EeV1qsCI_h6eB5DdtPDPdPo8UpivpWAUTX5E6Ko'
          },
         styles: [{
            markerOptions: {
              fillColor: "#00FF00"
              //fillOpacity: 0.3
         }}]
       //   map: map  
        });
        layer2.setMap(map);

        var ftID = '1EeV1qsCI_h6eB5DdtPDPdPo8UpivpWAUTX5E6Ko';
        var query = "SELECT Point FROM "+ftID+" WHERE Neighborhood = 'Outer Richmond'";
        var queryText = encodeURIComponent(query);
        var query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq=' + queryText);
        console.log(query);
        var coordinate = new google.maps.LatLng(40, -90);                                                                                                                                                                                                       
        var polygon = new google.maps.Polygon([], "#000000", 1, 1, "#336699", 0.3);
        var isWithinPolygon = polygon.containsLatLng(coordinate);

        console.log(isWithinPolygon);
}

function updateSliderEvent(){
// when the slider is released, call this function
	console.log("Update Slider called when slider is released");

	var start_time = $('#start-date').datepicker('getDate');
	var end_time = $('#end-date').datepicker('getDate');
	start_time = $.datepicker.formatDate( 'mm/dd/yy', start_time );
	end_time = $.datepicker.formatDate( 'mm/dd/yy', end_time );
	console.log(start_time);
	console.log(end_time);
	// select points in the database
	  layer.setOptions({
          query: {
            select: 'Address',
            from: '1i5AvxZ-dOotZOtFu_LWD_l3d3qOw6GvrnVYo63s',
		where: "Opened >'"+ start_time + "' AND Opened <'"+ end_time + "'"
          },
          map: map
        });

}

function loadMuralData() {
	$.ajax({
		url : './murs.json',
		type: 'get',
		format: 'json',
		success: function(data) {
			murs = data.murals;
			for (var i = 0; i < murs.length; i++) {

				var content = '<div class="window">' + '<h2>' + murs[i].ttl + '</h2>'
				+ '<div><iframe src="http://www.sfmuralarts.com/mural/'	
				+ murs[i].mid + '.html"></iframe></div>';


		        var infowindow = new google.maps.InfoWindow({
		            content: content
		        });


		        var marker = new google.maps.Marker({
		            position: new google.maps.LatLng(murs[i].lat,murs[i].lon),
		            map: map,
		            title: murs[i].ttl,
		            content: content
		        });

		         google.maps.event.addListener(marker, 'click', (function(marker) {
				    return function() {
				      infowindow.setContent(marker.content);
			      	infowindow.open(map, marker);
				    }
 				 })(marker));
				
			}
			
      	}
	})
}

  function applyStyle(map, layer, column) {
        var columnStyle = COLUMN_STYLES[column];
        var styles = [{
            polygonOptions: {
                strokeColor: "#ffffff",
                strokeWeight: "1px",
                fillOpacity: 0.5
              }}];

        //console.log(columnStyle);
        for (var i in columnStyle) {
          //console.log(columnStyle[i]);
          var style = columnStyle[i];
          //console.log(style);
           //console.log(generateWhere(column, style.min, style.max));
          styles.push({

            where: generateWhere(column, style.min, style.max),
            polygonOptions: {
              fillColor: style.color
            }
          });
        }
        //console.log('styles');
        //console.log(styles);
        layer.set('styles', styles);
      }

      // Create the where clause
      function generateWhere(columnName, low, high) {
        var whereClause = [];
        whereClause.push("'");
        whereClause.push(columnName);
        whereClause.push("' >= ");
        whereClause.push(low);
        whereClause.push(" AND '");
        whereClause.push(columnName);
        whereClause.push("' < ");
        whereClause.push(high);
        return whereClause.join('');
      }

      // Initialize the legend
      function addLegend(map) {
        var legendWrapper = document.createElement('div');
        legendWrapper.id = 'legendWrapper';
        legendWrapper.index = 1;
        map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(
            legendWrapper);
        legendContent(legendWrapper, column);
      }

      // Update the legend content
      function updateLegend(column) {
        var legendWrapper = document.getElementById('legendWrapper');
        var legend = document.getElementById('legend');
        legendWrapper.removeChild(legend);
        legendContent(legendWrapper, column);
      }

      // Generate the content for the legend
      function legendContent(legendWrapper, column) {
        var legend = document.createElement('div');
        legend.id = 'legend';

        var title = document.createElement('p');
        title.innerHTML = column;
        legend.appendChild(title);

        var columnStyle = COLUMN_STYLES[column];
        for (var i in columnStyle) {
          var style = columnStyle[i];

          var legendItem = document.createElement('div');

          var color = document.createElement('span');
          color.setAttribute('class', 'color');
          color.style.backgroundColor = style.color;
          legendItem.appendChild(color);

          var minMax = document.createElement('span');
          minMax.innerHTML = style.min + ' - ' + style.max;
          legendItem.appendChild(minMax);

          legend.appendChild(legendItem);
        }

        legendWrapper.appendChild(legend);
      }

// Poygon getBounds extension - google-maps-extensions
// http://code.google.com/p/google-maps-extensions/source/browse/google.maps.Polygon.getBounds.js
if (!google.maps.Polygon.prototype.getBounds) {
  google.maps.Polygon.prototype.getBounds = function(latLng) {
    var bounds = new google.maps.LatLngBounds();
    var paths = this.getPaths();
    var path;
    
    for (var p = 0; p < paths.getLength(); p++) {
      path = paths.getAt(p);
      for (var i = 0; i < path.getLength(); i++) {
        bounds.extend(path.getAt(i));
      }
    }

    return bounds;
  }
}

// Polygon containsLatLng - method to determine if a latLng is within a polygon
google.maps.Polygon.prototype.containsLatLng = function(latLng) {
  // Exclude points outside of bounds as there is no way they are in the poly
  var bounds = this.getBounds();

  if(bounds != null && !bounds.contains(latLng)) {
    return false;
  }

  // Raycast point in polygon method
  var inPoly = false;

  var numPaths = this.getPaths().getLength();
  for(var p = 0; p < numPaths; p++) {
    var path = this.getPaths().getAt(p);
    var numPoints = path.getLength();
    var j = numPoints-1;

    for(var i=0; i < numPoints; i++) { 
      var vertex1 = path.getAt(i);
      var vertex2 = path.getAt(j);

      if (vertex1.lng() < latLng.lng() && vertex2.lng() >= latLng.lng() || vertex2.lng() < latLng.lng() && vertex1.lng() >= latLng.lng())  {
        if (vertex1.lat() + (latLng.lng() - vertex1.lng()) / (vertex2.lng() - vertex1.lng()) * (vertex2.lat() - vertex1.lat()) < latLng.lat()) {
          inPoly = !inPoly;
        }
      }

      j = i;
    }
  }

  return inPoly;
}

function setMarkerMessage(marker, message) {
        
        google.maps.event.addListener(marker, 'click', function() {
          var streetViewDiv = document.createElement('div');
          streetViewDiv.style.width = "400px";
          streetViewDiv.style.height = "300px";
          
          var streetViewPanorama = new  google.maps.StreetViewPanorama(
            streetViewDiv,
            {
              position: marker.getPosition(),
              pov: {
                heading: 34,
                pitch: 10,
                zoom: 1
              }
            }
          );
          
          map.setStreetView(streetViewPanorama);
          
          infowindow.setContent(streetViewDiv);
          infowindow.open(map, marker);

          google.maps.event.trigger(streetViewPanorama, 'resize')
        });
      }

