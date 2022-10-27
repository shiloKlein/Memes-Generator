'use strict'
function onInit() {
    // renderImages()
    initCanvas()
    renderGallery()
}




function onImgSelect(imgId) {
    setImg(imgId)
    openEditor(imgId)
}
function onSavedImgSelect(idx){
    const imgId = setImgFromSaved(idx)
    setcurrMeme(idx)
    openEditor(imgId)
}

function renderGallery() {
    const memes = getMemes()
    const strHTML = memes.map((meme) => {
        return `<img src="./images/${meme.url}" alt="${meme.id}" onclick="onImgSelect(${meme.id})"></img>`
    }).join('')
    document.querySelector('.gellery-container').innerHTML = strHTML
}


function renderSavedmemesGallery(){
    let idx 
    const savedMemes = getsavedMemes()
    const strHTML = savedMemes.map((meme) => {
        idx = (idx===undefined)? 0:idx+1
        return `<img src="${meme.dataURL}" onclick="onSavedImgSelect(${idx})"></img>`
    }).join('')
    document.querySelector('.gellery-container').innerHTML = strHTML
}
// service
function getsavedMemes(){
    const savedMemes = loadFromStorage(SAVED_MEMS_KEY)
    return savedMemes
}
// service

function openGallery() {
    document.querySelector('.img-gallery').classList.remove('hide')
    document.querySelector('.meme-editor').classList.add('hide')
    renderGallery()
}

function openEditor(imgId) {
    document.querySelector('.img-gallery').classList.add('hide')
    document.querySelector('.meme-editor').classList.remove('hide')
    const img = getMeme(imgId)

    renderMeme(imgId)
    initCanvas()
}
function openSavedMemes(){
    document.querySelector('.img-gallery').classList.remove('hide')
    document.querySelector('.meme-editor').classList.add('hide')
loadSavedMemes()
renderSavedmemesGallery()
}

function createRandomMeme() {

    const randomMeme = setRandomMeme()
    openEditor()
    renderMeme()

    // const randMeme = randomMeme[rand]
    // setImg(randMeme.id)
    // openEditor(randMeme.id)
    // console.log(randMeme.id);
}




/////////////////////////
function onTitleSearch(randomLineCount) {
}