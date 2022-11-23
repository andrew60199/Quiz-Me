const signUpForm = document.querySelector('.signup-form')
const loginForm = document.querySelector('.login-form')

if (signUpForm) {
    const userSignup = async (event) => {
        event.preventDefault();

        const username = document.querySelector('#username-signup').value.trim();
        const email = document.querySelector('#email-signup').value.trim();
        const password = document.querySelector('#password-signup').value.trim();

        // console.log(username)
        // console.log(email)
        // console.log(password)

        if (username && email && password) {
            const response = await fetch('/api/users/signup', {
                method: 'POST',
                body: JSON.stringify({ username, email, password }),
                headers: { 'Content-Type': 'application/json' },
            })

            if (response.ok) {
                document.location.replace('/');

                await fetch('/api/stats/create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                }); 
            } else {
                alert('Sign up has failed!');
            };
        };
    };

    signUpForm.addEventListener('submit', userSignup);
}

if (loginForm) {
    const userLogin = async (event) => {
        event.preventDefault();

        const email = document.querySelector('#email-login').value.trim();
        const password = document.querySelector('#password-login').value.trim();

        console.log(email)
        console.log(password)

        if (email && password) {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/');
            } else {
                alert('Login failed! Please try again or sign up!');
            };
        };
    };

    loginForm.addEventListener('submit', userLogin);
}

// We will need to do something similar with this function in the future... wrap it in an if statement if they are logged in...
const userLogout = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    };
};



