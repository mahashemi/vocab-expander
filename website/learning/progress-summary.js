(function(root){
 "use strict";
 function build(events,rows){
  const byLegacy=new Map((Array.isArray(rows)?rows:[]).filter(row=>row&&row.id!=null).map(row=>[String(row.id),row]));
  const summaries=[1,2,3].map(term=>({term,attempts:0,correct:0,items:new Set(),modes:Object.create(null)}));
  const byTerm=new Map(summaries.map(summary=>[summary.term,summary]));
  for(const event of Array.isArray(events)?events:[]){
   const legacyId=String(event?.legacyId||"");
   const row=byLegacy.get(legacyId);
   if(!row)continue;
   const summary=byTerm.get(Number(row.bk));
   if(!summary)continue;
   summary.attempts++;
   if(event.correct===true)summary.correct++;
   const itemId=String(event.itemId||legacyId);
   summary.items.add(itemId);
   const mode=String(event.modeId||"unknown");
   if(!summary.modes[mode])summary.modes[mode]={attempts:0,correct:0};
   summary.modes[mode].attempts++;
   if(event.correct===true)summary.modes[mode].correct++;
  }
  const result=summaries.map(summary=>({
   term:summary.term,attempts:summary.attempts,correct:summary.correct,
   accuracy:summary.attempts?summary.correct/summary.attempts:null,
   distinctItems:summary.items.size,
   modes:Object.fromEntries(Object.entries(summary.modes).map(([id,value])=>[id,{...value,accuracy:value.attempts?value.correct/value.attempts:null}]))
  }));
  const all=result.reduce((acc,item)=>({attempts:acc.attempts+item.attempts,correct:acc.correct+item.correct,distinctItems:acc.distinctItems+item.distinctItems}),{attempts:0,correct:0,distinctItems:0});
  return {terms:result,all:{...all,accuracy:all.attempts?all.correct/all.attempts:null}};
 }
 root.VocabLearningProgressSummary=Object.freeze({build});
})(typeof window!=="undefined"?window:globalThis);
