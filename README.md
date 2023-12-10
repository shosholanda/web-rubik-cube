# web-rubik-cube
Proyecto final de la materia de graficación por computadora

¡Arma el cubo de rubik! ¿Serás capaz de lograrlo?

## Acerca de
Esta aplicación es un simple cubo rubik desarrollado a base de WebGL que usa OpenGL para mostrar gráficos en 3D
Parece ser una tarea fácil ya que todos son cubos, pero en realidad no lo fue tanto.
La idea es poder resolverlo en el menor tiempo posible. 

Todavía hay muchas cosas que están en desarrollo. Desde optimización hasta funcionalidades para crear una app disfrutable

Autor: [Davidshiro Pichu](https://github.com/shosholanda)
Todas las texturas han sido creadas utilizando **GIMP** y modelos usando **Blender** de mi misma autoría excepto por el código propocionado por el profesor *Joel Espinosa Longi*
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
Debido a falta de tiempo e imaginación, las caras del cubo giran todas a 90°. Los controles son:

- Girar vista: Click derecho y arrastrar
- Zoom: Rueda del mouse
- Girar cara: Click izquierdo y arrastrar en la posición deseada a girar.


Resolución
- Resolver con el teclado donde cada tecla es un giro en la notación UDFBRL y sus contrapartes usando *Shift*

El botón de revolver generará un estado del cubo rubik válido aleatorio para poder resolver. 
Se cuenta el tiempo y el número de movimientos en armarlo. (En desarrollo)

Una vez armado el cubo de rubik, se presenta una pantalla de ganador. (to-do)

### Development
Faltan las siguientes funcionalidades (soy un poco ambicioso):

- Optimizar carga de texturashttps://github.com/shosholanda/web-rubik-cube
- Cambiar vértices a los de Cube.blend
- Hacer brillosas las áreas negras del cubo.
- Juntar Center, Edge, Vertex dentro del mismo Cubie aplicando traslación
- Mover capas de enmedio
- Giro de caras utilizando el mouse.
- Cambiar cara frontal por la cara que más se vea.
- Crear animación rápida de cuando se aplica un giro a una cara. 
- Girar la cámara TrackBall en todos los ángulos (sin limitarse a 90°)
- Des-revolver el cubo reiniciando la transformación inicial de cada Cubie
- Verificar si el cubo está armado
- Contador de tiempo.
- Puntuaciones de jugadores.
- Algoritmo de resolución (Tesis)
- Creacion de varios cubos de N tamaño (Generalización)

## Comentarios del curso.

Muy bueno, superó mis espectativas. Aunque sí es complicado entenderle al principio primero a JS y luego a GLSL. 

Me impresiona mucho cómo de simples puntos (números, arreglos de números) podemos construir tantas cosas. Ahora sé cómo es que realmente funciona blender y todos esos programas de 3D además de que las posibilidades de crear cualquier cosa son infinitas, y el límite es la imaginación. Puedo concluir que nuestra realidad es solo un caso particular del álgebra lineal ya que descubrí (debido a los errores en código) que es posible crear nuevos mundos donde no se cumpla nuestras reglas de la realidad.

Me hubiera gustado aprender GLSL antes de la api de WebGL o sea compilado desde la computadora y luego ya pasarse a WebGL, creo que sería más fácil entender a la API. Y aunque no estuve casi en las clases porque #chamba, aprendí demasiado por los videos y códigos. Esta es mi última materia y creo que es mi favorita. 


!Muchas gracias!