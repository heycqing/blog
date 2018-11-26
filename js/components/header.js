var blogHeader = {
    $id: function(id){
        return document.getElementById(id);
    },
    blogTouchUpCss: function(){
        var self = this;
        self.$id('cqing-header').className = 'showHeader'
    },
    blogTouchDownCss: function(){
        var self = this;        
        self.$id('cqing-header').className = 'hiddenHeader'
    },
    blogWindowMove: function(){
      var self = this;
      var beforeScrollT = document.documentElement.scrollTop || document.body.scrollTop; 
      window.addEventListener('scroll',function(e){
        var afterScrollT = document.documentElement.scrollTop || document.body.scrollTop; 
        var m =  afterScrollT - beforeScrollT;
        if(afterScrollT == 0 ){
          self.blogTouchUpCss();     
          e.preventDefault();
        }
        else if( m > 0){
          if(afterScrollT > 0){
            self.blogTouchDownCss();   
            e.preventDefault();         
          }
        }
        else if(m < 0){
          self.blogTouchUpCss();     
          e.preventDefault();       
        }
        beforeScrollT =  afterScrollT;      
        e.preventDefault();
      },false)
    },
    init: function(){
      var self = this;
      self.blogWindowMove();
    }
} 
blogHeader.init();