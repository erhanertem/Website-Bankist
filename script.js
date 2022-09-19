'use strict';

//QUERYSELECTORS
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
const navBarContainer = document.querySelector('.nav');
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
const imgTargets = document.querySelectorAll('img[data-src]');

//FUNCTION MODAL OPEN
const openModal = function (e) {
  e.preventDefault(); //IMPORTANT this just makes sure href="#" on the node is ignored
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

//FUNCTION MODAL CLOSE
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//EVENTHANDLER MODAL WINDOW
// console.log(btnsOpenModal);
//NOTE There are two elements bearing btn--show-modal", one at the top and one at the very bottom of the page. QueryselectorAll() named by btnsOpenModal enlists 2 nodes. We cycle thru them to listen all at the same time if click triggers the modal.
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);
//Make instances of addEventListeners thruout the page per the node list of queryselectorall()
//--> WHEN CLICKED ON BTNS, OPEN MODAL
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
//--> WHEN CLICKED ON BTN OR ANYPLACE OUTSIDE THE MODAL, CLOSE MODAL
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
//--> WHEN CLICKED ESC AND MODAL IS NOT MARKED HIDDEN, CLOSE MODAL
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//EVENTHANDLER BUTTON LINK SMOOTH SCROLLING
btnScrollTo.addEventListener('click', function (e) {
  // //Old school smooth Scrolling
  // const s1coords = section1.getBoundingClientRect();
  // console.log('section to scroll to', s1coords); //IMPORTANT: Get the location of the element we want to scroll to
  // //VERY IMPORTANT! RELATIVE TO THE TOP OF BROWSER WINDOW
  // console.log('button that clicked', e.target.getBoundingClientRect());
  // //IMPORTANT e.target is essentially THE BUTTON GOT CLICKED (btnSCrollTo that function(e) refers to)
  // //VERY IMPORTANT! RELATIVE TO THE TOP OF BROWSER WINDOW
  // console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset); //Deprecated by scrollX/scrollY
  // console.log('Current scroll (X/Y)', window.scrollX, window.scrollY);
  // //IMPORTANT Tells us how far the browser window has scrolled from the top of the webpage in X/Y directions
  // //VERY IMPORTANT! ABSOLUTE DISTANCE TO THE TOP OF WEB PAGE
  // console.log(
  //   'height/width of viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );
  // // window.scrollTo(
  // //   s1coords.left + window.scrollX, //pos of the element to the top of window (relative dim) + from the top of the window to actuall top of the web page (absolute dim) = total absolute dim
  // //   s1coords.top + window.scrollY
  // // );
  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth',
  // });

  // Modern way of smooth scrolling
  section1.scrollIntoView({ behavior: 'smooth' });
});

//EVENTHANDLER PAGE NAVIGATION SMOOTH SCROLLING
// document.querySelectorAll('.nav__link').forEach(function (navel) {
//   navel.addEventListener('click', function (e) {
//     e.preventDefault(); //ignores href elements inside HTML definition
//     const hrefid = this.getAttribute('href');
//     console.log(hrefid);
//     document.querySelector(hrefid).scrollIntoView({ behavior: 'smooth' }); // Modern way of smooth scrolling
//   });
// }); //IMPORTANT! THIS IS A COUNTER PERFORMANCE APPLICATION OF CREATING INSTANCES OF ADDEVENTLISTENERS AS A GREAT NUMBER OF INSTANCES WOULD BE VERY HARD TO TACKLE WITH.

// VERY IMPORTANT! IN ORDER TO DEAL WITH SUCH SITUATION, EVENT DELEGATION IS A GOOD APPLICATION SCENARIO AS ONE PARENT ELEMENT THAT HANDLES THE EVENT LISTENER FOR ALL CHILDREN ELEMENTS
//STEPS:
//1.ADD EVENT LISTENER TO COMMON PARENT ELEMENT
//2.DETERMINE WHAT ELEMENT ORIGINATED THE EVENT
document.querySelector('.nav__links').addEventListener('click', function (e) {
  // console.log(e.target);
  e.preventDefault(); //ignores href elements inside HTML definitions
  //Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const hrefid = e.target.getAttribute('href');
    // console.log(hrefid);
    document.querySelector(hrefid).scrollIntoView({ behavior: 'smooth' }); // Modern way of smooth scrolling
  }
});

//EVENTHANDLER TABBED COMPONENT

//--> WATCH FOR CLICKS IN THE REALM OF THE DIV CONTAINER (PARENT) WRAPPING BTNS
tabsContainer.addEventListener('click', function (e) {
  // if (e.target.classList.contains('operations__tab')) {
  //   const clicked = e.target;
  //   console.log(clicked);
  // }
  //--> WORK ALL THE WAY DEEPER TO BTNS AND SCREEN FOR BTN CLICKS VIA CLOSEST
  //VERY IMPORTANT! WE NEEDED CLOSEST() METHOD AS BTNS ALSO IUNCLUDED SPAN ELEMENT INSIDE AND WE NEEDED ALWAYS THE BTN ELEMENT EVEN IF SPAN ELEMENT IS ALSO CLICKED!!
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);
  //--> CHECK FOR NULL CLICKS EXCLUDING BTNS
  if (!clicked) return; //VERY IMPORTANT! GUARD CLAUSE - PREVENTS ERR DUE TO CLICKING OUTSIDE THE BUTTONS BUT STILL INTHE CONTAINER AREA
  //--> CLEAR CLASS ACTIVE ON ALL BTNS
  tabs.forEach(el => el.classList.remove('operations__tab--active'));
  //--> ASSIGN ACTIVE TO BTN CLICKED
  clicked.classList.add('operations__tab--active');
  //--> CLEAR CLASS ACTIVE ON ALL CONTENT AREAS
  tabsContent.forEach(i => i.classList.remove('operations__content--active'));
  //--> ACTIVATE THE CORRESPONDING CONTENT AREA
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//FUNCTION MENU FADE ANIMATION
//THIS IS THE WAY TO GO TO REFACTOR THE CODE BY USING COMMON VARIABLES
//--> #1 version
// const handleHover = function (e, opacity) {
//   if (e.target.classList.contains('nav__link')) {
//     const hovered = e.target;
//     //--> DIM THE UNHOVERED BTNS
//     const notHovered = hovered.closest('.nav').querySelectorAll('.nav__link'); //VERY IMPORTANT! MOVE UP TO NAV PARENT VIA CLOSEST() AND FROM THERE SELECT ALL
//     notHovered.forEach(el => {
//       if (el !== hovered) el.style.opacity = opacity;
//     });
//     //--> DIM THE LOGO
//     const logo = hovered.closest('.nav').querySelector('img'); //ROLL UP TO PARENT ELEMENT AND FROM THERE SELECT ANY IMG TAG - LOGO
//     logo.style.opacity = opacity;
//   }
// };
//-->#2 version
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const hovered = e.target;
    //--> DIM THE UNHOVERED BTNS
    const notHovered = hovered.closest('.nav').querySelectorAll('.nav__link'); //VERY IMPORTANT! MOVE UP TO NAV PARENT VIA CLOSEST() AND FROM THERE SELECT ALL
    notHovered.forEach(el => {
      if (el !== hovered) el.style.opacity = this;
    });
    //--> DIM THE LOGO
    const logo = hovered.closest('.nav').querySelector('img'); //ROLL UP TO PARENT ELEMENT AND FROM THERE SELECT ANY IMG TAG - LOGO
    logo.style.opacity = this;
  }
};

//EVENTHANDLER MENU FADE ANIMATION
//DESCRIPTION: THE EXTEND OF THE ANIMATION EFFECT INCLUDES THE BANKIST LOGO AND SHOULD WORK ALL THE WAY DOWN TO THE BTNS WITH A FADE IN OUT EFFECT WHEN BTNS ARE HOVERED ON.
//--> WATCH FOR MOUSEOVER IN THE REALM OF THE NAV CONTAINER (PARENT) WRAPPING BTNS
// #1
// navBarContainer.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// }); //VERY IMPORTANT! IN ORDER TO DRY THE CODE MORE, FUNCTION INSIDE THE EVENT HANDLER FUNCTION COULD MAKE USE OF A BIND METHOD WHICH KEEPS THE e BUT BINDS THE OTHER ARGUMENT AS <THIS> IN THE FUNCTION. IN ORDER TO PUSH IN MORE ARGUMENT, BIND COULD PASS IN AN ARRAY [....] FOR MULTIPLE ARGUMENTS AS A WORKAROUND SINCE EVENT HANDLER FUNCTION CAN ONLY HANDLE 1 ARGUMENT AS AN INPUT
// #2
navBarContainer.addEventListener('mouseover', handleHover.bind(0.5));

//--> WATCH FOR MOUSEOUT IN THE REALM OF THE NAV CONTAINER (PARENT) WRAPPING BTNS
// #1
// navBarContainer.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });
// #2
navBarContainer.addEventListener('mouseout', handleHover.bind(1));

//OBSERVER STICKY NAVIGATION
// //--> #1version
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);
// window.addEventListener('scroll', function () {
//   console.log(window.scrollY); //WINDOW SCROLL EVENT IS COUNTER PERFORMANCE , WE WOULD NEED BETTER WAY OF DYNAMICLY CALCULATING THE POS WHICH IS INTERSECTION OBSERVER API

//   if (window.scrollY > initialCoords.top)
//     navBarContainer.classList.add('sticky');
//   else navBarContainer.classList.remove('sticky');
// });

//--> #2version INTERSECTION OBSERVER API
//--> OBSERVER CALLBACKFUNCTION @ THRESHOLDS
const stickyNav_callback = function (entries, observer) {
  const [entry] = entries; // take out the entry from the array object. SAME AS entry = entries[0]
  // console.log(entry); //entry is the object inside array

  if (!entry.isIntersecting) navBarContainer.classList.add('sticky');
  else navBarContainer.classList.remove('sticky');
};
//--> GET THE NAVBAR HEIGHT FOR ROOTMARGIN OPTION
const navHeight = navBarContainer.getBoundingClientRect().height;
// console.log(navHeight);
//--> CREATE OBSERVER WITH OPTIONS
const headerObserver = new IntersectionObserver(stickyNav_callback, {
  root: null, //the parent element that is used for checking visibility of the target element
  threshold: 0, //when the header enters to window at 0% - no delay
  // rootMargin: '-90px', //executes the function before/after certain margin off.
  rootMargin: `-${navHeight}px`, //executes the function before/after certain margin off.
});
//--> PROVIDE A TARGET FOR THE OBSERVER
headerObserver.observe(header);

//OBSERVER REVEAL SECTION ANIMATIONS
//--> OBSERVER CALLBACKFUNCTION @ THRESHOLD
const revealSection_callback = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  // console.log(entry.target);
  if (!entry.isIntersecting) return; //GUARD CLAUSE
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target); //VERY IMPORTANT! stops observing the target entry again! This is also the time when the callback is required to have observer as an argument.
};
//--> CREATE OBSERVER WITH OPTIONS
const sectionObserver = new IntersectionObserver(revealSection_callback, {
  root: null, //null-->viewport
  threshold: 0.15, //callback triggred @ 15% visible
});
//--> PROVIDE MULTIPLE TARGETS FOR THE OBSERVER
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

//OBSERVER LAZY LOADING IMAGES
//--> OBSERVER CALLBACKFUNCTION @ THRESHOLD
const loadImg_callback = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return; //GUARD CLAUSE
  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  //wait for the loading of the img before removing the blur on the low-res img
  entry.target.addEventListener('load', function () {
    //remove blur css property off the img element
    entry.target.classList.remove('lazy-img');
  });
};
//--> CREATE OBSERVER WITH OPTIONS
const imgObserver = new IntersectionObserver(loadImg_callback, {
  root: null,
  threshold: 1,
  rootMargin: '-100px',
});
//--> PROVIDE MULTIPLE TARGETS FOR THE OBSERVER
imgTargets.forEach(function (img) {
  imgObserver.observe(img);
});

// //COMPONENT START-OVER TYPE SLIDER OPTION #1
// //FUNCTION SLIDER
// const goToSlide = function (s) {
//   slides.forEach(
//     (slide, index) =>
//       (slide.style.transform = `translateX(${100 * (index - s)}%)`)
//   );
// };

// //FUNCTION SLIDER NEXT_SLIDE
// const nextSlide = function () {
//   if (currentSlide === maxSlide - 1) {
//     currentSlide = 0;
//   } else {
//     currentSlide++;
//     // console.log(currentSlide);
//   }
//   // slides.forEach(
//   //   (slide, index) =>
//   //     (slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`)
//   // );
//   // POS LAYOUT ORIGINAL     : *000%,  100%,  200%, 300%
//   //                                                    /1
//   // POS LAYOUT *************: -100%,  000%,  100%, 200%
//   //                                                    /2
//   // POS LAYOUT *************: -200%, -100%,  000%, 100%
//   //                                                    /3
//   // POS LAYOUT *************: -300%, -200%, -100%, 000%
//   //                                                    /4
//   // POS LAYOUT *************: *000%,  100%,  200%, 300%
//   //Refactored code into a function
//   goToSlide(currentSlide);
//   activateDot(currentSlide);
// };

// //FUNCTION SLIDER PREVIOUS_SLIDE
// const previousSlide = function () {
//   if (currentSlide === 0) {
//     currentSlide = maxSlide - 1;
//   } else {
//     currentSlide--;
//     // console.log(currentSlide);
//   }
//   // slides.forEach(
//   //   (slide, index) =>
//   //     (slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`)
//   // );
//   // POS LAYOUT ORIGINAL     : *000%,  100%,  200%, 300%
//   //                                                    /1
//   // POS LAYOUT *************: -100%,  000%,  100%, 200%
//   //                                                    /2
//   // POS LAYOUT *************: -200%, -100%,  000%, 100%
//   //                                                    /3
//   // POS LAYOUT *************: -300%, -200%, -100%, 000%
//   //                                                    /4
//   // POS LAYOUT *************: *000%,  100%,  200%, 300%
//   //Refactored code into a function
//   goToSlide(currentSlide);
//   activateDot(currentSlide);
// };

// //EVENTHANDLER SLIDER <-- -->
// //--> SLIDE POSITIONS @ INITIAL STAGE
// let currentSlide = 0;
// const maxSlide = slides.length;
// // slides.forEach(
// //   (slide, index) => (slide.style.transform = `translateX(${100 * index}%)`)
// // );
// // POS LAYOUTS: 0%, 100%, 200%, 300%
// //Refactored code into a function
// goToSlide(0);
// //--> SLIDE POSITIONS @ RIGHTBTN & LEFTBTN
// btnRight.addEventListener('click', nextSlide);
// btnLeft.addEventListener('click', previousSlide);
// //--> SLIDE POSITIONS @ RIGHTKEY & LEFTKEY
// document.addEventListener('keydown', function (e) {
//   // console.log(e);
//   //#1.alternate
//   // if (e.key === 'ArrowLeft') {
//   //   previousSlide();
//   // } else if (e.key === 'ArrowRight') {
//   //   nextSlide();
//   // }
//   //#2.alternate
//   if (e.key === 'ArrowLeft') previousSlide();
//   e.key === 'ArrowRight' && nextSlide(); //short-circuit logic
// });

// //FUNCTION CREATE SLIDER DOTS
// function createDots() {
//   slides.forEach(function (_, i) {
//     dotContainer.insertAdjacentHTML(
//       'beforeend',
//       `<button class="dots__dot" data-slide="${i}"></button>`
//     );
//   });
// }

// //FUNCTION ACTIVATE SLIDER DOT
// function activateDot(slide) {
//   //--> Deactivate DOTS
//   document
//     .querySelectorAll('.dots__dot')
//     .forEach(dot => dot.classList.remove('dots__dot--active'));
//   //--> Activate the DOT
//   dotContainer.children[slide].classList.add('dots__dot--active');
// }

// //EVENTHANDLER SLIDER DOT NAV
// //--> CREATE THE DOT NAV FROM SLIDER CONTENT
// createDots();
// //--> GOTOSLIDE @ DOT CLICK
// dotContainer.addEventListener('click', function (e) {
//   if (e.target.classList.contains('dots__dot')) {
//     // console.log(e.target);
//     const { slide } = e.target.dataset;
//     // console.log(slide);
//     goToSlide(slide);
//     activateDot(slide);
//   }
// });

//TEMP TESTING PURPOSES ONLY
const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(0.4) translateX(-800px)';
slider.style.overflow = 'visible';

/////////////////////////////////////////////////////////////
//COMPONENT SLIDER OPTION #3: CONTINOUS LOOP/////////////////
/////////////////////////////////////////////////////////////
const sliderContainer = document.querySelector('.slider');
const slider_alt3 = document.querySelector('.slider_alt3');
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

//--> INITIALIZE SLIDES & DOTS
let currSlide = 1;
const numSlides = slides.length - 2;
let slideSize = slides[currSlide].clientWidth;
slider_alt3.style.transform = `translateX(${-slideSize * currSlide}px)`;
// console.log(-slideSize * currSlide);
createDots();
activateDot(currSlide);
//EVENTHANDLER SLIDER <-- -->
//--> FOR NEXT & PREV BTNS
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
//--> AFTER EVERY TRANSITION COMPLETE AUTOCHECK CLONE ENDS TO DECIDE TO MOVE THE ENTIRE BLOCK
slider_alt3.addEventListener('transitionend', () => {
  // console.log('FIRED');
  if (slides[currSlide].id === 'lastClone') {
    currSlide = slides.length - 2;
    // console.log('boom', currSlide);
    slider_alt3.style.transition = 'none';
    slider_alt3.style.transform = `translateX(${-slideSize * currSlide}px)`;
    activateDot(currSlide);
  }
  if (slides[currSlide].id === 'firstClone') {
    currSlide = slides.length - currSlide;
    // console.log('boom', currSlide);
    slider_alt3.style.transition = 'none';
    slider_alt3.style.transform = `translateX(${-slideSize * currSlide}px)`;
    activateDot(currSlide);
  }
});
//--> FOR KEYBOARD RIGHT AND LEFT BTNS
document.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') prevSlide(); //NOTE: if and short circuiting same!
  event.key === 'ArrowRight' && nextSlide();
});
//--> FOR DOT NAVIGATION
dotContainer.addEventListener('click', event => {
  if (event.target.classList.contains('dots__dot')) {
    currSlide = event.target.dataset.slide;
    activateDot(currSlide);
    gotoSlide(currSlide);
  }
});
//FUNCTIONS
function nextSlide() {
  if (currSlide >= slides.length - 1) return;
  currSlide++;
  console.log(currSlide);
  slider_alt3.style.transition = 'transform 0.3s ease-in-out';
  slider_alt3.style.transform = `translateX(${-slideSize * currSlide}px)`;
  activateDot(currSlide);
}
function prevSlide() {
  if (currSlide <= 0) return;
  currSlide--;
  console.log(currSlide);
  slider_alt3.style.transition = 'transform 0.3s ease-in-out';
  slider_alt3.style.transform = `translateX(${-slideSize * currSlide}px)`;
  activateDot(currSlide);
}

const gotoSlide = function (slide) {
  slider_alt3.style.transition = 'transform 0.4s ease-in-out';
  slider_alt3.style.transform = `translateX(${-slideSize * slide}px)`;
};
function createDots() {
  for (let i = 0; i < numSlides; i++) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i + 1}"></button>`
    );
  }
}
function activateDot(slide) {
  if (currSlide > slides.length - 2 || !currSlide) return;
  //--> Kill all active dots
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  //--> Mark the active dot
  // document
  //   .querySelectorAll('.dots__dot')
  //   [currSlide - 1].classList.add('dots__dot--active');
  // NOTE: Similarly functionality burt different selection methods:
  document
    .querySelector(`.dots__dot[data-slide="${slide}"`)
    .classList.add('dots__dot--active');
}

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
// //COMPONENT SLIDER OPTION #2: ALL JS CONTINUOUS LOOP
// const slides_alt2 = document.querySelector('.slider_alt2');
// let pseudoArr;
// //--> responsive slides width
// let slideSize = document.querySelectorAll('.slider_alt2')[0].clientWidth; //let instead of const is used so that we can make it responsive by the following code
// console.log(slideSize);

// function renderSlides(limit) {
//   //--> ONLY 3 SLIDES AT A TIME REDUCED ARR
//   pseudoArr = slidesArr.slice().splice(0, limit);
//   // console.log(pseudoArr, slidesArr);
//   //--> INSERT SLIDE HTML
//   pseudoArr.forEach((value, index, arr) => {
//     slides_alt2.insertAdjacentHTML('beforeend', contentArr[arr[index] - 1]);
//   });
//   //--> RENDER SLIDES ON SCREEN
//   slides_alt2.querySelectorAll('.slide').forEach((value, index, arr) => {
//     arr[index].style.transform = `translateX(${
//       arr[index].clientWidth * (index + 1) - 2 * arr[0].clientWidth
//     }px)`;
//   });
// }

// function prevSlide(limit) {
//   //--> DECLARE NEW ARRAY AFTER PREV CLICK
//   slidesArr.forEach((value, index, arr) => {
//     arr[index] = arr[index] - 1;
//     if (!arr[index]) arr[index] = 4;
//   });
//   pseudoArr = slidesArr.slice().splice(0, limit);
//   // con
//   //--> ASSIGN THE FRONT ELEMENT TO HTML SLIDES
//   slides_alt2.insertAdjacentHTML('afterbegin', contentArr[pseudoArr[0] - 1]);
//   //--> REMOVE THE LAST ELEMENT FROM THE HTML SLIDES
//   slides_alt2.removeChild(slides_alt2.lastChild);
//   //--> ASSIGN THE RECONFIGURED ELEMENT POSITIONS
//   slides_alt2.querySelectorAll('.slide').forEach((value, index, arr) => {
//     arr[index].style.transform = `translateX(${-1000 + index * 1000}px)`;
//   });
// }

// function nextSlide(limit) {
//   //--> DECLARE NEW ARRAY AFTER NEXT CLICK
//   slidesArr.forEach((value, index, arr) => {
//     arr[index] = arr[index] + 1;
//     if (arr[index] === arr.length - 1) {
//       arr[index] = 1;
//     }
//   });
//   pseudoArr = slidesArr.slice().splice(0, limit);
//   // conso
//   //--> INSERT THE LAST ELEMENT
//   slides_alt2.insertAdjacentHTML('beforeend', contentArr[pseudoArr.at(-1) - 1]);
//   //--> REMOVE THE FIRST ELEMENT
//   slides_alt2.removeChild(slides_alt2.firstChild);
//   //--> ASSIGN THE RECONFIGURED ELEMENT POSITIONS
//   slides_alt2.querySelectorAll('.slide').forEach((value, index, arr) => {
//     arr[index].style.transform = `translateX(${-1000 + index * 1000}px)`;
//   });
// }

// //--> INTRODUCE THE SLDIER CONTENT
// let contentArr = [
//   `<div class="slide slide--1" ><img src="img/img-1copy.jpg" alt="Photo 1" /></div>`,
//   `<div class="slide slide--2" ><img src="img/img-2copy.jpg" alt="Photo 2" /></div>`,
//   `<div class="slide slide--3" ><img src="img/img-3copy.jpg" alt="Photo 3" /></div>`,
//   `<div class="slide slide--4" ><img src="img/img-4copy.jpg" alt="Photo 4" /></div>`,
// ];
// //--> CREATE THE INITIAL SLIDE HELPER ARRAY
// const slidesArr = Array.from([]);
// //--> FILL THE INITIAL ARRAY
// for (let i = 0; i < contentArr.length; i++) {
//   slidesArr[i] = i + 1;
// }
// slidesArr.unshift(contentArr.length);
// slidesArr.push(1);
// console.log(`Your initial array:`, slidesArr);
// //--> INITIAL SLIDE RENDERING
// renderSlides(5);

// //EVENTHANDLER SLIDER <-- -->
// btnLeft.addEventListener('click', () => prevSlide(5));
// btnRight.addEventListener('click', () => nextSlide(5));
