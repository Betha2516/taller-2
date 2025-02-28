import './styles.css';
import './stylus/stylus.styl';

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

document.getElementById('register-form').addEventListener('submit', function(e) {
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

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', function(event) {
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



// Obtener referencia al botón
const darkModeToggle = document.getElementById('dark-mode-toggle');

// Verificar si el usuario ya tiene una preferencia guardada
const savedMode = localStorage.getItem('dark-mode');
if (savedMode === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
}

// Función para alternar entre modo claro y oscuro
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    // Guardar la preferencia del usuario en localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode', 'enabled');
        darkModeToggle.textContent = '☀️';
    } else {
        localStorage.setItem('dark-mode', 'disabled');
        darkModeToggle.textContent = '🌙';
    }
});
document.addEventListener("DOMContentLoaded", function () {
    // Definir textos en distintos idiomas
    const translations = {
        es: {
            Bienvenida: "Nuestro Portafolio",
            home: "Inicio",
            about: "Sobre nosotros",
            projects: "Proyectos",
            contact_us: "Contacto",
            title1: "Nuestro portafolio de proyectos",
            text1: "Proyectos de los que hemos formado parte",
            text2: "Llena el formulario con toda confianza, tus datos están protegidos",
            title2: "Sistema de gestión de practicantes",
            text3: "Para estudiantes de la facultad de medicinass",
            text4: "Proyectos personales",
            text5: "Modelo de Inteligencia Artificial para la materia",
            text6: "Elementos dinámicos y texto",

            text7: "Adivina el número para ganar",
            text8: "Portal de tienda con productos dinámicos",
            title3: "Página web",
            title4: "Predicción de estatus de obesidad",
            title5: "Juego interactivo",
            title6: "Juego del número secreto",
            description: "Con competencias avanzadas en desarrollo full stack, gestión de proyectos y metodologías ágiles.",
            footer_thanks: "Gracias por visualizar nuestro portafolio.",
            footer_rights: "© 2025 Nuestro Portafolio. Todos los derechos reservados."
        },
        en: {
            Bienvenida: "Our Portfolio",
            home: "Home",
            about: "About us",
            projects: "Projects",
            contact_us: "Contact",
            title1: "Our project portfolio",
            text1: "Projects we have been part of",
            text2: "Fill out the form with confidence, your data is protected ",
            title2: "Internship Management System",
            text3: "For students of the Faculty of Medicine",
            text4: "Personal projects",
            text5: "Artificial Intelligence model for the subject",
            text6: "Dynamic elements and text",
            text7: "Guess the number to win",
            text8: "Store portal with dynamic products",
            title3: "Website",
            title4: "Obesity Status Prediction",
            title5: "Interactive Game",
            title6: "Number Guessing Game",
            description: "With advanced skills in full-stack development, project management, and agile methodologies.",
            footer_thanks: "Thank you for viewing our portfolio.",
            footer_rights: "© 2025 Our Portfolio. All rights reserved."
        }
    };

    // Obtener el selector de idioma
    const languageSelector = document.getElementById("language-selector");

    // Función para cambiar el idioma
    function changeLanguage(lang) {
        document.querySelectorAll("#Bienvenida").forEach(el => el.textContent = translations[lang].Bienvenida);
        document.querySelectorAll("#home").forEach(el => el.textContent = translations[lang].home);
        document.querySelectorAll("#about").forEach(el => el.textContent = translations[lang].about);
        document.querySelectorAll("#projects").forEach(el => el.textContent = translations[lang].projects);
        document.querySelectorAll("#contact_us").forEach(el => el.textContent = translations[lang].contact_us);
        document.querySelectorAll("#description").forEach(el => el.textContent = translations[lang].description);
        document.getElementById("title1").textContent = translations[lang].title1;
        document.getElementById("text1").textContent = translations[lang].text1;
        document.getElementById("text2").textContent = translations[lang].text2;
        document.getElementById("footer_thanks").textContent = translations[lang].footer_thanks;
        document.getElementById("footer_rights").textContent = translations[lang].footer_rights;

        // Guardar el idioma seleccionado en localStorage
        localStorage.setItem("selectedLanguage", lang);
    }

    // Cargar idioma guardado o establecer español por defecto
    const savedLanguage = localStorage.getItem("selectedLanguage") || "es";
    languageSelector.value = savedLanguage;
    changeLanguage(savedLanguage);

    // Detectar cambio en el selector y actualizar idioma
    languageSelector.addEventListener("change", function () {
        changeLanguage(this.value);
    });
});
