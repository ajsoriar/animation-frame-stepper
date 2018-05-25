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

                attachedFuncs: [] // array of functions attached to main animation that should be executed.
            },
            attachedAnimations: [],
            flags:{
                executeDefaultFunc: true,
                executeAttachedFuncs: true,
                mainFuncFinished: true, // window.AS.flags.mainFuncFinished = false
                attachedFuncsFinished: true // window.AS.flags.attachedFuncsFinished = false
            },            
        };


        // ------------------
        // Internal 
        // ------------------
    
        var requestId = 0;

        function animate(time) {

            //if ( window.AS.flags.executeDefaultFunc ) 
            AS.mainAnimation.defaultFunction();
            //if ( window.AS.flags.executeAttachedFuncs ) 

            //executeFuncsInMainThreat( window.AS.mainAnimation.attachedFuncs ); // ececutes functions in main threat
            //executeAttachedAnimations( window.AS.attachedAnimations ); 

            if (window.AS.flags.mainFuncFinished )      executeFuncsInMainThreat( window.AS.mainAnimation.attachedFuncs ); // ececutes functions in main threat
            if (window.AS.flags.attachedFuncsFinished ) executeAttachedAnimations( window.AS.attachedAnimations ); 

            requestId = window.requestAnimationFrame(animate);
        }
    
        function executeFuncsInMainThreat( funcsArray ) {
            window.AS.flags.mainFuncFinished = false;
            if ( funcsArray === undefined || funcsArray.length === 0 ) return
            var lon = funcsArray.length;
            for ( var i = 0; i < lon; i++ ){
                var f = funcsArray[i];
                f();
            }
            window.AS.flags.mainFuncFinished = true;
        }

        function executeAttachedAnimations( funcsArray ) {
            window.AS.flags.attachedFuncsFinished = false;
            if ( funcsArray === undefined || funcsArray.length === 0 ) return
            var lon = funcsArray.length;
            for ( var i = 0; i < lon; i++ ){
                doAnimation( funcsArray[i] );
            }
            window.AS.flags.attachedFuncsFinished = true;
        }

        function doAnimation( animationData ){

            function executeStep( animationData ){

                // (1) execute animation func
                animationData.func( animationData );

                // (2) execute step func
                if ( animationData.stepsFuncs != undefined ){
                    var f = animationData.stepsFuncs[ animationData.currentStep - 1];
                    if ( typeof f === 'function' ) f( animationData ); else {
                        if ( f != null) f = animationData.stepsFuncs[ animationData.currentStep - 1].func;
                    };                    
                }
            }

            if ( animationData.status === undefined || animationData.status === 0 ) { // 0, Never executed

                console.log(" - Never executed!");

                animationData.stepStartTime = AS.mainAnimation.timestamp; // init timestamp

                animationData.onStart();

                if ( animationData.stepsNum === null ) animationData.stepsNum = animationData.stepsFuncs.length;
                if ( animationData.currentStep === undefined ) animationData.currentStep = 0; else if ( animationData.currentStep === null) animationData.currentStep = 1;
                if ( animationData.currentStep > animationData.stepsNum ) animationData.currentStep = 1;

                executeStep( animationData );

                animationData.status = 1; // on going animation
                animationData.currentStep++;

            } else if ( animationData.status === 1) { // 1, on going animation

                if ( ( animationData.stepStartTime + animationData.milisecondsStep ) < AS.mainAnimation.timestamp ) {

                    //console.log(" - On going animation! A");

                    animationData.stepStartTime = AS.mainAnimation.timestamp;

                    executeStep( animationData );

                    animationData.status = 1; // on going animation
                    
                    if ( animationData.currentStep === animationData.stepsNum && ( animationData.repeatForever === true || animationData.repeatForever === undefined ) ) {

                        //console.log(" - On going animation! A.1");

                        //if ( ( typeof animationData.whenFinish) === 'function' ) animationData.whenFinish();

                        animationData.currentStep = 1;

                    } else if ( animationData.currentStep === animationData.stepsNum && !animationData.repeatForever ) {

                        //console.log(" - On going animation! A.2");

                        if ( ( typeof animationData.whenFinish) === 'function' ) animationData.whenFinish();

                        animationData.status = 3; //"END"

                        // destroy animation / remove from array
                    } else {

                        animationData.currentStep++;
                    }
                      
                }

            } else {

                console.log(" - Animation named as: '"+ animationData.name +"' has finished or was stopped, but was not removed from the array of animations.");

                return

                // animationData.status shoiuld be 2 so the animation was paused
            }

        };

        function start() {
            AS.requestId = window.requestAnimationFrame(animate);
        }

        function stop (){
            if ( AS.requestId ) window.cancelAnimationFrame(requestId);
            AS.requestId = null;
        }
    
        // ------------------
        // Public
        // ------------------
    
        AS.attachAnimation = function( jsonData ) {

            console.log("json:", jsonData );

            if ( jsonData === undefined || jsonData === null ) return //jsonData = window.defaultAnimationStructure;

            if ( jsonData.id === undefined || jsonData.id === null ) jsonData.id = "afs-"+ Date.now();

            AS.attachedAnimations.push( jsonData );

            return jsonData.id
        }

        AS.init = function ( el ) {
            console.log("AS.init()");
            start();
            return this
        };

        AS.searchAnimation = function( lbl_or_id ){ // TODO: move to utils

            if ( lbl_or_id === null ) return null

            var animationsArr = window.AS.attachedAnimations;

            if ( animationsArr.length === 0 ) return null

            var lon = animationsArr.length;

            for ( var i = 0; i < lon; i++ ){

                var obj = animationsArr[i];

                if ( obj.label === lbl_or_id || obj.id === lbl_or_id ){

                    return obj;
                }
            }

            return null;
        };

        AS.resetAnimationByLabel = function( lbl ){
            var obj = AS.searchAnimation( lbl );
            if ( obj != null ){
                obj.currentStep = 0;
                obj.status = 0;                 
            }
        };

        AS.pauseAnimationByLabel = function( lbl ){
            var obj = AS.searchAnimation( lbl );
            if ( obj != null ){
                obj.status = 2;                 
            }
        }

        AS.stopAnimationByLabel = function( lbl ){
            AS.resetAnimationByLabel ( lbl ); 
        }

        AS.continueAnimationByLabel = function( lbl ){
            var obj = AS.searchAnimation( lbl );
            if ( obj != null ){
                obj.status = 1;                 
            }
        }

    })();
    