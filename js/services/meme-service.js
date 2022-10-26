'use strict'


var gKeywordSearchCountMap = { funny: 0, cool: 1, pets: 3, }


var gMemes = [
    { id: 1, url: 'meme-imgs/1.jpg', keywords: ['funny', 'cat'], },
    { id: 2, url: 'meme-imgs/2.jpg', keywords: ['funny', 'cat'], },
    { id: 3, url: 'meme-imgs/3.jpg', keywords: ['funny', 'cat'], },
    { id: 4, url: 'meme-imgs/4.jpg', keywords: ['funny', 'cat'], },
    { id: 5, url: 'meme-imgs/5.jpg', keywords: ['funny', 'cat'], },
    { id: 6, url: 'meme-imgs/6.jpg', keywords: ['funny', 'cat'], },
    { id: 7, url: 'meme-imgs/7.jpg', keywords: ['funny', 'cat'], },
    { id: 8, url: 'meme-imgs/8.jpg', keywords: ['funny', 'cat'], },
    { id: 9, url: 'meme-imgs/9.jpg', keywords: ['funny', 'cat'], },
    { id: 10, url: 'meme-imgs/10.jpg', keywords: ['funny', 'cat'], },
    { id: 11, url: 'meme-imgs/11.jpg', keywords: ['funny', 'cat'], },
    { id: 12, url: 'meme-imgs/12.jpg', keywords: ['funny', 'cat'], },
    { id: 13, url: 'meme-imgs/13.jpg', keywords: ['funny', 'cat'], },
    { id: 14, url: 'meme-imgs/14.jpg', keywords: ['funny', 'cat'], },
    { id: 15, url: 'meme-imgs/15.jpg', keywords: ['funny', 'cat'], },
    { id: 16, url: 'meme-imgs/16.jpg', keywords: ['funny', 'cat'], },
    { id: 17, url: 'meme-imgs/17.jpg', keywords: ['funny', 'cat'], },
    { id: 18, url: 'meme-imgs/18.jpg', keywords: ['funny', 'cat'], },
];
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 40,
            align: 'center',
            srokeColor: 'black',
            fillColor:'white',
            width:0,
            x: 0,
            y: 0,
            idx:0,
            isDrag: false,
        },
        {
            txt: 'For me puky is like jquery',
            size: 40,
            align: 'center',
            strokeColor: 'black',
            fillColor:'white',
            width:0,
            x:0,
            y:0,
            idx:1,
            isDrag: false,
        },
    ]
}

function createMeme(){
    const id = gMemes.length+1
const meme = { id: i, url: `meme-imgs/${i}.jpg`, keywords: ['funny', 'cat'], }
}


function setImg(imgId) {
    gMeme.selectedImgId = imgId;
}

function setTextStrokeColor(color) {
    const { selectedLineIdx } = gMeme
    gMeme.lines[selectedLineIdx].strokeColor = color
}
function setTextFillColor(color) {
    const { selectedLineIdx } = gMeme
    gMeme.lines[selectedLineIdx].fillColor = color
}

function setFontSize(size) {
    const { selectedLineIdx } = gMeme
    gMeme.lines[selectedLineIdx].size += size
}
function setLineIdx(idx) {
    // gMeme.selectedLineIdx
    if(idx){
        gMeme.selectedLineIdx=idx
        return
    }
    if(gMeme.selectedLineIdx >= gMeme.lines.length-1)gMeme.selectedLineIdx=0
    // else gMeme.selectedLineIdx++
}

function setLinePos(idx,width, height){
    const line =gMeme.lines[idx]
    // console.log(idx);
    if(idx===0)line.y = 70
    else if(idx===1)line.y = height-40
    else line.y =height/2
    line.x = width/2
}
function getMeme(imgId) {
    let img = ''
    if (!imgId) img = gMemes[gMeme.selectedImgId - 1]
    else {
        img = gMemes.find(img => img.id === imgId)
    }
    return img
}
function getCurrMeme(){
    return gMeme
}

function getMemes() {
    return gMemes
}

function getDragStatus(){
    return gMeme.lines[gMeme.selectedLineIdx].isDrag
}

function getTextPosition(isCurrLine) {
    // const gMeme = getCurrMeme()
    // const { width, size: height, x, y } = gMeme.lines[gMeme.selectedLineIdx]
    // const { selectedLineIdx: lineIdx } = meme
    const lines = gMeme.lines.map(line=>{
        const { width, size: height, x, y,idx }=line
        const pos = {
        x: x - width / 2,
        y: y - height,
        width,
        height: height * 1.2,
        idx,
    }
    return pos
    })
    if(isCurrLine)return lines[gMeme.selectedLineIdx]
    return lines
}

function setLineText(txt) {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].txt = txt
}