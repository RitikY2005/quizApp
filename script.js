document.addEventListener('DOMContentLoaded',()=>{

  // initialize question answer array 
  const questions_arr = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      correctAnswerIndex: 0, // Index of Paris
    },
    {
      question: "Who painted the Mona Lisa?",
      options: [
        "Pablo Picasso",
        "Leonardo da Vinci",
        "Vincent van Gogh",
        "Michelangelo",
      ],
      correctAnswerIndex: 1, // Index of Leonardo da Vinci
    },
    {
      question: "What is the tallest mountain in the world?",
      options: ["K2", "Kangchenjunga", "Mount Everest", "Makalu"],
      correctAnswerIndex: 2 // Index of Mount Everest
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Mars", "Jupiter", "Saturn", "Uranus"],
      correctAnswerIndex: 0// Index of Mars
    },
    {
      question: "What year did the Titanic sink?",
      options: [ "1905", "1921", "1899","1912"],
      correctAnswerIndex: 3, // Index of 1912
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      options: [
        "William Shakespeare",
        "Charles Dickens",
        "Jane Austen",
        "Mark Twain",
      ],
      correctAnswerIndex:0 , // Index of William Shakespeare
    },
    {
      question: "What is the chemical symbol for gold?",
      options: [ "Ag", "Fe", "Au","Pt"],
      correctAnswerIndex:2 , // Index of Au
    },
    {
      question: "Which country won the FIFA World Cup in 2018?",
      options: [ "Croatia","France", "Brazil", "Germany"],
      correctAnswerIndex: 1, // Index of France
    },
    {
      question: "Who developed the theory of relativity?",
      options: [
        
        "Isaac Newton",
        "Galileo Galilei",
        "Albert Einstein",
        "Stephen Hawking",
      ],
      correctAnswerIndex:2 , // Index of Albert Einstein
    },
    {
      question: "Which bird is often used to deliver messages?",
      options: [ "Eagle", "Ostrich", "Parrot","Pigeon"],
      correctAnswerIndex: 3, // Index of Pigeon
    },
  ];

 

  // get our dom elements 
  const start_quiz_container = document.querySelector(".start_quiz_container");
  const start_quiz=document.getElementById('start_quiz');
  const quiz_container= document.querySelector('.container');
  const score_text=document.querySelector('.status .score_status');
  const question_number= document.querySelector('.questions_status .index');
  const question_text=document.querySelector('.questions_section .question');
  const options=document.querySelectorAll('.options_section li');
  const next_btn=document.getElementById('next_btn');
  const score_box=document.querySelector('.score_box');
  const restart_btn=document.getElementById('restart_btn');

 
  let current_question=0; // index to traverse quesitons array
  let score = 0;  // to count the marks 

  // when start button is clicked , start the test 

  start_quiz.addEventListener('click',()=>{
     quiz_container.style.display="block";
     start_quiz_container.style.display="none";
     loadQuiz();
  })

  function loadQuiz(){
      if(current_question<questions_arr.length){
          

        
         // display the question 
          question_text.textContent=questions_arr[current_question].question;

         // display options 

         options.forEach((ele,index)=>{
           // remove the id from any options , if present (correct_option & incorrect_option);
         if(ele.id) ele.removeAttribute('id');
           ele.textContent=questions_arr[current_question].options[index];
         })
         
         // display the current question number 

         question_number.textContent=`${current_question+1}/${questions_arr.length}`;
         


         // disable the next button until an option is clicked 
        
         next_btn.disabled=true;

         optionClicked();

      
         
      } else {
        // show the score card 
        
        showScoreBox();

      }
  }

  function showScoreBox(){
    // show the score card with final score and restart btn
    score_box.style.visibility = "visible";
    score_box.querySelector(
      ".score_box_container h3"
    ).innerHTML = `Your final score : ${score}`;
  }
     
     


  let isOptionClicked=false; // tracking if any option is clicked 

  function optionClicked(){
    // if the clicked answer matches the correct answer or not display accordingly
    options.forEach((ele,index)=>{
      // re-enable the click events on options 
       ele.style.pointerEvents = "auto";


      ele.onclick = function () {
        isOptionClicked = true;
        if (index === questions_arr[current_question].correctAnswerIndex) {

          ele.id = "option_correct";
          score++;
          showScore();
        } else {
          ele.id = "option_incorrect";
          // show the correct option if the clicked option is wrong
          showCorrectAnswer(current_question);
        }

        // when an option is clicked , enable the next button

        next_btn.disabled = !isOptionClicked;

       // remove the click events once an option is clicked , don;t let them click multiple answer

       removeClick(current_question);

        // but first increment the curren_question index
        current_question++;
      };

  
    
        
      
    })
  }

  function removeClick(current_q){
     options.forEach((ele)=>{
      
       ele.style.pointerEvents="none";
     })
  }

  function showScore(){
    score_text.textContent = `Score:${score}`;
  }

  function showCorrectAnswer(current_q){
    

     options[questions_arr[current_q].correctAnswerIndex].id="option_correct";
  }

  // load the question when next button is clicked

  next_btn.addEventListener('click',loadQuiz);

  // restart the quiz 

  restart_btn.onclick=function (){
    current_question = 0;
    score=0;
    // hide the score box again
   
    score_box.style.visibility = "hidden";

    // load the quiz from start
    loadQuiz();
    showScore();
  }
 




})