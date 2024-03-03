var tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".slowScrollContainer",
        scrub: true,
        start: "top bottom",
        end: "bottom top",
        //markers:true
    },
});

tl.to(".dScroll-slow", {
    y: "120vh",
    ease: "power1.inOut"
})

class CustomScroller {
    constructor(container) {

        this.realScrollHeight = 0;

        this.offset = 0;
        this.slowFactor = 2;
        this.container = document.querySelector(container);

        this.elementHeights = [...document.getElementsByClassName("dScroll-element")].map(i => i.scrollHeight);
        this.elements = [...document.getElementsByClassName("dScroll-element")];

        var slowDivs = document.querySelectorAll(".differentScroll .scroll-slow").length;
        var normalDivs = document.querySelectorAll(".differentScroll .scroll-normal").length;

        //assum
        var vdiv = normalDivs + (slowDivs * this.slowFactor);
        this.normalSpeed = vdiv;
        this.slowSpeed = vdiv / this.slowFactor;

        this.doScrollEvent();
    }
    onScroll(newScrollHeight) {


    }
    doScrollEvent() {
        document.addEventListener("scroll", (e) => {
            var prevScrollHeight = this.realScrollHeight;
            this.realScrollHeight = window.scrollY;
            var delta = prevScrollHeight - this.realScrollHeight;

            //what element am i over
            //apply transform based on that and the factors.


            var currentElementIndex = this.elementHeights.findIndex(i => this.realScrollHeight < i);
            var currentElement = this.elements[currentElementIndex];

            var isSlow = currentElement.classList.contains("dScroll-slow");
            console.log(isSlow);
            if (isSlow) {

                this.offset -= delta * (this.slowSpeed - 1);
            } else {
                this.offset -= delta * (this.normalSpeed - 1);
            }

            this.container.style.transform = "translatey(" + this.offset + "px)";

        });
    }
}

//new CustomScroller(".dScroll-Container");
