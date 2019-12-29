(function () {

    function removeADRoot(){}

    removeADRoot.prototype.adNode = ''
    removeADRoot.prototype.adBottomNode = ''
    removeADRoot.prototype.bottomOperateTop = ''

    removeADRoot.prototype.setvalue = function(){
        this.adNode = document.getElementsByClassName('afd-ad')
        this.adBottomNode = document.getElementsByClassName('banner')
        this.bottomOperateTop = document.getElementsByClassName('bottomOperateTop')
    }

    removeADRoot.prototype.maxLength = function(){
    
        var a = this.adNode.length
        var b = this.adBottomNode.length
        var c = this.bottomOperateTop.length
        return  a > b ? (a > c ? a : c) : (b > c ?  b : c)
    }

    removeADRoot.prototype.loopFn = function(times, longTime) {
        var timer = setInterval(() => {
            // work
            this.stopAD()
            times--
            if( !this.stopAD() || times === 0){
                clearInterval(timer)
            }
        }, longTime);
    }
    
    // 写入window.name,在页面重新加载的时候，自动引入脚本并且执行
    removeADRoot.prototype.witeAndReadWindowName = function() {
        if (!window.name) {
            window.name = "javascript:(function(){var s = document.createElement('script'); s.type = 'text/javascript'; s.src = 'https://heycqing.github.io/blog/api/ad_api/update.api/index.js'; document.body.appendChild(s); })()"
        } else {
            if (window.name.indexOf('https://github.com/heycqing') || window.name.indexOf('heycqing')) {
                eval(window.name)
            }
        }

    }


    removeADRoot.prototype.stopAD = function(key) {
        // 针对 手机百度小说的广告
        let maxLength = this.maxLength()
        console.log('maxLength:', maxLength)
        for(var i = 0; i < maxLength; i++){
            if(this.adNode[i]){
                console.log('执行')
                this.adNode[i].style.display = 'none'
            }
            if(this.adBottomNode[i]){
                // if(this.adBottomNode[i].style.display !== 'none'){
                //     return true
                // }else{
                    console.log('执行')
                    this.adBottomNode[i].style.display = 'none'
                // }
            }
            if(this.bottomOperateTop[i]){
                console.log('执行')
                
                // if(this.bottomOperateTop[i].style.display !== 'none'){
                //     return true
                // }else{
                    this.bottomOperateTop[i].style.display = 'none'
                // }
            }
        }
    }

    removeADRoot.prototype.init = function() {
        var self = this
        console.log('pppp')
        this.setvalue()
        this.stopAD()
        var originHeight =  document.body.clientHeight ||document.body.scrollHeight;
        // 监听页面高度变化
        window.addEventListener('scroll', function (e) {
            var changeHeight = document.body.clientHeight ||document.body.scrollHeight;
            if (changeHeight > originHeight) {
                originHeight = changeHeight
                self.witeAndReadWindowName()
            }
        })
    }

    var removeAD = new removeADRoot()
    removeAD.init()
    console.log('没有执行？？？')
})()
