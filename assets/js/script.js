const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
var count = 30;

let currentQuestion = {} ;
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'What does Var stand for?',
        choice1: 'Variable',
        choice2: 'Variation',
        choice3: 'Varying',
        choice4: 'Veritable',
        answer: 1,
    },
    {
        question: 'What index does an Array start at?',
        choice1: '1',
        choice2: '2',
        choice3: '0',
        choice4: 'None of the above',
        answer: 3,
    },
    {
        question: 'How many ids can you have in html?',
        choice1: '4',
        choice2: '3',
        choice3: '0',
        choice4: '1',
        answer: 4,
    },
    {
        question: 'To randomly select between values, you use which function?',
        choice1: 'Random',
        choice2: 'Math.random',
        choice3: 'Roll the Dice',
        choice4: 'M.R',
        answer: 2,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    var interval = setInterval(function(){
        document.getElementById('count').innerHTML= count;
        count--;
        if (count === 0){
          alert("You're out of time!");
          return window.location.assign("/end.html")
        }
      }, 1000);
    getNewQuestions()
}

getNewQuestions = () =>{
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign("/end.html")
    }

    questionCounter++
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerHTML = currentQuestion['choices' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)
        setTimeout(() =>{
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestions()
        }, 1000)
    })
})


incrementScore = num =>{
    score+=num
    score.innerText = score
}

startGame();