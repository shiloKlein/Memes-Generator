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
function onEditSavedMeme(idx) {
    const imgId = setImgFromSaved(idx)
    setcurrMeme(idx)
    openEditor(imgId)
}

function onDeleteSavedMeme(idx){
    console.log(gSavedMemes);
deleteSavedMeme(idx)
console.log(gSavedMemes);
renderSavedmemesGallery()
}

function renderGallery(txt) {
    const memes = getMemes(txt)
    const strHTML = memes.map((meme) => {
        const urlStart = meme.id<=18?`./images/`:""
        return `<img src="${urlStart}${meme.url}" alt="${meme.id}" onclick="onImgSelect(${meme.id})" class="gallery-img"></img>`
    }).join('')
    document.querySelector('.gallery-container').innerHTML = strHTML
}


function renderSavedmemesGallery() {
    let idx
    const savedMemes = getsavedMemes()
    const strHTML = savedMemes.map((meme) => {
        idx = (idx === undefined) ? 0 : idx + 1//" onclick="onSavedImgSelect(${idx})"
        return `<article class="saved-meme-container">
        <img src="${meme.dataURL}"></img>
        <section class=" saved-meme-btns flex justify-center">
        <button onclick="onEditSavedMeme(${idx})"><img src="./images/icons/icon_tools.svg"></button>
        <a onclick="onDownloadSavedMeme(this, ${idx})" download="my-img.jpg"><img src="./images/icons/icon_download.svg"></a>
        <button onclick="onDeleteSavedMeme(${idx})"><img src="./images/icons/icon_trash_alt.svg"></button>
        
        </section></article>`
    }).join('')
    document.querySelector('.gallery-container').innerHTML = strHTML
}





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