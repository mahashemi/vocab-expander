(function(root){
 "use strict";
 const marks=/[\u064b-\u065f\u0670\u0640]/g;
 const norm=s=>String(s||"").normalize("NFC").replace(/[يى]/g,"ی").replace(/ك/g,"ک").replace(marks,"").replace(/\u200d/g,"").replace(/\s+/g," ").trim();
 const graphemes=s=>Array.from(norm(s));
 const separator=c=>c===" "||c==="\u200c"||c==="\u200d";
 function diff(expected,actual){
  const a=graphemes(expected),b=graphemes(actual),n=a.length,m=b.length;
  const dp=Array.from({length:n+1},()=>Array(m+1).fill(0));
  for(let i=0;i<=n;i++)dp[i][0]=i;
  for(let j=0;j<=m;j++)dp[0][j]=j;
  for(let i=1;i<=n;i++)for(let j=1;j<=m;j++){
   const cost=a[i-1]===b[j-1]?0:1;
   let best=Math.min(dp[i-1][j]+1,dp[i][j-1]+1,dp[i-1][j-1]+cost);
   if(i>1&&j>1&&a[i-1]===b[j-2]&&a[i-2]===b[j-1])best=Math.min(best,dp[i-2][j-2]+1);
   dp[i][j]=best;
  }
  const details=[];let i=n,j=m;
  while(i>0||j>0){
   if(i>1&&j>1&&a[i-1]===b[j-2]&&a[i-2]===b[j-1]&&dp[i][j]===dp[i-2][j-2]+1){
    details.push({type:"transposition",position:i-1,expected:a.slice(i-2,i).join(""),actual:b.slice(j-2,j).join("")});i-=2;j-=2;continue;
   }
   if(i>0&&j>0){
    const cost=a[i-1]===b[j-1]?0:1;
    if(dp[i][j]===dp[i-1][j-1]+cost){
     if(cost){const type=separator(a[i-1])||separator(b[j-1])?"spacing-or-zwnj":"substitution";details.push({type,position:i,expected:a[i-1],actual:b[j-1]})}
     i--;j--;continue;
    }
   }
   if(i>0&&dp[i][j]===dp[i-1][j]+1){
    const type=separator(a[i-1])?"spacing-or-zwnj":"omission";details.push({type,position:i,expected:a[i-1],actual:""});i--;continue;
   }
   if(j>0){
    const type=separator(b[j-1])?"spacing-or-zwnj":"insertion";details.push({type,position:i,expected:"",actual:b[j-1]});j--;continue;
   }
   break;
  }
  return details.reverse();
 }
 function eligible(item){return !!(item&&typeof item.fa==="string"&&item.fa.trim()&&String(item.en||item.sem?.enMeaning||"").trim()&&graphemes(item.fa).filter(c=>!separator(c)).length>=2)}
 function createPrompt(item){return {cue:String(item.en||item.sem?.enMeaning||"Translate the meaning into Persian"),context:item.xe?String(item.xe):"",target:item.fa,accepted:[item.fa,...(item.acceptedForms||[])],version:2}}
 function validate(item,response,prompt){
  const answer=norm(response),accepted=(prompt?.accepted||[item.fa]).map(norm).filter(Boolean),correct=!!answer&&accepted.includes(answer);
  if(correct)return {correct:true,answer,response:String(response??""),errorTypes:[],errorPositions:[],errorDetails:[],target:item.fa,accepted:accepted.length};
  const errorDetails=answer?diff(item.fa,response):[];
  const errorTypes=answer?[...new Set(errorDetails.map(x=>x.type))]:["empty"];
  return {correct:false,answer,response:String(response??""),errorTypes,errorPositions:errorDetails.map(x=>x.position),errorDetails,target:item.fa,accepted:accepted.length};
 }
 function hint(item,attempt){if(attempt===0)return item.xe?"Context: "+item.xe:"Think of the meaning: "+(item.en||"");if(attempt===1)return "First letter: "+(graphemes(item.fa).find(c=>!separator(c))||"");return "The word has "+graphemes(item.fa).length+" grapheme units (including spaces)."}
 root.VocabImla=Object.freeze({id:"imla",title:"Imla · املاء",eligible,createPrompt,validate,hint,norm,graphemes,diff});
})(typeof window!=="undefined"?window:globalThis);
