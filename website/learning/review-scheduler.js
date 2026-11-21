(function(root){
 "use strict";
 const intervals=[1,3,7,14,30];
 function evaluate(events,now=Date.now()){
  const sorted=(Array.isArray(events)?events:[]).slice().sort((a,b)=>Date.parse(a.occurredAt||0)-Date.parse(b.occurredAt||0));
  const attempts=sorted.length,correct=sorted.filter(x=>x.correct).length,accuracy=attempts?correct/attempts:0,last=sorted[attempts-1]||null;
  if(!last)return {attempts,correct,accuracy,streak:0,isNew:true,weak:false,due:false,nextReviewAt:null,intervalDays:0};
  let streak=0;for(let i=sorted.length-1;i>=0&&sorted[i].correct;i--)streak++;
  const hinted=Number(last.hintsUsed||0)>=2;
  const weak=!last.correct||hinted||(attempts>=2&&accuracy<0.7);
  const intervalDays=intervals[Math.min(Math.max(streak-1,0),intervals.length-1)];
  const lastAt=Date.parse(last.occurredAt||"");
  const nextReviewAt=(!last.correct||hinted||!Number.isFinite(lastAt))?now:(lastAt+intervalDays*86400000);
  const due=!last.correct||hinted||!Number.isFinite(lastAt)||now>=nextReviewAt;
  return {attempts,correct,accuracy,streak,isNew:false,weak,due,nextReviewAt,intervalDays};
 }
 function compare(a,b){const rank=x=>x.isNew?0:x.due?1:x.weak?2:3;return rank(a)-rank(b)||a.attempts-b.attempts;}
 root.VocabReviewScheduler=Object.freeze({evaluate,compare,intervals:intervals.slice()});
})(typeof window!=="undefined"?window:globalThis);
