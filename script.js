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
//-->WHEN CLICKED ON BTNS, OPEN MODAL
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
//-->WHEN CLICKED ON BTN OR ANYPLACE OUTSIDE THE MODAL, CLOSE MODAL
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
//-->WHEN CLICKED ESC AND MODAL IS NOT MARKED HIDDEN, CLOSE MODAL
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

//-->WATCH FOR CLICKS IN THE REALM OF THE DIV CONTAINER (PARENT) WRAPPING BTNS
tabsContainer.addEventListener('click', function (e) {
  // if (e.target.classList.contains('operations__tab')) {
  //   const clicked = e.target;
  //   console.log(clicked);
  // }
  //-->WORK ALL THE WAY DEEPER TO BTNS AND SCREEN FOR BTN CLICKS VIA CLOSEST
  //VERY IMPORTANT! WE NEEDED CLOSEST() METHOD AS BTNS ALSO IUNCLUDED SPAN ELEMENT INSIDE AND WE NEEDED ALWAYS THE BTN ELEMENT EVEN IF SPAN ELEMENT IS ALSO CLICKED!!
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);
  //-->CHECK FOR NULL CLICKS EXCLUDING BTNS
  if (!clicked) return; //VERY IMPORTANT! GUARD CLAUSE - PREVENTS ERR DUE TO CLICKING OUTSIDE THE BUTTONS BUT STILL INTHE CONTAINER AREA
  //-->CLEAR CLASS ACTIVE ON ALL BTNS
  tabs.forEach(el => el.classList.remove('operations__tab--active'));
  //-->ASSIGN ACTIVE TO BTN CLICKED
  clicked.classList.add('operations__tab--active');
  //-->CLEAR CLASS ACTIVE ON ALL CONTENT AREAS
  tabsContent.forEach(i => i.classList.remove('operations__content--active'));
  //-->ACTIVATE THE CORRESPONDING CONTENT AREA
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//FUNCTION MENU FADE ANIMATION
//THIS IS THE WAY TO GO TO REFACTOR THE CODE BY USING COMMON VARIABLES

// #1 version
// const handleHover = function (e, opacity) {
//   if (e.target.classList.contains('nav__link')) {
//     const hovered = e.target;
//     //-->DIM THE UNHOVERED BTNS
//     const notHovered = hovered.closest('.nav').querySelectorAll('.nav__link'); //VERY IMPORTANT! MOVE UP TO NAV PARENT VIA CLOSEST() AND FROM THERE SELECT ALL
//     notHovered.forEach(el => {
//       if (el !== hovered) el.style.opacity = opacity;
//     });
//     //-->DIM THE LOGO
//     const logo = hovered.closest('.nav').querySelector('img'); //ROLL UP TO PARENT ELEMENT AND FROM THERE SELECT ANY IMG TAG - LOGO
//     logo.style.opacity = opacity;
//   }
// };

// #2 version
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const hovered = e.target;
    //-->DIM THE UNHOVERED BTNS
    const notHovered = hovered.closest('.nav').querySelectorAll('.nav__link'); //VERY IMPORTANT! MOVE UP TO NAV PARENT VIA CLOSEST() AND FROM THERE SELECT ALL
    notHovered.forEach(el => {
      if (el !== hovered) el.style.opacity = this;
    });
    //-->DIM THE LOGO
    const logo = hovered.closest('.nav').querySelector('img'); //ROLL UP TO PARENT ELEMENT AND FROM THERE SELECT ANY IMG TAG - LOGO
    logo.style.opacity = this;
  }
};

//EVENTHANDLER MENU FADE ANIMATION
//DESCRIPTION: THE EXTEND OF THE ANIMATION EFFECT INCLUDES THE BANKIST LOGO AND SHOULD WORK ALL THE WAY DOWN TO THE BTNS WITH A FADE IN OUT EFFECT WHEN BTNS ARE HOVERED ON.
const navBarContainer = document.querySelector('.nav');

//-->WATCH FOR MOUSEOVER IN THE REALM OF THE NAV CONTAINER (PARENT) WRAPPING BTNS
// #1
// navBarContainer.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });
// #2
navBarContainer.addEventListener('mouseover', handleHover.bind(0.5));

//-->WATCH FOR MOUSEOUT IN THE REALM OF THE NAV CONTAINER (PARENT) WRAPPING BTNS
// #1
// navBarContainer.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });
// #2
navBarContainer.addEventListener('mouseout', handleHover.bind(1));
