/*Variáveis*/
let slots = document.querySelectorAll(".quadradinho")
let key = ""
let objectSlots = {}
for(let i=0; i<slots.length; i++){
    objectSlots[slots[i].getAttribute("data-key")] = ""
}
let currentPlay = ""
let slotsContainer = document.querySelector(".quadradao")
let arrayWins = []
let isWin = false
let arrayFull = []
let isFull = false
let ganhador = document.querySelector(".ganhador")
let gameOn = true
let reset = document.querySelector(".botao")


/*Funções*/
function checkTurn(){
    isCircleTurn = slotsContainer.classList.contains(".circle")
    if(isCircleTurn){
        currentPlay = "O"
        slotsContainer.classList.remove(".circle")
    }else{
        currentPlay = "X"
        slotsContainer.classList.add(".circle")
    }
}

function checkWin(){
    return arrayWins.some(function(item){
        return item.every(function(element){
            return element == currentPlay
        })
    })
}

function checkFull(){
    arrayFull = [...slots]
    return arrayFull.every(function(item){
        return item.innerHTML != ""
    })
}


function clickSlot(e){
    if(gameOn){
        /*Colocar o X ou O*/
        if(e.target.classList.contains("quadradinho") && e.target.innerHTML == ""){
            checkTurn()
            key = e.target.getAttribute("data-key")
            objectSlots[key] = currentPlay
            e.target.innerHTML = objectSlots[key]
        }
    
        /*Verificar ganhador*/
        arrayWins = [
            /*horizontal*/
            [objectSlots.a1, objectSlots.a2, objectSlots.a3], [objectSlots.b1, objectSlots.b2, objectSlots.b3], [objectSlots.c1, objectSlots.c2, objectSlots.c3],
            /*Vertical*/
            [objectSlots.a1, objectSlots.b1, objectSlots.c1], [objectSlots.a2, objectSlots.b2, objectSlots.c2], [objectSlots.a3, objectSlots.b3, objectSlots.c3],
            /*Diagonais*/
            [objectSlots.a1, objectSlots.b2, objectSlots.c3], [objectSlots.a3, objectSlots.b2, objectSlots.c1]
        ]
        
        isWin = checkWin()
        isFull = checkFull()
        if(isWin){
            ganhador.innerHTML = `O vencedor é ${currentPlay}`
            gameOn = false
            reset.style.display = "block"
        }else if(isFull){
            ganhador.innerHTML = `Empate!`
            gameOn = false
            reset.style.display = "block"
        }
    }
}

function restart(){
    key = ""
    for(let i=0; i<slots.length; i++){
        objectSlots[slots[i].getAttribute("data-key")] = ""
    }
    currentPlay = ""
    arrayWins = []
    isWin = false
    arrayFull = []
    isFull = false
    gameOn = true
    ganhador.innerHTML = ""
    let array = [...slots]
    array.forEach(function(item){
        item.innerHTML = ""
    })
}

/*Eventos*/
slots.forEach(function(item){
    item.addEventListener("click", clickSlot)
})

reset.addEventListener("click", restart)
