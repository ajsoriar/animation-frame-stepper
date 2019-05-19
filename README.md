# animation-stepper

[![npm version](https://badge.fury.io/js/animation-stepper.svg)](https://badge.fury.io/js/animation-stepper)

[![NPM](https://nodei.co/npm/animation-stepper.png?downloads=true&stars=true)](https://nodei.co/npm/animation-stepper/)

Javascript library to handle several animations at once using a singleton approach. One window.requestAnimationFrame instance will be running in the background to orchest all animations.

## 1 Quick start

### 1.1 Download and Install animation-stepper

- Yarn: **yarn add animation-stepper**
- NPM: **npm install animation-stepper**
- github: **<https://github.com/ajsoriar/animation-stepper>**

## 2 Include dependences

```bash
$ yarn add animation-stepper
# or
$ npm install animation-stepper
```

### 2.1 In your HTML

```javascript
<script src="./node_modules/animation-stepper/dist/animation-stepper.min.js"></script>
```

### 2.2 In your js code

```javascript
<script>
AS.attachAnimation({
    stepsNum: 5,
    milisecondsStep: 25,
    func: function( _animation ) {
        ...
    },
    onStart: function() { 
        console.log("animation: onStart!");
        ...
    },
    whenFinish: function() {
        console.log("animation: whenFinish!");
        ...
    }
})
</script>
```

Full examples available in demo folder.

## Development instructions

```javascript
$ yarn install

grunt build
```

## License

flying-canvas is [MIT licensed](./LICENSE).
