'use strict'

let gCanvas
let gCtx

let isLineBorder = true
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

function renderMeme(imgId) {
    const meme = getMeme(imgId)
    const img = new Image()
    img.src = `./images/${meme.url}`
    var div = document.querySelector('.control-box')

    drawImg(img)
    renderText()
    setTextBorder()
}
function drawImg(img) {
    // Draw the img on the canvas
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    
}
function renderText() {
    let idx = 0
    gMeme.lines.forEach((line) => {
        const canvasWidth = gCanvas.width
        const canvasHeight = gCanvas.height
        let { txt, size, align, strokeColor, fillColor, font } = line
        gCtx.lineWidth = 2
        gCtx.strokeStyle = strokeColor
        gCtx.fillStyle = fillColor
        gCtx.textAlign = 'center'
        const isDrag = getDragStatus()
        // font height; 
        if (!isDrag) setLinePos(idx, canvasWidth, canvasHeight)
        gCtx.font = `${size}px ${font}`
        line.width = gCtx.measureText(txt).width
        if (line.width > gCanvas.width) {
            const ratio = gCanvas.width / line.width
            size *= ratio
            // if(size>15){
            gCtx.font = `${size}px ${font}`
            line.width = gCtx.measureText(txt).width
            // }
        }
        // containing the text in the canvas
        if (line.x - line.width / 2 < 0) line.x = line.width / 2
        if (line.x + line.width / 2 > gCanvas.width) line.x = gCanvas.width - line.width / 2
        if (line.y > gCanvas.height-5 ) line.y = gCanvas.height-5
        if (line.y-size < 0 ) line.y = size+3
        
        gCtx.fillText(txt, line.x, line.y) // Draws (fills) a given text at the given (x, y) position.
        gCtx.strokeText(txt, line.x, line.y) // Draws (strokes) a given text at the given (x, y) position.
    })
}

function resizeCanvas() {

    const elContainer = document.querySelector('.canvas-container')
    // Note: changing the canvas dimension this way clears the canvas
    gCanvas.width = elContainer.offsetWidth 
    gCanvas.height = elContainer.offsetWidth 
    renderMeme()
}

// INPUT FUNCTIONS ////////////////////

function onTextInput(txt) {
    // ev.preventDefault()
    setLineText(txt)
    renderMeme()
}

function openColorPalette(type){
    document.querySelector(`.${type}`).click()
}
function onStrokeColorChange(color) {
    setTextStrokeColor(color)
    renderMeme()
}
function onFillColorChange(color) {
    setTextFillColor(color)
    renderMeme()
}
function onFontIncrease() {
    setFontSize(1)
    renderMeme()
}
function onFontChange(font){
    setFont(font)
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
function onAddEmoji(emoji){
addLine(emoji.innerText, true)
renderMeme()
}

function onLineDelete() {
    const meme = getCurrMeme()

    if (meme.lines.length === 1) return
    meme.lines.splice([meme.selectedLineIdx], 1)
    setLineIdx(meme.selectedLineIdx + 1)
    renderMeme()
}

function onAlignText(direction) {
    setDirection(direction)
    renderMeme()
}

function onLineAdd() {
    isLineBorder = true
    document.querySelector('.meme-text-input').value = ''
    document.querySelector('.meme-text-input').focus()
    addLine()
    renderMeme()
    setTextBorder()
}

function onSaveClick() {
    
    isLineBorder=false
    renderMeme()
    const editedMemeImg = gCanvas.toDataURL()
    updateMemeDataUrl(editedMemeImg)
    saveMemeToGallery()
    renderSavedmemesGallery()
}

// SPECIFIC SHAPE DRAW FUNCTIONSgMeme

function setTextBorder() {
    if (!isLineBorder) return
    const meme = getCurrMeme()
    let counter = 0
    meme.lines.forEach((line) => { if (line.txt) counter++ })
    if (counter === 0) return
    gCtx.beginPath()
    const { x, y, width, height } = getTextPosition(true)
    gCtx.rect(x, y, width, height);
    gCtx.stroke();
}

// DRAG AND DROP

function onDown(ev) {
    gIsCreating = false
    //Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    const line = isTextClicked(pos)
    if (!line) {
        isLineBorder = false
        renderMeme()
        return
    }
    isLineBorder = true
    setLineIdx(line.idx)
    setLineDrag(true)
    renderMeme()
    //Save the pos we start from 
    gStartPos = pos
    const meme = getCurrMeme()
    const elTxtInputBox = document.querySelector('.meme-text-input')
    elTxtInputBox.value = meme.lines[line.idx].txt
    elTxtInputBox.focus()
    document.querySelector('.meme-text-input').focus()
    document.body.style.cursor = 'grabbing'

}

function onMove(ev) {
    const meme = getCurrMeme()
    meme.lines[meme.selectedLineIdx].hasMoved=true
    const { isDrag } = meme.lines[meme.selectedLineIdx]
    if (!isDrag) return
    const pos = getEvPos(ev)
    //Calc the delta , the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveText(dx, dy)
    //Save the last pos , we remember where we`ve been and move accordingly
    gStartPos = pos
    renderMeme()
    //The canvas is render again after every move
    document.body.style.cursor = 'grab'


}

function onUp() {
    const a = document.querySelector('.meme-text-input').focus()
    setLineDrag(false)
    gIsCreating = undefined
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




// UPLOADING IMG TO BE ADDED 


// function onImgInput(ev) {
//     loadImageFromInput(ev, renderMeme)
//     const newImg = addImg(url)
//     openEditor(addImg.imgId)
//   }
  
//   // CallBack func will run on success load of the img

//   function loadImageFromInput(ev, onImageReady) {
//     const reader = new FileReader()
//     // After we read the file
//     reader.onload = function (event) {
//       let img = new Image() // Create a new html img element
//       img.src = event.target.result // Set the img src to the img file we read
//       // Run the callBack func, To render the img on the canvas

//       img.onload = onImageReady.bind(null, img)
//       // Can also do it this way:
//       // img.onload = () => onImageReady(img)
//     }
//     reader.readAsDataURL(ev.target.files[0]) // Read the file we picked
//   }


// SERVICE
// function addImg(url){
//     const NewId = gMemes[gMemes.length-1].id+1
//     const NewImg = url
//     const newImg = { id: NewId, url: url, keywords: ['funny'], }
//     gMemes.push(newImg) //for now it will not bw saved after reloading the page so it will not be aeditable after saving meme
//     setImg(newImg.id)
//     return  newImg
// }

