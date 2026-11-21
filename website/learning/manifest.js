(function(root){
 "use strict";
 const unique=values=>[...new Set((values||[]).filter(Boolean).map(x=>String(x)))];
 const stableKey=(id,headword)=>"vocab:source:"+encodeURIComponent(id)+":"+encodeURIComponent(headword);
 function build(rows){
  const groups=new Map(),conflicts=[];
  for(const row of Array.isArray(rows)?rows:[]){
   if(!row||!row.fa||!row.id)continue;
   const legacyId=String(row.id),headword=String(row.fa).trim(),key=legacyId+"\u0000"+headword;
   let group=groups.get(key);
   if(!group){
    group={itemId:stableKey(legacyId,headword),headword,kind:/\\s/.test(headword)?"phrase":"word",acceptedForms:unique(row.acceptedForms),legacyIds:[legacyId],occurrences:[],meanings:{fa:row.sem?.faMeaning||null,en:row.en||row.sem?.enMeaning||null,ar:row.sem?.arMeaning||null},examples:[],pos:row.pos||null,sourceConfidence:row.sources?.length||row.source?"source-present":"user-added"};
    groups.set(key,group);
   }else{
    for(const [lang,value] of Object.entries({fa:row.sem?.faMeaning,en:row.en||row.sem?.enMeaning,ar:row.sem?.arMeaning})){
     if(value&&!group.meanings[lang])group.meanings[lang]=value;
     else if(value&&group.meanings[lang]!==value)conflicts.push({legacyId,headword,field:"meaning-"+lang});
    }
    group.acceptedForms=unique([...group.acceptedForms,...(row.acceptedForms||[])]);
   }
   const sources=unique(row.sources||[row.source]);
   const occurrence={term:Number(row.bk),book:Number(row.bk),chapter:Number(row.ch),legacyId,sources};
   const occurrenceKey=[occurrence.term,occurrence.book,occurrence.chapter,legacyId,sources.join("|")].join("|");
   if(!group.occurrences.some(x=>[x.term,x.book,x.chapter,x.legacyId,x.sources.join("|")].join("|")===occurrenceKey))group.occurrences.push(occurrence);
   if(row.xf||row.xt||row.xe){
    const example={fa:row.xf||"",transliteration:row.xt||"",en:row.xe||"",source:sources};
    const exampleKey=[example.fa,example.transliteration,example.en].join("|");
    if(!group.examples.some(x=>[x.fa,x.transliteration,x.en].join("|")===exampleKey))group.examples.push(example);
   }
  }
  const items=[...groups.values()].sort((a,b)=>a.itemId.localeCompare(b.itemId));
  const manifest={schemaVersion:1,items};
  const validation=root.VocabLearningIdentity.validateManifest(manifest);
  const aliasIndex=root.VocabLearningIdentity.buildLegacyAliasIndex(manifest);
  return {manifest,validation,aliasIndex,stats:{sourceRows:(rows||[]).length,indexedItems:items.length,ambiguousAliases:aliasIndex.ambiguous.length,unmappedRows:(rows||[]).filter(x=>!x?.fa||!x?.id).length,meaningConflicts:conflicts}};
 }
 root.VocabLearningManifest=Object.freeze({build,stableKey});
})(typeof window!=="undefined"?window:globalThis);
