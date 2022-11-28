const message = text => {
  const form = document.querySelector('.new-quiz-form')
  const main = document.querySelector('main')
  form.style.display = 'none'
  const newMessage = document.createElement('h2')
  newMessage.textContent = text 
  newMessage.className = 'new-message'
  main.appendChild(newMessage)
}

async function newFormHandler(event) {
    event.preventDefault();

    const possibleAnswers = document.querySelectorAll('input[name="correct-answer"]')
  
    const question = document.querySelector('#post-question').value;
    const answerOne = document.querySelector('#answer-one').value;
    const answerTwo = document.querySelector('#answer-two').value;
    const answerThree = document.querySelector('#answer-three').value;
    const answerFour = document.querySelector('#answer-four').value;
    let correctAnswer

   
    for (const selected of possibleAnswers) {
      // console.log(selected)
      if (selected.checked) {
        // console.log('-------')
        const selectedButton = selected.attributes.for.nodeValue
        if (selectedButton === 'answer-one') {
          correctAnswer = answerOne
        } else if (selectedButton === 'answer-two') {
          correctAnswer = answerTwo
        } else if (selectedButton === 'answer-three') {
          correctAnswer = answerThree
        } else if (selectedButton === 'answer-four') {
          correctAnswer = answerFour
        }
        break;
      }
    }     

    const response = await fetch('/api/quiz/upload', {
      method: 'POST',
      body: JSON.stringify({
        question: question,
        answer_one: answerOne,
        answer_two: answerTwo,
        answer_three: answerThree,
        answer_four: answerFour,
        correct_answer: correctAnswer
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      message('Your quiz was uploaded successfully!')
    } else {
      message('Something went wrong, please try again. Make sure to select which answer is the correct answer.')
    }
  }
  
document.querySelector('.new-quiz-form').addEventListener('submit', newFormHandler);