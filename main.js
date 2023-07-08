'use strict';

//Loading spinner
let loading = document.querySelector(".loading-spiner");
window.addEventListener('load', function() {
  setTimeout(() => {
      loading.classList.add("stop");
  }, 1000);
});

// GET YEAR
const updateYrar = function() {
    const date = new Date();
    const getYear = date.getFullYear();
    document.getElementById("year").innerHTML = getYear;
}

// Intro Section
const heightSection = function() {
    let introSection = document.querySelector('.intro-section'); 
    let imgIntro = document.querySelector('.intro-section img'); 
    let heightIntroSec = function() {
        let heightImg = +imgIntro.getBoundingClientRect().height.toFixed();
        introSection.style.minHeight = `${heightImg}px`;
    }
    const event = ['load', 'resize'];
    event.forEach(ev => window.addEventListener(ev, heightIntroSec));
    // window.addEventListener('load', heightIntroSec);
    // window.addEventListener('resize', heightIntroSec);
}


/////////////////////////////////////////////////

// Popup Modal
const modalComponent = function() {
    let btnModal = document.querySelectorAll('.open-modal');
    let modal = document.querySelector('.modal-popup');
    let overlay = document.querySelector('.overlay');
    let btnCloseModal = document.querySelector('.close-modal');
    // Open Modal
    btnModal.forEach((ele) => {
        ele.addEventListener("click", (e) => {
            e.preventDefault();
            modal.classList.add('open');
            overlay.classList.add('open');
        });
    });
    // close Modal
    let closeModal = function(e) {
        e.preventDefault();
        modal.classList.remove('open');
        overlay.classList.remove('open');
    }
    btnCloseModal.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);
    // Close Modal With Escape
    window.addEventListener('keydown', (e) => {
        if (e.key == "Escape") closeModal(e);
    });
}


///////////////////////////////////////

// Backto topp
let backToTop = document.querySelector(".to-top");
window.addEventListener("scroll", () => {
    if ( scrollY > 350 )  backToTop.classList.add('show');
   else backToTop.classList.remove('show');
});
backToTop.addEventListener("click", (e) => {
    e.preventDefault();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    scrollTo(0, 0);
});



///////////////////////////////
// Go down
const secGoDown = function() {
    let goDown = document.querySelector(".go-down");
    let secAbout = document.querySelector("#about");
    goDown.addEventListener("click", function(e) {
        e.preventDefault();
        // const section = secAbout.getBoundingClientRect();
        // window.scrollTo({
        //     left: section.left + scrollX,
        //     top: section.top + scrollY,
        //     behavior: "smooth"
        // });
        secAbout.scrollIntoView({behavior: "smooth"});
    });
}


//////////////

// Page Navigation
let header = document.querySelector(".header");
let nav = document.querySelector("nav.navbar");
let navLinks = document.querySelectorAll(".nav-link");
let menuNav = document.querySelector(".menu-nav");
let navItems = document.querySelector(".nav-items");
let logo = document.querySelector(".logo");
let btnNav = document.querySelector(".btn-nav");
//let btnMenu = document.querySelector(".menu-btn");
// height nav
let navItemsHeight = navItems.getBoundingClientRect().height;
const heightHeader = function() {
    const heightNav = nav.getBoundingClientRect().height;
    header.style.height = `${heightNav}px`;
}
const eventHeader = ['load', 'resize'];
eventHeader.forEach(ev => window.addEventListener(ev, heightHeader));
// window.addEventListener("resize", heightHeader);
// window.addEventListener("load", heightHeader);


////////////////////////////////////////////// 

// animated fade Links
const mouseFade = function(e) {
    let eTarget = e.target;
    if (eTarget.classList.contains("nav-link") ) {
        navLinks.forEach((link) => { 
            if ( eTarget !== link ) link.style.opacity = this;
        });
        logo.style.opacity = this;
        btnNav.style.opacity = this;
    }
}
// Passing "Argument" to Handler
header.addEventListener("mouseover", mouseFade.bind(0.4));
header.addEventListener("mouseout",  mouseFade.bind(1));
 
//////////////////
// CLicked header
header.addEventListener("click", function(e) {
    let eTarget = e.target;
    const navItemsHeight = navItems.getBoundingClientRect().height;


    const btnMenu = eTarget.closest(".menu-btn");
    if ( btnMenu) {
        btnMenu.classList.toggle("open");
        if ( menuNav.clientHeight === 0) {
            menuNav.style.height = `${navItemsHeight}px`;
        } else {
            menuNav.style.height = `0px`;
        }
    }

    // Links
    if (eTarget.classList.contains("nav-link")) {
        const id = eTarget.getAttribute("href");
        if (id.startsWith("#")) e.preventDefault();
        const sections = document.querySelector(id);
      
        const btnMenu = eTarget.closest(".header").querySelector(".menu-btn");
        // Links
       // Position To SCroll 
        const sectionTop = sections.getBoundingClientRect().top;
        const headerHeight = eTarget.closest(".header").getBoundingClientRect().height;
        const position = (scrollY + sectionTop) - headerHeight;
        if (nav.classList.contains("sticky")) {
            window.scrollTo({
                left: 0,
                top: position,
                behavior: "smooth"
            });
        } else {
            window.scrollTo({
                left: 0,
                top: scrollY + sectionTop,
                behavior: "smooth"
            });
        }

        // Add active 
        navLinks.forEach(l => {
            l.classList.remove("active");
            l.style.opacity = "1";
        });
        eTarget.classList.add("active");

        // remove Active btn
        menuNav.style.height = `0px`;
        logo.style.opacity = "1";
        btnNav.style.opacity = "1";
        btnMenu.classList.remove("open")
    }


});

////////////////////////////////

// // How InterSectionObserver is working
// const callback = function(entries, observe) {
//     console.log(observe); // its all options of observe
//     entries.forEach(enter => {
//         console.log(enter)
//     })
// }
// const option = {
//     // root: null,
//     // threshold: 0.15 // total 1 Present start section with 15 present
// }
// const obServer = new IntersectionObserver(callback, option);
// obServer.observe(secAbout); // choose the element for observe

/////////////////////////////////////

// Header Sticky
const headerSticky = function() {
    const heightNav = nav.getBoundingClientRect().height;
    const headerCallBack = function(entries) {
        const [entry] = entries;
        if (!entry.isIntersecting) nav.classList.add("sticky");
        else nav.classList.remove("sticky");
    }
    const headerOption = {
        root: null,
        threshold: 0,
        rootMargin: `-${heightNav}px`
    }
    const headerObserver = new IntersectionObserver(headerCallBack, headerOption);
    headerObserver.observe(header);
}

///////////////////////////////////

// Section Animate
const allSections = document.querySelectorAll(".section");
const sectionsAnimate = function() {
    const secCallback = function(entries, observ) {
        const [entry] = entries;
        if (!entry.isIntersecting) return;
        entry.target.classList.remove("hidde-section");
        observ.unobserve(entry.target);
    }
    const secOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: "0px"
    }
    const sectionsObserver = new IntersectionObserver(secCallback, secOptions);
    allSections.forEach(section => {
        sectionsObserver.observe(section);
        section.classList.add("hidde-section");
    });
}


////////////////////////

// OnScroll
window.addEventListener("scroll", function() {
    const heightNav = nav.getBoundingClientRect().height;
    // Sticky Navigation
    // // Add Sticky
    // const heightNav = nav.getBoundingClientRect().height;
    // if ( scrollY >= heightNav ) {
    //     nav.classList.add("sticky");
    // } else {
    //     nav.classList.remove("sticky");
    // }

    // Add Active on Scroll
    let current = '';
    allSections.forEach(section => {
        if ((scrollY + heightNav) >= section.offsetTop ) current = section.getAttribute("id");
    });
    navLinks.forEach(link => {
        const id = link.getAttribute("href").slice(1);
        link.classList.remove("active");
        if (id === current) link.classList.add("active");
    });

});
//////////////////////////////////

// Lazy Images
const imgLoading = function() {
    const imgsLazy = document.querySelectorAll("img[data-src]")
    const imgCallback = function(entries, observer) {
        entries.forEach(entry => {
            const image = entry.target;
            if (entry.isIntersecting) {
                image.src = image.dataset.src;
                image.addEventListener("load", function() {
                    image.classList.remove("lazy-img");
                });
                // Stop target image anymore
                observer.unobserve(image);
            }
        });
    }
    // Option
    const imgOptions = {threshold: 0.70 }
    // Observer
    const lazyImage = new IntersectionObserver(imgCallback, imgOptions)
    imgsLazy.forEach(img => lazyImage.observe(img));
}

/////////////////////////
// tabs Component
const tabsComponents = function() {
    let btnTabs = document.querySelectorAll(".button-tab");
    let tabsComponent = document.querySelector(".tabs-component");
    let tabsContent = document.querySelectorAll(".tabs-content");
    
    // btnTabs.forEach((element) => {
    //     element.addEventListener("click", function(e) {
    //         btnTabs.forEach(b => b.classList.remove("active"));
    //         element.classList.add("active");
    //         tabsContent.forEach(t => t.classList.remove("active"))
    //         document.querySelector(`.tab-${element.dataset.tab}`).classList.add("active");
    //     });
    // })
    
    tabsComponent.addEventListener("click", function(e) {
        let clicked = e.target.closest(".button-tab");
        // if Not The btn return nothing;
        if (!clicked) return;
        // Active Tab Btn
        btnTabs.forEach(t => t.classList.remove("active"));
        clicked.classList.add("active");
        // Add Active To Tab Content
        const id = clicked.dataset.tab;
        tabsContent.forEach(t => t.classList.remove("active"));
        document.querySelector(`.tab-${id}`).classList.add("active");
    });
}

////////////////////////////////////////////
// Slider 
const sliderComponent = function() {
        
    let slider = document.querySelector('.slider'); 
    let slide = document.querySelectorAll('.slide'); 
    // Buttons
    let btnSliderLeft = document.querySelector(".bt-slider-left");
    let btnSliderRight = document.querySelector(".bt-slider-right");
    // Dots
    let dotsContainer = document.querySelector(".dots");

    // slide 
    let currentSlide = 0;
    const maxSlide = slide.length;

    // Functions 
    // Add Height To Slider
    let heightSlider = function() {
        let heightSlide;
        let array = [];
        slide.forEach((element) => {
            const items = +element.getBoundingClientRect().height.toFixed();
            array.push(items);
        })
        heightSlide = Math.max(...array);
        slider.style.minHeight = `${heightSlide}px`;
    }
    window.addEventListener('load', heightSlider);
    window.addEventListener('resize', heightSlider);

    // Transform Slide
    const goToSlide = function(eleSlide) {
        slide.forEach((slide, index) => slide.style.transform = `translateX(${(index - eleSlide) * 100}%)`);
    }
    
    // dots
    const createDots = function() {
        slide.forEach((_, index) => {
            dotsContainer.insertAdjacentHTML(
                "beforeend",
                `<button class="dots-dot" data-slide="${index}"></button>`
            );
        });
    }
    
    // Add Active to Dots
    const activeDots = function(slide) {
        const dots = document.querySelectorAll(".dots-dot");
        const activeClass = document.querySelector(`.dots-dot[data-slide="${slide}"]`);
        dots.forEach(dot => dot.classList.remove("dots-dot-active"));
        activeClass.classList.add("dots-dot-active");
    }
    
    // Next
    const nextSlide = function() {
        currentSlide++;
        if ( currentSlide >=  maxSlide ) currentSlide = 0;
        goToSlide(currentSlide);
        activeDots(currentSlide);
    }

    // Prev
    const prevSlide = function() {
        currentSlide--;
        if ( currentSlide < 0 )  currentSlide = maxSlide - 1;
        goToSlide(currentSlide);
        activeDots(currentSlide);
    }
    // Event
    btnSliderRight.addEventListener("click", nextSlide);
    btnSliderLeft.addEventListener("click", prevSlide);
    // Keydown
    window.addEventListener("keydown", function(e) {
        if ( e.key === "ArrowRight" ) nextSlide();
        if ( e.key === "ArrowLeft" ) prevSlide();
    });


    // Event Dot
    dotsContainer.addEventListener("click", function(e) {
        const dot = e.target;
        if (dot.classList.contains("dots-dot")) {
            const id = dot.dataset.slide;
            goToSlide(id);
            activeDots(id);
        }
    });

    // Init Functions 
    const init = function() {
        goToSlide(0);
        createDots();
        activeDots(0);
    }
    init();
}
//////////////////////////


 // Init Functions 
 const init = function() {
    updateYrar();
    heightSection();
    modalComponent();
    secGoDown();
    headerSticky();
    sectionsAnimate();
    imgLoading();
    tabsComponents();
    sliderComponent(); 
}
init();
