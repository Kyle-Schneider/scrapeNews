$(document).ready(function(){


$("#art").on("click", function(){
    console.log("test");
    alert("now insert data on this click");

//    $.post("/api/test", function(data){
//        console.log(data);

       $.get("/api/scrape", function(data){
           console.log(data);      
});


 $.get("/articles", function(data){
      console.log(data) 
      
            for (var i = 0; i < data.length; i++) {
                // Display the apropos information on the page
                $("#data").append("<div class = card>"+"<h2>"+data[i].Headline+"</h2>")

                $("#data").append( "<a href =" + data[i].URL+ " >"+ "Go to the Article" + "</a>");
                
                
                $("#data").append("<a id = articlesnotes class=btn btn-primary href=note.html role=button>"+"Notes on This Article"+"</a>"+"</div>");
                
                $("#data").append("<form>"+"<div class=form-group>"+
                "<label for=exampleFormControlTextarea1>"+"Example textarea"+"</label>"+
                "<textarea id = noteinput  class=form-control id=exampleFormControlTextarea1 rows=3>"+"</textarea>"+
              "</div>"+
            "</form>"+"<button id = savenote type=submit class=btn btn-primary mb-2" + " data-id=" + data[i]._id + ">"+"Submit"+"</button>"
        );
            } 
            
        });
          
        });

 });

 $(document).on("click", "#savenote", function() {
     alert("note button");

    var thisId = $(this).attr("data-id");
  
    $.ajax({
      method: "POST",
      url: "/submit",
      data: {
        
        body: $("#noteinput").val()
      }
    })
    
      .then(function(data) {
        
        console.log(data);
     });
  
    $("#noteinput").val("");
    // Also, remove the values entered in the input and textarea for note entry
  });

  $(document).on("click", "#articlesnotes", function() {
    alert("note page");

    var thisId = $(this).attr("data-id");
  
    $.ajax({
      method: "GET",
      url: "/notes",
    })
    
      .then(function(data) {
        
        console.log(data);

      $("#notes").append("<div class = card>"+"<h2>"+data+"</h2>");

     });

    

  });
  