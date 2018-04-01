
/*
var as = as || {};

as = fuction(){

	return 
} 
*/

(function() {
    
        "use strict";
    
        // window.AS.mainAnimation.flags.executeDefaultFunc = false;
    
        window.AS = {
            //mainAnimationID: null,
    
            mainAnimation: {
                id: null,
                defaultFunction: function() {
                  if ( this.flags.executeDefaultFunc ){
                    console.log(Date.now());
                  }
    
                },
                flags:{
                  executeDefaultFunc:true //,
                  //executeAttachedFunc:true
                },
                attachedFuncs: [] // array of functions attached to main animation that should be executed.
    
            },
            //arrOfActions: [], // Actions executed by 
            //arrOfAnimations: [],
            //onAnimationStep: function(){ }
    
            attachedAnimations: {
    
                // animation func structure
    
                /*
    
                {
                  id: null;
                  func: null;
                  duration: null;
                }
    
                */
            }
    
        };
    
        // ------------------
        // Internal 
        // ------------------
    
        var requestId = 0;
    
        var animationStartTime = 0;
    /*
        var startMainAnimation = function() {
    
           // AS.mainAnimation = 
        };
    */
        function animate(time) {
          //document.getElementById("animated").style.left = (time - animationStartTime) % 2000 / 4 + "px";
    
          AS.mainAnimation.defaultFunction();
          //AS.mainAnimation.attachedFunctions(); // Execute attached functios
    
          executeFuncs( window.AS.mainAnimation.arrOfFuncs ); // ececutes functions in main threat
    
    
          //executeFuncs( window.AS.attachedAnimations.arrOfFuncs ); 
    
          requestId = window.requestAnimationFrame(animate);
        }
    
        function executeFuncs( funcsArray ) {
            if ( funcsArray === undefined || funcsArray.length === 0 ) return
    
            var lon = funcsArray.length;
    
            for ( var i = 0; i < lon; i++ ){
                var f = funcsArray[i];
                f();
            }
        }
    
        function start() {
          //animationStartTime = window.performance.now();
          animationStartTime = Date.now();
          requestId = window.requestAnimationFrame(animate);
        }
    
        function stop() {
          if (requestId)
            window.cancelAnimationFrame(requestId);
          requestId = 0;
        }
    
        //mainAnimationID
    
        function attachFunctionToMainAnimation() {
    
        }
    
        function attachFunctionToAnimation() {
          
        }
    
        // ------------------
        // Public
        // ------------------
    
        AS.init = function ( el ) {
    
            console.log("AS.init()");
    
            /*
            if (!el){
              this.createBoard();
            } else {
              this.el = document.getElementById( el );
            }
            */
    
            //startMainAnimation();
            //this.
            start();
    
            return this
        };
    /*
        AS.start = function() {
    
        };
    
        AS.stop = function() { // Stops all
          
        };
    */
        /*
        AS.getLineString = function (idString,x1,y1,x2,y2,weight,color,opacity, roundBorder, longSombra, colSombra){
    
        };
    
        AS.getFastLineString = function (x1,y1,x2,y2,weight,color){
    
        };
        */
    
        /*
        AS.createAnimation = function() {
    
        };
    
        */
    
        AS.attachAnimation = function( func, funcID, targetID ) {
    
            if ( funcID === null ) {
    
                //console.error("funcID is needed!");
            }
    
            if ( target != null ){
    
                // Search target
    
                if ( findTarget( targetID )  ) {
    
                    attachFunctionToAnimation( targetID, func );
    
                } else {
                    // error!
    
                    //console.error("targetID was specified but not found!");
                }
    
                return
            } 
            
            // Attach function to main animation 
    
            attachFunctionToMainAnimation( func );
            
        };
    
    })();
    