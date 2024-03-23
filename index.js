$(document).ready(function () {
    // Función para mostrar el segundo corazón con una animación de fade
    // Función para mostrar el segundo corazón con una animación de fade durante 23 segundos
    function mostrarSegundoCorazon() {
        var intervalo = setInterval(function () {
            // Mostrar el segundo corazón con fade in
            $("#heart2").fadeIn(500);

            // Desvanecer el segundo corazón con fade out después de 500 ms
            setTimeout(function () {
                $("#heart2").fadeOut(500);
            }, 500);
        }, 1000); // Ejecutar la animación cada 1 segundo (1000 ms)

        // Detener la animación después de 23 segundos
        setTimeout(function () {
            clearInterval(intervalo);
        }, 20000); // 23 segundos en milisegundos
    }


    // Mostrar el segundo corazón al cargar la página

    $('#heart').click(async function () {
        var options = {};
        $('#audio').show();
        $('#audio')[0].play();
    
        // Cambiar el color de fondo a violeta
        $("#heart").toggle('fade', options, 800, function () {
            $("#fondo").toggle('scale', { percent: 0 }, 800, function () {
                $('body').css('background-color', 'violet');
    
                $("#fondo2").toggle('scale', { percent: 0 }, 1000, async function () {
                    startAnimation()
                    await mostrarMensajeConDuracion("¡Hola Raquelita!", 2000); 
                    await mostrarMensajeConDuracion("¿Sabes? Realmente no hay mucho que pueda decirte ya", 5000);
                    await mostrarMensajeConDuracion("Te he dicho absolutamente todo lo que siento por ti", 5000); 
                    await mostrarMensajeConDuracion("Pero aún así, no me canso de decírtelo", 4000); 
                    await mostrarMensajeConDuracion("Yo... te quiero mucho de verdad niña", 5000);
                    // Mostrar el segundo corazón después de que se muestren todos los mensajes
                    mostrarSegundoCorazon();
    
                    // Después de 23 segundos, comenzar a mostrar los mensajes
                    setTimeout(async function() {
                       
                        await mostrarMensajeConDuracion("De verdad me gustas mucho, no tienes una idea que tanto, me gusta tu estilo, tu figura, tu carita y tu forma de ser...", 16000); 
                        await mostrarMensajeConDuracion("Eres una muejer fuerte, que trata de dar siempre su mejor cara aun que no este del todo bien.", 10000);
                        await mostrarMensajeConDuracion("Supiste afrontar todo lo que la vida te puso, haz sabido ir creciendo como persona aun estando sola", 12500); 
                        await mostrarMensajeConDuracion("Pero ya no tiene pq ser asi niña, se que tu no vez una relacion conmigo, al menos no aun jsjsjs pero se que me tienes tantita confianza y quiero que sepas que mientras yo este aqui nunca mas tendras por que sentirte sola", 23000); 
                        await mostrarMensajeConDuracion("De verdad quiero que siempre te sientas querida\n cuidada pero sobre todo que nunca te sientas sola", 13000);
                        await mostrarMensajeConDuracion("Aqui voy a estar siempre para ti, por que como no me canzo de cerite... TE QUIERO", 10000);
                        await mostrarMensajeConDuracion("No se que tienes, no se que me hace sentir asi, pero se que tienes algo que hizo que te apreciara mucho", 12000);
                        await mostrarMensajeConDuracion("Eres una persona con una luz muy bonita, una persona por la que de verdad vale la pena luchar y una que quiero tener a mi lado de la forma que sea", 13000);
                        await mostrarMensajeConDuracion("Si, estoy enamorado de ti, pero tambien se que tienes problemas en tu casa, que hay cosas que ahora mismo no controlas y no tienees pq sentirte presionada con esto", 15000);
                        await mostrarMensajeConDuracion("No es algo que hago para meterte presion o lo que sae, simplemente quiero volvertelo a decir, las veces que sean necesarias", 12000);
                        await mostrarMensajeConDuracion("Yo te quiero, te quiero demasiado, me haces muy feliz y espero yo tambien hacerte feliz a ti algun dia...", 12000);
                    }, 23000); // 23 segundos en milisegundos
                  
                });
            });
        });
    });
    

    function mostrarMensajeConDuracion(mensaje, duracion) {
        return new Promise(resolve => {
            escribirMensaje(mensaje); // Mostrar el mensaje

            setTimeout(function () {
                $("#texto").fadeOut('slow', function () { // Desvanecer el mensaje hacia arriba al finalizar la duración
                    $(this).text("").show(); // Vaciar el contenido del div de texto y mostrarlo
                    resolve(); // Resolver la promesa después de que termine la animación de desvanecimiento
                });
            }, duracion);
        });
    }

    function escribirMensaje(mensaje) {
        $("#texto").text(""); // Vaciar el contenido del div de texto

        var i = 0;
        var intervalo = setInterval(function () {
            $("#texto").append(mensaje.charAt(i)); // Agregar un carácter del mensaje
            i++;
            if (i > mensaje.length) {
                clearInterval(intervalo); // Detener la animación cuando se haya escrito todo el mensaje
            }
        }, 80); // Intervalo de tiempo entre cada carácter (velocidad de escritura)
    }
});

// Variables globales
let N = 8; // Total de flores
let groupSize = 3; // Tamaño del grupo que caerá a la vez
let delayBetweenGroups = 1000; // Retardo entre grupos en milisegundos (1 segundo)
let currentFlowers = 0; // Contador para saber cuántas flores se han inicializado
let flowers = []; // Array para almacenar los objetos Flower

// Definiciones de espacios de nombres y dimensiones iniciales
let w3 = "http://www.w3.org/";
let svgNS = w3 + "2000/svg";
let xlinkNS = w3 + "1999/xlink";
let w = window.innerWidth;
let h = window.innerHeight;

// Función constructora para Flower
function Flower(x, y, r, dx, dy) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.dx = dx;
  this.dy = dy;
  let el = (this.element = document.createElementNS(svgNS, "use"));
  this.setTransforms();
  el.setAttributeNS(xlinkNS, "href", "#flower"); // Asegúrate de tener un elemento SVG con id="flower"
  document.querySelector('svg').appendChild(el);
}

// Método para establecer las transformaciones de una Flor
Flower.prototype.setTransforms = function() {
  this.element.setAttribute("transform", "translate(" + this.x + "," + this.y + ") rotate(" + this.r + ")");
};

// Función para inicializar grupos de flores
function initializeFlowerGroup() {
  for (let i = 0; i < groupSize && currentFlowers < N; i++) {
    let flower = new Flower((w * Math.random()) | 0, -50, 360 * Math.random(), ((Math.random() * 5) | 0) - 2, 1 + Math.random() * 2);
    flowers.push(flower);
    currentFlowers++;
  }
  if (currentFlowers < N) {
    setTimeout(initializeFlowerGroup, delayBetweenGroups);
  }
}

// Función de animación para las flores
function animateFlowers() {
  flowers.forEach(flower => {
    flower.y += flower.dy;
    if (flower.y > h + 50) { // Si la flor sale del área visible por abajo
      flower.y = -50; // La reinicia por arriba
      flower.x = (w * Math.random()) | 0; // En una posición x aleatoria
    }
    flower.setTransforms();
  });

  requestAnimationFrame(animateFlowers);
}

// Iniciar la animación
function startAnimation() {
  document.querySelectorAll('svg').forEach(svg => svg.style.display = 'block');
  initializeFlowerGroup(); // Inicia la creación de grupos de flores
  requestAnimationFrame(animateFlowers); // Inicia la animación de las flores
}

// Manejador de evento para ajustar las dimensiones cuando la ventana se redimensiona
window.onresize = function() {
  w = window.innerWidth;
  h = window.innerHeight;
  document.querySelector('svg').setAttribute("viewBox", "0 0 " + w + " " + h);
};

