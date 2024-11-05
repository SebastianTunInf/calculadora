const pantalla = document.querySelector('.pantalla')
let operacionPendiente = ''
let numeroAnterior = ''
let operadorActual = null
let reiniciarPantalla = false

function agregar(valor) {
    if (reiniciarPantalla) {
        pantalla.value = ''
        reiniciarPantalla = false
    }
    if (['+'].includes(valor)) {
        if(operadorActual != null) {
            calcular();
        }
        numeroAnterior = pantalla.value
        operadorActual = valor
        reiniciarPantalla = true
    } else {
        pantalla.value += valor
    }
}

function limpiar() {
    pantalla.value = ''
    operacionPendiente = ''
    numeroAnterior = '' 
    operadorActual = null
}

function calcular() {
    if (operadorActual === null || reiniciarPantalla)
        return

    const numero1 = parseFloat(numeroAnterior)
    const numero2 = parseFloat(pantalla.value)

    if (isNaN(numero1) || isNaN(numero2)) {
        pantalla.value ='Error'
        setTimeout(limpiar(), 1500)
        return
    }

    let resultado
    
    switch(operadorActual) {
        case '+':
            resultado = numero1 + numero2
            break
        case '-':
            resultado = numero1 - numero2
            break
        case '*':
            resultado = numero1 * numero2
            break
        case '/':
            resultado = numero1 / numero2
            break
    }

    resultado = Math.round(resultado * 100000000) / 100000000

    pantalla.value = resultado
    operadorActual = null
    numeroAnterior = ''
    reiniciarPantalla = true
}

document.addEventListener('keydown', (event) => {
    event.preventDefault()
    const key = event.key

    if (/[0-9?\+\-\*\/\.]/.test(key)) {
        agregar(key)
    } else if (key === 'Enter') {
        calcular()
    } else if (key === 'Escape') {
        limpiar()
    } else if (key === 'Backspace') {
        display.value = display.value.slice(0, -1)
    }
})