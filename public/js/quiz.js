// Fetch GET request to /api/quiz/
const communication = document.querySelector('#message')
const results = document.querySelector('#answer-response')
const question = document.querySelector('#question')
const buttonOne = document.querySelector('#one')
const buttonTwo = document.querySelector('#two')
const buttonThree = document.querySelector('#three')
const buttonFour = document.querySelector('#four')
const container = document.querySelector('.container')


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

    container.addEventListener('click', (event) => {
        buttonOne.setAttribute('style', 'display: none;')
        buttonTwo.setAttribute('style', 'display: none;')
        buttonThree.setAttribute('style', 'display: none;')
        buttonFour.setAttribute('style', 'display: none;')
        if (event.target.innerText === data.correct_answer) {
            results.textContent = `Well done! ${data.correct_answer} is the correct answer!`
        } else {
            results.textContent = `Not quite! ${data.correct_answer} was the correct answer!`
        }
    })
}

getQuiz();



