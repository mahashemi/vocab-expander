/* Term 03 source-to-FA chapter map.
   Based on the reviewed FA/KH/N/SH TSV supplied on 2026-11-15.
   Run after all Term 03 lexicon sources have been loaded. */
(()=>{
 const MAP={
  ...Object.fromEntries(Array.from({length:20},(_,i)=>{const n=i+1;return ["FA3-"+String(n).padStart(2,"0"),[n]]})),
  ...Object.fromEntries(Array.from({length:20},(_,i)=>{const n=i+1;return ["KH3-"+String(n).padStart(2,"0"),[n]]})),
  "N3-01":[3,19],"N3-02":[20,2],"N3-03":[8],"N3-04":[9,2,10],
  "N3-05":[12,13],"N3-06":[16],"N3-07":[3],"N3-08":[15,18],
  "N3-09":[16],"N3-10":[20,9,14],
  "SH3-01":[2,4,9],"SH3-02":[19],"SH3-03":[10,5,7],
  "SH3-04":[19],"SH3-05":[15],"SH3-06":[1,15],
  "SH3-07":[19,1,8],"SH3-08":[2,16],"SH3-09":[7,16],"SH3-10":[20,5]
 };
 const pad=n=>String(n).padStart(2,"0");
 const chapterNames={
  1:"Polite requests",2:"Personal qualities",3:"Decisions and plans",4:"Regret",
  5:"Wishes and subjunctive",6:"Banking",7:"Economy and inheritance",
  8:"Renting and housing",9:"Worry and stress",10:"Laws",11:"Energy",
  12:"Environment",13:"Animals and wildlife",14:"Civilisations and heritage",
  15:"Customs and traditions",16:"News and media",17:"Inventions",
  18:"Festivals and customs",19:"Travel and attractions",20:"Persian poetry"
 };
 const details={
  1:["KH3-01 · polite and rude speech","SH3-06 · restaurant/service requests","SH3-07 · hotel politeness"],
  2:["KH3-02 · friendship and literary genres","N3-02 · biography vocabulary","N3-04 · social problems and relationships","SH3-01 · childhood memories","SH3-08 · course registration"],
  3:["KH3-03 · planning","N3-01 · success and village tourism","N3-07 · planning"],
  4:["KH3-04 · regret","SH3-01 · childhood memories"],
  5:["SH3-03 · driving and traffic fines","SH3-10 · folk story"],
  6:["KH3-06 · loans and banks"],
  7:["KH3-07 · inheritance","SH3-03 · driving and traffic fines","SH3-09 · shopping and sales"],
  8:["KH3-08 · renting","N3-03 · renting and describing a house","SH3-07 · hotel repairs"],
  9:["KH3-09 · happiness","N3-04 · social problems and relationships","N3-10 · research writing","SH3-01 · childhood memories"],
  10:["KH3-10 · law","N3-04 · social problems (related)","SH3-03 · traffic fines and driving"],
  11:["KH3-11 · inventor of electricity (19 cards in this unit; inventor card is in 17)"],
  12:["KH3-12 · desert legend","N3-05 · nature, places and seasons"],
  13:["KH3-13 · Iranian cheetah","N3-05 · animals and habitats"],
  14:["N3-10 · research writing (closest available literature chapter)"],
  15:["KH3-15 · tea and customs","N3-08 · customs and describing people","SH3-05 · cooking and diet","SH3-06 · restaurant and food culture"],
  16:["KH3-16 · news websites and media","N3-06 · media and internet","N3-09 · virtual education and field of study","SH3-08 · course registration","SH3-09 · shopping and advertising"],
  17:["KH3-11 · inventor card (exception from unit 11)","KH3-17 · nano clothing"],
  18:["KH3-18 · Eid al-Ghadir","N3-08 · customs and describing people"],
  19:["KH3-19 · holidays and travel","N3-01 · village tourism","SH3-02 · airport and flying","SH3-04 · travel problems","SH3-07 · hotel and repairs"],
  20:["KH3-20 · biography of Imam Khomeini","N3-02 · biography","N3-10 · research writing","SH3-10 · folk story"]
 };
 const rows=window.TERM3_DATA||[];
 const sourceList=item=>Array.from(new Set([item.source,...(item.sources||[])].filter(Boolean)));
 for(const item of rows){
  const sources=sourceList(item);
  const linked=[];
  for(const source of sources){
   let chapters=MAP[source];
   if(source==="KH3-11") chapters=[Number(item.unit)===17?17:11];
   if(source.startsWith("WR3-")) chapters=[Number(item.unit)]; // Writing-course vocabulary is outside the supplied FA/KH/N/SH TSV; preserve its existing chapter.
   if(chapters) linked.push(...chapters);
  }
  const units=Array.from(new Set(linked)).sort((a,b)=>a-b);
  if(!units.length) throw new Error("No Term 03 chapter mapping for "+(item.source||item.fa)+" / "+item.fa);
  const primary=MAP[item.source]||units;
  item.unit=sourceList(item).includes("KH3-11")&&Number(item.unit)===17?17:(primary[0]||units[0]);
  item.units=units;
 }
 const prior=window.TERM3_UNIT_META||{};
 window.TERM3_UNIT_META=Object.fromEntries(Array.from({length:20},(_,i)=>{
  const n=i+1;
  return [n,{
   ...(prior[n]||{}),
   base:"FA3-"+pad(n)+" · "+chapterNames[n],
   links:details[n].join("; "),
   mappedSources:details[n].slice()
  }];
 }));
 window.TERM3_CHAPTER_MAPPING=MAP;
 window.TERM3_CHAPTER_MAPPING_VERSION="2026-11-15-tsv";
})();