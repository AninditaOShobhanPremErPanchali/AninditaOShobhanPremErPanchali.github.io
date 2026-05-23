
AOS.init();
const text='Every love story is beautiful, but ours is my favorite.';
let i=0;
function type(){
 if(i<text.length){
   document.getElementById('typed').innerHTML+=text.charAt(i);
   i++;
   setTimeout(type,50);
 }
}
type();
