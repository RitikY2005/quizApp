

function main() {
  // array of question ,its correct answer and options which are shuffled

  //randomize the options
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const questions_arr = [
    {
      question: "What is the capital of France?",
      answer: "Paris",
      options: shuffleArray(["Paris", "Berlin", "London", "Madrid"]),
    },
    {
      question: "Who painted the Mona Lisa?",
      answer: "Leonardo da Vinci",
      options: shuffleArray([
        "Leonardo da Vinci",
        "Pablo Picasso",
        "Vincent van Gogh",
        "Michelangelo",
      ]),
    },
    {
      question: "What is the powerhouse of the cell?",
      answer: "Mitochondria",
      options: shuffleArray([
        "Mitochondria",
        "Nucleus",
        "Chloroplast",
        "Ribosome",
      ]),
    },
    {
      question: "Which planet is known as the Red Planet?",
      answer: "Mars",
      options: shuffleArray(["Mars", "Jupiter", "Saturn", "Venus"]),
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      answer: "William Shakespeare",
      options: shuffleArray([
        "William Shakespeare",
        "J.K. Rowling",
        "Charles Dickens",
        "Jane Austen",
      ]),
    },
    {
      question: "What year did the Titanic sink?",
      answer: "1912",
      options: shuffleArray(["1912", "1908", "1915", "1922"]),
    },
    {
      question: "What is the tallest mountain in the world?",
      answer: "Mount Everest",
      options: shuffleArray(["Mount Everest", "K2", "Kangchenjunga", "Makalu"]),
    },
    {
      question: "Who is credited with inventing the light bulb?",
      answer: "Thomas Edison",
      options: shuffleArray([
        "Thomas Edison",
        "Alexander Graham Bell",
        "Nikola Tesla",
        "Galileo Galilei",
      ]),
    },
    {
      question: "What is the largest mammal in the world?",
      answer: "Blue whale",
      options: shuffleArray([
        "Blue whale",
        "African elephant",
        "Giraffe",
        "Polar bear",
      ]),
    },
    {
      question: "What is the chemical symbol for gold?",
      answer: "Au",
      options: shuffleArray(["Au", "Ag", "Pb", "Fe"]),
    },
  ];

  let score=0; // to assign score if right answer
  // index to traverse through all questions
  let question_index = 0; // by default on first question

  // whenever someone clicks on next button load the next set of questions

  next_btn.addEventListener("click", () => {
    // update the question based on what question (question_index) we are on -
    document.querySelector(".questions_section .question").innerHTML =
      questions_arr[question_index].question.trim();

    // also update the options on basis on what question_index we are on-

    document.querySelectorAll(".options_section li").forEach((ele, indx) => {
      ele.innerHTML = questions_arr[question_index].options[indx].trim();

      // remove the id's from options(li's ) when next is clicked
      if (ele.id) {
        ele.removeAttribute("id");
      }
    });

    // also update the question number

    document.querySelector(".questions_status .curr_index").innerHTML = `${
      question_index + 1
    }/${questions_arr.length}`;

    // update the question_index when next button is clicked
    if (!(question_index >= questions_arr.length - 1))
      question_index = question_index + 1; // don't update if we are on last question which is length-1;

    //  remove the msg-box after next is clicked 
     document.querySelector(".msg-box").style.opacity = "0";

  });

  // let's check if the option clicked (li) is correct

  document.querySelectorAll(".options_section li").forEach((ele) => {
    ele.addEventListener("click", () => {
      // extract current index (question_index) from question status

      let curr_index = parseInt(document .querySelector(".questions_status .curr_index").innerHTML.split("/")[0]) - 1;
      if (curr_index < 0) return;

      // check if the option clicked matches the answer and assign them id's for color change...
      let flag =
        ele.innerHTML.toLowerCase().trim() ===
        questions_arr[curr_index].answer.toLowerCase().trim();
      if (flag) {
        ele.id = "option_correct";
        score += 1;
        document.querySelector(".score_status").innerHTML = `Score:${score}`;

        // if option is correct show a msg-box displaying that 
        document.querySelector('.msg-box').style.opacity="1";
        
      } else {
        ele.id = "option_incorrect";
      }
    });
  });

// if restart button is clicked start from first question

  restart_btn.addEventListener('click',()=>{
    document.querySelector(".questions_section .question").innerHTML =
      questions_arr[0].question.trim();

    document.querySelectorAll(".options_section li").forEach((ele, indx) => {
      ele.innerHTML = questions_arr[0].options[indx].trim();
      // remove the id's from options(li's ) when next is clicked
      if (ele.id) {
        ele.removeAttribute("id");
      }
    });

    // also update the question number

    document.querySelector(".questions_status .curr_index").innerHTML = `1/${questions_arr.length}`;

  });
   




}




document.addEventListener('DOMContentLoaded',main);