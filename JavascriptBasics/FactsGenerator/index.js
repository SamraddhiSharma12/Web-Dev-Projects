
const joke=document.getElementById("joke");
const answer=document.getElementById("answer");
const api_url = "https://uselessfacts.jsph.pl/random.json"
// const api_url ="https://v2.jokeapi.dev/joke/Any";

async function getapi(url)
{
  const response = await fetch(url);
  var data = await response.json();
  
  joke.innerHTML = data.text;
  // joke.innerHTML = data.setup;
  // answer.innerHTML= data.delivery;
}

getapi(api_url);

function tweetX(){
  window.open("https://twitter.com/intent/tweet?text=" + joke.innerHTML, "tweet Window",
    "width=600px , height=300px"
  );
}
