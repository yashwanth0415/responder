/* front-end validation + confirmation for every form[data-form]. Connect to your backend where marked. */
document.querySelectorAll('form[data-form]').forEach(f=>{
 f.noValidate=true;
 f.querySelectorAll('input[type=tel]').forEach(i=>i.addEventListener('input',()=>i.value=i.value.replace(/\D/g,'').slice(0,10)));
 f.addEventListener('submit',e=>{
  e.preventDefault();const m=f.querySelector('.fmsg');m.style.display='block';
  if(!f.checkValidity()){const bad=f.querySelector(':invalid');m.className='fmsg err';m.textContent='Please complete the highlighted required fields'+(bad&&bad.type==='tel'?' (enter a valid 10-digit mobile number).':'.');bad&&bad.focus();return}
  /* TODO: send new FormData(f) to your backend / email service here */
  m.className='fmsg';m.textContent=f.dataset.ok||'Thank you. Your details have been received.';f.reset();m.scrollIntoView({behavior:'smooth',block:'center'});
 });
});
