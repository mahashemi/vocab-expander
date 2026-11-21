(function(root){
 "use strict";
 const marks=/[\u064b-\u065f\u0670\u0640]/g;
 const norm=s=>String(s||"").normalize("NFC").replace(/[يى]/g,"ی").replace(/ك/g,"ک").replace(marks,"").replace(/[\u200c\u200d]/g," ").replace(/\s+/g," ").trim();
 const clusters=s=>Array.from(String(s||"").normalize("NFC")).reduce((a,ch)=>{if(/[\u064b-\u065f\u0670]/.test(ch)&&a.length)a[a.length-1]+=ch;else a.push(ch);return a},[]);
 function positions(item){return clusters(item.fa).map((ch,i)=>({ch,i})).filter(x=>/[\u0600-\u06ff]/.test(x.ch)).map(x=>x.i)}
 function eligible(item){return !!(item&&typeof item.fa==="string"&&item.fa.trim()&&String(item.en||item.sem?.enMeaning||"").trim()&&positions(item).length>=3)}
 function createPrompt(item,attempt=0){const chars=clusters(item.fa),slots=positions(item),level=Math.min(3,Math.max(0,Number(attempt)||0));const hiddenCount=Math.min(slots.length-1,Math.max(1,Math.ceil(slots.length*(level===0?.25:level===1?.45:level===2?.65:.8))));const hidden=new Set(slots.slice(0,hiddenCount));return {chars,hidden:[...hidden],target:item.fa,version:1,level};}
 function mask(prompt){return prompt.chars.map((c,i)=>prompt.hidden.includes(i)?"＿":c).join("")}
 function validate(item,response){const answer=norm(response),accepted=[item.fa,...(item.acceptedForms||[])].map(norm);const target=norm(item.fa);const correct=!!answer&&accepted.includes(answer);const errors=[];if(!correct){if(!answer)errors.push("empty");else{if(answer.length<target.length)errors.push("omission");if(answer.length>target.length)errors.push("insertion");if(answer.length===target.length)errors.push("substitution-or-order");if(/[\u200c\u200d]/.test(String(response))!==/[\u200c\u200d]/.test(String(item.fa)))errors.push("spacing-or-zwnj")}}return {correct,answer,response:String(response||""),errorTypes:errors,target:item.fa}}
 function hint(item,prompt,step){const ps=positions(item),chars=clusters(item.fa);if(step===0)return "Meaning: "+(item.en||item.sem?.enMeaning||"");if(step===1)return "First letter: "+chars[ps[0]];const reveal=Math.min(ps.length-1,step);const hidden=prompt.hidden.filter(i=>i!==ps[reveal-1]);return "Reveal a letter: "+chars[ps[reveal-1]]+" · "+chars.map((c,i)=>hidden.includes(i)?"＿":c).join("")}
 root.VocabSkipGram=Object.freeze({id:"skip-gram",title:"Skip-gram",eligible,createPrompt,mask,validate,hint,positions});
})(typeof window!=="undefined"?window:globalThis);
