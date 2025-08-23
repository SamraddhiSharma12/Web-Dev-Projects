// // Select input and button elements
// const addTask = document.getElementById("input-task");
// const addBtn = document.getElementById("add-btn");

// // Function to add a new task
// function taskList() {
//   // Create a new paragraph element for the task
//   let list = document.createElement("p");
//   list.textContent = addTask.value; // Set the text of the task to input value
  
//   // Create a cross (delete) image/button
//   let crossImg = document.createElement("img");
//   crossImg.src = "cross-img.png"; // Path to your cross image
//   crossImg.style.cursor = "pointer"; 
//   crossImg.classList.add("cross-img");
  
//   // Append the cross image to the task paragraph
//   list.appendChild(crossImg);
// //   crossImg.style.width="30px";
  
//   // Append the task to the task list container (assuming an element with id 'task-container')
//   document.getElementById("task-container").appendChild(list);
  
//   // Add event listener to the cross image for deleting the task
//   crossImg.addEventListener("click", () => {
//     list.remove();
//   });
  
//   // Optional: Add an event to strike through the task on click
//   list.addEventListener("click", () => {
//     if (list.style.textDecoration !== "line-through") {
//       list.style.textDecoration = "line-through";
//     } else {
//       list.style.textDecoration = "none";
//     }
//   });
  
//   // Clear the input field after adding task
//   addTask.value = "";
// }

// // Event listener for the button to add task
// addBtn.addEventListener("click", () => {
//   if (addTask.value.trim() !== "") { //checks for non-empty
//     taskList();
//   }
// });