'use strict'

let gCanvas
let gCtx

// let cuur

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']


function initCanvas() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')
    initEventListeners()
    // resizeCanvas()
}
// EVENT LISTENERS////////////
function initEventListeners() {
    gCanvas.addEventListener('mousedown', canvasClicked)
}





function canvasClicked(ev) {
    console.log(ev);
    const clickedText = gMeme.lines.find(line => {
        // Check if the click coordinates are inside the bar coordinates

        return ev.offsetX > star.x && ev.offsetX < star.x + BAR_WIDTH &&
            ev.offsetY > star.y && ev.offsetY < star.y + star.rate
    })
}



function renderMeme(imgId) {
    const meme = getMeme(imgId)
    const img = new Image()
    img.src = `./images/${meme.url}`
    var div = document.querySelector('.control-box')

    drawImg(img)
}
function drawImg(img) {
    // Draw the img on the canvas
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    renderText()

}
function renderText() {
    let idx = 0
    gMeme.lines.forEach((line) => {
        const canvasWidth = gCanvas.width
        const canvasHeight = gCanvas.height
        const { txt, size, align, color } = line
        gCtx.lineWidth = 2
        gCtx.strokeStyle = color
        gCtx.fillStyle = 'black'
        gCtx.textAlign = align

        // font height; 
        setLinePos(idx, canvasWidth, canvasHeight)
        console.log(line);

        gCtx.font = `${size}px Arial`

        gCtx.fillText(txt, line.x, line.y) // Draws (fills) a given text at the given (x, y) position.
        gCtx.strokeText(txt, line.x, line.y) // Draws (strokes) a given text at the given (x, y) position.
        line.width = gCtx.measureText(txt).width
        console.log(gMeme.lines);
        idx++
    })

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


// INPUT FUNCTIONS ////////////////////

function onTextInput(txt) {
    // ev.preventDefault()
    setLineText(txt)
    renderMeme()
}

function onStrokeColorChange(color) {
    setTextColor(color)
    renderMeme()
}
function onFontIncrease() {
    setFontSize(1)
    renderMeme()
}
function onFontDecrease() {
    setFontSize(-1)
    renderMeme()
}
function onSwitchLines() {
    setLineIdx()
}

// SPECIFIC SHAPE DRAW FUNCTIONS

function drawText(text, x, y) {
    const size = gMeme.lines[gMeme.selectedLineIdx].size
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'brown'
    gCtx.fillStyle = 'black'

    gCtx.font = `2px Arial`
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



