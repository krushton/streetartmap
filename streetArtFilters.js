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
	var dateRange = Math.floor((maxDate.getTime()-minDate.getTime())/86400000);
	
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
	

//Toggle buttons style when they are clicked
	$("#graffiti-button").click(function(){
		$("#graffiti-button").toggleClass("selector-button-clicked");
	});
		
	$("#mural-button").click(function(){
		$("#mural-button").toggleClass("selector-button-clicked");
	});
		
	$("#income-button").click(function(){
		$("#income-button").toggleClass("selector-button-clicked");
	});

//by default, both offensive and non-offensive graffiti are plotted on the map
	$("#offensive-checkbox").checked;

//initialize the show filter button 
	$("#show-filter-button").button({
            icons: {
                secondary: "ui-icon-pin-w"
            },
        });

	$("#show-filter-button").click(function(){
		if($("#show-filter-button").attr("state") == "show"){
			$("#show-filter-button").attr("state","hide");
			$("#show-filter-button").html("Hide Filter");
		}
	});


});

function getDateDiff(firstDate, laterDate){
	return Math.floor((laterDate.getTime()-firstDate.getTime())/86400000);
}