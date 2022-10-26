'use strict'

let gCanvas
let gCtx

let gStartPos

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']


function initCanvas() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')
    initEventListeners()
    resizeCanvas()
}
// EVENT LISTENERS////////////
function initEventListeners() {
    window.addEventListener('resize', resizeCanvas)
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
}



// function onDown(ev) {
//     console.log(ev);
//     const clickedText = gMeme.lines.find(line => {
//         // Check if the click coordinates are inside the bar coordinates

//         return ev.offsetX > star.x && ev.offsetX < star.x + BAR_WIDTH &&
//             ev.offsetY > star.y && ev.offsetY < star.y + star.rate
//     })
// }



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
    setTextBorder()

}
function renderText() {
    let idx = 0
    gMeme.lines.forEach((line) => {
        const canvasWidth = gCanvas.width
        const canvasHeight = gCanvas.height
        const { txt, size, align, strokeColor, fillColor } = line
        gCtx.lineWidth = 2
        gCtx.strokeStyle = strokeColor
        gCtx.fillStyle = fillColor
        gCtx.textAlign = align
        const isDrag = getDragStatus()
        // font height; 
        if(!isDrag)setLinePos(idx, canvasWidth, canvasHeight)

        gCtx.font = `${size}px Arial`

        gCtx.fillText(txt, line.x, line.y) // Draws (fills) a given text at the given (x, y) position.
        gCtx.strokeText(txt, line.x, line.y) // Draws (strokes) a given text at the given (x, y) position.
        line.width = gCtx.measureText(txt).width
        idx++
    })

}

function resizeCanvas() {

    const elContainer = document.querySelector('.canvas-container')
    // Note: changing the canvas dimension this way clears the canvas
    console.log(elContainer);
    gCanvas.width = elContainer.offsetWidth - 50
    gCanvas.height = elContainer.offsetWidth - 50
    console.log(gCanvas.width);
    renderMeme()
    // console.log(elContainer);
    // console.log(gCanvas.width);
    // Unless needed, better keep height fixed.
    // gCanvas.height = elContainer.offsetHeight
}


// INPUT FUNCTIONS ////////////////////

function onTextInput(txt) {
    // ev.preventDefault()
    setLineText(txt)
    renderMeme()
}

function onStrokeColorChange(color) {
    setTextStrokeColor(color)
    renderMeme()
}
function onFillColorChange(color) {
    console.log(color);
    setTextFillColor(color)
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
    renderMeme()
}

// SPECIFIC SHAPE DRAW FUNCTIONSgMeme

// function drawText(text, x, y) {
//     const size = gMeme.lines[gMeme.selectedLineIdx].size
//     gCtx.lineWidth = 2
//     gCtx.strokeStyle = 'brown'
//     gCtx.fillStyle = 'black'

//     gCtx.font = `2px Arial`
//     gCtx.fillText(text, x - 40, y) // Draws (fills) a given text at the given (x, y) position.
//     gCtx.strokeText(text, x - 40, y) // Draws (strokes) a given text at the given (x, y) position.
// }

function setTextBorder() {

    // console.log(width, height, x, y, lineIdx);
    // console.log(x-width/2, y, x+width/2, y-height);
    gCtx.beginPath()
    const { x, y, width, height } = getTextPosition(true)
    gCtx.rect(x, y, width, height);
    gCtx.stroke();
}



// HELPER FUNCTIONS



// DRAG AND DROP

function onDown(ev) {
    //Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    const line = isTextClicked(pos)
    if (!line) return
    console.log(line.idx);
    setLineIdx(line.idx)
    setLineDrag(true)
    renderMeme()
    console.log(gMeme.lines[gMeme.selectedLineIdx].isDrag);
    //Save the pos we start from 
    gStartPos = pos
    document.body.style.cursor = 'grabbing'

}

function onMove(ev) {
    const meme = getCurrMeme()
    const { isDrag } = meme.lines[meme.selectedLineIdx]
    if (!isDrag) return
    const pos = getEvPos(ev)
    console.log();
    //Calc the delta , the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    console.log(gStartPos);
    console.log(pos);
    console.log(dx,dy);
    moveText(dx, dy)
    //Save the last pos , we remember where we`ve been and move accordingly
    gStartPos = pos
    renderMeme()
    //The canvas is render again after every move
    document.body.style.cursor = 'grab'


}

function onUp() {
    setLineDrag(false)
    document.body.style.cursor = 'auto'
}

function getEvPos(ev) {

    //Gets the offset pos , the default pos
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    // Check if its a touch ev
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

// SERVICE
function isTextClicked(clickedPos) {
    console.log(clickedPos);
    const positions = getTextPosition()
    const clickedText = positions.find(textPos => {
        // Check if the click coordinates are inside the bar coordinates
        // console.log(clickedPos.x > textPos.x && clickedPos.x < textPos.x + textPos.width &&
        //     clickedPos.y > textPos.y && clickedPos.y < textPos.y + textPos.height);
        return clickedPos.x > textPos.x && clickedPos.x < textPos.x + textPos.width &&
        clickedPos.y > textPos.y && clickedPos.y < textPos.y + textPos.height
      })
      return clickedText
    //   console.log(clickedText);
    // gMeme.lines
    // const { x, y } = gMeme.lines
   
}


function setLineDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
    // gMeme.lines[gMeme.selectedLineIdx].isDrag
}

function moveText(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].x += dx
    gMeme.lines[gMeme.selectedLineIdx].y += dy
    // console.log(dx);
    console.log(gMeme.lines[gMeme.selectedLineIdx].x);
    // console.log(gMeme.lines[gMeme.selectedLineIdx].y);
}  
