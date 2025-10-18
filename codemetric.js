document.addEventListener("DOMContentLoaded", function(){

    const searchbutton= document.getElementById("search-button");
    const usernameinput= document.getElementById("user-input");

    const statscontainer= document.querySelector(".stats-container");
    const easyprogresscircle= document.querySelector(".easy-progress");
    const mediumprogresscircle= document.querySelector(".medium-progress");
    const hardprogresscircle= document.querySelector(".hard-progress");

    const easylabel= document.getElementById("easy-label");
    const mediumlabel= document.getElementById("medium-label");
    const hardlabel= document.getElementById("hard-label");

    const cardstatscontainer=document.querySelector(".stats-card");
    function validateUsername(username){
          if (username.trim()===""){
            alert("Username should not be empty");
            return false;
          }
          const regex=/^[a-zA-Z0-9_-]{1,20}$/; 
          const isMatching = regex.test(username);
          if(!isMatching){
            alert("Invalid Username");
          }
          return isMatching;
    }
    
    // async function fetchUserDetails(username) {

    //     try{
    //         searchbutton.textContent = "Searching...";
    //         searchbutton.disabled = true;
    //         //statsContainer.classList.add("hidden");

    //         // const response = await fetch(url);
    //         const proxyUrl = 'https://cors-anywhere.herokuapp.com/' 
    //         const targetUrl = 'https://leetcode.com/graphql/';
            
    //         const myHeaders = new Headers();
    //         myHeaders.append("content-type", "application/json");

    //         const graphql = JSON.stringify({
    //             query: "\n    query userSessionProgress($username: String!) {\n  allQuestionsCount {\n    difficulty\n    count\n  }\n  matchedUser(username: $username) {\n    submitStats {\n      acSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n      totalSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n    }\n  }\n}\n    ",
    //             variables: { "username": `${username}` }
    //         })
    //         const requestOptions = {
    //             method: "POST",
    //             headers: myHeaders,
    //             body: graphql,
    //         };

    //         const response = await fetch(proxyUrl+targetUrl, requestOptions);
    //         if(!response.ok) {
    //             throw new Error("Unable to fetch the User details");
    //         }
    //         const parsedData = await response.json();
    //         console.log("Logging data: ", parsedData) ;

    //         displayUserData(parsedData);
    //     }
    //     catch(error) {
    //         statscontainer.innerHTML = `<p>${error.message}</p>`
    //     }
    //     finally {
    //         searchbutton.textContent = "Search";
    //         searchbutton.disabled = false;
    //     }
    // }
    
    async function fetchUserDetails(username){
        const url=`https://leetcode-stats-api.herokuapp.com/${username}`
        try{
            searchbutton.textContent = "Searching...";
            searchbutton.disabled = true;

            const response=await fetch(url);
            if(!response.ok){
               throw new Error("Unable to fetch the User Details");
            }
            const parseddata = await response.json();
            console.log("logging data: ", parseddata);

            displayUserData(parseddata);
        }
        catch (error) {  
           // console.error(error); // Log the error to the console for debugging  
            statscontainer.innerHTML = `<p>No Data Found!</p>`; // Show a user-friendly message  
        }  
        finally{
            searchbutton.textContent = "Search";
            searchbutton.disabled = false;

        }
    }
    function UpdateProgress(solved, total, label, circle){
        const progressDegree = (solved/total)*100;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`);
        label.textContent = `${solved}/${total}`;

    }

    function displayUserData(parseddata){

            // Check if the response status is success  
            if (parseddata.status !== "success") {  
                statscontainer.innerHTML = "<p>No data available</p>";  
                return;  
            }  
        
            // Extract the necessary values using the actual structure  
            const totalQues = parseddata.totalQuestions;  
            const totalEasyQues = parseddata.totalEasy;  
            const totalMediumQues = parseddata.totalMedium;  
            const totalHardQues = parseddata.totalHard;  
        
            const solvedTotalEasyQues = parseddata.easySolved;  
            const solvedTotalMediumQues = parseddata.mediumSolved;  
            const solvedTotalHardQues = parseddata.hardSolved;  
        

            // Update total submissions in the UI  
   const totalSolved = parseddata.totalSolved;  
   const totalSubmissionsSpan = document.getElementById("total-submissions");  
   totalSubmissionsSpan.textContent = totalSolved;  

            // Update the progress UI  
            UpdateProgress(solvedTotalEasyQues, totalEasyQues, easylabel, easyprogresscircle);  
            UpdateProgress(solvedTotalMediumQues, totalMediumQues, mediumlabel, mediumprogresscircle);  
            UpdateProgress(solvedTotalHardQues, totalHardQues, hardlabel, hardprogresscircle);  
  
    
    }
    searchbutton.addEventListener('click', function(){
        const username=usernameinput.value;
        console.log("loggin Username: ", username);

        if(validateUsername(username)){
           fetchUserDetails(username);
        }
    })
})