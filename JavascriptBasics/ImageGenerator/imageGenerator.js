document.addEventListener("DOMContentLoaded", () =>{
const accessKey="fr_3aqV4jB5iHQUjOKVyzQnOdO0X4Ey3VOvtgYNftZ0";

const searchForm=document.getElementById("search-form");
const searchBox=document.getElementById("search-box");
const searchResult=document.getElementById("search-result");
const showBtn= document.getElementById("show-more-btn");


console.log("Elements loaded:", searchForm, searchBox, searchResult, showBtn);
let keyword="";
let page=1;

async function searchImage(){
    keyword=searchBox.value;
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=
    ${keyword}&client_id=${accessKey}&per_page=12`;

        const response= await fetch(url);
        var data=await response.json();
        //  console.log(data);

        if(page===1){
            searchResult.innerHTML="";
        }
        const results=data.results;

        results.map((result)=>{
            const image=document.createElement("img");
            image.src=result.urls.small;
            const imageLink=document.createElement("a");
            imageLink.href=result.links.html;
            imageLink.target="_blank";

            imageLink.appendChild(image);

            searchResult.appendChild(imageLink);
        })
        showBtn.style.display="block";
}
searchForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    page=1;
    searchImage();
})
showBtn.addEventListener("click", ()=>{
    page++;
    searchImage();
})
})