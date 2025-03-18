import '../styles.css';
import '../stylus/stylus.styl';
import './darkmode.js';
import './index.js';

window.addEventListener("scroll", function () {
    var header = document.getElementById("navbar");
    header.classList.toggle("sticky", this.window.scrollY > 0);
})

document.querySelectorAll(".go-to-seccion-contacto").forEach(button => {
    button.addEventListener("click", function () {
        document.getElementById("seccion-contacto").scrollIntoView({ behavior: "smooth" });
    });
});

// Creación de usuario en localstorage por medio de registro.

document.getElementById('register-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Obtener los valores que se escribieron en el formulario.
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Inicializar array de localstorage si no está inicializado.
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Guardar la información en texto plano
    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registro exitoso.');
});

// Verificación de usuario en localstorage para inicio de sesión

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

        const userFound = storedUsers.some(user =>
            user.username === username && user.password === password
        );

        if (userFound) {
            alert('Inicio de sesión exitoso');

        } else {
            alert('Inicio de sesión fallido');
        }

        return false;
    });
});
