const userLogin = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch('/login', {
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