// ------------------------------
// define animation 1
// ------------------------------

AS.attachAnimation({
    label: "yellow-text",
    stepsNum: 30,
    milisecondsStep: 500,
    func: function( _animation ) {
        //console.log("Andres animation function! _animation:", _animation );
        window.domEl_4.css('margin-left', ( _animation.currentStep * 20 ) +"px");
    },
    onStart: function() { 
        console.log( "'yellow-text' amimation starts now!");
        window.domEl_4 = $('#animated-4');
    }
})

// ------------------------------
// define animation 2
// ------------------------------

AS.attachAnimation({
    stepsNum: 500,
    milisecondsStep: 10,
    label: "happy-cloud",
    func: function( _animation ) {
        //console.log("Andres animation function! _animation:", _animation );
        window.domEl_1.css('margin-left', ( _animation.currentStep * 1 ) +"px");
    },
    /*
    stepsFuncs: {
        "120": function() {

        }
    },
    */
    onStart: function() { 
        console.log( "'happy-cloud' amimation starts now!");
        window.domEl_1 = $('#animated-1');
    }
})