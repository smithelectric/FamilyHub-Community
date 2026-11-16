import {getStore} from '@netlify/blobs';
import {createHash,timingSafeEqual,randomUUID} from 'node:crypto';
const hash=s=>createHash('sha256').update(s).digest();
const reply=(statusCode,data)=>new Response(JSON.stringify(data),{status:statusCode,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
export default async function(request){
 try{
 if(!['GET','POST'].includes(request.method))return reply(405,{error:'Kun GET og POST.'});
const secret=process.env.FAMILYHUB_PASSWORD;
if(!secret)return reply(503,{error:'Family Hub-adgangskoden er ikke konfigureret.'});
if(!timingSafeEqual(
  hash(request.headers.get('authorization')||''),
  hash('Bearer '+secret)
))return reply(401,{error:'Forkert adgangskode.'});
 const store=getStore({name:'family-hub',consistency:'strong'});
 if(request.method==='GET')return reply(200,{shared:await store.get('current',{type:'json'})});
 const body=await request.text();
 if(Buffer.byteLength(body)>4000000)return reply(413,{error:'Madplanen er for stor. Fjern nogle billeder.'});
 const {plan,revision,action="save"}=JSON.parse(body||'{}');
 const current=await store.getWithMetadata("current",{type:"json"});
 if(!["save","lock","unlock"].includes(action))return reply(400,{error:"Ugyldig handling."});
 if((current?.data?.revision??null)!==(revision??null))return reply(409,{error:"Madplanen er ændret på en anden enhed. Opdatér og prøv igen."});
 if(action==="save"&&current?.data?.bringLocked)return reply(423,{error:"Madplanen er låst efter Bring. Fortryd først."});
 if(action!=="save"&&(!current||!!current.data.bringLocked===(action==="lock")))return reply(409,{error:"Bring-status er ændret. Opdatér siden."});
 if(action==="save"){
 if(!plan||typeof plan.week!=='string'||typeof plan.dates!=='string'||!Number.isInteger(plan.people)||plan.people<1||plan.people>30||!Array.isArray(plan.meals)||plan.meals.length<1||plan.meals.length>7||!plan.meals.every(m=>typeof m.title==='string'&&typeof m.time==='string'&&typeof m.instructions==='string'&&Array.isArray(m.ingredients)&&m.ingredients.every(x=>typeof x==='string'))||!Array.isArray(plan.shopping)||!plan.shopping.every(x=>typeof x==='string'))return reply(400,{error:'Ugyldig madplan.'});
 }
 const shared={plan:action==="save"?plan:current.data.plan,bringLocked:action==="lock",revision:randomUUID(),updatedAt:new Date().toISOString()};
 const result=await store.setJSON('current',shared,current?{onlyIfMatch:current.etag}:{onlyIfNew:true});
 if(result?.modified===false)return reply(409,{error:'Madplanen er ændret på en anden enhed. Opdatér siden.'});
 return reply(200,{shared});
 }catch(e){console.error('Shared plan:',e.message);return reply(502,{error:'Kunne ikke synkronisere madplanen. Kontrollér Netlify Blobs og prøv igen.'});}
}
