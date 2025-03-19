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
export const añadirElemento = async (proj_name) => {
    try {
        const { data, error } = await supabase
            .from('list_projects')
            .insert({ project: proj_name });

        if (error) throw error;

        console.log('Inserción exitosa: ', data);
        return { data: data, error: null };

    } catch (error) {
        console.error('Error al insertar datos:', error.message);
        return { data: null, error };
    }
};

// Eliminar proyecto de la tabla list_projects
export const eliminarProyecto = async (id) => {
    try {
        const response = await supabase
            .from('list_projects')
            .delete()
            .eq('id', id);

        // Puedes acceder a los datos y errores así:
        const { data, error } = response;

        if (error) throw error;

        console.log('Eliminación exitosa: ', data);
        return { data, error: null };

    } catch (error) {
        console.error('Error al eliminar datos:', error.message);
        return { data: null, error };
    }
};