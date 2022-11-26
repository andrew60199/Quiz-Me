const possibleAnswers = document.querySelectorAll('input[name="correct-answer"]')

async function newFormHandler(event) {
    event.preventDefault();
  
    const question = document.querySelector('#post-question').value;
    const answerOne = document.querySelector('#answer-one').value;
    const answerTwo = document.querySelector('#answer-two').value;
    const answerThree = document.querySelector('#answer-three').value;
    const answerFour = document.querySelector('#answer-four').value;
    let correctAnswer

    possibleAnswers.addEventListener('click', () => {
      for (const selected of possibleAnswers) {
        if (selected.checked) {
          correctAnswer = selected.value
        }
      }
    })



    if (question && answerOne && answerTwo && answerThree && answerFour && correctAnswer) {
      const response = await fetch('/api/quiz/upload', {
        method: 'POST',
        body: JSON.stringify({
          question,
          answerOne,
          answerTwo,
          answerThree,
          answerFour,
          correctAnswer
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

    // Need to go through the form and see which button has been selected.
    // Then we can set the correctAnswer as the same value...  
  
    // const response = await fetch(`api/quiz/upload`, {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     question,
    //     answerOne,
    //     answerTwo,
    //     answerThree,
    //     answerFour,
    //     correctAnswer
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // });
  
    // if (response.ok) {
    //   document.location.replace('/');
    // } else {
    //   alert(response.statusText);
    // }
  }
  
  document.querySelector('.new-quiz-form').addEventListener('submit', newFormHandler);