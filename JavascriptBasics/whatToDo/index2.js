
const inputTask=document.getElementById("input-task");
const listContainer=document.getElementById("list-container");

function addTask(){

    if(inputTask.value ===''){
        alert("please write something");
    }
    else{
        let li=document.createElement("li");
        li.innerHTML=inputTask.value;
        listContainer.appendChild(li);

        let span=document.createElement("span");
        span.innerHTML='<img src="cross-img.png">';

        li.appendChild(span);

    }
    inputTask.value="";
    saveData();
}
listContainer.addEventListener("click", (e)=>{
    if(e.target.tagName==="LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
   
    else if(e.target.tagName==="IMG"){
        e.target.parentElement.parentElement.remove();
        saveData();
    }
},false);

function saveData(){
    localStorage.setItem("data",listContainer.innerHTML);
}