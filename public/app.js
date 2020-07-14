'use strict';
let a;
// $('form').cl
$('#search').on('click',function(event){
  // event.preventDefualt();
  // event.preventDefault();

  $(this).toggleClass('search');
  a=$(this).val();
  console.log("this from app",a);
})
$('.blue').on('click',function(){
  $(this).toggleClass('search');
})
$('.selectForm').hide();
$('article').hide();


$('#showMore').on('click',function(){
     $(this).text(function(i, text){
      return text === "Show More" ? "Show Less" : "Show More";
  })
  $(this).next().toggle();
})
$('.selectButton').on("click",function(){
  $(this).text(function(i, text){
    return text === "Select This Book" ? "I changed my Opinion" : "Select This Book";
})
  $(this).next().toggle();
  console.log("mmmmm");
})

$('.hhhh').on('click',function(){

  $(this).next('ul').slideToggle();
})


$('#details').on('click',function(){
  $(this).text(function(i, text){
    return text === "Show more Details" ? "Show less Details" : "Show more Details";
  });
  $(this).next().toggle();
})

//Update form is hidden by defualt
$('.updatefrom').hide();
// Yo show update form when update button clicked
$('#updateDetails').on('click',function(){
  $(this).next('.updatefrom').toggle();
})