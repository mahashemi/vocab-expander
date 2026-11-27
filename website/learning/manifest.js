(function(root){
 "use strict";
 const asArray=value=>Array.isArray(value)?value:value==null?[]:[value];
 const unique=values=>[...new Set(asArray(values).filter(Boolean).map(x=>String(x)))];
 const normalize=value=>String(value||"").normalize("NFKC").toLowerCase()
  .replace(/[يى]/g,"ی").replace(/ك/g,"ک").replace(/[\u064b-\u065f\u0670\u0640]/g,"")
  .replace(/[\u200c\u200d\s]+/g," ").trim();
 const meaningFields=["fa","en","ar"];
 function meaningsFor(row){
  return {
   fa:row.sem?.faMeaning||null,
   en:row.en||row.sem?.enMeaning||null,
   ar:row.sem?.arMeaning||null
  };
 }
 function kindFor(row,headword){
  const pos=String(row.pos||"");
  if(/فعل مرکب|compound verb/i.test(pos))return "compound-verb";
  if(row.ms||row.amr)return /\s/.test(headword)?"compound-verb":"word";
  return /\s/.test(headword)?"phrase":"word";
 }
 function hash(value){
  let first=2166136261,second=2246822519;
  const text=String(value||"");
  for(let i=0;i<text.length;i++){
   const code=text.charCodeAt(i);
   first=Math.imul(first^code,16777619);
   second=Math.imul(second^code,3266489917);
  }
  return (first>>>0).toString(36)+(second>>>0).toString(36);
 }
 function stableKey(headword,kind,pos,meanings){
  const sense=[kind,normalize(pos),...meaningFields.map(field=>normalize(meanings?.[field]))].join("\u0000");
  return "vocab:canonical:"+encodeURIComponent(normalize(headword))+":"+hash(sense);
 }
 function sameMeaningSet(a,b){
  return meaningFields.every(field=>normalize(a?.[field])===normalize(b?.[field]));
 }
 function compatible(group,row){
  const posA=normalize(group.pos),posB=normalize(row.pos);
  const posCompatible=!posA||!posB||posA===posB;
  const meaningCompatible=meaningFields.every(field=>{
   const a=normalize(group.meanings[field]),b=normalize(row.meanings[field]);
   return !a||!b||a===b;
  });
  return posCompatible&&meaningCompatible;
 }
 function exampleRecords(row,sources){
  const out=[];
  const add=value=>{
   if(!value)return;
   let item=null;
   if(Array.isArray(value)&&value.length>=3)item={fa:value[0]||"",transliteration:value[1]||"",en:value[2]||"",source:sources};
   else if(typeof value==="object")item={
    fa:value.fa||"",transliteration:value.transliteration||value.tr||"",
    en:value.en||value.meaning||"",source:unique([...(Array.isArray(value.source)?value.source:[value.source]),...sources])
   };
   if(item&&(item.fa||item.transliteration||item.en))out.push(item);
  };
  if(row.xf||row.xt||row.xe)add([row.xf,row.xt,row.xe]);
  add(row.ex);add(row.m);add(row.a);
  (Array.isArray(row.extraExamples)?row.extraExamples:[]).forEach(add);
  return out;
 }
 function mergeGroup(target,source){
  target.legacyIds=unique([...target.legacyIds,...source.legacyIds]);
  target.acceptedForms=unique([...target.acceptedForms,...source.acceptedForms]);
  target.aliases=unique([...target.aliases,...source.aliases]);
  target.occurrences.push(...source.occurrences);
  const occurrenceSeen=new Set();
  target.occurrences=target.occurrences.filter(item=>{
   const key=[item.term,item.book,item.chapter,item.legacyId,item.sources.join("|")].join("|");
   if(occurrenceSeen.has(key))return false;occurrenceSeen.add(key);return true;
  });
  target.examples.push(...source.examples);
  const exampleSeen=new Set();
  target.examples=target.examples.filter(item=>{
   const key=[item.fa,item.transliteration,item.en].join("|");
   if(exampleSeen.has(key))return false;exampleSeen.add(key);return true;
  });
  target.notes=unique([...target.notes,...source.notes]);
  for(const field of meaningFields)if(!target.meanings[field]&&source.meanings[field])target.meanings[field]=source.meanings[field];
  if(!target.pos&&source.pos)target.pos=source.pos;
  if(target.sourceConfidence!=="source-present"&&source.sourceConfidence==="source-present")target.sourceConfidence="source-present";
  return target;
 }
 function makeGroup(row,headword,kind,sources){
  const meanings=meaningsFor(row);
  const occurrence={term:Number(row.bk),book:Number(row.bk),chapter:Number(row.ch),legacyId:String(row.id),sources};
  return {
   headword,kind,pos:row.pos||null,meanings,
   acceptedForms:unique(row.acceptedForms),
   aliases:unique([...asArray(row.aliases),...asArray(row.variants),...asArray(row.synonyms)]),
   legacyIds:[String(row.id)],occurrences:[occurrence],
   examples:exampleRecords(row,sources),
   notes:unique([row.note,row.nt,...asArray(row.extraNotes)]),
   sourceConfidence:sources.length?"source-present":"user-added"
  };
 }
 function rowCompleteness(row){
  if(!row)return 0;
  const meanings=meaningsFor(row);
  return (row.pos?1:0)+meaningFields.filter(field=>meanings[field]).length;
 }
 function build(rows){
  const inputRows=Array.isArray(rows)?rows:[];
  const orderedRows=inputRows.slice().sort((a,b)=>{
   const score=rowCompleteness(b)-rowCompleteness(a);
   if(score)return score;
   const head=normalize(a?.fa).localeCompare(normalize(b?.fa));if(head)return head;
   const kind=kindFor(a||{},String(a?.fa||"")).localeCompare(kindFor(b||{},String(b?.fa||"")));if(kind)return kind;
   const pos=normalize(a?.pos).localeCompare(normalize(b?.pos));if(pos)return pos;
   const sense=meaningFields.map(field=>normalize(meaningsFor(a||{})[field])).join("|").localeCompare(meaningFields.map(field=>normalize(meaningsFor(b||{})[field])).join("|"));if(sense)return sense;
   return String(a?.id||"").localeCompare(String(b?.id||""));
  });
  const buckets=new Map(),unmapped=[];
  for(const row of orderedRows){
   if(!row||!row.fa||!row.id){unmapped.push(row);continue}
   const legacyId=String(row.id),headword=String(row.fa).trim(),kind=kindFor(row,headword);
   const sources=unique(row.sources?.length?row.sources:[row.source]);
   const normalizedHeadword=normalize(headword);
   const bucketKey=normalizedHeadword+"\u0000"+kind;
   const incoming={pos:row.pos||null,meanings:meaningsFor(row)};
   const candidates=buckets.get(bucketKey)||[];
   const exact=candidates.filter(group=>normalize(group.pos)===normalize(incoming.pos)&&sameMeaningSet(group.meanings,incoming.meanings));
   const possible=candidates.filter(group=>compatible(group,incoming));
   let group=exact.length===1?exact[0]:exact.length>1?exact[0]:possible.length===1?possible[0]:null;
   const fresh=makeGroup(row,headword,kind,sources);
   if(group)mergeGroup(group,fresh);
   else{
    if(!buckets.has(bucketKey))buckets.set(bucketKey,[]);
    buckets.get(bucketKey).push(fresh);
   }
  }
  // Coalesce groups whose completed sense signatures are identical. This also
  // makes the result independent of whether a partially described occurrence
  // appeared before or after a fully described one.
  const canonicalGroups=new Map();
  for(const group of [...buckets.values()].flat()){
   const signature=[normalize(group.headword),group.kind,normalize(group.pos),...meaningFields.map(field=>normalize(group.meanings[field]))].join("\u0000");
   if(canonicalGroups.has(signature))mergeGroup(canonicalGroups.get(signature),group);
   else canonicalGroups.set(signature,group);
  }
  const items=[...canonicalGroups.values()].map(group=>({
   itemId:stableKey(group.headword,group.kind,group.pos,group.meanings),
   headword:group.headword,kind:group.kind,pos:group.pos,
   acceptedForms:group.acceptedForms,aliases:group.aliases,
   legacyIds:group.legacyIds,occurrences:group.occurrences,
   meanings:group.meanings,examples:group.examples,notes:group.notes,
   sourceConfidence:group.sourceConfidence
  })).sort((a,b)=>a.itemId.localeCompare(b.itemId));
  const manifest={schemaVersion:1,items};
  const validation=root.VocabLearningIdentity.validateManifest(manifest);
  const aliasIndex=root.VocabLearningIdentity.buildLegacyAliasIndex(manifest);
  const occurrenceCount=items.reduce((sum,item)=>sum+item.occurrences.length,0);
  const crossTermMerged=items.filter(item=>new Set(item.occurrences.map(occurrence=>occurrence.term)).size>1).length;
  return {manifest,validation,aliasIndex,stats:{
   sourceRows:inputRows.length,indexedItems:items.length,occurrences:occurrenceCount,
   ambiguousAliases:aliasIndex.ambiguous.length,unmappedRows:unmapped.length,crossTermMerged
  }};
 }
 function rowQuality(row){
  return [row.en||row.sem?.enMeaning,row.tr,row.pos,row.xf||row.xe,row.sem?.arMeaning,row.ms||row.amr].filter(Boolean).length;
 }
 function mergePracticeRows(first,second){
  const primary=rowQuality(second)>rowQuality(first)?second:first;
  const secondary=primary===first?second:first;
  const merged={...secondary,...primary};
  merged.sources=unique([...asArray(first.sources?.length?first.sources:first.source),...asArray(second.sources?.length?second.sources:second.source)]);
  for(const field of ["acceptedForms","aliases","variants","synonyms","extraNotes"])merged[field]=unique([...asArray(first[field]),...asArray(second[field])]);
  merged.extraExamples=[...asArray(first.extraExamples),...asArray(second.extraExamples)].filter((item,index,array)=>array.findIndex(other=>JSON.stringify(other)===JSON.stringify(item))===index);
  merged.sem={...(secondary.sem||{}),...(primary.sem||{})};
  for(const field of ["en","tr","pos","xf","xt","xe","ms","amr","m","a","note","nt"]){
   if((merged[field]===undefined||merged[field]===null||merged[field]==="")&&secondary[field]!==undefined)merged[field]=secondary[field];
  }
  return merged;
 }
 function selectPracticeRows(rows,aliasIndex,term){
  const selectedTerm=term==="all"?"all":Number(term);
  const grouped=new Map();
  for(const row of Array.isArray(rows)?rows:[]){
   if(!row||!row.id)continue;
   if(selectedTerm!=="all"&&Number(row.bk)!==selectedTerm)continue;
   const resolved=root.VocabLearningIdentity.resolveLegacyId(aliasIndex,String(row.id));
   const canonicalId=resolved.status==="resolved"?resolved.itemId:"legacy:"+String(row.id);
   const key=canonicalId+"|"+(selectedTerm==="all"?"all":Number(row.bk));
   if(grouped.has(key))grouped.set(key,mergePracticeRows(grouped.get(key),row));
   else grouped.set(key,{...row});
  }
  return [...grouped.values()];
 }
 root.VocabLearningManifest=Object.freeze({build,stableKey,selectPracticeRows});
})(typeof window!=="undefined"?window:globalThis);
