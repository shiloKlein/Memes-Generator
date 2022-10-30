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
function onSavedImgSelect(idx) {
    const imgId = setImgFromSaved(idx)
    setcurrMeme(idx)
    openEditor(imgId)
}

function renderGallery(txt) {
    const memes = getMemes(txt)
    const strHTML = memes.map((meme) => {
        return `<img src="./images/${meme.url}" alt="${meme.id}" onclick="onImgSelect(${meme.id})" class="gallery-img"></img>`
    }).join('')
    document.querySelector('.gallery-container').innerHTML = strHTML
}


function renderSavedmemesGallery() {
    let idx
    const savedMemes = getsavedMemes()
    const strHTML = savedMemes.map((meme) => {
        idx = (idx === undefined) ? 0 : idx + 1
        return `<img src="${meme.dataURL}" onclick="onSavedImgSelect(${idx})"></img>`
    }).join('')
    document.querySelector('.gallery-container').innerHTML = strHTML
}
// service
function getsavedMemes() {
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
    initCanvas(imgId)
}
function openSavedMemes() {
    document.querySelector('.img-gallery').classList.remove('hide')
    document.querySelector('.meme-editor').classList.add('hide')
    loadSavedMemes()
    renderSavedmemesGallery()
}
function openAbout(){
    document.querySelector('.about-modal').classList.remove('hide')
}
function onCloseModal(){
    document.querySelector('.about-modal').classList.add('hide')
}

function onKeywordsSearch(txt){
const datalist = document.querySelector('#search-keywords')
const keywords = getKeywords()
const strHtml = keywords.map(keyword=>`<option>${keyword}</option>`).join('')
datalist.innerHTML = strHtml
// filterImgs(txt)
renderGallery(txt)
}

function createRandomMeme() {

    const randomMeme = setRandomMeme()
    openEditor()
    renderMeme()

}

function toggleMenu() {
    const elDropDown = document.querySelector('.drop-down')
    elDropDown.classList.toggle('clicked')
    document.querySelector('.main-screen').classList.toggle('menu-open')
    // document.querySelector('.main-layout').classList.toggle('menu-closed')

}


/////////////////////////
function onTitleSearch(randomLineCount) {
}