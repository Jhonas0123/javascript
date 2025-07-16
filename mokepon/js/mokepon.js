let ataqueJugador
let ataqueEnemigo

function iniciarJuego(){
    let botonMascotaJugador = document.getElementById('boton-mascota')
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    let botonFuego = document.getElementById('boton-fuego')
    botonFuego.addEventListener('click', ataqueFuego)
    let botonAgua = document.getElementById('boton-agua')
    botonAgua.addEventListener('click', ataqueAgua)
    let botonTierra = document.getElementById('boton-tierra')
    botonTierra.addEventListener('click', ataqueFuego)

}
function seleccionarMascotaJugador(){
    let inputhipodoge = document.getElementById('hipodoge')
    let inputcapipepo = document.getElementById('capipepo')
    let inputratigueya = document.getElementById('ratigueya')
    let spamMascotaJugador = document.getElementById('mascota-jugador')

    if(inputhipodoge.checked) {
        spamMascotaJugador.innerHTML = 'hipodoge'
    } else if(inputcapipepo.checked) {
        spamMascotaJugador.innerHTML = 'capipepo'
    } else if(inputratigueya.checked) {
        spamMascotaJugador.innerHTML = 'ratigueya'
    } else {
        alert('selecciona una mascota')
    }
    seleccionarMascotaEnemigo()
        
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatorio = aleatorio(1,3)
    let spanMascotaEnemigo = document.getElementById("mascota-enemigo")

    if(mascotaAleatorio == 1) {
        spanMascotaEnemigo.innerHTML = 'hipodoge'
    } else if (mascotaAleatorio == 2) {
        spanMascotaEnemigo.innerHTML = 'capipepo'
    } else {
        spanMascotaEnemigo.innerHTML = 'ratiqueya'
    }

}

function ataqueFuego(){
    ataqueJugador = 'FUEGO'
    ataqueAleatorioEnemigo()
}
function ataqueAgua(){
    ataqueJugador = 'AGUA'
    ataqueAleatorioEnemigo()
}
function ataqueTierra(){
    ataqueJugador = 'TIERRA' 
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(1,3)

    if (ataqueAleatorio == 1){
        ataqueEnemigo = "FUEGO"
    } else if(ataqueAleatorio ==2){
        ataqueEnemigo = "AGUA"
    } else {
        ataqueEnemigo = "TIERRA"
    }
    crearMensaje()

}

// me quede en esta linea
function combate(){
    if(pc == ataqueJugador){
        alert("empate")
    } else if(a == 1 && pc == 3){
        alert('ganaste')
    }
}

function crearMensaje(){
    let sectionMensajes = document.getElementById('mensajes')
    let parrafo = document.createElement('p')
    parrafo.innerHTML = 'Tu mascota ataco con ' + ataqueJugador + ', las mascotas del enemigo ataco con ' + ataqueEnemigo + ' - pendiente'
    sectionMensajes.appendChild(parrafo)
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', iniciarJuego)