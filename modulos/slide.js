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
        Event.preventDefault();
        this.distance.startX = Event.clientX;
        this.wrapper.addEventListener('mousemove', this.onMove);
    }

    onMove(Event) {
        const finalPosition = this.updatePosition(Event.clientX)
        this.moveSlide(finalPosition)
    }

    onEnd(Event) {
        this.wrapper.removeEventListener('mousemove', this.onMove);
        this.distance.finalPosition = this.distance.movePosition;
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

    init(){
        this.bindEvents()
        this.addSlideEvents();
        return this
    }
}