import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cplmwzravtgwqtwckpkj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwbG13enJhdnRnd3F0d2NrcGtqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwNDg0NTQsImV4cCI6MjA1NzYyNDQ1NH0.C_H150z98w7rF0I3bFW6fL1OlVpwzc8W0Qv4gRnq504'
const supabase = createClient(supabaseUrl, supabaseKey)

// Registrar usuario en la base de datos (Perfecto para poner en el register)
export const crearNuevoUsuario = async (username, email, celular, tipoCliente, password) => {
    try {
        const { data, error } = await supabase
            .from('page_users')
            .insert({ username: username, email: email, celular: celular, tipoCliente: tipoCliente, password: password });

        if (error) throw error;

        console.log('Inserción exitosa: ', data);
        return { data: data, error: null };

    } catch (error) {
        console.error('Error al insertar datos:', error.message);
        return { data: null, error };
    }
};

// Verificación de credenciales (para login)
export const obtenerDatosCredenciales = async (username) => {
    try {
        const { data, error } = await supabase
            .from('characters')
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
