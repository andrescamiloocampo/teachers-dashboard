export const deleteTeacher = async (id: string): Promise<void> => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    try {
      // Cambia la ruta para eliminar al profesor, no un horario
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/teachers/${id}`, {
        method: 'DELETE',
        headers,
      });
  
      if (!response.ok) {
        throw new Error('Fallo eliminando el profesor');
      }
  
      // Si la respuesta es correcta, no es necesario hacer nada aquí
      return;
    } catch (error) {
      console.log(error);
      throw error;  // Lanza el error para que el componente que llame la función pueda manejarlo
    }
  };
  