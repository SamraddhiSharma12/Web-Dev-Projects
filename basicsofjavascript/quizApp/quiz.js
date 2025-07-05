const questions=[
    {
        question:"which is the largest animal in the world?",
        answers:[
            {text:"shark", correct:false},
            {text:"Blue whale", correct:true},
            {text:"Elephant", correct:false},
            {text:"Giraffe", correct:false},
        ]
    },
    {
        question:"which of the following has no written language?",
        answers:[
            {text:"Incan", correct:true},
            {text:"Roman", correct:false},
            {text:"Egyptian", correct:false},
            {text:"Aztec", correct:false},
        ]
    },
    {
        question:"The country with most number of islands in the world?",
        answers:[
            {text:"Greece", correct:false},
            {text:"Norway", correct:true},
            {text:"Finland", correct:false},
            {text:"Sweden", correct:false},
        ]
    },
    {
        question:"What is the only U.S. state that can be typed in using only one row of a standard “QWERTY” keyboard?",
        answers:[
            {text:"Ohio", correct:false},
            {text:"Manchester", correct:false},
            {text:"Seatlle", correct:false},
            {text:"Alaska", correct:true},
        ]
    },
    {
        question:"what was the first animal ever to be cloned?",
        answers:[
            {text:"rat", correct:false},
            {text:"camel", correct:false},
            {text:"sheep", correct:true},
            {text:"Goat", correct:false},
        ]
    }
];
const questionElement= document.getElementById("question");
const answersbtn=document.getElementById("answer-buttons");
const nextbtn=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextbtn.innerHTML="Next";
    showQuestions();
}
 resetState();

function showQuestions(){
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;

    questionElement.innerHTML=questionNo + ". "+ currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button=document.createElement("button");

        button.innerHTML=answer.text;
        button.classList.add("btn");

        answersbtn.appendChild(button);

        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
    
}
function resetState(){
        nextbtn.style.display="none";
        while(answersbtn.firstChild){
            answersbtn.removeChild(answersbtn.firstChild);
        }
}
function selectAnswer(e){
    const selectedBtn=e.target;
    const iscorrect=selectedBtn.dataset.correct==="true";
    
    if(iscorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answersbtn.children).forEach(button =>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextbtn.style.display="block";
}
function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextbtn.innerHTML="Play Again";
    nextbtn.style.display="block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestions();
    }
    else{
        showScore();
    }
}
nextbtn.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
startQuiz();