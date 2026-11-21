(function(root){
 "use strict";
 const marks=/[\u064b-\u065f\u0670\u0640]/g;
 const norm=s=>String(s||"").normalize("NFC").replace(/[يى]/g,"ی").replace(/ك/g,"ک").replace(marks,"").replace(/[\u200c\u200d]/g," ").replace(/\s+/g," ").trim();
 function eligible(item){return !!(item&&typeof item.fa==="string"&&item.fa.trim()&&String(item.en||item.sem?.enMeaning||"").trim()&&Array.from(item.fa.replace(/[\s\u200c\u200d]/g,"")).length>=2)}
 function createPrompt(item){return {cue:String(item.en||item.sem?.enMeaning||"Translate the meaning into Persian"),context:item.xe?String(item.xe):"",target:item.fa,accepted:[item.fa,...(item.acceptedForms||[])],version:1}}
 function validate(item,response,prompt){const answer=norm(response),accepted=(prompt?.accepted||[item.fa]).map(norm);const correct=!!answer&&accepted.includes(answer);const target=norm(item.fa),errorTypes=[];if(!correct){if(!answer)errorTypes.push("empty");else{if(answer.length<target.length)errorTypes.push("omission");if(answer.length>target.length)errorTypes.push("insertion");if(answer.length===target.length)errorTypes.push("substitution-or-order");if(/[\u200c\u200d]/.test(String(response))!==/[\u200c\u200d]/.test(String(item.fa)))errorTypes.push("spacing-or-zwnj");}}
 return {correct,answer,response:String(response||""),errorTypes,target:item.fa,accepted:accepted.length};}
 function hint(item,attempt){if(attempt===0)return item.xe?"Context: "+item.xe:"Think of the meaning: "+(item.en||"");if(attempt===1)return "First letter: "+Array.from(item.fa)[0];return "The word has "+Array.from(item.fa).length+" characters (including spaces)."}
 root.VocabImla=Object.freeze({id:"imla",title:"Imla · املاء",eligible,createPrompt,validate,hint});
})(typeof window!=="undefined"?window:globalThis);
