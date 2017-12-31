// ------------------------------
// define animation 1 properties
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
    func: function( _animation ) {
        console.log("Andres animation function! _animation:", _animation );
        window.domEl_1.css('margin-left', ( _animation.currentStep * 20 ) +"px");
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
        console.log( "Andres amimation starts now!");
        window.domEl_1 = $('#animated-1');
    },
    whenFinish: function() { 
        console.log( "Andres amimation ends now!");
    },
    status: 0, // (0) Stopped, (1) On going.
})

// ------------------------------
// define animation 2 properties
// ------------------------------

AS.attachAnimation({
    id: null,
    name: "Animation-2",
    label: null,
    description: null,
    duration: null,
    stepStartTime: null,
    stepsNum: 40,
    milisecondsStep: 25,
    elapsedTime: 0,
    repeatForever: false,
    repeatTimes: null,
    currentStep: null,
    func: function( _animation ) {
        console.log("Andres animation function! _animation:", _animation );
        window.domEl_2.css('margin-left', ( _animation.currentStep * 20 ) +"px");
    },
    stepsFuncs: [
        null,
        null,
        null,
        {
            step: 4,
            func: function() { 
                console.log("Andres step function 4 ...") 
            },
            description: null
        },
        null, // 5

        null,
        null,
        null, // 8

        function() { 
                console.log("Andres step function 9 ...") 
        },
        null, // 10

        null,
        null,  
        null,
        null,
        null, // 15
        null,
        null,
        null,
        null,
        null // 20
    ],
    autodestroy: true, // Automatically removes the animation object and functions when the animation finishes
    autoStart: false,
    onStart: function() { 
        console.log( "Andres amimation starts now!");
        window.domEl_2 = $('#animated-2');
    },
    whenFinish: function() { 
        console.log( "Andres amimation ends now!");
    },
    status: 0, // (0) Stopped, (1) On going.
})


// ------------------------------
// define animation 1 properties
// ------------------------------

AS.attachAnimation({
    id: null,
    name: "Animation-3",
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
// define animation 1 properties
// ------------------------------

AS.attachAnimation({
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