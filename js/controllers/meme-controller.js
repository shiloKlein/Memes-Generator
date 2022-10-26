'use strict'

let gCanvas
let gCtx

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']


function initCanvas() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')
    // resizeCanvas()
}

function renderMeme(){
    console.log('render meme');
    const meme = getMeme()
    const img = new Image()
    img.src =`./images/${meme.url}`
    var div = document.querySelector('.control-box')
    console.log(gCanvas.width, gCanvas.height);
    
    renderImg(img)
}
function renderImg(img) {
    // Draw the img on the canvas
    console.log(img);
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    renderText()
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'brown'
    gCtx.fillStyle = 'black'

    gCtx.font = '40px Arial'
  
    }
    function renderText(){
        const width = gCanvas.width
        const height = gCanvas.height
        console.log(width);
        gCtx.lineWidth = 2
        gCtx.strokeStyle = 'brown'
        gCtx.fillStyle = 'black'
        gCtx.textAlign = 'center'
        var txt = 'this is trump'
    
        gCtx.font = '40px Arial'
        gCtx.fillText(txt, width/2, 40) // Draws (fills) a given text at the given (x, y) position.
        gCtx.strokeText(txt, width/2, 40) // Draws (strokes) a given text at the given (x, y) position.
        var q = gCtx.measureText(txt).width
        console.log(q);
    }

function resizeCanvas() {

    const elContainer = document.querySelector('.canvas-container')
    // Note: changing the canvas dimension this way clears the canvas
    gCanvas.width = elContainer.offsetWidth
    // console.log(elContainer);
    // console.log(gCanvas.width);
    // Unless needed, better keep height fixed.
    gCanvas.height = elContainer.offsetHeight
}


function onTextInput(ev, text) {
    ev.preventDefault()

    drawText(text, gCanvas.width / 2, 30)
}

// SPECIFIC SHAPE DRAW FUNCTIONS

function drawText(text, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'brown'
    gCtx.fillStyle = 'black'

    gCtx.font = '40px Arial'
    gCtx.fillText(text, x - 40, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x - 40, y) // Draws (strokes) a given text at the given (x, y) position.
}

// HELPER FUNCTIONS

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }

    if (TOUCH_EVS.includes(ev.type)) {
        //soo we will not trigger the mouse ev
        ev.preventDefault()
        //Gets the first touch point
        ev = ev.changedTouches[0]
        //Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}



