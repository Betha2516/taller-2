console.log("Dark mode script loaded!");
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