// Fetch GET request to /api/quiz/
const communication = document.querySelector('#message')
const results = document.querySelector('#answer-response')
const question = document.querySelector('#question')
const buttonOne = document.querySelector('#one')
const buttonTwo = document.querySelector('#two')
const buttonThree = document.querySelector('#three')
const buttonFour = document.querySelector('#four')
const playAgain = document.querySelector('#play-again')
const container = document.querySelector('.container')


const getQuiz = async () => {
    const response = await fetch('/api/quiz/')
    const data = await response.json();
    // console.log(data)
    if (data.message) {
        communication.textContent = data.message
        buttonOne.setAttribute('style', 'display: none;')
        buttonTwo.setAttribute('style', 'display: none;')
        buttonThree.setAttribute('style', 'display: none;')
        buttonFour.setAttribute('style', 'display: none;')
    }

    const quizId = data.id
    question.textContent = data.question
    buttonOne.textContent = data.answer_one
    buttonTwo.textContent = data.answer_two
    buttonThree.textContent = data.answer_three
    buttonFour.textContent = data.answer_four

    container.addEventListener('click', async (event) => {
        
        buttonOne.setAttribute('style', 'display: none;')
        buttonTwo.setAttribute('style', 'display: none;')
        buttonThree.setAttribute('style', 'display: none;')
        buttonFour.setAttribute('style', 'display: none;')
        playAgain.setAttribute('style', 'display: flex; justify-content: center;')

        if (event.target.innerText === data.correct_answer) {
            results.textContent = `Well done! ${data.correct_answer} is the correct answer!`

            // Fetch wins
            const totalWinsRAW = await fetch('/api/stats/:user_id')
            const dataObject = await totalWinsRAW.json();
            let totalGames = dataObject.total_played
            let totalWins = dataObject.wins
            totalWins ++
            // console.log(totalWins)

            // Fetch their text of quiz ids
            const totalPlayedArray = totalGames.split(" ")
            const quizIdString = quizId.toString()
            totalPlayedArray.push(quizIdString)

            // Convert back to string
            const totalPlayedString = totalPlayedArray.toString(' ')
            // console.log(totalPlayedString)

            // Then save new list of quiz ids
            await fetch('/api/stats/:user_id/wins', {
                method: 'PUT',
                body: JSON.stringify({ 
                    total_played: totalPlayedString,
                    wins : totalWins
                }),
                headers: { 'Content-Type': 'application/json' },
            });


        } else {
            results.textContent = `Not quite! ${data.correct_answer} was the correct answer!`

            // Fetch wins
            const totalWinsRAW = await fetch('/api/stats/:user_id')
            const dataObject = await totalWinsRAW.json();
            let totalGames = dataObject.total_played

            // Fetch their text of quiz ids
            const totalPlayedArray = totalGames.split(" ")
            const quizIdString = quizId.toString()
            totalPlayedArray.push(quizIdString)

            // Convert back to string
            const totalPlayedString = totalPlayedArray.toString(' ')
            // console.log(totalPlayedString)

            // Then save new list of quiz ids
            await fetch('/api/stats/:user_id/total', {
                method: 'PUT',
                body: JSON.stringify({ 
                    total_played: totalPlayedString
                }),
                headers: { 'Content-Type': 'application/json' },
            });
        }
    }, { once: true })
}

getQuiz();



