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
        event.preventDefault();
        this.dist.startX = event.clientX;
        console.log(this.dist.startX);
        this.wrapper.addEventListener('mousemove', this.onMove);
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
        const finalPosition = this.updatePosition(event.clientX);
        this.moveSlide(finalPosition);
    }

    onEnd(event) {
        // console.log('Acabou');
        this.wrapper.removeEventListener('mousemove', this.onMove);
        this.dist.finalPosition = this.dist.movedToPosition;
    }

    addSlideEvents() {
        this.wrapper.addEventListener('mousedown', this.onStart);
        this.wrapper.addEventListener('mouseup', this.onEnd);
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