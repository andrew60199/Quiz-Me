// Fetch GET request to /api/quiz/
const communication = document.querySelector('#message')
const results = document.querySelector('#answer-response')
const question = document.querySelector('#question')
const buttonOne = document.querySelector('#one')
const buttonTwo = document.querySelector('#two')
const buttonThree = document.querySelector('#three')
const buttonFour = document.querySelector('#four')

const getQuiz = async () => {
    const response = await fetch('/api/quiz/')
    const data = await response.json();
    console.log(data)
    if (data.message) {
        communication.textContent = data.message 
    }

    question.textContent = data.question

    buttonOne.textContent = data.answer_one
    buttonTwo.textContent = data.answer_two
    buttonThree.textContent = data.answer_three
    buttonFour.textContent = data.answer_four

    

    /*const selectAnswer = async () => {
        for (option of quizButtons) {
            if (option.textContent === data.correct_answer) {
                results.textContent = data.correct_answer + ' is the correct answer!'
            } else {
                results.textContent = 'That is incorrect. The correct answer is '  + data.correct_answer + '.'
            }
        }
    }*/

    // quizButtons.addEventListener('click', selectAnswer)
}



getQuiz();



