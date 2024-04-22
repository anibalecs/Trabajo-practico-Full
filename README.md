-Las variables de entorno del .env son: 
PORT=8080
DB_URI="mongodb+srv://anibalecs:ae240105@cluster0.vrdce1j.mongodb.net/TpFullStack?retryWrites=true&w=majority&appName=Cluster0" 
SECRET_KEY_TOKEN="1336547885652458"

-Las librerías que se requieren instalar para su funcionamiento se encuentran en el package.json.

-Para probar los endpoints estuve utilizando el bearer token, por ello en el middleware de verifyToken le agregué una línea de código para eliminar la palabra que le agrega el postman; el resto se prueba de forma normal, solo cabe destacar que en muchas funciones el id del usuario es obtenido del jwtToken, para así poder aplicar dichas funciones para ese preciso usuario y evitar que otros usuarios puedan edita o cambiar información referente a otros usuarios.

-Además le agregué un middleware de administrador para que solo los administradores puedan acceder a ciertas funciones, al igual que para convertir otros usuarios en administradores se debe otorgar esa modificación a partir del usuario administrador principal, es decir solo los usuarios administradores pueden convertir o cambiarle el rol a los usuarios.