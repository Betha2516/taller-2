
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
// Crear una instancia de Polyglot
const polyglot = new Polyglot();

// Cargar las traducciones según el idioma seleccionado
function loadTranslations(lang) {
    fetch(`translations/${lang}.json`)
        .then(response => response.json())
        .then(translations => {
            polyglot.extend(translations); // Cargar las traducciones en Polyglot
            updateUI(); // Actualizar la interfaz de usuario con las traducciones
        })
        .catch(error => console.error('Error loading translations:', error));
}

// Función para actualizar la interfaz de usuario con las traducciones
function updateUI() {
    // Actualizar textos en la interfaz
    document.getElementById('Bienvenida').textContent = polyglot.t('Bienvenida');
    document.getElementById('about').textContent = polyglot.t('about');
    document.getElementById('contact').textContent = polyglot.t('contact');
    document.getElementById('description').textContent = polyglot.t('description');
    document.getElementById('projects').textContent = polyglot.t('projects');
    document.getElementById('contact_us').textContent = polyglot.t('contact_us');
    document.getElementById('portfolio_title').textContent = polyglot.t('portfolio_title');
    document.getElementById('portfolio_subtitle').textContent = polyglot.t('portfolio_subtitle');
    document.getElementById('footer_thanks').textContent = polyglot.t('footer_thanks');
    document.getElementById('footer_rights').textContent = polyglot.t('footer_rights');
}

// Cargar el idioma por defecto (por ejemplo, español)
let savedLang = localStorage.getItem('language') || 'es';
loadTranslations(savedLang);
document.getElementById('language-selector').value = savedLang;

document.getElementById('language-selector').addEventListener('change', (event) => {
    const selectedLang = event.target.value;
    localStorage.setItem('language', selectedLang); // Guardar la preferencia del idioma
    loadTranslations(selectedLang);
});