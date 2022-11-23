const userSignup = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#email-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/signup', {
            method: 'POST',
            body: JSON.stringify({ username, email, password })
        })

        if (response.ok) {
            document.location.replace('/')
        } else {
            alert('Sign up has failed!')
        }
    }
}

const userLogin = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        })

        if (response.ok) {
            document.location.replace('/')
        } else {
            alert('Login failed! Please try again or sign up!')
        }
    }
}

const userLogout = async () => {
    const response = await fetch('/api/logout', {
        method: 'POST',
    })

    if (response.ok) {
        document.location.replace('/')
    }
}

