'use strict';
let a;
// $('form').cl
$('button').on('click',function(event){
  // event.preventDefualt();
  // event.preventDefault();

  $('button').toggleClass('search');
  a=$(this).val();
  console.log("this from app",a);
})
$('.blue').on('click',function(){
  $(this).toggleClass('search');
})