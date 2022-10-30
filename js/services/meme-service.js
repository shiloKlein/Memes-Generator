'use strict'

const SAVED_MEMS_KEY = 'saved-mems'
var gSavedMemes = []
var gIsCreating
var gKeywords = ['funny', 'cool', 'pets', 'cat']

var emojis = ['🤧', '😵', '🤯', '🤠', '😎', '☠', '💩', '👹']
var gKeywordSearchCountMap = { funny: 0, cool: 1, pets: 3, cat: 1, }


var gMemes = [
    { id: 1, url: 'meme-imgs/1.jpg', keywords: ['funny', 'usa', 'politics'], },
    { id: 2, url: 'meme-imgs/2.jpg', keywords: ['funny', 'dog'], },
    { id: 3, url: 'meme-imgs/3.jpg', keywords: ['funny', 'dog', 'baby'], },
    { id: 4, url: 'meme-imgs/4.jpg', keywords: ['funny', 'cat', 'baby'], },
    { id: 5, url: 'meme-imgs/5.jpg', keywords: ['funny', ''], },
    { id: 6, url: 'meme-imgs/6.jpg', keywords: ['funny', ''], },
    { id: 7, url: 'meme-imgs/7.jpg', keywords: ['funny', 'eyes'], },
    { id: 8, url: 'meme-imgs/8.jpg', keywords: ['funny', ''], },
    { id: 9, url: 'meme-imgs/9.jpg', keywords: ['funny', 'baby'], },
    { id: 10, url: 'meme-imgs/10.jpg', keywords: ['funny', 'usa', 'politics',] },
    { id: 11, url: 'meme-imgs/11.jpg', keywords: ['funny', 'sport'], },
    { id: 12, url: 'meme-imgs/12.jpg', keywords: ['funny', 'tv'], },
    { id: 13, url: 'meme-imgs/13.jpg', keywords: ['funny', 'movie'], },
    { id: 14, url: 'meme-imgs/14.jpg', keywords: ['funny', 'movie'], },
    { id: 15, url: 'meme-imgs/15.jpg', keywords: ['funny', 'movie'], },
    { id: 16, url: 'meme-imgs/16.jpg', keywords: ['funny', 'politics'], },
    { id: 17, url: 'meme-imgs/17.jpg', keywords: ['funny', ''], },
    { id: 18, url: 'meme-imgs/18.jpg', keywords: ['funny', 'movie'], },
];
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'text here',
            size: 40,
            align: 'center',
            strokeColor: 'black',
            fillColor: 'white',
            font: 'impact',
            width: 0,
            x: 0,
            y: 0,
            idx: 0,
            isDrag: false,
            hasMoved: false,
            isEmoji: false
        },
    ]
}

function createMeme() {
    const id = gMemes.length + 1
    const meme = { id: i, url: `meme-imgs/${i}.jpg`, keywords: ['funny', 'cat'], }
}



function setImg(imgId) {
    gMeme.selectedImgId = imgId;
}
function setImgFromSaved(idx) {
    const savedMemes = loadFromStorage(SAVED_MEMS_KEY)
    const imgId = savedMemes[idx].selectedImgId
    setImg(imgId)
    return imgId;
}
function setcurrMeme(idx) {
    const savedMemes = loadFromStorage(SAVED_MEMS_KEY)
    gMeme = savedMemes[idx]
}

function setTextStrokeColor(color) {
    const { selectedLineIdx } = gMeme
    gMeme.lines[selectedLineIdx].strokeColor = color
}
function setTextFillColor(color) {
    const { selectedLineIdx } = gMeme
    gMeme.lines[selectedLineIdx].fillColor = color
}

function setFont(font) {
    gMeme.lines.forEach(line =>
        line.font = font)
}

function setFontSize(size) {
    const { selectedLineIdx } = gMeme
    gMeme.lines[selectedLineIdx].size += size
}
function setLineIdx(idx) {
    gMeme.selectedLineIdx = idx
    if (gMeme.selectedLineIdx > gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
    // else gMeme.selectedLineIdx++
}
function setDirection(direction) {
    gMeme.lines[gMeme.selectedLineIdx].align = direction
}
function checkAlignment() {
    let pos
    switch (gMeme.lines[gMeme.selectedLineIdx].align) {
        case 'center':
        case undefined:
            pos = gCanvas.width / 2

            break;
        case 'left':
            pos = 10
            break;
        case 'right':
            pos = gCanvas.width - gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt).width / 2 - 3
            break;
    }
    return pos
}
function setLinePos(idx, width, height) {
    const alignment = checkAlignment()
    if (gIsCreating === undefined) gIsCreating = true
    if (!gIsCreating) return
    idx = gMeme.lines.length - 1
    const line = gMeme.lines[idx]
    if (!line.hasMoved) {
        if (idx === 0) line.y = 70
        else if (idx === 1 && !line.isEmoji) line.y = height - 40
        else line.y = height / 2
    }
    line.x = alignment
}

function getMeme(imgId) {
    let img = ''
    if (!imgId) img = gMemes[gMeme.selectedImgId - 1]
    else {
        img = gMemes.find(img => img.id === imgId)
    }
    return img
}
function getCurrMeme() {
    return gMeme
}

function getMemes(txt) {
    let memes = gMemes
    if (txt) {
        memes = filterImgs(memes, txt)
        return memes
    }
    return memes
}

function getfont() {
    return gMeme.lines[0].font
}

function getDragStatus() {
    return gMeme.lines[gMeme.selectedLineIdx].isDrag
}

function getTextPosition(isCurrLine) {
    const lines = gMeme.lines.map(line => {
        const { width, size: height, x, y, idx } = line
        const pos = {
            x: x - width / 2,
            y: y - height,
            width,
            height: height * 1.2,
            idx,
        }
        return pos
    })
    if (isCurrLine) return lines[gMeme.selectedLineIdx]
    return lines
}

function getKeywords() {
    return gKeywords
}

function filterImgs(memes, txt) {
    const filteredMemes = memes.filter(meme => {

        var includedKeywords = meme.keywords.find(keyword => {
            return keyword.includes(txt)
        })
        return includedKeywords
    })
    return filteredMemes

}

function setLineText(txt) {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].txt = txt
}

function addLine(emoji,isEmoji) {
    gMeme.selectedLineIdx++
    gIsCreating = true
    const txt = emoji? emoji:'place your text here'
    const newMeme = {
        txt: txt,
        size: 40,
        align: 'center',
        srokeColor: 'black',
        fillColor: 'white',
        font: getfont(),
        width: 0,
        x: 0,
        y: 0,
        idx: gMeme.selectedLineIdx,
        isDrag: false,
        isEmoji:isEmoji,
    }
    gMeme.lines.push(newMeme)
}

function isTextClicked(clickedPos) {
    const positions = getTextPosition()
    const clickedText = positions.find(textPos => {
        // Check if the click coordinates are inside the bar coordinates
        return clickedPos.x > textPos.x && clickedPos.x < textPos.x + textPos.width &&
            clickedPos.y > textPos.y && clickedPos.y < textPos.y + textPos.height
    })
    return clickedText
}


function setLineDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

function moveText(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].x += dx
    gMeme.lines[gMeme.selectedLineIdx].y += dy
}



// RANDOM MEME HANDLING
function setRandomMeme() {
    const memes = getMemes()
    const randomImgidx = getRandomIntInclusive(0, memes.length - 1)
    const randomLineCount = Math.random() < 0.5 ? 1 : 2

    for (let i = 0; i < randomLineCount; i++) {
        setRandomLines(i)
    }
    gMeme.selectedImgId = randomImgidx
}
function setRandomLines(idx) {
    const txt = getSampleTxt()
    gMeme.lines[idx].txt = txt[getRandomIntInclusive(0, txt.length - 1)]
    gMeme.lines[idx].size = getRandomIntInclusive(15, 70)
    gMeme.lines[idx].strokeColor = getRandomColor()
    gMeme.lines[idx].fillColor = getRandomColor()
}

function getSampleTxt() {
    return gSampleTexts
}
const gSampleTexts = [
    "yah. shure", 'it wasn\'t me', 'can\'t promise anything',
    'i can do anything i want', 'wait untill you hear me sing',
    'dont bother', 'oooopsy', 'can i borrow this?',
    'tomorrow', 'will you please go and come back later?',
    'yesssssss', 'nooooooooo',
    'what the hell...'
]

function loadSavedMemes() {
    gSavedMemes = loadFromStorage(SAVED_MEMS_KEY)
}

function updateMemeDataUrl(dataURL) {
    gMeme.dataURL = dataURL
}

function saveMemeToGallery() {
    if (loadFromStorage(SAVED_MEMS_KEY)) gSavedMemes = loadFromStorage(SAVED_MEMS_KEY)

    const savedMeme = JSON.parse(JSON.stringify(gMeme))
    gSavedMemes.push(savedMeme)
    saveToStorage(SAVED_MEMS_KEY, gSavedMemes)
}