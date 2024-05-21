//Traemos el formulario
const form = document.querySelector('form')
//Traemos los inputs
const email = document.querySelector('#email')
const password = document.querySelector('#password')
//Linkeable API
const url_API = "http://localhost:3000/users"

form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const user = await validateEmail(email)
    if (user === false) {
        if (confirm("Este email no está registrado, ¿desea registrarse?")) {
            window.location.href = "./src/auth/register.html"
        }
    } else {
        if (user.password === password.value) {
            alert("Bienvenido al sistema")
            localStorage.setItem("userOnline",JSON.stringify(user))
            window.location.href = "./src/pages/dashboard.html"
        } else {
            alert("La contraseña no es correcta")
        }
    }
})

async function validateEmail(email) {
    const response = await fetch(`${url_API}?email=${email.value}`)
    const data = await response.json()
    console.log(data)
    if (data.length === 1) {
        return data[0]
    } else {
        return false
    }
}