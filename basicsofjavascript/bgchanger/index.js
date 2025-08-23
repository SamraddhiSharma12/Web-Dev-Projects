
function changeColor(){
    const btn=document.getElementById("btn");
    const btn2=document.getElementById("btn2");
    if(btn.value==="red"){
      document.body.style.backgroundColor="red";
    }
    // if(btn2.value ==="pink"){
    //     document.body.style.backgroundColor="pink";
    // } 
    // works when separately defined under a different function 
} 
// second approach
function colorChange(event){
   const clickedButton=event.target;
   const color= clickedButton.value;

   document.body.style.backgroundColor=color;
}
