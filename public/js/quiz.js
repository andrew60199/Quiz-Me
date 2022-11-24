// Fetch GET request to /api/quiz/

const getQuiz = async () => {
    const response = await fetch('/api/quiz/')
    const data = await response.json();
    console.log(data)
}

getQuiz()

// Then place it on the users screen... 