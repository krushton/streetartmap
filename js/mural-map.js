var layer;
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

	var myLatlng = new google.maps.LatLng(37.775174,-122.419186);
	var mapOptions = {
			  zoom: 13,
			  center: new google.maps.LatLng(37.775174,-122.419186),
			  mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);


	var kmlLayer = new google.maps.KmlLayer('http://ischool.berkeley.edu/~derek/SFWIbyZip.kml',
    {
        suppressInfoWindows: true,
        map: map
    });

        layer = new google.maps.FusionTablesLayer({
          query: {
            select: 'Address',
            from: '1i5AvxZ-dOotZOtFu_LWD_l3d3qOw6GvrnVYo63s'
          },
          map: map
        });

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
