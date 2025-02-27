window.addEventListener("scroll", function(){
    var header = document.getElementById("navbar");
    header.classList.toggle("sticky", this.window.scrollY > 0);
})

document.querySelectorAll(".go-to-seccion-contacto").forEach(button => 
    {
        button.addEventListener("click", function () {
            document.getElementById("seccion-contacto").scrollIntoView({ behavior: "smooth" });
        });
    });


// Selecciona el botón de modo oscuro
const darkModeToggle = document.getElementById('dark-mode-toggle');

// Verifica si el modo oscuro está activo en el localStorage
const isDarkMode = localStorage.getItem('darkMode') === 'enabled';

// Aplica el modo oscuro si está activo
if (isDarkMode) {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️'; // Cambia el ícono a sol
}

// Alterna el modo oscuro al hacer clic en el botón
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    // Cambia el ícono del botón
    if (document.body.classList.contains('dark-mode')) {
        darkModeToggle.textContent = '☀️';
        localStorage.setItem('darkMode', 'enabled'); // Guarda la preferencia
    } else {
        darkModeToggle.textContent = '🌙';
        localStorage.setItem('darkMode', 'disabled'); // Guarda la preferencia
    }
});