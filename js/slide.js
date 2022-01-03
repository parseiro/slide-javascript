export default class Slide {
    constructor(slide, wrapper) {
        this.slide = document.querySelector(slide);
        this.wrapper = document.querySelector(wrapper);
        this.dist = {
            finalPosition: 0,
            startX: 0,
            movement: 0
        }
    }

    onStart(event) {
        if (event.type === 'mousedown') {
            event.preventDefault();
            this.dist.startX = event.clientX;
            this.wrapper.addEventListener('mousemove', this.onMove);
        } else {
            this.dist.startX = event.changedTouches[0].clientX;
            this.wrapper.addEventListener('touchmove', this.onMove);
        }
        // console.log(this.dist.startX);

    }

    moveSlide(distX) {


        this.dist.movedToPosition = distX;
        let newStyle = `translate3d(${distX}px, 0, 0)`;
        this.slide.style.transform = newStyle;
        // console.log(newStyle);
    }

    updatePosition(clientX) {
        this.dist.movement = (this.dist.startX - clientX)*1.6;
        return this.dist.finalPosition - this.dist.movement;
    }

    onMove(event) {
        const pointerPosition = (event.type === 'mousemove') ? event.clientX : event.changedTouches[0].clientX;
        const finalPosition = this.updatePosition(pointerPosition);
        this.moveSlide(finalPosition);
    }

    onEnd(event) {
        // console.log('Acabou');
        const movetype = (event.type === 'mouseup') ? 'mousemove' : 'touchmove';
        this.wrapper.removeEventListener(movetype, this.onMove);
        this.dist.finalPosition = this.dist.movedToPosition;
    }

    addSlideEvents() {
        this.wrapper.addEventListener('mousedown', this.onStart);
        this.wrapper.addEventListener('touchstart', this.onStart);
        this.wrapper.addEventListener('mouseup', this.onEnd);
        this.wrapper.addEventListener('touchend', this.onEnd);
    }

    bindEvents() {
        this.onStart = this.onStart.bind(this);
        this.onMove = this.onMove.bind(this);
        this.onEnd = this.onEnd.bind(this);
    }

    init() {
        this.bindEvents();
        this.addSlideEvents();
        return this;
    }

}