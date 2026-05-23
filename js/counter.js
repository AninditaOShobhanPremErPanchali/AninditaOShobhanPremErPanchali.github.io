
const startDate=new Date('2026-02-28');
function updateCounter(){
 const now=new Date();
 const diff=now-startDate;
 const days=Math.floor(diff/(1000*60*60*24));
 const months=Math.floor(days/30);
 document.getElementById('counter').innerHTML=`❤️ ${months} months Together<br>${days} Days of Memories`;
}
updateCounter();
