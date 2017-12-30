
/*
var as = as || {};

as = fuction(){

	return 
} 
*/



window.defaultAnimationStructure = {
    id: null,
    name: "Animation Object",
    description: "Animation Object Description",
    duration: null,
    stepStartTime: null,
    stepsNum: 2,
    milisecondsStep: 2000,
    ellepsedTime: 0,
    repeatForever: false,
    repeatTimes: 4,
    currentStep: null,
    func: function() { console.log("func!") },
    stepsFuncs: [
        function() { console.log("step function 1 ...") },
        function() { console.log("step function 2 ...") }
    ],
    autodestroy: true, // Automatically removes the animation object and functions when the animation finishes
    onStart: function() { console.log("Start...") },
    onFinish: function() { console.log("...end!") },
    status: 0, // (0) Stopped, (1) On going.
};



(function() {
    
        "use strict";

        window.AS = {
            requestId: null,
            mainAnimation: {
                id: null,
                timestamp: Date.now(),
                name: "Main animation function",
                description: "Main animation function",
                defaultFunction: function() {
                    this.timestamp = Date.now();
                    //console.log(this.timestamp);
                },
                flags:{
                    executeDefaultFunc: true,
                    executeAttachedFuncs: true
                },
                attachedFuncs: [] // array of functions attached to main animation that should be executed.
            },
            //onAnimationStep: function(){ }
            attachedAnimations: []
        };

        
    
        // ------------------
        // Internal 
        // ------------------
    
        var requestId = 0;
    
        var animationStartTime = 0;
    
        // ----------------------------------------------------------------------------

        function animate(time) {

            //if ( window.AS.mainAnimation.flags.executeDefaultFunc ) 
            AS.mainAnimation.defaultFunction();
            //if ( window.AS.mainAnimation.flags.executeAttachedFuncs ) 
            executeFuncsInMainThreat( window.AS.mainAnimation.attachedFuncs ); // ececutes functions in main threat
            executeAttachedAnimations( window.AS.attachedAnimations ); 
            requestId = window.requestAnimationFrame(animate);
        }
    
        function executeFuncsInMainThreat( funcsArray ) {
            if ( funcsArray === undefined || funcsArray.length === 0 ) return
            var lon = funcsArray.length;
            for ( var i = 0; i < lon; i++ ){
                var f = funcsArray[i];
                f();
            }
        }

        function executeAttachedAnimations( funcsArray ) {
            if ( funcsArray === undefined || funcsArray.length === 0 ) return
            var lon = funcsArray.length;
            for ( var i = 0; i < lon; i++ ){
                //var f = funcsArray[i];
                //f();
                doAnimation( funcsArray[i] );
            }
        }

        function doAnimation( animationData ){

            /*
                var defaultAnimationStructure = {
                    id: null,
                    name: "Animation Object",
                    description: "Animation Object Description",
                    duration: null,
                    stepsNum: 2,
                    milisecondsStep: 250,
                    ellepsedTime: 0,
                    repeatForever: false,
                    repeatTimes: 4,
                    repeatCounter: 0,
                    currentStep: null,
                    func: function() { console.log("func!") },
                    stepsFuncs: [
                        function() { console.log("step function 1 ...") },
                        function() { console.log("step function 2 ...") },
                    ],
                    autodestroy: true, // Automatically removes the animation object and functions when the animation finishes
                    onStart: function() { console.log("Start...") },
                    onFinish: function() { console.log("...end!") },
                    status: 0, // (0) Never executed, (1) On going. (2) Stopped
                }
            */

            if ( animationData.status === 0) { // Never executed

                console.log(" - Never executed!");

                // init timestamp
                animationData.stepStartTime = AS.timestamp;

                animationData.onStart();

                if ( animationData.currentStep === null) animationData.currentStep = 1;
                if ( animationData.stepsNum === null ) animationData.stepsNum = animationData.stepsFuncs.length;
                if ( animationData.currentStep > animationData.stepsNum ) animationData.currentStep = 1;


                // (1) execute animation func
                animationData.func();

                // (2) execute step func
                var f = animationData.stepsFuncs[ animationData.currentStep - 1];
                f();

                animationData.status = 1; // on going animation
                animationData.currentStep++;

            } else if ( animationData.status === 1) {

                console.log(" - On going animation!");

                if ( ( animationData.stepStartTime + animationData.milisecondsStep ) < AS.timestamp ) {

                    animationData.stepStartTime = AS.timestamp;

                    // do awesome stuff here

                    // (1) execute animation func
                    animationData.func();

                    // (2) execute step func
                    var f = animationData.stepsFuncs[ animationData.currentStep - 1];
                    f();

                    animationData.status = 1; // on going animation
                    animationData.currentStep++;

                    if ( animationData.currentStep >= animationData.stepsNum && animationData.repeatForever ) {

                        animationData.onEnd();

                        animationData.currentStep = 1;

                    } else {

                        animationData.onEnd();

                        // destroy animation / remove from array
                    }
                    
                }

            } else {

                // animationData.status shoiuld be 2 so the animation was paused
            }

        };

        // ----------------------------------------------------------------------------
    
        //AS.start = function() {
        //this.start = function() {
        function start() {
            animationStartTime = Date.now();
            AS.requestId = window.requestAnimationFrame(animate);
        }
    
        //AS.stop = function() {
        //this.stop = function() {
        function stop (){
            if ( AS.requestId ) window.cancelAnimationFrame(requestId);
            AS.requestId = null;
        }

        // ----------------------------------------------------------------------------

        /*
        function attachFunctionToMainAnimation( func ) {
            //AS.mainAnimation.attachedFuncs.push(function(){ console.log("B2!") })
        }
        */

        function attachFunctionToAnimation() {
            //AS.mainAnimation.attachedFuncs.push(function(){ console.log("B2!") })
        }

        //function attachAnimation( jsonData ) {
        AS.attachAnimation = function( jsonData ) {
        //};
            console.log("json:", jsonData );
            if ( jsonData === undefined || jsonData === null ) jsonData = window.defaultAnimationStructure; //AS.defaultAnimationStructure;

            console.log("json:", jsonData );

            AS.attachedAnimations.push( jsonData );
        }
    
        // ------------------
        // Public
        // ------------------
    
        AS.init = function ( el ) {
    
            console.log("AS.init()");

            //this.start();
            //AS.start();
            start();

            return this
        };

        /*

        // AS.attachAnimation() 
        // Ussage example

            AS.attachAnimation( function() {
                    console.log( "! "+ Date.now());
                },
                "funcAndres",
                null
            );
        */

        /*
    
        AS.attachAnimation = function( func, funcID, animationID ) {
    
            if ( funcID === null ) {
    
                //console.error("funcID is needed!");
            }
    
            if ( animationID != null ){ // If animation ID was specified ...
    
                // Search target
    
                if ( findTarget( animationID )  ) {
    
                    attachFunctionToAnimation( animationID, func );
    
                } else {
                    // error!
    
                    //console.error("animationID was specified but not found!");
                }
    
                return
            }
            
            // Attach function to main animation 
    
            attachFunctionToMainAnimation( animationID, func );
            
        };

        */
    
    })();
    