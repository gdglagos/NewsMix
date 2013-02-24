
var $ = function(context) {
        // if the function is called without being called as a constructor,
        // then call as a constructor for us.
        if (this.__proto__.constructor !== $) {
                return new $(context);
        }

        // Save the context
        this.context = context;

        // methods...
        this.html = function(str) {
                try {
                        passedElementId = this.context;
                        
                        passedElementId = passedElementId.split('#')[1];
                        pilotObject = document.getElementById(passedElementId);
                        if (typeof(str) == 'undefined') {
                                return pilotObject.innerHTML();
                        }
                        pilotObject.innerHTML = str;
                } catch (e) {

                }
                return true;
        }

        this.text = function() {
                return htmlSrc;
        }
        
        
         this.ready = function(chainFns) {
                
                window.addEventListener("load", chainFns, false);
                
        }
};