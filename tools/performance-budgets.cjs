"use strict";
const LIMITS={
 mobile:{cold:{lcpMs:3000,transferBytes:450000,requestCount:15,cls:0.10},deepCold:{lcpMs:6500,term03RouteReadyMs:6000,transferBytes:1150000,scriptTransferBytes:900000,requestCount:90,longTaskMs:2000,cls:0.10},deepWarm:{lcpMs:1500,term03RouteReadyMs:2200,transferBytes:400000,longTaskMs:2000}},
 desktop:{cold:{lcpMs:1500,transferBytes:500000,requestCount:15,cls:0.10},deepCold:{lcpMs:2500,term03RouteReadyMs:2200,transferBytes:1500000,scriptTransferBytes:1250000,requestCount:90,longTaskMs:1000,cls:0.10},deepWarm:{lcpMs:1200,term03RouteReadyMs:1000,transferBytes:500000,longTaskMs:1000}}
};
function evaluate(report){
 const failures=[],checks=[];
 for(const [viewport,scenarios] of Object.entries(LIMITS)){
  const actual=report?.results?.find(x=>x.viewport===viewport);
  if(!actual){failures.push("Missing viewport: "+viewport);continue}
  for(const [scenario,metrics] of Object.entries(scenarios)){
   const sample=actual[scenario];
   if(!sample){failures.push("Missing sample: "+viewport+"."+scenario);continue}
   for(const [metric,limit] of Object.entries(metrics)){
    const value=sample[metric];
    const ok=Number.isFinite(value)&&value<=limit;
    checks.push({viewport,scenario,metric,value:value??null,limit,ok});
    if(!ok)failures.push(viewport+" "+scenario+" "+metric+" = "+String(value)+" exceeds budget "+limit);
   }
  }
 }
 return {passed:failures.length===0,failures,checks};
}
module.exports={LIMITS,evaluate};
