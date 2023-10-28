export const formatDate = date => {
  // Crear un objeto de date a partir de la cadena
  const dateObj = new Date(date);

  // Obtener el día, mes y año
  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObj.getFullYear();

  // Formatear la date en el formato "dd-mm-yyyy"
  const dateFormateada = `${year}-${month}-${day}`;

  return dateFormateada;
};