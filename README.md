# web-rubik-cube
Proyecto final de la materia de graficación por computadora

## Acerca de
Autor: [Davidshiro Pichu](https://github.com/shosholanda)
Este proyecto es totalmente gratuito libre para su redistribución.
Está hecho usando la api de WebGL para ejecutarse en el navegador.


### Instrucciones
Dado que no se pueden leer las texturas directamente se debe crear un servidor de la siguiente manera en el local host:

Opción 1: Python
- python3 -m http.server

Opción 2: Nodejs
- npm install --global http-server
- http-server -c-1

Para ejecutar la aplicación es necesario ejecutar el app.sh o directamente abrir en el navegador el archivo index.html
que se encuentra en *src/index.html*7

### Controles:
Por omisión, se presenta el cubo armado, se puede jugar con sus caras y girar.

- Girar vista: Click derecho y arrastrar
- Zoom: Rueda del mouse
- Girar cara: Click izquierdo y arrastrar en la posición deseada a girar.

(Ideas)
- Resolver con el teclado donde cada tecla es un giro en la notación UDFBRL y sus contrapartes, y girar con el númerico

El botón de revolver generará un estado del cubo rubik válido aleatorio para poder resolver. 
Se cuenta el tiempo y el número de movimientos en armarlo. 

Una vez armado el cubo de rubik, se presenta una pantalla de ganador. (to-do)