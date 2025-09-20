// simple carousel (auto slide, manual prev/next, dots, pause on hover)
(function(){
  const carousel = document.getElementById('aeonCarousel');
  if(!carousel) return;

  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const btnPrev = carousel.querySelector('[data-action="prev"]');
  const btnNext = carousel.querySelector('[data-action="next"]');
  const dotsWrap = carousel.querySelector('.carousel-dots');

  let current = 0;
  const total = slides.length;
  let interval = null;
  const AUTO_MS = 4000;

  // create dots
  for(let i=0;i<total;i++){
    const b = document.createElement('button');
    b.setAttribute('aria-label', 'go to slide ' + (i+1));
    if(i===0) b.classList.add('active');
    b.addEventListener('click', ()=> { goTo(i); resetTimer(); });
    dotsWrap.appendChild(b);
  }
  const dots = Array.from(dotsWrap.children);

  function update(){
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, idx)=> d.classList.toggle('active', idx===current));
  }
  function next(){ current = (current + 1) % total; update(); }
  function prev(){ current = (current - 1 + total) % total; update(); }
  function goTo(i){ current = (i + total) % total; update(); }

  btnNext && btnNext.addEventListener('click', ()=>{ next(); resetTimer(); });
  btnPrev && btnPrev.addEventListener('click', ()=>{ prev(); resetTimer(); });

  // auto
  function startTimer(){ interval = setInterval(next, AUTO_MS); }
  function stopTimer(){ if(interval){ clearInterval(interval); interval = null; } }
  function resetTimer(){ stopTimer(); startTimer(); }

  // pause on hover
  carousel.addEventListener('mouseenter', stopTimer);
  carousel.addEventListener('mouseleave', startTimer);

  // init
  update();
  startTimer();

  // accessibility: keyboard left/right when focus within carousel
  carousel.addEventListener('keydown', (e)=>{
    if(e.key === 'ArrowLeft') { prev(); resetTimer(); }
    if(e.key === 'ArrowRight'){ next(); resetTimer(); }
  });
})();

// Carousel for THU4 section: auto slide, prev/next, pause on hover
(function(){
  const carousel = document.getElementById('thu4CarouselCustom');
  if(!carousel) return;

  const track = carousel.querySelector('.track');
  const slides = Array.from(track.children);
  const btnPrev = carousel.querySelector('[data-action="prev"]');
  const btnNext = carousel.querySelector('[data-action="next"]');

  let index = 0;
  const total = slides.length;
  const INTERVAL = 4200;
  let timer = null;
  let isMoving = false;

  function goTo(i){
    index = (i + total) % total;
    track.style.transform = `translateX(-${index * 100}%)`;
  }
  function next(){ if(isMoving) return; goTo(index + 1); }
  function prev(){ if(isMoving) return; goTo(index - 1); }

  btnNext && btnNext.addEventListener('click', ()=>{ next(); resetTimer(); });
  btnPrev && btnPrev.addEventListener('click', ()=>{ prev(); resetTimer(); });

  // Auto slide
  function start(){
    stop();
    timer = setInterval(()=> next(), INTERVAL);
  }
  function stop(){ if(timer){ clearInterval(timer); timer = null; } }
  function resetTimer(){ stop(); start(); }

  // Pause on hover/focus for accessibility
  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  carousel.addEventListener('focusin', stop);
  carousel.addEventListener('focusout', start);

  // init
  goTo(0);
  start();
})();


// back-to-top show/hide and smooth scroll
(function(){
  const btn = document.querySelector('.back-to-top');
  if(!btn) return;

  const SHOW_AFTER = 300; // px
  const onScroll = () => {
    if(window.scrollY > SHOW_AFTER) btn.style.display = 'flex';
    else btn.style.display = 'none';
  };
  window.addEventListener('scroll', onScroll);
  onScroll(); // init

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.aeon-tab-btn');
    const tabPanes = document.querySelectorAll('.aeon-tab-pane');

    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Loại bỏ class 'active' khỏi tất cả các nút và tab
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));

        // Thêm class 'active' vào nút được click
        button.classList.add('active');

        // Hiển thị tab pane tương ứng
        const targetTab = document.getElementById(button.dataset.tab);
        if (targetTab) {
          targetTab.classList.add('active');
        }
      });
    });
  });