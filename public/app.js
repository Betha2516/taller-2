window.addEventListener("scroll", function () {
    var header = document.getElementById("navbar");
    header.classList.toggle("sticky", this.window.scrollY > 0);
})

document.querySelectorAll(".go-to-seccion-contacto").forEach(button => {
    button.addEventListener("click", function () {
        document.getElementById("seccion-contacto").scrollIntoView({ behavior: "smooth" });
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

// Importar Polyglot (si usas Node.js o un bundler como Webpack)
import Polyglot from 'node-polyglot';

// Si usas Polyglot directamente en el navegador, omite la línea de importación.

// Crear una instancia de Polyglot
const polyglot = new Polyglot();

// Cargar las traducciones según el idioma seleccionado
function loadTranslations(lang) {
    fetch(translations/${lang}.json)
        .then(response => response.json())
        .then(translations => {
            polyglot.extend(translations); // Cargar las traducciones en Polyglot
            updateUI(); // Actualizar la interfaz de usuario con las traducciones
        })
        .catch(error => console.error('Error loading translations:', error));
}

// Función para actualizar la interfaz de usuario con las traducciones
function updateUI() {
    document.getElementById('welcome').textContent = polyglot.t('welcome');
    document.getElementById('about').textContent = polyglot.t('about');
    document.getElementById('contact').textContent = polyglot.t('contact');
    document.getElementById('description').textContent = polyglot.t('description');
}

// Cargar el idioma por defecto (por ejemplo, inglés)
loadTranslations('en');

// Cambiar el idioma dinámicamente
document.getElementById('language-selector').addEventListener('change', (event) => {
    const selectedLang = event.target.value;
    loadTranslations(selectedLang);
});