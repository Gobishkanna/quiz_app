const questions = [
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: 1,
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Pacific", "Arctic"],
    answer: 2,
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["William Shakespeare", "Leo Tolstoy", "Mark Twain", "J.K. Rowling"],
    answer: 0,
  },
  {
    question: "What gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    answer: 2,
  },
  {
    question: "Which country is famous for the Great Wall?",
    options: ["India", "Japan", "China", "Korea"],
    answer: 2,
  },
  {
    question: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    answer: 2,
  }
];

// 🔁 Fisher–Yates Shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffle(questions); // shuffle on load

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");

function loadQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach((option, index) => {
    const li = document.createElement("li");
    li.textContent = option;
    li.onclick = () => selectOption(index, li);
    optionsEl.appendChild(li);
  });

  nextBtn.disabled = true;
  resultEl.textContent = "";
}

let selectedOption = null;

function selectOption(index, li) {
  selectedOption = index;
  [...optionsEl.children].forEach((el) => el.classList.remove("selected"));
  li.classList.add("selected");
  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  if (selectedOption === questions[currentQuestion].answer) {
    score++;
  }
  currentQuestion++;
  selectedOption = null;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  questionEl.textContent = "Quiz Completed!";
  optionsEl.innerHTML = "";
  nextBtn.style.display = "none";
  resultEl.textContent = `Your Score: ${score} / ${questions.length}`;
}

loadQuestion();
