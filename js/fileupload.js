$(document).ready(function() {

    var args = window.location.search;
    var params = args.split('&');
    var coords = params[1].split('=')[1];
    coords = coords.substring(0,coords.length);
    coords = coords.split('%20%20');
    var lat = coords[0];
    var lng = coords[1];
    var id = params[0].split('=')[1];

    $('#lat').val(lat);
    $('#long').val(lng);
    $('#caseid').val(id);

});