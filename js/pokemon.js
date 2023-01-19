const sectionSelecionarAtaques = document.getElementById ("seleccionar-ataques")
const sectionBatalla = document.getElementById ("batalla")
const sectionReinicar = document.getElementById ("reiniciar")
const botonMascota = document.getElementById("boton-mascota")
const botonReiniciar = document.getElementById("botonReiniciar")
const sectionSelecionarMascotas = document.getElementById ("elige-mascota")
const sectionMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")
const spanMascotaJugador = document.getElementById("mascotaJugador")
const spanMascotaEnemigo = document.getElementById("mascotaEnemigo")
const divResultadoAtaque = document.getElementById("resultado-ataque")
const divAtaqueJugador = document.getElementById("ataque-jugador")
const divAtaqueEnemigo = document.getElementById("ataque-enemigo")
const sectionMensajes = document.getElementById("resultado-ataque")
const spanVidasJugador = document.getElementById("vidasJugador")
const spanVidasEnemigo = document.getElementById("vidasEnemigo")
const tarjetaPokemones = document.getElementById("tarjeta-pokemones")
const tarjetaDeAtaques = document.getElementById("seccion-ataques")

let jugadorId = null
let enemigoId = null
let ataqueJugador = []
let ataqueEnemigo = []
let resultadoBatalla
let victoriasJugador = 0
let victoriasEnemigo = 0
let inputHipodoge 
let inputCapipepo  
let inputRatigueya  
let inputLangostelvis 
let inputPidos  
let inputTucapalma  
let pokemones = []
let pokemonesEnemigos = []
let mascotaJugador
let mascotaJugadorObjeto
let opcionesDePokemones
let opcionesDeAtaques
let indexJugador
let indexEnemigo
let botonFuego
let botonAgua
let botonTierra
let botones = []
let lienzo = mapa.getContext("2d")
let intervalo 
let mapaBackground = new Image()
mapaBackground.src = "./assets/mokemap.png"

let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 40

const anchoMaximoDelMapa = 500

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Pokemon {
    constructor(nombre, foto, vida, fotoMapa, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.height = 40
        this.width = 40
        this.x = numeroaleatorio (0, mapa.width - this.width)
        this.y = numeroaleatorio (0, mapa.height - this.height)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadY = 0
        this.velocidadX = 0
    }
    pintarPokemon() {
        lienzo.drawImage(        
            this.mapaFoto,
            this.x,
            this.y,
            this.height,
            this.width,
        ) 
    }

}

let hipodoge = new Pokemon("Hipodoge", "./assets/mokepons_mokepon_hipodoge_attack.png", "5", "./assets/hipodoge.png")
let capipepo = new Pokemon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.png", "5", "./assets/capipepo.png")
let ratigueya = new Pokemon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.png", "7", "./assets/ratigueya.png")
let langostelvis = new Pokemon("Langostelvis", "./assets/mokepons_mokepon_langostelvis_attack.png", "6", "./assets/mokepons_mokepon_langostelvis_attack.png")
let pydos = new Pokemon("Pydos", "./assets/mokepons_mokepon_pydos_attack.webp", "6", "./assets/mokepons_mokepon_pydos_attack.webp")
let tucapalma = new Pokemon("Tucapalma", "./assets/mokepons_mokepon_tucapalma_attack.webp", "7", "./assets/mokepons_mokepon_tucapalma_attack.webp")
let hipodogeEnemigo = new Pokemon("Hipodoge", "./assets/mokepons_mokepon_hipodoge_attack.png", "5", "./assets/hipodoge.png")
let capipepoEnemigo = new Pokemon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.png", "5", "./assets/capipepo.png")
let ratigueyaEnemigo = new Pokemon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.png", "7", "./assets/ratigueya.png")


hipodoge.ataques.push(
    { nombre: "Agua 💧", id: "boton-agua" },
    { nombre: "Agua 💧", id: "boton-agua" },
    { nombre: "Agua 💧", id: "boton-agua" },
    { nombre: "Fuego 🔥", id: "boton-fuego" },
    { nombre: "Tierra 🌿", id: "boton-tierra" },
)
ratigueya.ataques.push(
    { nombre: "Fuego 🔥", id: "boton-fuego" },
    { nombre: "Fuego 🔥", id: "boton-fuego" },
    { nombre: "Fuego 🔥", id: "boton-fuego" },
    { nombre: "Agua 💧", id: "boton-agua" },
    { nombre: "Tierra 🌿", id: "boton-tierra" },
)
capipepo.ataques.push(
    { nombre: "Tierra 🌿", id: "boton-tierra" },
    { nombre: "Tierra 🌿", id: "boton-tierra" },
    { nombre: "Tierra 🌿", id: "boton-tierra" },
    { nombre: "Fuego 🔥", id: "boton-fuego" },
    { nombre: "Agua 💧", id: "boton-agua" },
)
langostelvis.ataques.push(
    { nombre: "Agua 💧", id: "boton-agua" },
    { nombre: "Agua 💧", id: "boton-agua" },
    { nombre: "Agua 💧", id: "boton-agua" },
    { nombre: "Fuego 🔥", id: "boton-fuego" },
    { nombre: "Tierra 🌿", id: "boton-tierra" },
)
pydos.ataques.push(
    { nombre: "Fuego 🔥", id: "boton-fuego" },
    { nombre: "Fuego 🔥", id: "boton-fuego" },
    { nombre: "Fuego 🔥", id: "boton-fuego" },
    { nombre: "Agua 💧", id: "boton-agua" },
    { nombre: "Tierra 🌿", id: "boton-tierra" },
)
tucapalma.ataques.push(
    { nombre: "Tierra 🌿", id: "boton-tierra" },
    { nombre: "Tierra 🌿", id: "boton-tierra" },
    { nombre: "Tierra 🌿", id: "boton-tierra" },
    { nombre: "Fuego 🔥", id: "boton-fuego" },
    { nombre: "Agua 💧", id: "boton-agua" },
)

pokemones.push(hipodoge, ratigueya, capipepo, langostelvis, pydos, tucapalma)

function iniciarJuego() {  
    sectionSelecionarAtaques.style.display = "none"
    sectionBatalla.style.display = "none"
    sectionReinicar.style.display = "none"
    sectionMapa.style.display = "none"

    pokemones.forEach(Pokemon => {
        opcionesDePokemones = `
        <input type="radio" name="mascota" id=${Pokemon.nombre}>
        <label for=${Pokemon.nombre} class="caja-mascotas">
            <p>${Pokemon.nombre}</p>
            <img src=${Pokemon.foto} alt=${Pokemon.nombre}>
        </label>
        `
        tarjetaPokemones.innerHTML += opcionesDePokemones

        inputHipodoge = document.getElementById("Hipodoge")
        inputCapipepo = document.getElementById("Capipepo")
        inputRatigueya = document.getElementById("Ratigueya")
        inputLangostelvis = document.getElementById("Langostelvis")
        inputPidos = document.getElementById("Pydos")
        inputTucapalma = document.getElementById("Tucapalma")
    });

    botonMascota.addEventListener("click", selecionarMascotaJugador) 
    botonMascota.disabled = true    

    botonReiniciar.addEventListener("click", reiniciarJuego)

    inputHipodoge.addEventListener("click", comprobarSeleccion)
    inputCapipepo.addEventListener("click", comprobarSeleccion)
    inputRatigueya.addEventListener("click", comprobarSeleccion)
    inputLangostelvis.addEventListener("click", comprobarSeleccion)
    inputPidos.addEventListener("click", comprobarSeleccion)
    inputTucapalma.addEventListener("click", comprobarSeleccion)

}

function comprobarSeleccion() {
    if((inputHipodoge.checked == true) || (inputCapipepo.checked == true) || (inputRatigueya.checked == true) || (inputTucapalma.checked == true) || (inputPidos.checked == true) || (inputLangostelvis.checked == true)) {
        botonMascota.disabled = false
        }
}

// SELECCIONAR MASCOTAS

function selecionarMascotaJugador() {
    sectionSelecionarMascotas.style.display = "none"

        if(inputHipodoge.checked) {
            spanMascotaJugador.innerHTML = inputHipodoge.id
            mascotaJugador = inputHipodoge.id
        } else if (inputCapipepo.checked) {
            spanMascotaJugador.innerHTML = inputCapipepo.id
            mascotaJugador = inputCapipepo.id
        } else if (inputRatigueya.checked) {
            spanMascotaJugador.innerHTML = inputRatigueya.id
            mascotaJugador = inputRatigueya.id
        } else if (inputLangostelvis.checked) {
            spanMascotaJugador.innerHTML = inputLangostelvis.id
            mascotaJugador = inputLangostelvis.id
        } else if (inputPidos.checked) {
            spanMascotaJugador.innerHTML = inputPidos.id
            mascotaJugador = inputPidos.id
        } else if (inputTucapalma.checked) {
            spanMascotaJugador.innerHTML = inputTucapalma.id
            mascotaJugador = inputTucapalma.id   
        } else {
            alert("Debe seleccionar una mascota")
        }

        sectionSelecionarAtaques.style.display = "none"
        sectionBatalla.style.display = "none"
        sectionMapa.style.display = "flex"

        iniciarMapa()

        extraerAtaques(mascotaJugador)
}

function selecionarMascotaEnemigo(enemigo) {    
    spanMascotaEnemigo.innerHTML = enemigo
}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < pokemones.length; i++) {
        if (mascotaJugador === pokemones[i].nombre) {
            ataques = pokemones[i].ataques            
        }      
    }
    mostraAtaques(ataques) 
}

function mostraAtaques(ataques) {
    ataques.forEach((ataque) => {
        opcionesDeAtaques = `
        <button class="botonAtaques Bataques" id=${ataque.id}> ${ataque.nombre} </button>
        `
        tarjetaDeAtaques.innerHTML += opcionesDeAtaques
    })

        botonFuego = document.getElementById("boton-fuego")
        botonAgua = document.getElementById("boton-agua")
        botonTierra = document.getElementById("boton-tierra")
        botones = document.querySelectorAll(".Bataques")

        secuenciaAtaque()
    
        // botonFuego.addEventListener("click", ataqueFuego)
        // botonAgua.addEventListener("click", ataqueAgua)
        // botonTierra.addEventListener("click", ataqueTierra)
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === ' Fuego 🔥 ') {
                ataqueJugador.push('FUEGO')
                boton.style.background = '#112f58'
                boton.disabled = true
            } else if (e.target.textContent === ' Agua 💧 ') {
                ataqueJugador.push('AGUA')
                boton.style.background = '#112f58'
                boton.disabled = true
            } else {
                ataqueJugador.push('TIERRA')
                boton.style.background = '#112f58'
                boton.disabled = true
            }
            ataqueAleatorioEnemigo()            
        })
    })
}

function numeroaleatorio(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
}  

function ataqueAleatorioEnemigo() {
        let ataqueAleatorio = numeroaleatorio(3,1)
    
        if(ataqueAleatorio == 1) {
            ataqueEnemigo.push("FUEGO")
        } else if (ataqueAleatorio == 2) {
            ataqueEnemigo.push("AGUA")
        } else if (ataqueAleatorio == 3) {
            ataqueEnemigo.push("TIERRA")
        } 
        comprobarNumeroAtaques();        
    }

function comprobarNumeroAtaques () {
        if (ataqueJugador.length === 5)
        batalla() 
}

function mostrarAmbosAtaques (jugador, enemigo) {
    indexJugador = ataqueJugador[jugador]
    indexEnemigo = ataqueEnemigo[enemigo]
}

   // BATALLA
function batalla() {
    clearInterval(intervalo)

    for (let i = 0; i < ataqueJugador.length; i++) {
        if (ataqueJugador[i] == ataqueEnemigo[i]) {
            mostrarAmbosAtaques(i, i)
            insertarMensaje()                
        } else if ((ataqueJugador[i] == "FUEGO" && ataqueEnemigo[i] == "TIERRA") || (ataqueJugador[i] == "AGUA" && ataqueEnemigo[i] == "FUEGO") || (ataqueJugador[i] == "TIERRA" && ataqueEnemigo[i] == "AGUA")) {
            mostrarAmbosAtaques(i, i)
            insertarMensaje()
            victoriasJugador++                 
        } else {
            mostrarAmbosAtaques(i, i)
            insertarMensaje()
            victoriasEnemigo++
        }   
        revisarVidas()   
    }       
}

    // INSERTAR TEXTO
function revisarVidas() {
        if (victoriasJugador === victoriasEnemigo) {
            insertarMensajeFinal("EMPATE")
        } else if (victoriasJugador > victoriasEnemigo){
            insertarMensajeFinal("🏆 ¡VICTORIA! 🏆")
        } else {
            insertarMensajeFinal("💣 DERROTA! 💣")
    }
}

function insertarMensaje() {
    listaAtaquesJugador = `
    <p>${indexJugador}</p>`

    divAtaqueJugador.innerHTML += listaAtaquesJugador

    listaAtaquesEnemigo = `
    <p>${indexEnemigo}</p>`

    divAtaqueEnemigo.innerHTML += listaAtaquesEnemigo
}

function insertarMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal

    spanVidasJugador.innerHTML = ("⚔️ " + victoriasJugador + " victorias")
    spanVidasEnemigo.innerHTML = ("⚔️ " + victoriasEnemigo + " victorias")
    
    botonFuego.disabled = true      
    botonAgua.disabled = true 
    botonTierra.disabled = true
 
    sectionReinicar.style.display = "block"      
}

function pintarCanvas() {
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height,
    )
    mascotaJugadorObjeto.pintarPokemon()
    hipodogeEnemigo.pintarPokemon()
    capipepoEnemigo.pintarPokemon()
    ratigueyaEnemigo.pintarPokemon()

    if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0) {
        revisarColision(hipodogeEnemigo)
        revisarColision(capipepoEnemigo)
        revisarColision(ratigueyaEnemigo)
    }
}


function moverArriba() {
    mascotaJugadorObjeto.velocidadY = - 5
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = + 5
}
function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = + 5
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = - 5
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case "ArrowUp":
            moverArriba()
            break
        case "ArrowDown":
            moverAbajo()
            break
        case "ArrowLeft":
            moverIzquierda()
            break
        case "ArrowRight":
            moverDerecha()
            break
        default:
            break
    }
}

function iniciarMapa() {
    mascotaJugadorObjeto = extraerJugador()
    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener("keydown", sePresionoUnaTecla)
    window.addEventListener("keyup", detenerMovimiento)
}

function extraerJugador() {
       for (let i = 0; i < pokemones.length; i++) {
        if (mascotaJugador === pokemones[i].nombre) {
            return pokemones[i]           
        }      
    }
}

function revisarColision (enemigo) {
const arribaEnemigo = enemigo.y
const abajoEnemigo = enemigo.y + enemigo.height
const izquierdaEnemigo = enemigo.x
const derechaEnemigo = enemigo.x + enemigo.width

const arribaMascota = mascotaJugadorObjeto.y
const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.height
const izquierdaMascota = mascotaJugadorObjeto.x
const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.width

    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)

    enemigoId = enemigo.id
    sectionSelecionarAtaques.style.display = "flex"
    sectionBatalla.style.display = "flex"
    sectionMapa.style.display = "none"
    selecionarMascotaEnemigo(enemigo.nombre)
}

function reiniciarJuego() {
    location.reload()
}

window.addEventListener("load", iniciarJuego)

