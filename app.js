const K='fs180',L=()=>JSON.parse(localStorage.getItem(K)||'{}'),today=()=>new Date().toLocaleDateString('sv'),$=s=>document.querySelector(s);
const LAB={locked:'🔒 Verrouillé',open:'Disponible',done:'✓ Terminé',wait:'⏳ Demain'};

function status(n){
  const s=L();
  if(s[n])return'done';
  const m=Math.max(0,...Object.keys(s).map(Number));
  if(n>m+1)return'locked';
  return m&&s[m]>=today()?'wait':'open';
}

const generic=D=>({
  t:`<p>Sujet du jour : <b>${D.title}</b>.</p><ol><li>Lis la documentation (<a target="_blank" href="https://developer.mozilla.org/fr/search?q=${encodeURIComponent(D.title)}">MDN</a>) pendant 30 min.</li><li>Reproduis chaque exemple à la main, sans copier-coller.</li><li>Casse volontairement le code et lis les erreurs.</li></ol><p><i>Pour Git, Node, React et MongoDB, pratique aussi en local dans ton terminal.</i></p>`,
  s:'// Ton espace d\'essai\nconsole.log("Prêt !");',
  x:['Écrire 3 exemples personnels sur le sujet','Résumer la notion en 5 lignes','Faire un mini-exercice et le tester']
});

function home(){
  const d=Object.keys(L()).length;
  $('#pct').textContent=`${d}/180 jours · ${Math.round(d/1.8)}%`;
  $('#fill').style.width=d/1.8+'%';
  $('#grid').innerHTML=DAYS.slice(1).map(x=>{
    const s=status(x.n);
    return `<a class="card ${s}" href="${s=='locked'?'#':'day.html?d='+x.n}"><b>J${x.n}</b><small>${x.title}</small><span class="badge">${LAB[s]}</span></a>`;
  }).join('');
}

function day(){
  const n=+new URLSearchParams(location.search).get('d')||1,D=DAYS[n];
  if(!D){location.href='index.html';return}
  const s=status(n);
  $('#title').textContent=`Jour ${n} — ${D.title}`;
  document.title=`J${n} · ProjetBigDev`;
  $('#prev').href=n>1?'day.html?d='+(n-1):'index.html';
  $('#next').href=n<180?'day.html?d='+(n+1):'index.html';
  if(s=='locked'||s=='wait'){
    $('#app').hidden=true;
    $('#msg').textContent=s=='wait'?'⏳ Leçon du jour déjà validée. Reviens demain pour la suite.':'🔒 Termine et valide le jour précédent d\'abord.';
    return;
  }
  const web=n<=18||(n>=46&&n<=55),les=LESSONS[n]||generic(D),ed=$('#ed'),fr=$('#fr'),con=$('#con'),ok=$('#ok');
  $('#theory').innerHTML=les.t;
  $('#tasks').innerHTML=les.x.map(t=>`<label><input type="checkbox"> ${t}</label>`).join('');
  ed.value=localStorage.getItem(K+'c'+n)||les.s;
  fr.hidden=!web;

  const log=(m,c)=>{const e=document.createElement('div');e.textContent=m;if(c)e.className=c;con.appendChild(e)};
  window.onmessage=e=>{if(e.source===fr.contentWindow)log((e.data.t=='err'?'✖ ':'› ')+e.data.m,e.data.t=='err'?'err':'')};
  const hook=`<script>const _p=(t,a)=>parent.postMessage({t,m:a.map(x=>typeof x=='object'?JSON.stringify(x):String(x)).join(' ')},'*');console.log=(...a)=>_p('log',a);console.error=(...a)=>_p('err',a);onerror=m=>_p('err',[m]);addEventListener('unhandledrejection',e=>_p('err',[e.reason]));<\/script>`;
  const run=()=>{
    localStorage.setItem(K+'c'+n,ed.value);
    con.textContent='';
    fr.srcdoc=hook+(web?ed.value:`<script>${ed.value}<\/script>`);
  };
  $('#run').onclick=run;
  $('#reset').onclick=()=>{ed.value=les.s;con.textContent=''};
  ed.onkeydown=e=>{
    if(e.key=='Tab'){e.preventDefault();document.execCommand('insertText',false,'  ')}
    if(e.key=='Enter'&&(e.ctrlKey||e.metaKey)){e.preventDefault();run()}
  };
  ed.oninput=()=>localStorage.setItem(K+'c'+n,ed.value);

  const boxes=[...document.querySelectorAll('#tasks input')];
  const upd=()=>{ok.disabled=s=='done'||!boxes.every(b=>b.checked)};
  boxes.forEach(b=>b.onchange=upd);
  if(s=='done'){ok.textContent='✓ Leçon déjà terminée';boxes.forEach(b=>b.checked=true)}
  upd();
  ok.onclick=()=>{const v=L();v[n]=today();localStorage.setItem(K,JSON.stringify(v));location.href='index.html'};
}

if($('#grid'))home();else day();
