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