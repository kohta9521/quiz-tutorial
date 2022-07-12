const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');

function buildQuiz() {
    const output = [];

    myQuestion.forEach(
        (currentQuestion, questionNumber) => {
            const answers = [];
            for(letter in currentQuestion.answes){
                answers.push(
                    `<label>
                    <input type="radio"  name="question${questionNumber}" value="${letter}">
                    ${letter}:
                    ${currentQuestion.answers[letter]}
                    </label>`
                );
            }

            output.push(
                `<div class="question"> ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join('')}</div>`
            );
        }
    );

    quizContainer.innerHTML = output.join("");
}

function showResults(){
    const answerContainers = quizContainer.querySelectorAll('.answers');

    let numCorrect = 0;

    myQuestion.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = 'input[name=question' + questionNumber+']:checked';
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if(userAnswer===currentQuestion.correctAnswer) {
            numCorrect++;
            answerContainers[questionNumber].style.color = 'lightgreen';
        }
        else {
            answerContainers[questionNumber].style.color = 'red';
        }
    });

    resultContainer.innerHTML = numCorrect + 'out of' + myQuestion.length;
}


const myQuestion = [
    {
        question: "Who is the strongest?",
        answers: {
            a: "Superman",
            b: "The Terminator",
            c: "Waluigi, obviously"
        },
        correctAnswe: "c"
    },
    {
        question: "What is the best site ever created?",
        answers: {
            a: "SitePoint",
            b: "Simple Steps Code",
            c: "Trick question; they're both the best"
        },
        correctAnswer: "c"
    },
    {
        question: "Where is Waldo really?",
        answers: {
            a: "Antarctica",
            b: "Exploring the Pacific Ocean",
            c: "Sitting in a tree",
            d: "Minding his own business, so stop asking"
        },
        correctAnswer: "d"
    }
]


// display quiz right away
buildQuiz();

// on submit, show results
submitButton.addEventListener('click', showResults);

