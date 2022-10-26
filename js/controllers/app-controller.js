'use strict'
function onInit(){
    // renderImages()
    initCanvas()
    renderGallery()
}




function onImgSelect(imgId){
   setImg(imgId)
   openEditor(imgId)
}

function renderGallery(){
    const memes = getMemes()
    const strHTML = memes.map((meme)=>{
        return `<img src="./images/${meme.url}" alt="${meme.id}" onclick="onImgSelect(${meme.id})"></img>`
    }).join('')
    document.querySelector('.gellery-container').innerHTML = strHTML
}

function openGallery(){
    document.querySelector('.img-gallery').classList.remove('hide')
    document.querySelector('.meme-editor').classList.add('hide')  
}

function openEditor(imgId){
    document.querySelector('.img-gallery').classList.add('hide')
    document.querySelector('.meme-editor').classList.remove('hide')
    const img = getMeme(imgId)

    renderMeme(imgId)
    initCanvas()
    

}


function onTitleSearch(){
}