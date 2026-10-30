const card=(p,i)=>`<a class="bc rv" href="blog.html#${p.slug}" style="transition-delay:${(i%3)*.1}s"><img src="${sc(...p.art)}" alt="" loading="lazy"><div class="bb"><div class="bm"><b>${p.cat}</b> · ${p.date} · ${p.read}</div><h3>${p.title}</h3><p>${p.excerpt}</p><span class="more">Read article →</span></div></a>`;
if($('bg')){
 const cats=['All',...new Set(POSTS.map(p=>p.cat))];let cur='All';
 $('cats').innerHTML=h(cats,c=>`<button type="button" class="${c==='All'?'on':''}" data-c="${c}">${c}</button>`);
 const draw=()=>{const L=POSTS.filter(p=>cur==='All'||p.cat===cur);const f=cur==='All'?L[0]:null,rest=f?L.slice(1):L;
  $('feat').innerHTML=f?`<a class="feat rv" href="blog.html#${f.slug}"><img src="${sc(...f.art)}" alt=""><div class="bb"><div class="bm"><b>Featured · ${f.cat}</b> · ${f.date} · ${f.read}</div><h2>${f.title}</h2><p>${f.excerpt}</p><span class="more" style="color:var(--red);font:700 .9rem Sora">Read article →</span></div></a>`:'';
  $('bg').innerHTML=h(rest,card);reveal();setTimeout(()=>document.querySelectorAll('#feat .rv,#bg .rv').forEach(e=>e.classList.add('in')),60)};
 $('cats').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;cur=b.dataset.c;$('cats').querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));draw()});
 draw();
}
if($('post')){
 const show=()=>{const slug=location.hash.slice(1),p=POSTS.find(x=>x.slug===slug);
  if(!p){$('post').innerHTML='<h2>Article not found</h2><p>That article is not available. <a href="blogs.html" style="color:var(--red);font-weight:700">Browse all articles →</a></p>';$('rel').innerHTML='';return}
  document.title=p.title+' | +responder Blog';$('pt').textContent=p.title;$('pm').innerHTML=`<b>${p.cat}</b> · ${p.date} · ${p.read}`;
  $('post').innerHTML=`<img class="cover" src="${sc(...p.art)}" alt="">${p.body}<p class="note">This article is general information and not medical advice. Always follow your doctor's guidance. For emergencies in India, call 112.</p>`;
  $('rel').innerHTML=h(POSTS.filter(x=>x!==p).slice(0,3),card);reveal();setTimeout(()=>document.querySelectorAll('#rel .rv').forEach(e=>e.classList.add('in')),60);scrollTo(0,0)};
 addEventListener('hashchange',show);show();
}
