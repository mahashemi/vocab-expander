/* Three-term portal, global multilingual search and shared progress dashboard. */
(function(){
 const $id=id=>document.getElementById(id);
 const esc=s=>{const d=document.createElement("div");d.textContent=s??"";return d.innerHTML};
 const normalize=s=>String(s??"").normalize("NFKC").toLowerCase()
  .replace(/[يى]/g,"ی").replace(/ك/g,"ک").replace(/[\u064B-\u065F\u0670\u0640]/g,"")
  .replace(/[\u200c\u200d\s]+/g," ").trim();
 const flatten=(x,out=[])=>{if(x==null)return out;if(typeof x==="string"||typeof x==="number")out.push(String(x));else if(Array.isArray(x))x.forEach(v=>flatten(v,out));else if(typeof x==="object")Object.values(x).forEach(v=>flatten(v,out));return out};
 function updateStats(){
  const a=all(),d=a.filter(x=>done.has(x.id)).length,p=a.length?Math.round(d*100/a.length):0;
  $id("overallDone").textContent=d.toLocaleString();$id("overallWords").textContent=a.length.toLocaleString();
  $id("overallBar").style.width=p+"%";$id("overallPercent").textContent=p+"% memorised";
  $id("termProgressMini").textContent=[1,2,3].map(b=>"T"+b+" "+a.filter(x=>x.bk===b).length.toLocaleString()).join(" · ")+" words";
 }
 function searchIndex(){
  const words=all().map(x=>({kind:"Vocabulary",label:x.fa||"",tr:x.tr||"",meaning:x.en||"",source:(x.sources||[x.source]).filter(Boolean).join(" · "),bk:x.bk,ch:x.ch,id:x.id,record:x}));
  const verbs=(window.getVerbSearchRows?window.getVerbSearchRows():[]).map(x=>({kind:"Verb Treasury",label:x.fa||"",tr:x.tr||"",meaning:x.en||"",forms:[x.ms,x.amr].filter(Boolean).join(" · "),source:(x.sources||[x.source]).filter(Boolean).join(" · "),bk:x.bk,ch:x.ch,id:x.id,record:x}));
  const seen=new Set();return words.concat(verbs).filter(x=>{const k=x.kind+"|"+x.bk+"|"+x.id;if(seen.has(k))return false;seen.add(k);return true});
 }
 function portal(){
  const a=all(),d=a.filter(x=>done.has(x.id)).length;
  const data=[
   {b:1,no:"TERM 01",name:"Term One",sub:"Build the foundations of Persian",theme:"t1"},
   {b:2,no:"TERM 02",name:"Term Two",sub:"Strengthen grammar and expression",theme:"t2"},
   {b:3,no:"TERM 03",name:"Term Three",sub:"Read, write, speak and think in Persian",theme:"t3"}
  ];
  v.innerHTML='<section class="portal-intro"><div class="eyebrow">YOUR PERSIAN LEARNING LIBRARY</div><h2>Choose your term. Continue your journey.</h2><p>Every term has its own vocabulary, practice tools and learning activities. Your memorisation progress is tracked across the whole collection.</p></section>'+
  '<section class="global-search" aria-label="Search all terms and verbs"><div class="global-search-heading"><div><div class="eyebrow">ONE SEARCH · THE WHOLE LIBRARY</div><h3>Find a word, phrase or verb</h3><p>Search Persian, Arabic, Urdu, English or transliteration across all three terms and the Verb Treasury.</p></div></div><div class="global-search-box"><span aria-hidden="true">⌕</span><input id="globalSearchInput" type="search" autocomplete="off" placeholder="مثلاً: برگشتن · برگرد · return · sit down" aria-label="Search all terms and verb treasury"><button type="button" id="globalSearchClear" aria-label="Clear search">Clear</button></div><div class="global-search-meta" id="globalSearchMeta" aria-live="polite">Search the complete vocabulary and verb collection.</div><div id="globalSearchResults" class="global-search-results"></div></section>'+
  '<div class="term-grid">'+data.map(t=>{const list=a.filter(x=>x.bk===t.b),mem=list.filter(x=>done.has(x.id)).length,p=list.length?Math.round(mem*100/list.length):0;return '<button class="term-entry '+t.theme+'" data-enter="'+t.b+'"><span class="term-no">'+t.no+'</span><span class="term-name">'+t.name+'</span><span class="term-sub">'+t.sub+'</span><div class="term-stats"><span>'+list.length.toLocaleString()+' words</span><span>'+mem.toLocaleString()+' memorised</span></div><div class="bar"><i style="width:'+p+'%"></i></div><span class="term-cta">Enter term →</span></button>'}).join("")+'</div>'+
  '<div class="verb-entry-wrap"><button class="verb-entry" data-open-verbs><span class="term-no">A SHARED GRAMMAR COLLECTION</span><span class="term-name">گنجینهٔ فعل‌ها · Verb Treasury</span><span class="term-sub">Masdar, amr, example sentences and revision cards across terms</span><span class="term-cta">Enter the verb treasury →</span></button></div>'+
  '<div class="portal-summary"><span><b>'+a.length.toLocaleString()+'</b> total vocabulary entries</span><span><b>'+d.toLocaleString()+'</b> memorised</span><span><b>'+(a.length?Math.round(d*100/a.length):0)+'%</b> overall progress</span></div>';
  v.querySelectorAll("[data-enter]").forEach(btn=>btn.onclick=()=>enterTerm(Number(btn.dataset.enter)));
  const verbs=v.querySelector("[data-open-verbs]");if(verbs)verbs.onclick=()=>{activeTerm=null;$id("termNav").hidden=true;gotoTab("verbs")};
  const input=$id("globalSearchInput"),results=$id("globalSearchResults"),meta=$id("globalSearchMeta");
  const renderResults=()=>{
   const q=normalize(input.value);if(!q){results.innerHTML="";meta.textContent="Search the complete vocabulary and verb collection.";return}
   const terms=q.split(" ").filter(Boolean),rows=searchIndex().map(x=>({...x,_hay:normalize(flatten([x.label,x.tr,x.meaning,x.forms,x.source,x.record&&x.record.sem,x.record&&x.record.pos]).join(" "))}));
   const hits=rows.filter(x=>terms.every(t=>x._hay.includes(t))).sort((a,b)=>{const exact=normalize(a.label).startsWith(q)?-1:normalize(b.label).startsWith(q)?1:0;return exact||((a.kind==="Verb Treasury"?-1:0)-(b.kind==="Verb Treasury"?-1:0))}).slice(0,60);
   meta.textContent=hits.length?hits.length+" result"+(hits.length===1?"":"s")+" shown · search includes all terms and verbs": "No matches yet. Try another spelling or language.";
   results.innerHTML=hits.map((x,i)=>'<button type="button" class="global-search-result" data-result="'+i+'"><span class="global-result-top"><b class="fa" lang="fa">'+esc(x.label)+'</b><span class="global-result-kind">'+esc(x.kind)+' · Term '+String(x.bk).padStart(2,"0")+'</span></span><span class="global-result-tr">'+esc(x.tr)+'</span><span class="global-result-meaning">'+esc(x.meaning)+(x.forms?" · "+esc(x.forms):"")+'</span><span class="global-result-source">'+esc(x.source||"Source lesson not recorded")+(x.ch?" · Dars "+x.ch:"")+'</span></button>').join("");
   results.querySelectorAll("[data-result]").forEach(btn=>btn.onclick=()=>{const x=hits[Number(btn.dataset.result)];if(!x)return;if(x.kind==="Verb Treasury"){activeTerm=null;$id("termNav").hidden=true;window.openVerbSearch?window.openVerbSearch(x.label):gotoTab("verbs");return}enterTerm(Number(x.bk));if(x.ch!=null){chSel.value=String(x.ch);render()}$id("termNav").scrollIntoView({behavior:"smooth",block:"start"})});
  };
  input.oninput=renderResults;$id("globalSearchClear").onclick=()=>{input.value="";renderResults();input.focus()};
 }
 window.updateGlobalStats=updateStats;
 function enterTerm(b){activeTerm=b;bkSel.value=String(b);fillCh();chSel.value="all";if(b===2){speechCh=1;}
  $id("termNav").hidden=false;$id("activeTermTitle").textContent="TERM 0"+b+(b===3?" · PERSIAN":"");
  document.querySelectorAll('#termTabs [data-t="essays"],#termTabs [data-t="speeches"],#termTabs [data-t="khulasa"]').forEach(x=>x.hidden=!(b===2||b===3));
  gotoTab("home");
 }
 function back(){activeTerm=null;tab="portal";bkSel.value="all";fillCh();$id("termNav").hidden=true;render()}
 const originalHome=home;
 window.home=function(){originalHome();const title=activeTerm===1?"Term One":activeTerm===2?"Term Two":"Term Three · Persian";
  const description=activeTerm===3?"Farsi Umumi, Khwandan, Newestan and Shunidan are brought together here. Each Farsi Umumi chapter includes a learning summary, linked lesson vocabulary, and dedicated writing and speaking practice.":activeTerm===2?"Term 02 includes vocabulary and grammar from all 60 source lessons, chapter summaries, writing and speaking practice.":"Term 01 is being built from its Farsi Umumi, Khwandan, Newestan and Shunidan source lessons.";
  const codes=activeTerm===3?["FA3","KH3","N3","SH3"]:activeTerm===2?["FA2","KH2","N2","SH2"]:[],sourceCounts=codes.map(code=>({code,count:all().filter(x=>x.bk===activeTerm&&(x.sources||[x.source]).some(src=>String(src||"").startsWith(code+"-"))).length}));
  const sourceLine=sourceCounts.length?'<div class="source-coverage">'+sourceCounts.map(x=>'<span><b>'+x.code+'</b><small>'+x.count+' words</small></span>').join("")+'</div>':"";
  v.insertAdjacentHTML("afterbegin",'<section class="term-welcome"><h2>'+title+'</h2><p>'+description+'</p>'+sourceLine+'</section>');
 };
 window.render=function(){if(tab==="portal")portal();else if(tab==="home")home();else if(tab==="cards")cards();else if(tab==="quiz")startQuiz();else if(tab==="khulasa")khulasa();else if(tab==="essays")essays();else if(tab==="speeches")speeches();else if(tab==="verbs")window.verbTreasury();updateStats()};
 window.gotoTab=function(t){tab=t;document.querySelectorAll("[data-t]").forEach(x=>x.classList.toggle("on",x.dataset.t===t));bkSel.hidden=true;chSel.hidden=![ "cards","quiz","khulasa"].includes(t);deck=[];idx=0;flip=false;render()};
 document.querySelectorAll("[data-t]").forEach(b=>b.onclick=()=>gotoTab(b.dataset.t));
 $id("backTerms").onclick=back;chSel.onchange=()=>{deck=[];idx=0;flip=false;render()};bkSel.hidden=true;chSel.hidden=true;$id("termNav").hidden=true;render();updateStats();
})();