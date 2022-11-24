// Fetch GET request to /api/quiz/
const communication = document.querySelector('#message')

const getQuiz = async () => {
    const response = await fetch('/api/quiz/')
    const data = await response.json();
    console.log(data)
    if (data.message) {
        communication.textContent = data.message 
    }
}

getQuiz()

// Then place it on the users screen... 