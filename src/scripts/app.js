import '../styles.css';
import '../stylus/stylus.styl';
import './darkmode.js';
import './index.js';
import { crearNuevoUsuario } from "./supabase.js";


const registerForm = document.getElementById("registerForm")

registerForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita el recargo de la página

    // Obtener los datos del formulario
    const formData = new FormData(registerForm);
    const username = formData.get("username").trim();
    const email = formData.get("email").trim();
    const celular = formData.get("celular").trim();
    const tipoCliente = formData.get("tipoCliente").trim()
    const password = formData.get("password").trim();
    const confirmPassword = formData.get("confirmPassword").trim();

    // Validación básica
    if (!username || !email || !celular || !password || !confirmPassword) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    // Intentamos registrar al usuario
    const { data, error } = await crearNuevoUsuario(username, email, celular, tipoCliente, password);

    if (error) {
        alert(`Error al registrar usuario: ${error.message}`);
        return;
    }

    alert("Usuario registrado con éxito");
    registerForm.reset(); // Limpiar el formulario
});

// Obtener elementos para mostrar en la página post-login, con filtro.
export const obtenerCienElementos = async (token, filtro = '') => {
    try {
        // Construir URL con el filtro, en caso de no haber filtro trae todos los registros
        const url = `https://cplmwzravtgwqtwckpkj.supabase.co/rest/v1/list_projects?select=*&project=ilike.%${filtro}%`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwbG13enJhdnRnd3F0d2NrcGtqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwNDg0NTQsImV4cCI6MjA1NzYyNDQ1NH0.C_H150z98w7rF0I3bFW6fL1OlVpwzc8W0Qv4gRnq504',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || 'Error al obtener datos');

        return data;
    } catch (error) {
        console.error('Error al obtener datos:', error.message);
        return null;
    }
};

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
