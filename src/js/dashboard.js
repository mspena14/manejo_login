const user = localStorage.getItem('userOnline')
const logout = document.querySelector('#log-out')

if (user==null) {
    window.location.href = '/'
}

logout.addEventListener('click', () => {
    localStorage.removeItem('userOnline')
    alert('Saliendo del sistema')
    window.location.href = "/"
})