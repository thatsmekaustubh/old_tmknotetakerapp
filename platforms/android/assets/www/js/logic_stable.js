$(document).change(function(event) {

});

$(document).ready(function(){		
	var db = openDatabase('notesdb', '1.0', 'NOTES DB', 2 * 1024 * 1024);

	//POPULATE LOGIC INSERT : start
	$("#noteEditor").submit(function(){
	//collecting values
	var noteTitle, noteText, categoryId,divName;
	noteTitle 	=$("#noteTitle").val();
	noteText	=$("#noteBox").val();
	categoryId	=$("#noteCategory").val();
	// To check : alert(noteTitle+"|"+noteText+"|"+categoryId);
	if(!noteTitle==""&&!noteText==""){
		/*
		//constructing selector
		divName="#cat"+categoryId+"Div";
		// To check : alert(divName);
		//Creating view node in respective category
		$("<div/>", {	html: [$("<h3/>",{text:noteTitle}),$("<pre/>",{text:noteText})],
					}).appendTo(divName);*/
		db.transaction(function (tx) {
		   tx.executeSql('CREATE TABLE IF NOT EXISTS notes (id unique, notetitle, notecontent, category)');
		   tx.executeSql('INSERT INTO notes (notetitle, notecontent, category) VALUES ("'+noteTitle+'", "'+noteText+'","'+categoryId+'")');
		});
		//Clearing out the 
		$("#noteTitle").val("");
		$("#noteBox").val("");
		$("#noteCategory").val();
	} else {
		alert("Please dont leave blank fields");
	}
	//staying on same page
	return false;
	});
	//POPULATE LOGIC INSERT : end


	/*	Here is the navigation logic
		Alongside is the toggling of active node and display attribute
		NAVIGATION LOGIC: BEGINS
	*/

	//Form page 
	$("#newNote").click(function(event) {
		$(this).addClass('active');
		$("#myNavbar").addClass('collapse');
		$("#myNavbar").removeClass('in');
		$("#category1").removeClass('active');
		$("#category2").removeClass('active');
		$("#category3").removeClass('active');
		$("#formDiv").css({display: "inline"});
		$("#cat1Div").css({display: "none"});
		$("#cat2Div").css({display: "none"});
		$("#cat3Div").css({display: "none"});
	});

	//Personal page
	$("#category1").click(function(event) {
		$("#myNavbar").addClass('collapse');
		$("#myNavbar").removeClass('in');
		$("#newNote").removeClass('active');
		$("#category2").removeClass('active');
		$("#category3").removeClass('active');
		$("#formDiv").css({display: "none"});
		$("#cat1Div").css({display: "inline"});
		$("#cat2Div").css({display: "none"});
		$("#cat3Div").css({display: "none"});

		divName="#cat1Div";
		$(divname).empty();
		db.transaction(function (tx) {
		   tx.executeSql('SELECT * FROM notes where category="1"', [], function (tx, results) {
		      var len = results.rows.length, i;			
		      for (i = 0; i < len; i++){
		         $("<div/>", {	html: [$("<h3/>",{text: results.rows.item(i).notetitle }),$("<pre/>",{text:results.rows.item(i).notecontent})]}).appendTo(divName);		         
		      }
			
		   }, null);
		});
		$(this).addClass('active');
	});

	//Office page
	$("#category2").click(function(event) {
		divName="#cat2Div";
		db.transaction(function (tx) {
		   tx.executeSql('SELECT * FROM notes where category="2"', [], function (tx, results) {
		      var len = results.rows.length, i;			
		      for (i = 0; i < len; i++){   
		         $("<div/>", {	html: [$("<h3/>",{text: results.rows.item(i).notetitle }),$("<pre/>",{text:results.rows.item(i).notecontent})]}).appendTo(divName);		         
		      }
			
		   }, null);
		});
		$(this).addClass('active');
		$("#myNavbar").addClass('collapse');
		$("#myNavbar").removeClass('in');
		$("#newNote").removeClass('active');
		$("#category1").removeClass('active');
		$("#category3").removeClass('active');
		$("#formDiv").css({display: "none"});
		$("#cat1Div").css({display: "none"});
		$("#cat2Div").css({display: "inline"});
		$("#cat3Div").css({display: "none"});
	});

	//Others page
	$("#category3").click(function(event) {
		divName="#cat3Div";
		db.transaction(function (tx) {
		   tx.executeSql('SELECT * FROM notes where category="3"', [], function (tx, results) {
		      var len = results.rows.length, i;			
		      for (i = 0; i < len; i++){   
		         $("<div/>", {	html: [$("<h3/>",{text: results.rows.item(i).notetitle }),$("<pre/>",{text:results.rows.item(i).notecontent})]}).appendTo(divName);		         
		      }
			
		   }, null);
		});
		$(this).addClass('active');
		$("#myNavbar").addClass('collapse');
		$("#myNavbar").removeClass('in');
		$("#newNote").removeClass('active');
		$("#category1").removeClass('active');
		$("#category2").removeClass('active');
		$("#formDiv").css({display: "none"});
		$("#cat1Div").css({display: "none"});
		$("#cat2Div").css({display: "none"});
		$("#cat3Div").css({display: "inline"});
	});
	//	NAVIGATION LOGIC: ENDS
});