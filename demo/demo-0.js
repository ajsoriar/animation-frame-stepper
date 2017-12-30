function inOutQuad(n) {
    n *= 2;
    if (n < 1) return 0.5 * n * n;
    return -0.5 * (--n * (n - 2) - 1);
}

window.myFunction = function( value ) {
	//console.log("Do it! stop:", window.stop );
    
    if ( value === 'CANCEL-PREVIOWS' ){
    	console.log("btn. Cancel previous and launch");
    	startAnimation($('#thing'));
    }
   
    if ( value === 'IF-PREVIOUS-FINISHED' ){
        if ( window.stop != false ) {
        	startAnimation($('#thing'));
        }else{
        	console.log("btn. Previous is running so can't launch");
        }
    }
    
    if ( value === 'ADD-TO-QUEUE'){
    	window.queue++;
    }
}

window.queue = 0;

window.stop = false;

var animation = {};
animation.afterLaunch = function(){
	console.log("animation.afterLaunch!");
};
animation.whenFinished = function(){
	console.log("animation.whenFinished!");
    
    //check the queue
    if ( window.queue != 0) {
    	window.queue--;
        requestAnimationFrame(startAnim);
    }
};
animation.onEveryStep = function(){
	console.log("animation.onEveryStep!");
};

function startAnimation(domEl) {

	animation.afterLaunch();

	window.stop = false;
    
    // animating x (margin-left) from 20 to 300, for example
    var startx = 20;
    var destx = 300;
    var duration = 2000; //5000
    var start = null;
    var end = null;

    //      (1)    (2)    (3)    (4)
    //   1------2------3------4------5
    //  0.0s   0.5s   1.0s   1.5s   2.0s
    //  0ms    500ms  1000ms 1500ms 2000ms

    var numOfSteps = 5;
    var stepTime = duration / (numOfSteps - 1); // 2000/4 = 500ms
    var stepfunction = function(stepNum, stepTime) {
        console.log("doit!", stepNum, " - ", stepTime);
    }
    var stepsCount = 0;
    var stepsTimes = [];
    
    // calculate steps times...
    stepsTimes[0] = 0;
    for (var i = 1; i < numOfSteps; i++) {
        stepsTimes[i] = stepsTimes[i - 1] + stepTime;
    }

    function startAnim(timeStamp) {
        console.log(timeStamp);
        start = timeStamp;
        end = start + duration;
        draw(timeStamp);
    }

    function draw(now) {
    
        var t = now - start;
        if (t >= stepsTimes[stepsCount]) {
            stepfunction(stepsCount + 1, t);
            stepsCount++;
            animation.onEveryStep();
        }

        if (window.stop) {
        	animation.whenFinished();
            return
        };
        
        if (now - start >= duration) window.stop = true;
        
        var p = (now - start) / duration;
        val = inOutQuad(p);
        x = startx + (destx - startx) * val;
        $(domEl).css('margin-left', `${x}px`);
        requestAnimationFrame(draw);
    }

    requestAnimationFrame(startAnim);
}

startAnimation($('#thing'))
