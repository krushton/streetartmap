

var layer;
	var layer2011;
	var trafficLayer = new google.maps.TrafficLayer();
	var transitLayer = new google.maps.TransitLayer();
	var bikeLayer = new google.maps.BicyclingLayer();
	var muralMarkers = [];

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

//   google.load('visualization', '1', {packages: ['corechart']});
// google.setOnLoadCallback(drawChart);

  loadMuralData();
  loadUserData();


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

	$('#date-slider').bind("slidestop", updateMapCanvas);

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

        zoomControl: false,
        panControl: true,
        navigationControl: true,
        mapTypeControl: false,
        scaleControl: false,
        draggable: true,
        scrollwheel: false,
        disableDoubleClickZoom: true

	};
	
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  	map.setOptions({styles: styles});
  
	/*var kmlLayer = new google.maps.KmlLayer('http://ischool.berkeley.edu/~derek/SFWIbyZip.kml',
    {
        suppressInfoWindows: true,
        map: map
    });*/

     layer2011 = new google.maps.FusionTablesLayer({
          query: {
            select: 'geometry', 
            from: '1yeV1PIUk5ByXuJEz_jHKDGHfL7bB_57vnhr8kpY',
          	where: "Year = 2011"
          },
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

          }

	 });  
	 layer.setMap(map);


        // $.ajax({
        //   url: 'https://www.googleapis.com/fusiontables/v1/tables/1yeV1PIUk5ByXuJEz_jHKDGHfL7bB_57vnhr8kpY/columns/geometry',
        //   type: 'GET',
        //   format: 'json',
        //   success: function(data){

        //     console.log(data);

        //   }
        // })


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

//when user clicks on a marker, draw chart based on the neighborhood the marker is in 
google.maps.event.addListener(layer, 'click', function(e) {

  neighborhood = e.row['Neighborhood'].value;
  point = e.row['Point'].value;
  drawChart();

          // Change the content of the InfoWindow
  e.infoWindowHtml = e.infoWindowHtml + '<br>' + '<a href="claim.html?id=' + e.row['Case ID[1]'].value 
  + "&point=" + point + '">Convert to Art</a>';
});


}

// Displays graffiti points depending on state of filters
function displayGraffitiPoints(){
	var query = getSliderState() + getCaseStatus() + getOffensive();
	console.log(query);

	// select points from database and display in Fusion Tables Layer
	  layer.setOptions({
          query: {
            select: 'Address',
            from: '1EeV1qsCI_h6eB5DdtPDPdPo8UpivpWAUTX5E6Ko',
		where: query
          },
          map: map

        });

}
function hideGraffitiPoints(){
	var empty_query = getSliderState() + " AND Status = 'NONE'";
	console.log(empty_query);

	// display an empty layer
	layer.setOptions({
		query: {
			select: 'Address',
			from: '1EeV1qsCI_h6eB5DdtPDPdPo8UpivpWAUTX5E6Ko',
			where: empty_query
			},
		map: map
        });
}

function clickGraffitiButton(){
	// this is essentially the same logic as updateMapCanvas,
	// except the logic is reversed because of the Graffiti button click event
	
	// if Graffiti is to show up on the map...
	if ($('#graffiti-button').is(':checked') == false ){
		displayGraffitiPoints();
	}

	else { // no graffiti on map
		hideGraffitiPoints();
	}	
}

function updateMapCanvas(){

	// if Graffiti is to show up on the map...
	if ($('#graffiti-button').is(':checked') == true ){
		displayGraffitiPoints();
	}


	else { // no graffiti on map
		hideGraffitiPoints();
	}
}

function clickBikes(){

	if ($('#bicycles-button').is(':checked') == false ){
		bikeLayer.setMap(map);
	}

	else {
		bikeLayer.setMap();
	}
	updateMapCanvas();	
}

function clickTraffic(){

	if ($('#traffic-button').is(':checked') == false ){
		trafficLayer.setMap(map);
	}

	else {
		trafficLayer.setMap();
	}
	updateMapCanvas();	
}

function clickTransit(){

	if ($('#public-transportation-button').is(':checked') == false ){
		transitLayer.setMap(map);
	}

	else {
		transitLayer.setMap();
	}
	updateMapCanvas();
}

function clickIncome(){

	if ($('#income-button').is(':checked') == false ){
		layer2011.setMap(map);
	}

	else {
		layer2011.setMap();
	}
	updateMapCanvas();
}
// Gets state of slider. Returns a string to append to database query.
function getSliderState(){
	var str;

	var start_time = $('#start-date').datepicker('getDate');
	var end_time = $('#end-date').datepicker('getDate');
	start_time = $.datepicker.formatDate( 'M dd, yy', start_time );
	end_time = $.datepicker.formatDate( 'M dd, yy', end_time );
	console.log(start_time);
	console.log(end_time);

	str = "Opened >= '"+ start_time + "' AND Opened <= '"+ end_time + "'";
	return str;

}

// Gets state of case status. Returns a string to append to database query.
function getCaseStatus(){
	var str = "";
	if ($('#closed-checkbox').is(':checked') == true && $('#open-checkbox').is(':checked') == true){
		// the string is empty. no parameters are passed, so no filters
		// SELECT ALL
	}
	else if ($('#closed-checkbox').is(':checked') == true && $('#open-checkbox').is(':checked') == false){
		str = " AND Status = 'Closed'";
	}
	else if ($('#closed-checkbox').is(':checked') == false && $('#open-checkbox').is(':checked') == true){
		str = " AND Status = 'Open'";
	}
	else { // closed and open are both false
		str = " AND Status = 'NONE'";
	}
	return str;
}

// Gets state of reported offensiveness. Returns a string to append to database query.
function getOffensive(){
	var str = "";
	if ($('#offensive-checkbox').is(':checked') == true && $('#not-offensive-checkbox').is(':checked') == true ){
		// SELECT ALL
	}
	else if ($('#offensive-checkbox').is(':checked') == true && $('#not-offensive-checkbox').is(':checked') == false ){
		str = " AND 'Request Type' CONTAINS IGNORING CASE 'Offensive' AND 'Request Type' DOES NOT CONTAIN 'Not_Offensive'";
	}
	else if ($('#offensive-checkbox').is(':checked') == false && $('#not-offensive-checkbox').is(':checked') == true ){
		str = " AND 'Request Type' CONTAINS IGNORING CASE 'Not_Offensive'";
	}
	else {	// closed and open are both false
		str = " AND 'Request Type' DOES NOT CONTAIN 'Offensive'";
	}
	return str;

}
// murals is clicked. hide or show all mural markers
function clickMurals(){
	if ($('#murals-button').is(':checked') == false ){
		// display mural points
		for ( var i = 0; i < muralMarkers.length; i++){
			muralMarkers[i].setMap(map);
		}
	}

	else {
		// remove mural points
		for ( var i = 0; i < muralMarkers.length; i++){
			muralMarkers[i].setMap(null);
		}
	}
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
                icon: "blue-dot.png",
		            title: murs[i].ttl,
		            content: content
		        });

		     google.maps.event.addListener(marker, 'click', (function(marker) {
				    return function() {
				      infowindow.setContent(marker.content);
			      	infowindow.open(map, marker);
				    }

 				 })(marker));
				
        		google.maps.event.addListener(marker, 'keydown', (function(marker) {
            			return function() {
              			infowindow.close();
            		}
         		})(marker));

			muralMarkers.push(marker);
			} // end of for
			
      	} // end of success
	}); // end of ajax
}

function loadUserData() {
  $.ajax({
    url : './userdata.json',
    type: 'get',
    format: 'json',
    success: function(data) {

      for (var i = 0; i < data.length; i++) {
        var content = '<div class="userwindow">';

        if (data[i].title) {
            content += '<h2>' + data[i].title + '</h2>';
        } 

        content += '<img style="width:220px" src="images/' + data[i].url + '" alt="graffiti image">';

        if (data[i].description) {
          content += '<p><em>Description:</em> ' + data[i].description + '</p>';
        }
        if (data[i].name){
          content += '<p><em>Artist:</em> ' + data[i].name + '</p>';
        }
        content += '</div>';

        var infowindow = new google.maps.InfoWindow({
                content: content
        });

        var marker = new google.maps.Marker({
                position: new google.maps.LatLng(data[i].lat,data[i].lon),
                map: map,
                icon: "green-dot.png",
                title: data[i].title,
                content: content
        });

         google.maps.event.addListener(marker, 'click', (function(marker) {
            return function() {
              infowindow.setContent(marker.content);
              infowindow.open(map, marker);
            }

         })(marker));
        
            google.maps.event.addListener(marker, 'keydown', (function(marker) {
                  return function() {
                    infowindow.close();
                }
            })(marker));

      muralMarkers.push(marker);
      } // end of for
      
        } // end of success
  }); // end of ajax

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

