/* Fern & Field: shared page interactions. Uses plugins only on pages that need them. */
document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  const header = document.querySelector('#header');
  const scrollTop = document.querySelector('.scroll-top');
  const toggleNav = () => {
    document.body.classList.toggle('mobile-nav-active');
    document.querySelector('.mobile-nav-show')?.classList.toggle('d-none');
    document.querySelector('.mobile-nav-hide')?.classList.toggle('d-none');
  };
  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', e => { e.preventDefault(); toggleNav(); });
  });
  document.querySelectorAll('#navbar a').forEach(link => {
    if (!link.hash || !document.querySelector(link.hash)) return;
    link.addEventListener('click', () => {
      if (document.body.classList.contains('mobile-nav-active')) toggleNav();
    });
  });
  document.querySelectorAll('.navbar .dropdown > a').forEach(link => {
    link.addEventListener('click', event => {
      if (!document.body.classList.contains('mobile-nav-active')) return;
      event.preventDefault();
      link.classList.toggle('active');
      link.nextElementSibling?.classList.toggle('dropdown-active');
    });
  });
  const onScroll = () => {
    if (header) header.classList.toggle('sticked', window.scrollY >= header.offsetTop);
    if (scrollTop) scrollTop.classList.toggle('active', window.scrollY > 100);
    document.querySelectorAll('#navbar a').forEach(link => {
      if (!link.hash) return;
      const section = document.querySelector(link.hash);
      if (!section) return;
      const y = window.scrollY + 200;
      link.classList.toggle('active', y >= section.offsetTop && y <= section.offsetTop + section.offsetHeight);
    });
  };
  document.addEventListener('scroll', onScroll);
  window.addEventListener('load', onScroll);
  if (scrollTop) scrollTop.addEventListener('click', event => {
    event.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'});
  });
  if (document.querySelector('[data-aos]') && window.AOS) {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, mirror: false });
  }
  if (document.querySelector('.purecounter') && window.PureCounter) new PureCounter();
  if (window.Swiper) {
    const sliders = [
      ['.slides-3', { speed: 600, loop: true, autoplay: {delay:5000,disableOnInteraction:false}, slidesPerView: 'auto', pagination: {el: '.swiper-pagination', clickable: true}, navigation:{nextEl:'.swiper-button-next',prevEl:'.swiper-button-prev'}, breakpoints:{320:{slidesPerView:1,spaceBetween:40},1200:{slidesPerView:3}} }],
      ['.testimonials-slider', { speed:600, loop:true, autoplay:{delay:5000,disableOnInteraction:false}, slidesPerView:'auto', pagination:{el:'.swiper-pagination',clickable:true} }],
    ];
    sliders.forEach(([selector, options]) => { if (document.querySelector(selector)) new Swiper(selector, options); });
  }
  document.querySelector('#preloader')?.remove();
});
