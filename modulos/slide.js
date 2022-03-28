export default class Slide {
    constructor(slide, wrapper) {
        this.slide = document.querySelector(slide);
        this.wrapper = document.querySelector(wrapper);
        this.distance = {
            finalPosition: 0,
            startX: 0,
            movement: 0,
        }
    }

    moveSlide(distX) {
        this.distance.movePosition = distX;
        this.slide.style.transform = `translate3d(${distX}px, 0, 0)`
    }

    updatePosition(clientX) {
        this.distance.movement = (this.distance.startX - clientX) * 1.6
        return this.distance.finalPosition - this.distance.movement
    }

    onStart(Event) {
        let movetype
        if(Event.type === 'mousedown'){
            Event.preventDefault();
            this.distance.startX = Event.clientX;
            movetype = 'mousemove';
        } else {
            this.distance.startX = Event.changedTouches[0].clientX;
            movetype = 'touchmove';
        }
        this.wrapper.addEventListener(movetype, this.onMove);
    }

    onMove(Event) {
        const pointerPosition = (Event.type === 'mousemove') ? Event.clientX : Event.changedTouches[0].clientX;
        const finalPosition = this.updatePosition(pointerPosition)
        this.moveSlide(finalPosition)
    }

    onEnd(Event) {
        const movetype = (Event.type === 'mouseup') ? 'mousemove' : 'touchmove';
        this.wrapper.removeEventListener(movetype, this.onMove);
        this.distance.finalPosition = this.distance.movePosition;
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

    init(){
        this.bindEvents()
        this.addSlideEvents();
        return this
    }
}