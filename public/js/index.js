// Event listener to redirect them to the login route... 

const navigationListener = document.querySelector('#navigation')

navigationListener.addEventListener('click', (e) => {
    // console.log(e.target.textContent)
    if (e.target.textContent === 'Quiz Me') {
        document.location.replace('/')

    } else if (e.target.textContent === 'Quiz yourself') {
        document.location.replace('/quiz')

    } else if (e.target.textContent === 'Create a quiz') {
        document.location.replace('/create')

    } else if (e.target.textContent === 'Profile') {
        document.location.replace('/profile')
    } else {
        return
    }
})
