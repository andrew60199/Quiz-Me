async function newFormHandler(event) {
    event.preventDefault();
  
    const question = document.querySelector('input[name="post-question"]').value;
    const answerOne = document.querySelector('input[id="answer-one"]').value;
    const answerTwo = document.querySelector('input[id="answer-two"]').value;
    const answerThree = document.querySelector('input[id="answer-three"]').value;
    const answerFour = document.querySelector('input[id="answer-four"]').value;
    // need to add correct answer 
  
    const response = await fetch(`api/quiz/upload`, {
      method: 'POST',
      body: JSON.stringify({
        question,
        answerOne,
        answerTwo,
        answerThree,
        answerFour,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);