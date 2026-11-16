const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export default async function(request){
 try {
 const p=JSON.parse(new URL(request.url).searchParams.get('p')||'null');
 if(!p||!Array.isArray(p.items)||p.items.length<1||p.items.length>100||!p.items.every(x=>typeof x==='string'&&x.length<=250)||typeof p.title!=='string'||p.title.length>150||!Number.isInteger(p.people)||p.people<1||p.people>30) throw Error();
 const schema={'@context':'https://schema.org','@type':'Recipe',name:p.title,author:{'@type':'Organization',name:'Family Hub'},recipeYield:`${p.people} personer`,recipeIngredient:p.items,recipeInstructions:[{'@type':'HowToStep',text:'Se ugens madplan på Family Hub.'}]};
 const html=`<!doctype html><html lang="da"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(p.title)}</title><script type="application/ld+json">${JSON.stringify(schema).replace(/</g,'\\u003c')}</script><script async src="https://platform.getbring.com/widgets/import.js"></script></head><body><h1>${esc(p.title)}</h1><div data-bring-import="" style="display:none"></div><ul>${p.items.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><a href="/">Family Hub</a></body></html>`;
 return new Response(html,{headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store','x-robots-tag':'noindex'}});
 }catch{return new Response('Ugyldig indkøbsliste',{status:400});}
}
