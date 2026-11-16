import {createHash,timingSafeEqual} from 'node:crypto';
const hash=s=>createHash('sha256').update(s).digest();
const reply=(statusCode,data)=>({statusCode,headers:{'Content-Type':'application/json','Cache-Control':'no-store'},body:JSON.stringify(data)});
export async function handler(event){
 if(event.httpMethod!=='POST')return reply(405,{error:'Kun POST'});
 const secret=process.env.FAMILYHUB_PASSWORD;
 if(!secret||!process.env.OPENAI_API_KEY)return reply(503,{error:'Serveren mangler konfiguration.'});
 if(!timingSafeEqual(hash(event.headers.authorization||''),hash('Bearer '+secret)))return reply(401,{error:'Forkert adgangskode.'});
 try{
 const {title,ingredients}=JSON.parse(event.body||'{}');
 if(typeof title!=='string'||!title.trim()||title.length>200||!Array.isArray(ingredients)||ingredients.length>40||!ingredients.every(x=>typeof x==='string'&&x.length<300))return reply(400,{error:'Ugyldig ret.'});
 const r=await fetch('https://api.openai.com/v1/images/generations',{method:'POST',headers:{Authorization:'Bearer '+process.env.OPENAI_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({model:process.env.OPENAI_IMAGE_MODEL||'gpt-image-1-mini',prompt:'Photorealistic appetizing cookbook photograph of the finished dish only, natural daylight, plated on a simple ceramic plate, no text. Dish: '+title+'. Ingredients: '+ingredients.join(', '),size:'1024x1024',quality:'low',output_format:'jpeg',output_compression:75,n:1}),signal:AbortSignal.timeout(50000)});
 const d=await r.json();if(!r.ok)return reply(502,{error:'Billed-API fejl '+r.status+'. Kontrollér Images-skriveadgang og modeladgang.'});
 const b=d.data?.[0]?.b64_json;if(typeof b!=='string'||!b)return reply(502,{error:'Intet billede modtaget.'});return reply(200,{image:'data:image/jpeg;base64,'+b});
 }catch(e){return reply(502,{error:'Billedet kunne ikke genereres. Prøv igen senere.'});}
}
