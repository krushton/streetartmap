//google.load('visualization', '1.0', {'packages':['corechart']});
//google.setOnLoadCallback(drawChart);
var neighborhood;

$(function(){
		

	//set the date slider
	var maxDate = new Date(); //maximum date is today's date
	var minDate = new Date(2008, 7-1,1); //starting date for graffiti data is July 1, 2008
	
	//initialize calendar fields
	$("#start-date").val($.datepicker.formatDate("mm/dd/yy",minDate));
	$("#end-date").val($.datepicker.formatDate("mm/dd/yy",maxDate));

	//initialize checkbox and radio button sets
	$("#income-year-button").buttonset();
	$("#offensive-checkboxes").buttonset();
	$("#case-status-button").buttonset();
	$('#art-type-button').buttonset();

	//set up date picker and update the slider when selecting a new date
	$("#start-date").datepicker({ 
		changeMonth: true,
		changeYear: true,
		minDate: minDate, 
		maxDate: maxDate,
		onClose: function(selectedDate){
			$("#end-date").datepicker("option", "minDate", selectedDate);
		},
		onSelect: function(dateStr){
			var startDate = new Date(dateStr);
			var newStart = getDateDiff(minDate, startDate);
	
			$("#date-slider").slider("values", 0, newStart);
		}
	});
	$("#end-date").datepicker({
		changeMonth: true,
		changeYear: true,
		minDate: minDate,
		maxDate:maxDate,
		onClose: function(selectedDate){
			$("#start-date").datepicker("option", "maxDate",selectedDate);
		},
		onSelect: function(dateStr){
			var endDate = new Date(dateStr);
			var newEnd = getDateDiff(minDate, endDate);
	
			$("#date-slider").slider("values", 1, newEnd);
		}
	});


	//date range is the number of days between today's date and july 1, 2008
	//one day as 86400000 miliseconds
	var dateRange = getDateDiff(minDate, maxDate); //Math.floor((maxDate.getTime()-minDate.getTime())/86400000);
	
	$("#date-slider").slider({
		range: true,
		min: 0,
		max: dateRange,
		slide: function(event,ui){
			var date = new Date(minDate);

			date.setDate(minDate.getDate() + ui.values[0]);
			$("#start-date").val($.datepicker.formatDate("mm/dd/yy",date));

			date.setDate(date.getDate()+ (ui.values[1] - ui.values[0]));
			$("#end-date").val($.datepicker.formatDate("mm/dd/yy",date));
		}

	});
	$("#date-slider").slider("values", 1, dateRange);
	
	$("#filters-income").hide();

//Toggle buttons style when they are clicked
	$("#graffiti-button").click(function(){
		$("#graffiti-button").toggleClass("selector-button-clicked");
	});
		
	$("#mural-button").click(function(){
		$("#mural-button").toggleClass("selector-button-clicked");
		console.log("clicked");
		//rawChart();
	});
		
	$("#income-button").click(function(){
		$("#income-button").toggleClass("selector-button-clicked");
		//console.log($("#income-button").attr("class"));

		//if income button is clicked, default the year to 2011	
		if($("#income-button").attr("class") == "selector-button selector-button-clicked"){
			$("input[id=income-year1]").prop("checked",true);
			$("input[id=income-year1]").button("refresh");
			//console.log($("#income-year1").prop("checked"));
			$("#filters-income").show();
		}
		else{
			$("input[name=income-year]").prop("checked",false);
			$("input[name=income-year]").button("refresh");

			//reset the max and min date of the sliders
			// maxDate = new Date(); //maximum date is today's date
			// minDate = new Date(2008, 7-1,1); //starting date for graffiti data is July 1, 2008

			// $("#start-date").datepicker("option", "minDate", minDate);
			// $("#start-date").datepicker("option", "maxDate", maxDate);

			// $("#end-date").datepicker("option", "minDate", minDate);
			// $("#end-date").datepicker("option", "maxDate", maxDate);

			// $("#date-slider").slider("option", "max", dataRange);
			$("#filters-income").hide();
		}
	});

//by default, both offensive and non-offensive graffiti are plotted on the map
	$("#offensive-checkbox").checked;

// //initialize the show filter button 
// 	$("#show-filter-button").button({
//             icons: {
//                 secondary: "ui-icon-pin-w"
//             },
//         });

// 	$("#show-filter-button").click(function(){
// 		if($("#show-filter-button").attr("state") == "show"){
// 			$("#show-filter-button").attr("state","hide");
// 			$("#show-filter-button").html("Hide Filter");
// 		}
// 	});

//restrict date slider by the selected year of income data
	// $("input[name=income-year]").change(function(){
	// 	console.log("click radio");
	// 	var radioButton = $("input[name=income-year]:checked").attr("id");
	// 	var incomeYear = $("input[name=income-year]:checked + label").text();
	// 	console.log(incomeYear);

	// 	incomeYear = parseInt(incomeYear);

	// 	var incomeYearStartDate = new Date(incomeYear,1-1,1);
	// 	var incomeYearEndDate = new Date(incomeYear, 12-1, 31);

	// 	//reset the boundary of the date picker
	// 	$("#start-date").datepicker("option", "minDate", incomeYearStartDate);
	// 	$("#start-date").datepicker("option", "maxDate", incomeYearEndDate);
	// 	$("#start-date").val($.datepicker.formatDate("mm/dd/yy",incomeYearStartDate));

	// 	$("#end-date").datepicker("option", "minDate", incomeYearStartDate);
	// 	$("#end-date").datepicker("option", "maxDate", incomeYearEndDate);
	// 	$("#end-date").val($.datepicker.formatDate("mm/dd/yy",incomeYearEndDate));

	// 	//reset the date range of the slider
	// 	var oneYearRange = getDateDiff(incomeYearStartDate, incomeYearEndDate);
	// 	$("#date-slider").slider("option", "max", oneYearRange);
		
	// 	//update the min and max date of the slider
	// 	minDate=incomeYearStartDate;
	// 	maxDate=incomeYearEndDate;

	// 	//update slider positions
	// 	$("#date-slider").slider("values", 0, 0);
	// 	$("#date-slider").slider("values", 1,0);
	// 	//console.log("startDate: ", incomeYearStartDate, " ", incomeYearEndDate);
	// });

});

function getDateDiff(firstDate, laterDate){
	return Math.floor((laterDate.getTime()-firstDate.getTime())/86400000);
}

// function updateDatesByIncomeYear(){
// 	var radioButton = $("input[name=income-year]:checked").attr("id");
// 		var incomeYear = $("input[name=income-year]:checked + label").text();
// 		console.log(incomeYear);

// 		incomeYear = parseInt(incomeYear);

// 		var incomeYearStartDate = new Date(incomeYear,1-1,1);
// 		var incomeYearEndDate = new Date(incomeYear, 12-1, 31);

// 		//reset the boundary of the date picker
// 		$("#start-date").datepicker("option", "minDate", incomeYearStartDate);
// 		$("#start-date").datepicker("option", "maxDate", incomeYearEndDate);
// 		$("#start-date").val($.datepicker.formatDate("mm/dd/yy",incomeYearStartDate));

// 		$("#end-date").datepicker("option", "minDate", incomeYearStartDate);
// 		$("#end-date").datepicker("option", "maxDate", incomeYearEndDate);
// 		$("#end-date").val($.datepicker.formatDate("mm/dd/yy",incomeYearEndDate));

// 		//reset the date range of the slider
// 		var oneYearRange = getDateDiff(incomeYearStartDate, incomeYearEndDate);
// 		$("#date-slider").slider("option", "max", oneYearRange);
		
// 		//update the min and max date of the slider
// 		minDate=incomeYearStartDate;
// 		maxDate=incomeYearEndDate;

// 		//update slider positions
// 		//TBD
// }

//draw open and closed graffiti case overtime by neighborhood
//chart type: stacked line chart
// line 1: open graffiti cases
// line2: closed graffiti cases
// x-axis: date from the same year of the selected marker from the map
// y-axis: number of graffiti cases
//data filter: only show graffiti cases within the neighbourhood of the selected marker from the map
function drawChart(){

	var yrStart = $('#start-date').datepicker('getDate');
	var yrEnd = $('#end-date').datepicker('getDate');
	yrStart = $.datepicker.formatDate( 'mm/dd/yy', yrStart );
	yrEnd = $.datepicker.formatDate( 'mm/dd/yy', yrEnd );


console.log(yrStart, yrEnd);
console.log("neighborhood = ", neighborhood);

	var queryText = encodeURIComponent(
			 "SELECT Opened, COUNT('Case ID[1]') AS '# Cases' FROM 1EeV1qsCI_h6eB5DdtPDPdPo8UpivpWAUTX5E6Ko WHERE Opened >= '"+yrStart +"' AND Opened <= '"+yrEnd+"' AND Status = 'Open' AND Neighborhood = '"+neighborhood+"' GROUP BY Opened");

//console.log("query: ", queryText);
	var query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq='  + queryText); 
	  query.send(getData); 
	
}

function getData(response){
	console.log("got data: ", response.getDataTable());

	var options = {
		  title: neighborhood,
		  //chartArea:{left:20,top:0,width:"85%",height:"85%"},
          hAxis: {title: 'Opened Date',
      			  gridlines: {count: 10}},
          vAxis: {title: '# Cases'},
          fontSize: 12,
          legend: {position: 'top'}
        };
 	
 	var chart = new google.visualization
 					.ColumnChart(document.getElementById('visualization')) 
    				.draw(response.getDataTable(), options );

}
