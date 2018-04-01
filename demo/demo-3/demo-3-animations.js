AS.init();

/*
AS.attachAnimation({
    stepsNum: 5,
    milisecondsStep: 500,
    func: function( _animation ) {
        if( _animation.currentStep === 1) dljs.rmBoard(0);
        console.log("animation: func!"+ _animation.currentStep );
        dljs.rndLine();
    },
    onStart: function() { 
        console.log("animation: onStart!");
        dljs.rmBoard(0);
    },
    whenFinish: function() {
        console.log("animation: whenFinish!");
    }, 
    stepsFuncs: [
        null,
        null,
        null,
        null,
        null
    ]
})
*/

var x_limit = window.innerWidth,
    y_limit = window.innerHeight,
    line_color = "red",
    line_width = 2;

AS.attachAnimation({
    stepsNum: 5,
    milisecondsStep: 25,
    func: function( _animation ) {

        dljs.rmBoard(0);
        var c = window.arr;

        dljs.goTo(c[0].x, c[0].y);
        for ( var i=0; i< c.length-1; i++) dljs.lineTo( c[i+1].x, c[i+1].y, line_width, line_color );
        dljs.lineTo( c[0].x, c[0].y, line_width, line_color );

        // Update coords here
        for ( var i=0; i< c.length; i++) {

            if ( c[i].x > x_limit ) c[i].incx = -c[i].incx;
            if ( c[i].x < 0 ) c[i].incx = -c[i].incx;
            if ( c[i].y > y_limit ) c[i].incy = -c[i].incy;
            if ( c[i].y < 0 ) c[i].incy = -c[i].incy;

            if ( c[i].incx > 0 ) c[i].x += c[i].incx;
            if ( c[i].incx < 0 ) c[i].x += c[i].incx;
            if ( c[i].incy > 0 ) c[i].y += c[i].incy;
            if ( c[i].incy < 0 ) c[i].y += c[i].incy;
        }
    },
    onStart: function() { 
        console.log("animation: onStart!");
        dljs.rmBoard(0);
        window.arr = [];
        var vertexNum = 10;
        for ( var i=0; i< vertexNum; i++) arr.push({
            "x": dljs.utils.rndX(), 
            "y": dljs.utils.rndY(),
            "incx": dljs.utils.getRandomNum(1,5),
            "incy": dljs.utils.getRandomNum(1,5)
        });
        console.log("arr:", arr );
    },
    whenFinish: function() {
        console.log("animation: whenFinish!");
    }
})