const grid=document.querySelector('.game-grid');
const version=new URL(import.meta.url).searchParams.get('v');
const manifest=new URL('./games.json',import.meta.url);
if(version)manifest.searchParams.set('v',version);
try{
 const response=await fetch(manifest);if(!response.ok)throw Error('Game list not found');
 const games=await response.json();if(!Array.isArray(games))throw Error('Invalid game list');
 const fragment=document.createDocumentFragment();
 for(const game of games){
  if(!game.title||!game.href||!game.cover)throw Error('Game needs title, href and cover');
  const card=document.createElement('a');card.className='game-card';
  const target=new URL(game.href,document.baseURI);if(version&&target.origin===location.origin)target.searchParams.set('v',version);card.href=target.href;
  const image=document.createElement('img');image.src=game.cover;image.alt='';image.width=512;image.height=512;image.decoding='async';
  const title=document.createElement('span');title.className='card-title';title.textContent=game.title;
  const detail=document.createElement('span');detail.className='card-detail';detail.textContent=[game.year,game.genre].filter(Boolean).join(' · ');
  card.append(image,title,detail);fragment.append(card);
 }
 grid.replaceChildren(fragment);
}catch(error){document.querySelector('.catalogue-error').hidden=false;console.error(error);}
finally{grid.setAttribute('aria-busy','false');}
