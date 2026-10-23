
const botonPlay = document.getElementById("boton-play");
const iconoPlay = document.getElementById("icono-play");
const cd = document.querySelector(".cd-pixel");
const audio = document.getElementById("audio-cancion");

const revelacionCancion = document.getElementById("revelacion-cancion");

audio.addEventListener("play", function () {
    revelacionCancion.classList.add("mostrar");
});


const barraProgreso = document.getElementById("barra-progreso");
const tiempoActual = document.getElementById("tiempo-actual");
const duracionMusica = document.getElementById("duracion-musica");
const textoLetra = document.getElementById("texto-letra");

// Convierte "minutos:segundos" en segundos.
function aSegundos(tiempo) {
    const [minutos, segundos] = tiempo.split(":").map(Number);
    return minutos * 60 + segundos;
}

// Letra sincronizada.
// Los tiempos son los que has indicado, expresados correctamente.
const letras = [
    { tiempo: "0:00", texto: "🎵🎵...." },
    { tiempo: "0:18", texto: "Tus palabras suenan..." },
    { tiempo: "0:21", texto: "Tuvieran demasiados significados" },
    { tiempo: "0:30", texto: "Huellas misteriosas, encuéntralas y síguelas" },
    { tiempo: "0:33", texto: "Mis sombras están acorraladas" },
    { tiempo: "0:35", texto: "Escondiéndose detrás de la luz" },
    { tiempo: "0:38", texto: "No puedo verte, pero eres la única que sabe la respuesta" },
    { tiempo: "0:40", texto: "Antes de que termine esto, quiero saberlo todo" },
    { tiempo: "0:43", texto: "Mientras más pasa el tiempo se hace más profundo" },
    { tiempo: "0:49", texto: "El espacio entre tú y yo en el pasado" },
    { tiempo: "0:55", texto: "Justo ahora" },

    { tiempo: "0:56", texto: "No me dejes, ahora cree, comienza a correr" },
    { tiempo: "1:03", texto: "No hay final, eres el latido de mi corazón" },
    { tiempo: "1:09", texto: "No importa que la lluvia caiga" },
    { tiempo: "1:12", texto: "No importa que oscuridad se esconda" },
    { tiempo: "1:16", texto: "Definitivamente te salvaré" },
    { tiempo: "1:21", texto: "No estás sola" },
    { tiempo: "1:24", texto: "Las manecillas del reloj que no deberían moverse" },
    { tiempo: "1:30", texto: "Van paso a paso moviéndose" },
    { tiempo: "1:37", texto: "Llamándome, pasando a mi lado" },
    { tiempo: "1:39", texto: "Nuestros caminos se cruzaron, todo esto fue el destino" },
    { tiempo: "1:40", texto: "O tal vez estamos comenzando una carrera" },
    { tiempo: "1:42", texto: "Si comienzas a alejarte de mí está bien" },
    { tiempo: "1:44", texto: "No te preocupes por nada, na' de nada" },
    { tiempo: "1:47", texto: "Es mi turno de ir esta vez" },
    { tiempo: "1:49", texto: "Te liberaré de tus pensamientos" },
    { tiempo: "1:50", texto: "Si tan solo pudiera regresar el tiempo, haría todo de nuevo" },
    { tiempo: "1:56", texto: "En el espacio entre la oscuridad y la luz, tú existes, llorando" },

    { tiempo: "2:03", texto: "No me dejes, yo creo, te extiendo mi mano" },
    { tiempo: "2:09", texto: "No hay final, eres mi esperanza" },
    { tiempo: "2:16", texto: "No importa que la lluvia caiga" },
    { tiempo: "2:19", texto: "No importa que oscuridad se esconda" },
    { tiempo: "2:23", texto: "Abre tus ojos y siente, no estás sola" },
    { tiempo: "2:31", texto: "🎵🎵" },

    { tiempo: "2:47", texto: "En un segundo todo desaparece dentro del pasado" },
    { tiempo: "2:53", texto: "Ahora he encontrado una razón para vivir" },
    { tiempo: "2:57", texto: "Y todo es porque te conocí" },

    { tiempo: "3:00", texto: "No me dejes, ahora cree, comienza a correr" },
    { tiempo: "3:07", texto: "No hay final, eres el latido de mi corazón" },
    { tiempo: "3:13", texto: "No importa que lluvia caiga" },
    { tiempo: "3:16", texto: "No importa que oscuridad se esconda" },
    { tiempo: "3:20", texto: "Definitivamente te salvaré" },
    { tiempo: "3:24", texto: "No estás sola" }
].map(frase => ({
    tiempo: aSegundos(frase.tiempo),
    texto: frase.texto
}));

// Busca la frase correspondiente al segundo actual.
function actualizarLetra() {
    let fraseActual = "Pulsa play y disfruta la canción conmigo... ♡";

    for (const frase of letras) {
        if (audio.currentTime >= frase.tiempo) {
            fraseActual = frase.texto;
        } else {
            break;
        }
    }

    textoLetra.textContent = fraseActual;
}

// Botón reproducir / pausar.
botonPlay.addEventListener("click", async function () {
    if (audio.paused) {
        try {
            await audio.play();
        } catch (error) {
            console.error("Error al reproducir la canción:", error);
        }
    } else {
        audio.pause();
    }
});

// Al reproducir.
audio.addEventListener("play", function () {
    cd.classList.add("girando");
    iconoPlay.src = "assets/pause.png";
    iconoPlay.alt = "Pausar";
});

// Al pausar.
audio.addEventListener("pause", function () {
    cd.classList.remove("girando");
    iconoPlay.src = "assets/play.png";
    iconoPlay.alt = "Reproducir";
});

// Al terminar.
audio.addEventListener("ended", function () {
    iconoPlay.src = "assets/play.png";
    iconoPlay.alt = "Reproducir";
    cd.classList.remove("girando");

    barraProgreso.value = 0;
    tiempoActual.textContent = "0:00";
});

// Convierte segundos a minutos:segundos.
function formatearTiempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = Math.floor(segundos % 60);

    return `${minutos}:${String(segundosRestantes).padStart(2, "0")}`;
}

// Cuando se carga la duración del audio.
audio.addEventListener("loadedmetadata", function () {
    barraProgreso.max = audio.duration;
    barraProgreso.value = 0;
    duracionMusica.textContent = formatearTiempo(audio.duration);
});

// Actualiza la barra, el tiempo y la letra.
audio.addEventListener("timeupdate", function () {
    barraProgreso.value = audio.currentTime;
    tiempoActual.textContent = formatearTiempo(audio.currentTime);
    actualizarLetra();
});

// Actualiza la letra inmediatamente al buscar otra posición.
audio.addEventListener("seeked", actualizarLetra);

// Permite adelantar y retroceder usando la barra.
barraProgreso.addEventListener("input", function () {
    audio.currentTime = Number(barraProgreso.value);
    actualizarLetra();
});

// Inicializa la letra al cargar.
actualizarLetra();
