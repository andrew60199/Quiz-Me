const usernameForm = document.querySelector('.new-username');
const emailForm = document.querySelector('.new-email');
const passwordForm = document.querySelector('.new-password');


if (usernameForm) {
    const usernameChange = async (event) => {
        event.preventDefault()

        const newUsername = document.querySelector('#username-update')
        const communication = document.querySelector('#message')

        if (newUsername) {
            const response = await fetch('/api/users/update/username', {
                method: 'PUT',
                body: JSON.stringify({ newUsername }),
                headers: { 'Content-Type': 'application/json' }
            })

            if (response.ok) {
                document.location.replace('/editmenu')
            } else {
                communication.textContent = 'Something appears to have gone wrong! Please try again!'
            }
        }
    }

    usernameForm.addEventListener('submit', usernameChange)
}

if (emailForm) {
    const emailChange = async (event) => {
        event.preventDefault()

        const newEmail = document.querySelector('#email-update')
        const communication = document.querySelector('#message')

        if (newEmail) {
            const response = await fetch('/api/users/update/email', {
                method: 'PUT',
                body: JSON.stringify({ newEmail }),
                headers: { 'Content-Type': 'application/json' }
            })

            if (response.ok) {
                document.location.replace('/editmenu')
            } else {
                communication.textContent = 'Something appears to have gone wrong! Please try again!'
            }
        }
    }

    emailForm.addEventListener('submit', emailChange)

}

if (passwordForm) {
    const passwordChange = async (event) => {
        event.preventDefault()

        const newPassword = document.querySelector('#password-update')
        const communication = document.querySelector('#message')

        if (newPassword) {
            const response = await fetch('/api/users/update/password', {
                method: 'PUT',
                body: JSON.stringify({ newPassword }),
                headers: { 'Content-Type': 'application/json' }
            })

            if (response.ok) {
                document.location.replace('/editmenu')
            } else {
                communication.textContent = 'Something appears to have gone wrong! Please try again!'
            }
        }
    }

    passwordForm.addEventListener('submit', passwordChange)

}