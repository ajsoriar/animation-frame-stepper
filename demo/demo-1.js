// ----------------------------------------------------------------------
// myStuff.js
// ----------------------------------------------------------------------

AS.init();

function start() {
    //animationStartTime = window.performance.now();
    //requestId = window.requestAnimationFrame(animate);

    AS.startByName("Animation-1");
}

function stop() {
    //if (requestId) window.cancelAnimationFrame(requestId);
    //requestId = 0;
    AS.stopByName("Animation-1");
}

function stopByLabel() {
    //if (requestId) window.cancelAnimationFrame(requestId);
    //requestId = 0;
    AS.stopByLabel("clouds");
}

function pause() {
    //if (requestId) window.cancelAnimationFrame(requestId);
    //requestId = 0;
    AS.pauseByName("Animation-1");
}

function gotoStep() {
    //if (requestId) window.cancelAnimationFrame(requestId);
    //requestId = 0;
    AS.goToStepByName("Animation-1", 3);
}

// ------------------------------
// define animation properties
// ------------------------------

AS.attachAnimation({
    id: null,
    name: "Animation-1",
    label: null,
    description: "Animation Object Description",
    duration: null,
    stepStartTime: null,
    stepsNum: 10,
    milisecondsStep: 1000,
    elapsedTime: 0,
    repeatForever: false,
    repeatTimes: 0,
    currentStep: null,
    func: function() { 
        console.log("Andres animation function!");
    },
    stepsFuncs: [
        {
            step: 1,
            func: function() { 
                console.log("Andres step function 1 ...") 
            },
            description: null
        },{
            step: 2,
            func: function() { 
                console.log("Andres step function 2 ...") 
            },
            description: null
        },{
            step: 3,
            func: function() { 
                console.log("Andres step function 3 ...") 
            },
            description: null
        },{
            step: 4,
            func: function() { 
                console.log("Andres step function 4 ...") 
            },
            description: null
        },{
            step: 5,
            func: function() { 
                console.log("Andres step function 5 ...") 
            },
            description: null
        },{
            step: 6,
            func: function() { 
                console.log("Andres step function 6 ...") 
            },
            description: null
        },{
            step: 7,
            func: function() { 
                console.log("Andres step function 7 ...") 
            },
            description: null
        },{
            step: 8,
            func: function() { 
                console.log("Andres step function 8 ...") 
            },
            description: null
        },{
            step: 9,
            func: function() { 
                console.log("Andres step function 9 ...") 
            },
            description: null
        },{
            step: 10,
            func: function() { 
                console.log("Andres step function 10 ...") 
            },
            description: null
        }
    ],
    autodestroy: true, // Automatically removes the animation object and functions when the animation finishes
    autoStart: false,
    onStart: function() { 
        //console.log( "'"+ AS.current.animationName +"' starts now!");
        //console.log( "'"+ AS_PROPS.animationName +"' starts now!");
        console.log( "Andres amimation starts now!");
    },
    whenFinish: function() { 
        //console.log( "'"+ AS.current.animationName +"' ends now!");
        //console.log( "'"+ AS_PROPS.animationName +"' ends now!");
        console.log( "Andres amimation ends now!");
    },
    status: 0, // (0) Stopped, (1) On going.
})