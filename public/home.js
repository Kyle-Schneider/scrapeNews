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
     });




 });




});