/* PASSWORD GATE */
(function(){
  const gate=document.getElementById('pwGate');
  if(localStorage.getItem('vv_access')==='1'){gate.remove();}
  else{gate.style.display='flex';}
})();
function checkPw(){
  const val=document.getElementById('pwInput').value;
  if(val==='Zwara0501$'){
    localStorage.setItem('vv_access','1');
    document.getElementById('pwGate').remove();
  } else {
    document.getElementById('pwError').style.display='block';
    document.getElementById('pwInput').value='';
    document.getElementById('pwInput').focus();
  }
}
document.addEventListener('DOMContentLoaded',function(){
  const input=document.getElementById('pwInput');
  if(input) input.addEventListener('keydown',function(e){if(e.key==='Enter')checkPw();});
});

/* NAV */
const nav=document.getElementById('mainNav');
window.addEventListener('scroll',()=>{
  const homeActive=document.getElementById('page-home').classList.contains('active');
  nav.className=homeActive&&window.scrollY<80?'hero-nav':'solid-nav';
},{passive:true});

/* PAGE SWITCHING */
function showPage(id,sub){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-'+id).classList.add('active');
  window.scrollTo({top:0,behavior:'instant'});
  document.querySelectorAll('.nav-tab-btn').forEach(b=>b.classList.toggle('active',b.dataset.page===id));
  nav.className=(id==='home'&&window.scrollY<80)?'hero-nav':'solid-nav';
  if(id==='guides'&&sub) showGuide(sub);
  setTimeout(triggerReveals,60);
}

/* GUIDE TABS */
document.querySelectorAll('.guide-subtab').forEach(b=>b.addEventListener('click',()=>showGuide(b.dataset.guide)));
function showGuide(g){
  document.querySelectorAll('.guide-panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.guide-subtab').forEach(b=>b.classList.remove('active'));
  const panel=document.getElementById('guide-'+g);
  const tab=document.querySelector('.guide-subtab[data-guide="'+g+'"]');
  if(panel)panel.classList.add('active');
  if(tab)tab.classList.add('active');
  setTimeout(triggerReveals,60);
}

/* NAV TAB CLICKS */
document.querySelectorAll('.nav-tab-btn').forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.page)));

/* REVEAL */
function triggerReveals(){
  const active=document.querySelector('.page.active');
  if(!active)return;
  const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});},{threshold:0.07,rootMargin:'0px 0px -20px 0px'});
  active.querySelectorAll('.reveal:not(.visible)').forEach(el=>io.observe(el));
}
triggerReveals();
window.addEventListener('scroll',triggerReveals,{passive:true});

/* APPLY FORM */
document.getElementById('applyForm').addEventListener('submit',function(e){
  e.preventDefault();
  const btn=this.querySelector('.form-submit');
  btn.disabled=true;
  btn.textContent='Sending…';
  fetch('https://formspree.io/f/maqkywer',{method:'POST',body:new FormData(this),headers:{'Accept':'application/json'}})
    .then(r=>{
      if(r.ok){
        document.getElementById('applyFormInner').style.display='none';
        document.getElementById('applySuccess').classList.add('visible');
      } else {
        btn.disabled=false;
        btn.textContent='Submit Application';
        alert('Something went wrong. Please email us directly at hello@veravitaretreats.com');
      }
    })
    .catch(()=>{
      btn.disabled=false;
      btn.textContent='Submit Application';
      alert('Something went wrong. Please email us directly at hello@veravitaretreats.com');
    });
});
