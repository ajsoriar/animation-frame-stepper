/**
 * animation-stepper
 * Javascript library to handle several animations at once using a singleton approach. One window.requestAnimationFrame instance will be running in the background to orchest all animations.
 * @version 1.0.0 - 2019-05-19
 * @link https://github.com/ajsoriar/animation-stepper
 * @author Andres J. Soria R. <ajsoriar@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function () {

    "use strict";

    var AS = {
        requestId: null,
        mainAnimation: {
            id: null,
            timestamp: Date.now(),
            name: "Main animation function",
            description: "Main animation function",
            defaultFunction: function () {
                this.timestamp = Date.now();
            },

            attachedFuncs: [] 
        },
        attachedAnimations: [],
        flags: {
            executeDefaultFunc: true,
            executeAttachedFuncs: true,
            mainFuncFinished: true, 
            attachedFuncsFinished: true 
        },
    };

    window.AS = AS;

    var requestId = 0;

    function animate() {
        AS.mainAnimation.defaultFunction();

        if (window.AS.flags.mainFuncFinished) executeFuncsInMainThreat(window.AS.mainAnimation.attachedFuncs); 
        if (window.AS.flags.attachedFuncsFinished) executeAttachedAnimations(window.AS.attachedAnimations);

        requestId = window.requestAnimationFrame(animate);
    }

    function executeFuncsInMainThreat(funcsArray) {
        window.AS.flags.mainFuncFinished = false;
        if (funcsArray === undefined || funcsArray.length === 0) return
        var lon = funcsArray.length;
        for (var i = 0; i < lon; i++) {
            var f = funcsArray[i];
            f();
        }
        window.AS.flags.mainFuncFinished = true;
    }

    function executeAttachedAnimations(funcsArray) {
        window.AS.flags.attachedFuncsFinished = false;
        if (funcsArray === undefined || funcsArray.length === 0) return
        var lon = funcsArray.length;
        for (var i = 0; i < lon; i++) {
            doAnimation(funcsArray[i]);
        }
        window.AS.flags.attachedFuncsFinished = true;
    }

    function doAnimation(animationData) {

        function executeStep(animationData) {
            animationData.func(animationData);
            if (animationData.stepsFuncs != undefined) {
                var f = animationData.stepsFuncs[animationData.currentStep - 1];
                if (typeof f === 'function') f(animationData);
                else {
                    if (f != null) f = animationData.stepsFuncs[animationData.currentStep - 1].func;
                };
            }
        }

        if (animationData.status === undefined || animationData.status === 0) { 

            

            animationData.stepStartTime = AS.mainAnimation.timestamp; 

            animationData.onStart();

            if (animationData.stepsNum === null) animationData.stepsNum = animationData.stepsFuncs.length;
            if (animationData.currentStep === undefined) animationData.currentStep = 0;
            else if (animationData.currentStep === null) animationData.currentStep = 1;
            if (animationData.currentStep > animationData.stepsNum) animationData.currentStep = 1;

            executeStep(animationData);

            animationData.status = 1; 
            animationData.currentStep++;

        } else if (animationData.status === 1) { 

            if ((animationData.stepStartTime + animationData.milisecondsStep) < AS.mainAnimation.timestamp) {

                animationData.stepStartTime = AS.mainAnimation.timestamp;

                executeStep(animationData);

                animationData.status = 1; 

                if (animationData.currentStep === animationData.stepsNum && (animationData.repeatForever === true || animationData.repeatForever === undefined)) {

                    animationData.currentStep = 1;

                } else if (animationData.currentStep === animationData.stepsNum && !animationData.repeatForever) {

                    if ((typeof animationData.whenFinish) === 'function') animationData.whenFinish();

                    animationData.status = 3; 
                } else {

                    animationData.currentStep++;
                }

            }

        } else {

            

            return
        }

    }

    function start() {
        AS.requestId = window.requestAnimationFrame(animate);
    }

    function stop() {
        if (AS.requestId) window.cancelAnimationFrame(requestId);
        AS.requestId = null;
    }

    AS.attachAnimation = function (jsonData) {

        

        if (jsonData === undefined || jsonData === null) return 

        if (jsonData.id === undefined || jsonData.id === null) jsonData.id = "afs-" + Date.now();

        AS.attachedAnimations.push(jsonData);

        return jsonData.id;
    }

    AS.init = function () {
        
        start();
        return this;
    };

    AS.searchAnimation = function (lbl_or_id) { 

        if (lbl_or_id === null) return null

        var animationsArr = window.AS.attachedAnimations;

        if (animationsArr.length === 0) return null

        var lon = animationsArr.length;

        for (var i = 0; i < lon; i++) {

            var obj = animationsArr[i];

            if (obj.label === lbl_or_id || obj.id === lbl_or_id) {

                return obj;
            }
        }

        return null;
    };

    AS.resetAnimationByLabel = function (lbl) {
        var obj = AS.searchAnimation(lbl);
        if (obj != null) {
            obj.currentStep = 0;
            obj.status = 0;
        }
    };

    AS.pauseAnimationByLabel = function (lbl) {
        var obj = AS.searchAnimation(lbl);
        if (obj != null) {
            obj.status = 2;
        }
    };

    AS.stopAnimationByLabel = function (lbl) {
        AS.resetAnimationByLabel(lbl);
    };

    AS.continueAnimationByLabel = function (lbl) {
        var obj = AS.searchAnimation(lbl);
        if (obj != null) {
            obj.status = 1;
        }
    };

})();