AS.init();

var x_limit = window.innerWidth,
    y_limit = window.innerHeight,
    line_color = "green",
    line_width = 1;

AS.attachAnimation({
    stepsNum: 5,
    milisecondsStep: 41,
    func: function( _animation ) {

        //dljs.clearBoard(0);
        var c = window.arr;

        
        // old, takes more time.

        /*
        dljs.clearBoard(0);
        dljs.goTo(c[0].x, c[0].y);
        for ( var i=0; i< c.length-1; i++) dljs.lineTo( c[i+1].x, c[i+1].y, line_width, line_color );
        dljs.lineTo( c[0].x, c[0].y, line_width, line_color );
        */

        // new

        var arrOfLines = [];
        var lon = c.length-1;
        for ( var i=0; i< lon; i++) arrOfLines.push([ c[i].x, c[i].y, c[i+1].x, c[i+1].y, line_width, c[i].color ]);
        arrOfLines.push([ c[lon].x, c[lon].y, c[0].x, c[0].y, line_width, c[i].color ]);
        dljs.paintArray( arrOfLines, 1 );

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
        dljs.init();

        //dljs.rmBoard(0);

        console.log("dljs:", dljs );

        window.arr = [];
        var vertexNum = 100;
        for ( var i=0; i< vertexNum; i++) arr.push({
            "x": dljs.utils.rndX(), 
            "y": dljs.utils.rndY(),
            "incx": dljs.utils.getRandomNum(1,10),
            "incy": dljs.utils.getRandomNum(1,10),
            "color": "rgb("+ dljs.utils.getRandomNum(0,255) +","+ dljs.utils.getRandomNum(0,255) +","+ dljs.utils.getRandomNum(0,255) +")"
        });
        console.log("arr:", arr );
    },
    whenFinish: function() {
        console.log("animation: whenFinish!");
    }
})


/*
var cube = {
    "vertexList": [
        { 0.000000, 2.000000, 2.000000 },
        { 0.000000, 0.000000, 2.000000 },
        { 2.000000, 0.000000, 2.000000 },
        { 2.000000, 2.000000, 2.000000 },
        { 0.000000, 2.000000, 0.000000 },
        { 0.000000, 0.000000, 0.000000 },
        { 2.000000, 0.000000, 0.000000 },
        { 2.000000, 2.000000, 0.000000 }      
    ],
    "edges": [
        [],
        []
    ]

}
*/