$(document).ready(function() {

    var args = window.location.search;
    var params = args.split('&');
    var coords = params[1].split('=')[1];
    var id = params[0].split('=')[1];

    $('#coords').val(coords);
    $('#caseid').val(id);

});