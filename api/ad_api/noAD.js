(function(){
    // adf+数字
    var adNode = document.getElementsByClassName('afd-ad')
    var adBottomNode = document.getElementsByClassName('banner')
    var bottomOperateTop = document.getElementsByClassName('bottomOperateTop')
    if(adNode || adBottomNode || bottomOperateTop){
        setTimeout(function(){
            console.log('123')
            for(var i = 0; i < adNode.length; i++){
                adNode[i].style.display = 'none';
            }
            for(var j = 0; j < adBottomNode.length; j++){
                adBottomNode[j].style.display = 'none'
            }
            for(var k = 0; k < bottomOperateTop.length; k++){
                bottomOperateTop[k].style.display = 'none'
            }
        }, 3000)
    }else{
        console.log('没有广告了!')
        clearTimeout()
    }
  
})()

// 使用
// https://heycqing.github.io/blog/api/ad_api/noAD.js
// javascript:(function(){var s = document.createElement('script'); s.type = 'text/javascript'; s.src = 'https://heycqing.github.io/blog/api/ad_api/noAD.js'; document.body.insertBefore(s, document.body.firstChild); alert('点击除去😡广告')})()