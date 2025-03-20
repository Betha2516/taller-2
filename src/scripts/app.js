import '../styles.css';
import '../stylus/stylus.styl';
import './darkmode.js';
import './index.js';
import { crearNuevoUsuario } from "./supabase.js";
import { supabase } from "./supabase";

const registerForm = document.getElementById("registerForm")
const loginForm = document.getElementById("loginForm")

if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(registerForm);
        const username = formData.get("nombre").trim();
        const email = formData.get("correo").trim();
        const celular = formData.get("celular").trim();
        const tipoCliente = formData.get("tipoCliente").trim();
        const password = formData.get("password").trim();
        const confirmPassword = formData.get("confirmPassword").trim();

        if (!username || !email || !celular || !password || !confirmPassword) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        const { data, error } = await crearNuevoUsuario(username, email, celular, tipoCliente, password);

        if (error) {
            alert(`Error al registrar usuario: ${error.message}`);
            return;
        }

        alert("Usuario registrado con éxito");
        registerForm.reset();
        location.href = "index.html"; // Redirigir al login
    });
}

if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(loginForm);
        const email = formData.get("email").trim();
        const password = formData.get("password").trim();

        if (!email || !password) {
            alert("Por favor, ingresa tu correo y contraseña.");
            return;
        }

        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            alert("Credenciales incorrectas. Verifica tu correo y contraseña.");
            return;
        }

        // Guardar token en localStorage
        localStorage.setItem("token", data.session.access_token);
        localStorage.setItem("user_email", email);

        // Redirigir al usuario al panel de control
        location.href = "panel_control.html";
    });
}


// Verificar si el usuario está autenticado en el panel de control
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    if (!token && window.location.pathname.includes("panel_control.html")) {
        location.href = "index.html";
    }
});

// Obtener elementos para mostrar en la página post-login, con filtro.
/* export const obtenerCienElementos = async (token, filtro = '') => {
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
}; */

window.addEventListener("scroll", function () {
    var header = document.getElementById("navbar");
    header.classList.toggle("sticky", this.window.scrollY > 0);
})

document.querySelectorAll(".go-to-seccion-contacto").forEach(button => {
    button.addEventListener("click", function () {
        document.getElementById("seccion-contacto").scrollIntoView({ behavior: "smooth" });
    });
});

(async () => {
    const createProjectHtml = (project) => {
        const projectHtml = document.createElement('div');
        projectHtml.classList.add("list-group-item", "list-group-item-action");
        projectHtml.style = "cursor: pointer;";

        const projectContent = `
        <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1 text-capitalize">${project.nombre}</h5>
            <small class="text-capitalize">${project.precio} USD</small>
        </div>
        <p class="mb-1 text-capitalize">${project.descripcion}</p>
        <button onclick="eliminarProyecto('${project.id}')">Eliminar</button>
        `;

        projectHtml.innerHTML = projectContent;
        return projectHtml;
    };

    const token = localStorage.getItem("token");

    if (!token) {
        location.href = "/login";
        return;
    }

    try {
        const projects = await fetch(
            "https://ybhuilmbimynlforwxqn.supabase.co/rest/v1/projects?select=*",
            {
                headers: {
                    "Content-Type": "application/json",
                    "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliaHVpbG1iaW15bmxmb3J3eHFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExODg2NTEsImV4cCI6MjA1Njc2NDY1MX0.gBJidRNfK7k7ZgS54IYKQEerQKgNLeTDoWQ1RJd_uH4",
                    "Authorization": `Bearer ${token}`
                },
            }
        ).then(res => {
            if (res.status >= 400) {
                throw new Error(res.status);
            }
            return res.json();
        });

        const projectList = document.getElementById("projectList");

        projects.forEach(project => {
            const projectHtml = createProjectHtml(project);
            projectList.append(projectHtml);
        });
    } catch (error) {
        alert("Ocurrió un error al obtener los proyectos");
    }
})();

// Manejar el formulario de agregar proyecto
const projectForm = document.getElementById("projectForm");

if (projectForm) {
    projectForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(projectForm);
        const nombre = formData.get("nombre").trim();
        const descripcion = formData.get("descripcion").trim();
        const precio = parseFloat(formData.get("precio"));

        if (!nombre || !descripcion || isNaN(precio)) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        const { data, error } = await agregarProyecto(nombre, descripcion, precio);

        if (error) {
            alert(`Error al agregar proyecto: ${error.message}`);
            return;
        }

        alert("Proyecto agregado con éxito");
        projectForm.reset();
        location.reload();
    });
}
