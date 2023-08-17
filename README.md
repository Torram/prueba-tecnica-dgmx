# PRUEBA Raymundo Torres Ramírez

## Problemas presentados

- La consulta con la función _fetch_ presentaba un conflicto con la url utilizando la ruta relativa. Cambié por la ruta completa y se añadió la dependencia _cors_ al servidor de express para evitar errores
- No se reconocía el body enviado al servidor. Se solucionó al añadir la cabecera _Content-Type_ a la función fetch.
- No se actualizaba la lista consultando desde el cliente después de realizar un metodo POST o PUT. Decidí añadir una consulta adicional a estos métodos, para que, de ser exitosa, devuelva la lista actualizada.

## Dependencias utilizadas

### Cliente

- react
- react-dom
- react-scripts

### Servidor

- express
- sequelize
- cors
- mysqsl2

## Información adicional

- Utilicé bootstrap añadiéndolo en una etiqueta link en el html de la carpeta public.
- El botón con la X se utilizaría para eliminar el registro en un entorno de trabajo normal (cambiar su estado para no mostrarse). Aquí dejé los registros visibles, solo mostrando el cambio de status.
- No utilicé los campos "createdAt" ni "UpdatedAt" ya que si los agregaba al modelo, marcaban errores de tipo.
