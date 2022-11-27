
async function newFormHandler(event) {
    event.preventDefault();

    const possibleAnswers = document.querySelectorAll('input[name="correct-answer"]')

    console.log(possibleAnswers)
  
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

    console.log(question)
    console.log(answerOne)
    console.log(answerTwo)
    console.log(answerThree)
    console.log(answerFour)
    console.log(correctAnswer)

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
      document.location.replace('/')
    } else {
      alert('Something went wrong, please try again')
    }
  }
  
  document.querySelector('.new-quiz-form').addEventListener('submit', newFormHandler);