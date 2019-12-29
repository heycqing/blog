(function () {

    function removeADRoot(){}

    removeADRoot.prototype.adNode = ''
    removeADRoot.prototype.adBottomNode = ''
    removeADRoot.prototype.bottomOperateTop = ''

    removeADRoot.prototype.invokeBtn = ''
    removeADRoot.prototype.cancelBtn = ''


    removeADRoot.prototype.setvalue = function(){
        this.adNode = document.getElementsByClassName('afd-ad')
        this.adBottomNode = document.getElementsByClassName('banner')
        this.bottomOperateTop = document.getElementsByClassName('bottomOperateTop')
    }

    removeADRoot.prototype.setBtnvalue = function(){
        if(!this.invokeBtn && document.getElementsByClassName('invoke-btn')[0]){
            this.invokeBtn = document.getElementsByClassName('invoke-btn')[0]
        }else{
            return 'done'
        }
    }

    removeADRoot.prototype.setCancelBtnvalue = function(){
        var modal = document.getElementsByClassName('control-wrap')[0]
        if(!this.cancelBtn && modal){
            if(modal.getElementsByTagName('button')[0]){
                this.cancelBtn = modal.getElementsByTagName('button')[0]
                return true
            }
        }
    }

    
    removeADRoot.prototype.maxLength = function(){
    
        var a = this.adNode.length
        var b = this.adBottomNode.length
        var c = this.bottomOperateTop.length
        return  a > b ? (a > c ? a : c) : (b > c ?  b : c)
    }

    removeADRoot.prototype.loopFn = function(times, longTime) {
        return new Promise((resolve, reject) =>{
            let self = this
            var timer = setInterval(() => {
                // work
                self.setCancelBtnvalue()
                times--
                if( self.setCancelBtnvalue() || times === 0){
                    self.cancelBtn.click()
                    resolve('ok')
                    clearInterval(timer)
                }
            }, longTime);
        })
        
    }

    // 如果出现需要点击按钮才可以查看小说,可以使用该函数
    // 自动执行按钮函数
    removeADRoot.prototype.autoRunBtnEvent = function() {
            this.setBtnvalue()
            this.invokeBtn.click()
            this.loopFn(3,1000).then(data => {console.log('ok')})
    }
    
    // 写入window.name,在页面重新加载的时候，自动引入脚本并且执行
    removeADRoot.prototype.witeAndReadWindowName = function() {
        var windowName =  window.name.trim('')
        if (!windowName) {
            window.name = "javascript:(function(){var s = document.createElement('script'); s.type = 'text/javascript'; var randomNumber=JSON.stringify( Math.random() * 10000).split('.')[0]; s.src = 'https://heycqing.github.io/blog/api/ad_api/update.api/index.js?'+randomNumber; document.body.appendChild(s);})()"
        } else {
            if (window.name.indexOf('https://github.com/heycqing') || window.name.indexOf('heycqing')) {
                eval(window.name)
            }
        }

    }


    removeADRoot.prototype.stopAD = function(key) {
        // 针对 手机百度小说的广告
        let maxLength = this.maxLength()
        for(var i = 0; i < maxLength; i++){
            if(this.adNode[i]){
                this.adNode[i].style.display = 'none'
            }
            if(this.adBottomNode[i]){
                // if(this.adBottomNode[i].style.display !== 'none'){
                //     return true
                // }else{
                    this.adBottomNode[i].style.display = 'none'
                // }
            }
            if(this.bottomOperateTop[i]){
                // if(this.bottomOperateTop[i].style.display !== 'none'){
                //     return true
                // }else{
                    this.bottomOperateTop[i].style.display = 'none'
                // }
            }
        }
    }

    removeADRoot.prototype.listenScroll = function(){
        var self = this
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

    removeADRoot.prototype.init = function() {
        if(this.setBtnvalue() !== 'done'){
            this.autoRunBtnEvent()
        }
        this.setvalue()
        this.stopAD()
        this.listenScroll()
    }

    var removeAD = new removeADRoot()
    removeAD.init()
})()
