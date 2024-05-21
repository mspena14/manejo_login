const form = document.getElementById("register-form")
console.log(form)
const username = document.getElementById("username")
const lastName = document.getElementById("last-name")
const email = document.getElementById("email")
const password = document.getElementById("password")
const confirmPassword = document.getElementById("confirm-password")
const url_API = "http://localhost:3000/users"

form.addEventListener("submit", async (event) => {
    event.preventDefault()
    const checkPassword = validatePassword(password, confirmPassword)
    const checkEmail = await validateEmail(email)
    if (checkEmail && checkPassword === true) {
        registerUser(username, lastName, email, password)
        window.location.href= "/"
    }
})

function validatePassword(password, confirmPassword) {
    if (password.value !== confirmPassword.value) {
        alert("They're not equal")
        return false
    } else {

        return true
    }
}

//Función para validar que no este registrado el correo
async function validateEmail(email) {
    const response = await fetch(`${url_API}?email=${email.value}`)
    const data = await response.json()
    console.log(data)
    if (data.length === 0) {
        return true
    } else {
        return false
    }
}

async function registerUser(username, lastName, email, password) {
    const newUser = {
        username: username.value.toLowerCase(),
        lastName: lastName.value.toLowerCase(),
        email: email.value.toLowerCase(),
        password: password.value.toLowerCase()
    }
    await fetch(`${url_API}`, {
        method: 'POST',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(newUser)
    })
    alert(`User registration updated successfully`)
}