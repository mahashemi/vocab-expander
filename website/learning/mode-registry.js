(function(root){
 "use strict";
 const REQUIRED=["eligible","createPrompt","validate","hint"];
 function create(modules){
  const modes=new Map();
  function register(mode){
   if(!mode||typeof mode.id!=="string"||!mode.id.trim())throw new TypeError("A learning mode needs a stable id.");
   if(modes.has(mode.id))throw new Error("Duplicate learning mode: "+mode.id);
   const missing=REQUIRED.filter(key=>typeof mode[key]!=="function");
   if(missing.length)throw new TypeError("Learning mode "+mode.id+" is missing: "+missing.join(", "));
   modes.set(mode.id,Object.freeze(mode));return mode;
  }
  (Array.isArray(modules)?modules:[]).forEach(register);
  function get(id){return modes.get(String(id))||null}
  function list(){return [...modes.values()]}
  function assess(item,context){
   return list().map(mode=>{
    let eligible=false,reason="";
    try{
     eligible=!!mode.eligible(item,context||{});
     if(!eligible)reason=typeof mode.ineligibleReason==="function"?String(mode.ineligibleReason(item,context||{})||""): "This item does not meet this activity's learning requirements.";
    }catch(error){reason="Eligibility check unavailable: "+String(error&&error.message||error)}
    return {id:mode.id,title:mode.title||mode.id,eligible,reason};
   });
  }
  function eligible(item,context){return assess(item,context).filter(x=>x.eligible).map(x=>get(x.id))}
  return Object.freeze({register,get,list,assess,eligible});
 }
 root.VocabLearningModeRegistry=Object.freeze({create,requiredMethods:REQUIRED.slice()});
})(typeof window!=="undefined"?window:globalThis);
