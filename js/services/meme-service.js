'use strict'


var gKeywordSearchCountMap = { funny: 0, cool: 1, pets: 3, }

var gcurrImgIdx = 0
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
            align: 'left',
            color: 'red'
        }
    ]
}




function getMeme(imgId) {
    let img = ''
    if (!imgId) img = gMemes[gcurrImgIdx]
    else {
        img = gMemes.find(img => img.id === imgId)
        gcurrImgIdx = imgId - 1;
    }
    return img
}