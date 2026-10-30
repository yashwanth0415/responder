/* shared behaviour: reveal-on-scroll, progress bar, mobile menu, loader */
const $=i=>document.getElementById(i),h=(a,f)=>a.map(f).join('');
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.15});
const reveal=()=>document.querySelectorAll('.rv,.sep,.steps').forEach(e=>io.observe(e));reveal();
const pr=document.querySelector('#prog i'),pa=$('pa');
addEventListener('scroll',()=>{const p=scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight)*100;pr.style.width=p+'%';pa.style.left=p+'%'},{passive:true});
const menuToggle=$('menuToggle'),navLinks=document.querySelector('nav ul');
menuToggle.addEventListener('click',()=>{const o=navLinks.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(o));menuToggle.setAttribute('aria-label',o?'Close navigation menu':'Open navigation menu')});
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{navLinks.classList.remove('open');menuToggle.setAttribute('aria-expanded','false')}));
if($('ld'))setTimeout(()=>$('ld').remove(),2800);
