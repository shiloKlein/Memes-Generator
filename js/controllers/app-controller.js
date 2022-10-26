'use strict'
function onInit(){
    // renderImages()
    initCanvas()
    
    console.log('hello controller');
}




function editImg(imgId){
   openEditor(imgId)

}

function openGallery(){
    document.querySelector('.img-gallery').classList.remove('hide')
    document.querySelector('.meme-editor').classList.add('hide')  
}

function openEditor(imgId){
    document.querySelector('.img-gallery').classList.add('hide')
    document.querySelector('.meme-editor').classList.remove('hide')

    renderMeme()
    initCanvas()
    
    const img = getMeme(imgId)

}


function onTitleSearch(){
}