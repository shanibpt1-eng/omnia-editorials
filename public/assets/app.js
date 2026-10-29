
const $$=(s,p=document)=>Array.from(p.querySelectorAll(s));
const progress=document.querySelector('.progress');
const updateProgress=()=>{
  const h=document.documentElement;
  const max=h.scrollHeight-h.clientHeight;
  const pct=max>0?(h.scrollTop/max)*100:0;
  if(progress) progress.style.width=pct+'%';
};
window.addEventListener('scroll',updateProgress,{passive:true});
updateProgress();
const io=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible'); io.unobserve(e.target);}})
},{threshold:.08});
$$('.reveal').forEach(el=>io.observe(el));
const q=document.querySelector('[data-search]');
const localeSel=document.querySelector('[data-locale]');
const topicSel=document.querySelector('[data-topic]');
const cards=$$('.index-card');
const applyFilters=()=>{
  const term=(q?.value||'').toLowerCase().trim();
  const loc=(localeSel?.value||'all');
  const top=(topicSel?.value||'all');
  cards.forEach(card=>{
    const hay=(card.dataset.title+' '+card.dataset.locale+' '+card.dataset.topic+' '+card.dataset.format).toLowerCase();
    const matchTerm=!term || hay.includes(term);
    const matchLoc=loc==='all' || card.dataset.locale===loc;
    const matchTop=top==='all' || card.dataset.topic===top;
    card.style.display=(matchTerm && matchLoc && matchTop)?'grid':'none';
  });
};
[q,localeSel,topicSel].forEach(el=>el && el.addEventListener('input',applyFilters));
