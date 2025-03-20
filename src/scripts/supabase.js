import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cplmwzravtgwqtwckpkj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwbG13enJhdnRnd3F0d2NrcGtqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwNDg0NTQsImV4cCI6MjA1NzYyNDQ1NH0.C_H150z98w7rF0I3bFW6fL1OlVpwzc8W0Qv4gRnq504'
const supabase = createClient(supabaseUrl, supabaseKey)

// Revisar si hay un token guardado
const token = localStorage.getItem("access_token");

if (token) {
    supabase.auth.setSession({
        access_token: token,
        refresh_token: token
    });
}

// Crear usuario en auth de supabase.
export const crearUsuarioSignUp = async (username, email, password) => {
    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    username: username
                }
            }
        });

        if (error) {
            alert("Ha ocurrido un error. Intentalo nuevamente.");
            return { data: null, error };
        }

        return { data, error: null };

    } catch (err) {
        alert("Ocurrió un error inesperado. Inténtalo nuevamente.");
        return { data: null, error: err };
    }
}

// Verificar usuario en auth de supabase.
export const loginUsuario = async (email, password) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            alert("Credenciales incorrectas. Por favor, verifica tu correo y contraseña.");
            return { data: null, error };
        }

        console.log("Inicio de sesión exitoso:", data);
        alert("Inicio de sesión exitoso. Redirigiendo al panel de control...");
        return { data, error: null };

    } catch (err) {
        alert("Ocurrió un error inesperado. Inténtalo nuevamente.");
        return { data: null, error: err };
    }
}

// Verificación de credenciales (para login)
export const obtenerDatosCredenciales = async (username) => {

    try {
        const { data, error } = await supabase
            .from('page_users')
            .select('username, password')
            .eq('username', username);

        if (error) throw error;

        if (data.length === 0) {
            console.log('No se encontraron coincidencias.');
            return { data: null, error: 'No se encontraron coincidencias.' };
        }

        console.log('Selección exitosa: ', data);
        return { data: data, error: null };

    } catch (error) {
        console.error('Error al seleccionar datos: ', error.message);
        return { data: null, error };
    }
}

// Añadir proyecto a la tabla list_projects
export const agregarProyecto = async (nombre, descripcion, precio) => {
    try {
        const { data, error } = await supabase
            .from('projects')
            .insert({ nombre, descripcion, precio });

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        return { data: null, error };
    }
};

// Registrar usuario en la base de datos (Perfecto para poner en el register)
export const crearNuevoUsuario = async (username, email) => {
    try {
        const { data, error } = await supabase
            .from('page_users')
            .insert({ username: username, email: email});

        if (error) throw error;

        return { data: data, error: null };

    } catch (error) {
        console.error('Error al insertar datos:', error.message);
        return { data: null, error };
    }
};

export const obtenerProyectos = async () => {
    try {
        const { data, error } = await supabase
            .from('projects')
            .select('*');

        if (error) throw error;
        return data;
    } catch (error) {
        return [];
    }
};

export const eliminarProyecto = async (id) => {
    try {
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id);

        if (error) throw error;
        alert("Proyecto eliminado");
        location.reload();
    } catch (error) {
        alert("Error al eliminar proyecto");
    }
};
