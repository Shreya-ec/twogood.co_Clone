function locomotiveAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });


    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}
locomotiveAnimations();

function navbarAnimation() {
    gsap.from("#nav1", {
        transform: "translateY(-10%)",
        opacity: 0
    })
    gsap.from("#nav2", {
        transform: "translateY(-50%)",
        opacity: 0
    })
    // logo top ani.
    gsap.to("#nav1 svg", {
        y: "-100%",
        scrollTrigger: {
            trigger: "#page1",
            scroller: "#main",
            start: "top 0",  // animation starts when the top of #page1 reaches the top of the #main scroller.
            end: "top -5%",  // animation ends when the top of #page1 has scrolled 5% above the top of #main.
            scrub: true,     // When you scroll forward, the animation progresses, When you scroll backward, the animation reverses.
        },
        marginTop: "-10px"
    })
    // logo down ani. Scroll up
    gsap.to("#nav1 svg", {
        y: "-100%",
        scrollTrigger: {
            trigger: "#footer",
            scroller: "#main",
            start: "top 60%",
            end: "top 65%",
            toggleActions: "reverse none none play", // onEnter onLeave onEnterBack onLeaveBack
        },
        marginTop: "-10px"
    });

    gsap.to("#nav2 #links", {
        transform: "translateY(-250%)",
        scrollTrigger: {
            trigger: "#page1",
            scroller: "#main",
            start: "top 0",
            end: "top -5%",
            scrub: true
        }
    })
}
navbarAnimation();

function loadingAnimation() {
    gsap.from("#page1 h1", {
        y: 100,
        opacity: 0,
        delay: 0.5,
        duration: 0.5,
        stagger: 0.2,
    })
    gsap.from("#img_container", {
        scale: 1.1,
        opacity: 0,
        delay: 1.5,
        duration: 0.9,
    })
    gsap.from("#text1 span", {
        opacity: 0,
        y: 100,
        duration: 0.4,
        stagger: 0.2,
        scrollTrigger: {
            trigger: "#text1 span",
            scroller: "#main",
            start: "top 75%"
        }
    })
    gsap.from("#page2 .elem", {
        opacity: 0,
        scale: 1.1,
        duration: 0.4,
        stagger: 0.2,
        scrollTrigger: {
            trigger: "#page2 .elem",
            scroller: "#main",
            start: "top 75%"
        }
    })
    gsap.from(".anim1 .child", {
        opacity: 0,
        scale: 1.1,
        duration: 0.4,
        stagger: 0.2,
        scrollTrigger: {
            trigger: ".anim1 .child",
            scroller: "#main",
            start: "top 50%"
        }
    })
    gsap.from(".anim2 .child", {
        opacity: 0,
        scale: 1.1,
        duration: 0.4,
        stagger: 0.2,
        scrollTrigger: {
            trigger: ".anim2 .child",
            scroller: "#main",
            start: "top 50%"
        }
    })
    gsap.from(".container3 .line", {
        x: -3000,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: ".container3 .line",
            scroller: "#main",
            start: "top 70%"
        }
    })
    gsap.from("#page4 .imgcont", {
        opacity: 0,
        scale: 1.1,
        duration: 0.4,
        stagger: 0.2,
        scrollTrigger: {
            trigger: "#page4 .imgcont",
            scroller: "#main",
            start: "top 75%"
        }
    })
    gsap.from("#footer .mb", {
        opacity: 0,
        scale: 1.1,
        duration: 0.4,
        stagger: 0.2,
        scrollTrigger: {
            trigger: "#footer .mb",
            scroller: "#main",
            start: "top 65%"
        }
    })
    gsap.from(".lists li", {
        y: 10,
        opacity: 0.5,
        stagger: 0.1,
        scrollTrigger: {
            trigger: ".lists li",
            scroller: "#main",
            start: "top 60%"
        }
    })
    gsap.from(".lastbutnottheleast p", {
        y: 30,
        opacity: 0.5,
        stagger: 0.1,
        delay: 0.4,
        scrub: true,
        scrollTrigger: {
            trigger: ".lastbutnottheleast p",
            scroller: "#main",
            start: "top 100%"
        }
    })
    gsap.to(".anicont svg path", {
        fill: "black",
        stagger: 0.2,
        scrollTrigger: {
            trigger: ".anicont svg path",
            scroller: "#main",
            start: "top 70%",
        }
    })
    gsap.from(".terms a", {
        x: 30,
        opacity: 0,
        stagger: 0.1,
        delay: 0.4,
        scrollTrigger: {
            trigger: ".terms a",
            scroller: "#main",
            start: "top 100%"
        }
    })
}
loadingAnimation();

function cursorAnim() {
    document.addEventListener("mousemove", function (dets) {
        gsap.to("#cursor", {
            left: dets.x,
            top: dets.y
        })
    })
    document.querySelectorAll(".child").forEach(function (elem) {
        elem.addEventListener("mouseenter", function () {
            gsap.to("#cursor", {
                transform: 'translate(-50%,-50%) scale(1)'
            });
        });
    })
    document.querySelectorAll(".child").forEach(function (elem) {
        elem.addEventListener("mouseleave", function () {
            gsap.to("#cursor", {
                transform: 'translate(-50%,-50%) scale(0)'
            });
        });
    })
    const cursor = document.querySelector("#cursor")
    document.querySelector("#child3").addEventListener("mouseenter", function () {
        cursor.classList.add("pink");
    })
    document.querySelector("#child3").addEventListener("mouseleave", function () {
        cursor.classList.remove("pink");
    })
    document.querySelector("#child4").addEventListener("mouseenter", function () {
        cursor.classList.add("blue");
    })
    document.querySelector("#child4").addEventListener("mouseleave", function () {
        cursor.classList.remove("blue");
    })
}
cursorAnim();

function carousel() {
    // activating the first slider box
    document.addEventListener('DOMContentLoaded', function () {
        const firstItem = document.querySelector("#slide1");
        firstItem.classList.add("active");
        updateContent(firstItem.id);
    })

    // activating on click - (for css)
    const carousel = document.querySelector(".slider");
    carousel.addEventListener("click", function (event) {
        const clickedItem = event.target.closest(".slider_box");
        const activeItem = document.querySelector(".slider_box.active");
        if (activeItem) {
            activeItem.classList.remove("active");
        }
        clickedItem.classList.add("active");

        // Move clicked slide to center
        centerActiveSlide(clickedItem);

        // identifying the clicked/active slide
        var activeItemId = clickedItem.id;
        updateContent(activeItemId);
    });

    // function updateContent(itemId) {
    //     const contentItems = document.querySelectorAll(".content");
    //     contentItems.forEach(item => {
    //         item.style.display = "none";
    //     });
    //     const contentId = `${itemId}-content`;
    //     const contentToShow = document.getElementById(contentId);
    //     if (contentToShow) {
    //         contentToShow.style.display = "block";
    //     }
    // }

    function updateContent(itemId) {
        const contentItems = document.querySelectorAll(".content");
        contentItems.forEach(item => {
            item.classList.remove("active"); // Remove active class to hide all items
        });
        const contentId = `${itemId}-content`;
        const contentToShow = document.getElementById(contentId);
        if (contentToShow) {
            contentToShow.classList.add("active"); // Add active class to show the selected item
        }
    }

    function centerActiveSlide(activeSlide) {
        const carousel = document.querySelector(".slider");
        const carouselWidth = carousel.offsetWidth;
        const slideWidth = activeSlide.offsetWidth;
        const slideOffsetLeft = activeSlide.offsetLeft;

        // Calculate the scrollLeft value to center the active slide
        const scrollLeft = slideOffsetLeft - (carouselWidth - slideWidth) / 2;

        // Scroll the carousel container to center the active slide
        carousel.scrollLeft = scrollLeft;
    }

    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 5,
        spaceBetween: 7,
        centeredSlides: true,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        }
    });

}
carousel();

function dropdown() {
    const btn = document.querySelector(".formbtn");
    btn.addEventListener("click", function dropdown() {
        console.log('clicked');
        document.querySelector(".input_fields").classList.add("open");
        document.querySelector(".formbtn").classList.add("open");

    })
    document.addEventListener("click", function (event) {
        const inputFields = document.querySelector(".input_fields");
        const formBtn = document.querySelector(".formbtn");

        // Check if the click is outside the input fields and the button
        if (!inputFields.contains(event.target) && !formBtn.contains(event.target)) {
            inputFields.classList.remove("open");
            formBtn.classList.remove("open");
        }
    });
}
dropdown()

function emaildo() {
    const emailInput = document.querySelector('.emaildo');
    const arrow = document.querySelector("#ic1");
    const enter = document.querySelector("#ic2");
    const circle = document.querySelector(".circleout");

    emailInput.addEventListener('focus', function () {
        this.placeholder = '';
        enter.style.display = "block";
        arrow.style.display = "none";
        circle.style.display = "none";
    });
    emailInput.addEventListener('blur', function () {
        if (this.value === '') {
            this.placeholder = 'Enter your email address for Good';
        }
        enter.style.display = "none";
        arrow.style.display = "block";
    });

    // Add event listener for button click
    arrow.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default button behavior
        validateEmail(); // Call the email validation function
    });

    // Add event listener for Enter key press
    emailInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            validateEmail(); // Call the email validation function
        }
    });

}
emaildo()

// Email validation function
function validateEmail() {
    const emailInput = document.querySelector('.emaildo');
    const emailValue = emailInput.value.trim(); // Get the value and remove extra spaces
    const greenMessage = document.querySelector('.green');
    const redMessage = document.querySelector('.red');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(emailValue)) {
        greenMessage.style.display = 'block';
        redMessage.style.display = 'none';
    } else {
        greenMessage.style.display = 'none';
        redMessage.style.display = 'block';
    }
}