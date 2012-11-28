$(document).ready(function() {
		
	var map;
	initializeMap();

});

function initializeMap() {
	var mapOptions = {
			  zoom: 13,
			  center: new google.maps.LatLng(37.775174,-122.419186),
			  mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}