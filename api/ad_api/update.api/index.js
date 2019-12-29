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
        var modal = document.getElementsByClassName('control-wrap')[0]
        if(!this.invokeBtn && document.getElementsByClassName('invoke-btn')[0]){
            this.invokeBtn = document.getElementsByClassName('invoke-btn')[0]
            return 'hasInvokeBtn'
        }
        if(!this.cancelBtn && modal){
            if(modal.getElementsByTagName('button')[0]){
                this.cancelBtn = modal.getElementsByTagName('button')[0]
                return 'hasCancelBtn'
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
        var timer = setInterval(() => {
            // work
            this.stopAD()
            times--
            if( !this.stopAD() || times === 0){
                clearInterval(timer)
            }
        }, longTime);
    }

    // 如果出现需要点击按钮才可以查看小说,可以使用该函数
    // 自动执行按钮函数
    removeADRoot.prototype.autoRunBtnEvent = function() {
        while(!this.invokeBtn && !this.cancelBtn){
            if(this.setBtnvalue() === 'hasInvokeBtn'){
                this.invokeBtn.click()
            }else if(this.setBtnvalue() === 'hasCancelBtn'){
                this.cancelBtn.click()
            }else{
                alert('没获取到按钮的值')
            }
        }
    }
    
    // 写入window.name,在页面重新加载的时候，自动引入脚本并且执行
    removeADRoot.prototype.witeAndReadWindowName = function() {
        var windowName =  window.name.trim('')
        if (!windowName) {
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
        this.autoRunBtnEvent()
        this.setvalue()
        this.stopAD()
        this.listenScroll()
    }

    var removeAD = new removeADRoot()
    removeAD.init()
})()
