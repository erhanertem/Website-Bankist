'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault(); //IMPORTANT this just makes sure href="#" on the node is ignored
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// console.log(btnsOpenModal);
//NOTE There are two elements bearing btn--show-modal", one at the top and one at the very bottom of the page. QueryselectorAll() named by btnsOpenModal enlists 2 nodes. We cycle thru them to listen all at the same time if click triggers the modal.
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);
//Make instances of addEventListeners thruout the page per the node list of queryselectorall()
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log('section to scroll to', s1coords); //IMPORTANT: Get the location of the element we want to scroll to
  //VERY IMPORTANT! RELATIVE TO THE TOP OF BROWSER WINDOW

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

  // //Old school smooth Scrolling
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