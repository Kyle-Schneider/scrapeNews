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
                
                $("#data").append( "<a href =" + data[i].URL+ " >"+ "Go to the Article" + "</a>"+
                "<a class=btn btn-primary href=note.html role=button>"+"Link"+"</a>"+"</div>")
                
                $("#data").append("<form>"+"<div class=form-group>"+
                "<label for=exampleFormControlTextarea1>"+"Example textarea"+"</label>"+
                "<textarea class=form-control id=exampleFormControlTextarea1 rows=3>"+"</textarea>"+
              "</div>"+
            "</form>");
            } 
        });
        
          // <p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
          
      
        });

 });