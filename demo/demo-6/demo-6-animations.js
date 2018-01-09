// ------------------------------
// define animation 3 properties
// ------------------------------

AS.attachAnimation({
    id: null,
    name: "Animation-1",
    label: null,
    description: "Animation Object Description",
    duration: null,
    stepStartTime: null,
    stepsNum: 30,
    milisecondsStep: 100,
    elapsedTime: 0,
    repeatForever: false,
    repeatTimes: 0,
    currentStep: null,
    func: function( _animation ) {
        console.log("Andres animation function! _animation:", _animation );
        window.domEl_3.css('margin-left', ( _animation.currentStep * 20 ) +"px");
    },
    stepsFuncs: [],
    autodestroy: true, // Automatically removes the animation object and functions when the animation finishes
    autoStart: false,
    onStart: function() { 
        console.log( "Andres amimation starts now!");
        window.domEl_3 = $('#animated-3');
    },
    whenFinish: function() { 
        console.log( "Andres amimation ends now!");
    },
    status: 0, // (0) Stopped, (1) On going.
})

// ------------------------------
// define animation 4 properties
// ------------------------------

AS.attachAnimation({
    label: "yellow",
    stepsNum: 30,
    milisecondsStep: 500,
    func: function( _animation ) {
        console.log("Andres animation function! _animation:", _animation );
        window.domEl_4.css('margin-left', ( _animation.currentStep * 20 ) +"px");
    },
    onStart: function() { 
        console.log( "Andres amimation starts now!");
        window.domEl_4 = $('#animated-4');
    }
})

// ------------------------------
// define animation 5 properties
// ------------------------------

AS.attachAnimation({
    stepsNum: 500,
    milisecondsStep: 10,
    func: function( _animation ) {
        console.log("Andres animation function! _animation:", _animation );
        window.domEl_1.css('margin-left', ( _animation.currentStep * 1 ) +"px");
    },
    /*
    stepsFuncs: {
        "120": function() {

        }
    },
    */
    onStart: function() { 
        console.log( "Andres amimation starts now!");
        window.domEl_1 = $('#animated-1');
    }
})