(function(){
    // adf+数字
    var adNode = document.getElementsByClassName('afd-ad')
    var adBottomNode = document.getElementsByClassName('banner')

    for(var i = 0; i < adNode.length; i++){
        adNode[i].style.display = 'none';
    }
    for(var j = 0; j < adBottomNode.length; j++){
        adBottomNode[j].style.display = 'none'
    }
})()