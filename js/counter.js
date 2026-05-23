
const startDate=new Date('2020-02-14');
function updateCounter(){
 const now=new Date();
 const diff=now-startDate;
 const days=Math.floor(diff/(1000*60*60*24));
 const years=Math.floor(days/365);
 document.getElementById('counter').innerHTML=`❤️ ${years} Years Together<br>${days} Days of Memories`;
}
updateCounter();
