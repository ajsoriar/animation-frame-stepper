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

function resetByLabel( lbl ) {
    AS.resetAnimationByLabel( lbl );
}

