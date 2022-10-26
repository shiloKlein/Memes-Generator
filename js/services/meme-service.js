'use strict'


var gKeywordSearchCountMap = { funny: 0, cool: 1, pets: 3, }


var gMemes = [
    { id: 1, url: 'meme-imgs/1.jpg', keywords: ['funny', 'cat'], },
    { id: 2, url: 'meme-imgs/2.jpg', keywords: ['funny', 'cat'], },
    { id: 3, url: 'meme-imgs/3.jpg', keywords: ['funny', 'cat'], },
    { id: 4, url: 'meme-imgs/4.jpg', keywords: ['funny', 'cat'], },
];
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            align: 'center',
            color: 'red',
            x: 0,
            y: 0,
        },
        {
            txt: 'For me puky is like jquery',
            size: 15,
            align: 'center',
            color: 'green',
            x:0,
            y:0,
        },
    ]
}


function setImg(imgId) {
    gMeme.selectedImgId = imgId;
}

function setTextColor(color) {
    const { selectedLineIdx } = gMeme
    gMeme.lines[selectedLineIdx].color = color
}

function setFontSize(size) {
    const { selectedLineIdx } = gMeme
    gMeme.lines[selectedLineIdx].size += size
}
function setLineIdx() {
    gMeme.selectedLineIdx
    if(gMeme.selectedLineIdx >= gMeme.lines.length-1)gMeme.selectedLineIdx=0
    else gMeme.selectedLineIdx++
}

function setLinePos(idx,width, height){
    const line =gMeme.lines[idx]
    console.log(idx);
    if(idx===0)line.y = 40
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

function getMemes() {
    return gMemes
}

function setLineText(txt) {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].txt = txt
}