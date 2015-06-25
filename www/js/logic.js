$(document).ready(function(){		
	var db = openDatabase('notesDb1', '1.0', 'NOTES DB', 2 * 1024 * 1024);

	//POPULATE LOGIC INSERT(0)/UPDATE(1) : start
	$("#saveit").click(function(){
	//collecting values
	var token, rowid, noteTitle, noteText, categoryId,divName;
	token		=$("#token").val();
	rowid		=$("#rowid").val();
	noteTitle 	=escape($("#noteTitle").val());
	noteText	=escape($("#noteBox").val());
	categoryId	=$("#noteCategory").val();
	// To check : alert(noteTitle+"|"+noteText+"|"+categoryId);
	if(!noteTitle==""&&!noteText==""){
		//constructing selector
		divName="#cat"+categoryId+"Div";
		// To check : alert(divName);
		//Creating view node in respective category
		$("<div/>", {	html: [$("<h3/>",{text:noteTitle}),$("<pre/>",{text:noteText})],
					}).appendTo(divName);
		db.transaction(function (tx) {
		   tx.executeSql('CREATE TABLE IF NOT EXISTS notes (id integer primary key autoincrement, notetitle, notecontent, category)');
		   	if(token==0) {
		   		tx.executeSql('INSERT INTO notes (notetitle, notecontent, category) VALUES ("'+noteTitle+'", "'+noteText+'","'+categoryId+'")');
		   	}
		   	if(token==1) {
		   		//CHECK : alert('UPDATE notes SET notetitle="'+noteTitle+'", notecontent"'+noteText+'", category="'+categoryId+'" where rowid='+rowid+'');
		   		tx.executeSql('UPDATE notes SET notetitle="'+noteTitle+'", notecontent="'+noteText+'", category="'+categoryId+'" where id='+rowid);
		   		$("#deleteIt").remove();
		   		$("#selList").removeClass('col-xs-6');
				$("#selList").addClass('col-xs-9');
		   	}
		});
		//Clearing out the 
		$("#noteTitle").val("");
		$("#noteBox").val("");
		$("#noteCategory").val("1");
	} else {
		alert("Please dont leave blank fields");
	}
	//staying on same page
	return false;
	});
	//POPULATE LOGIC INSERT/UPDATE : end

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
		$("#token").val("0");
		$("#rowid").val("0");
		$("#noteTitle").val("");
		$("#noteBox").val("");
		$("#noteCategory").val("1");
		$("#deleteIt").remove();
   		$("#selList").removeClass('col-xs-6');
		$("#selList").addClass('col-xs-9');
	});

	//Personal page
	$("#category1").click(function(event) {
		divName="#cat1Div";
		$(divName).empty();
		db.transaction(function (tx) {
		   tx.executeSql('SELECT id,* FROM notes where category="1"', [], function (tx, results) {
		      var len = results.rows.length, i;			
		      for (i = 0; i < len; i++){   
		         $("<div/>", {html: [$("<h3/>",{class: 'heads',id: results.rows.item(i).id ,html: unescape(results.rows.item(i).notetitle) }),$("<pre/>",{ html: unescape(results.rows.item(i).notecontent) })]}).appendTo(divName);
		      }
			
		   }, null);
		});
		$(this).addClass('active');
		$("#myNavbar").addClass('collapse');
		$("#myNavbar").removeClass('in');
		$("#newNote").removeClass('active');
		$("#category2").removeClass('active');
		$("#category3").removeClass('active');
		$("#formDiv").css({display: "none"});
		$("#cat1Div").css({display: "inline"});
		$("#cat2Div").css({display: "none"});
		$("#cat3Div").css({display: "none"});
	});

	//Office page
	$("#category2").click(function(event) {
		divName="#cat2Div";
		$(divName).empty();
		db.transaction(function (tx) {
		   tx.executeSql('SELECT id,* FROM notes where category="2"', [], function (tx, results) {
		      var len = results.rows.length, i;			
		      for (i = 0; i < len; i++){   
		         $("<div/>", {html: [$("<h3/>",{class: 'heads',id: results.rows.item(i).id ,html: unescape(results.rows.item(i).notetitle) }),$("<pre/>",{ html: unescape(results.rows.item(i).notecontent) })]}).appendTo(divName);
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
		$(divName).empty();
		db.transaction(function (tx) {
		   tx.executeSql('SELECT id,* FROM notes where category="3"', [], function (tx, results) {
		      var len = results.rows.length, i;			
		      for (i = 0; i < len; i++){   
		         $("<div/>", {html: [$("<h3/>",{class: 'heads',id: results.rows.item(i).id ,html: unescape(results.rows.item(i).notetitle) }),$("<pre/>",{ html: unescape(results.rows.item(i).notecontent) })]}).appendTo(divName);
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


	// Updator/ deletor
	$("#formDiv").on('click', '#killit', function(event) {
		if (confirm('Do you wan\'t to delete this item?')) {
			var rowid=$("#rowid").val();
			//CHECK: alert(rowid);
			db.transaction(function (tx) {   tx.executeSql('DELETE FROM notes where id='+rowid);	});
			//Clearing out the 
			$("#token").val("0");
			$("#rowid").val("0");
			$("#noteTitle").val("");
			$("#noteBox").val("");
			$("#noteCategory").val("1");
			$("#deleteIt").remove();
	   		$("#selList").removeClass('col-xs-6');
			$("#selList").addClass('col-xs-9');
		} else {
			//CHECK : alert("no");
		}
	});



	// TODO: Reduce this three functions to 1
	$('#cat1Div').on( 'click', '.heads', function () {
		var id=parseInt(this.id);
		if(id>0 && id<999999){
			//CHECK : alert(id);
			db.transaction(function (tx) {
			//CHECK : alert('SELECT rowid,* FROM notes where rowid='+id+'');
			tx.executeSql('SELECT id,* FROM notes where id='+id+'', [], function (tx, results) {
				var len = results.rows.length, i;
				for (i = 0; i < len; i++){   
					//Send back to form
					$("#noteTitle").val(results.rows.item(i).notetitle);
					$("#noteBox").val(results.rows.item(i).notecontent);
					$("#noteCategory").val(results.rows.item(i).category);
					$("#token").val("1");
					$("#rowid").val(id);

					$("#selList").removeClass('col-xs-9');
					$("#selList").addClass('col-xs-6');
					$("<div/>", {  id : "deleteIt", class : "col-xs-3", html: $("<button/>", {id: "killit", class: "btn btn-block btn-danger", text: "Delete"}) }).appendTo("#categoryList");

					$("#newNote").addClass('active');
					$("#category1").removeClass('active');
					$("#formDiv").css({display: "inline"});
					$("#cat1Div").css({display: "none"});

					break;
				}
				}, null);
			});
		}
	});

	$('#cat2Div').on( 'click', '.heads', function () {
		var id=parseInt(this.id);
		if(id>0 && id<999999){
			//CHECK : alert(id);
			db.transaction(function (tx) {
			//CHECK : alert('SELECT rowid,* FROM notes where rowid='+id+'');
			tx.executeSql('SELECT id,* FROM notes where id='+id+'', [], function (tx, results) {
				var len = results.rows.length, i;
				for (i = 0; i < len; i++){   
					//Send back to form
					$("#noteTitle").val(results.rows.item(i).notetitle);
					$("#noteBox").val(results.rows.item(i).notecontent);
					$("#noteCategory").val(results.rows.item(i).category);
					$("#token").val("1");
					$("#rowid").val(id);

					$("#selList").removeClass('col-xs-9');
					$("#selList").addClass('col-xs-6');
					$("<div/>", {  id : "deleteIt", class : "col-xs-3", html: $("<button/>", {id: "killit", class: "btn btn-block btn-danger", text: "Delete"}) }).appendTo("#categoryList");

					$("#newNote").addClass('active');
					$("#category2").removeClass('active');
					$("#formDiv").css({display: "inline"});
					$("#cat2Div").css({display: "none"});
					
					break;
				}
				}, null);
			});
		}
	});

	$('#cat3Div').on('click','.heads',function(event) {
		var id=parseInt(this.id);
		if(id>0 && id<999999){
			//CHECK : alert(id);
			db.transaction(function (tx) {
			//CHECK : alert('SELECT rowid,* FROM notes where rowid='+id+'');
			tx.executeSql('SELECT id,* FROM notes where id='+id+'', [], function (tx, results) {
				var len = results.rows.length, i;
				for (i = 0; i < len; i++){   
					//Send back to form
					$("#noteTitle").val(results.rows.item(i).notetitle);
					$("#noteBox").val(results.rows.item(i).notecontent);
					$("#noteCategory").val(results.rows.item(i).category);
					$("#token").val("1");
					$("#rowid").val(id);

					$("#selList").removeClass('col-xs-9');
					$("#selList").addClass('col-xs-6');
					$("<div/>", {  id : "deleteIt", class : "col-xs-3", html: $("<button/>", {id: "killit", class: "btn btn-block btn-danger", text: "Delete"}) }).appendTo("#categoryList");

					$("#newNote").addClass('active');
					$("#category3").removeClass('active');
					$("#formDiv").css({display: "inline"});
					$("#cat3Div").css({display: "none"});
					
					break;
				}
				}, null);
			});
		}
	});
});