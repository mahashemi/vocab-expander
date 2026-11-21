(function(root){
 "use strict";
 const normalize=value=>String(value??"").normalize("NFKC").toLowerCase()
  .replace(/[يى]/g,"ی").replace(/ك/g,"ک")
  .replace(/[\u064B-\u065F\u0670\u0640]/g,"")
  .replace(/[.,;:!?،؛()[\]{}"'“”‘’]/g," ").replace(/\s+/g," ").trim();
 function targetFor(item,language){
  const sem=item?.sem||{};
  if(language==="ar")return {target:sem.arMeaning||"",synonyms:sem.arSynonyms||[]};
  return {target:sem.enMeaning||"",synonyms:sem.enSynonyms||[]};
 }
 function eligible(item,context={}){
  const language=context.language||"en",t=targetFor(item,language);
  return !!(item?.fa&&t.target&&normalize(t.target));
 }
 function createPrompt(item,context={}){
  const language=context.language||"en",t=targetFor(item,language);
  return {language,target:t.target,synonyms:Array.isArray(t.synonyms)?t.synonyms:[],cue:item.fa,version:1};
 }
 function validate(item,response,prompt){
  const answer=normalize(response),accepted=[prompt.target,...prompt.synonyms].map(normalize).filter(Boolean);
  const correct=!!answer&&accepted.includes(answer);
  return {correct,response:String(response??""),errorTypes:correct?[]:["meaning-mismatch"],acceptedCount:accepted.length,language:prompt.language};
 }
 function hint(item,prompt,step){
  if(step===0)return prompt.language==="ar"?"اكتب المعنى بالعربية":"Write the meaning in English";
  if(step===1)return prompt.language==="ar"?"عدد الكلمات: "+String(prompt.target.trim().split(/\s+/).length):"Word count: "+String(prompt.target.trim().split(/\s+/).length);
  const first=(prompt.synonyms||[])[0]||prompt.target;
  return (prompt.language==="ar"?"تلميح: ":"Hint: ")+String(first).slice(0,1)+"…";
 }
 root.VocabMeaningRecall=Object.freeze({eligible,createPrompt,validate,hint,normalize});
})(typeof window!=="undefined"?window:globalThis);
