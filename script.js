// Ссылка на создателя, замените на нужную
const creatorTelegram = 'https://t.me/ostapovxyz';
document.getElementById('creatorBtn').href = creatorTelegram;

// Список участников
// Чтобы добавить нового участника — добавьте новую строку в массив participants
// Формат: { name: 'Имя', link: 'https://t.me/username' }
const participants = [
  { name: 'Остапов', link: 'https://ostapovxyz.t.me' },
  { name: 'Ивав', link: 'https://userivav.t.me' },
  { name: 'Гришаня Доксеров', link: 'https://xiidu.t.me' },
  { name: 'Чапер', link: 'https://vkchaperr.t.me' },
  { name: 'София Докс', link: 'https://amglev.t.me' },
  { name: 'Антифобов', link: 'https://ANTIFOBOVVV.t.me' },
  { name: 'Флейтов', link: 'https://fleytovv.t.me' },
  { name: 'Лианов', link: 'https://nadzemniy.t.me' },
  { name: 'Вк пират', link: 'https://vkpiratt.t.me' },
  { name: 'Катана', link: 'https://pvpfreak.t.me' },
  { name: 'Древний Рус', link: 'https://pixxxion1x.t.me' },
  { name: 'Лолик', link: 'https://loliambassador.t.me' },
  { name: 'Филосовский', link: 'https://unluckxyle.t.me' },
  { name: 'Тимокса', link: 'https://daxindex.t.me' }
];

// Рендер списка
const fameListEl = document.getElementById('fameList');
function renderList() {
  fameListEl.innerHTML = '';
  participants.forEach((p, i) => {
    const li = document.createElement('li');
    li.className = 'fame-item';

    const left = document.createElement('div');
    left.className = 'fame-left';

    const num = document.createElement('div');
    num.className = 'fame-number';
    num.textContent = (i + 1) + '.';

    const name = document.createElement('div');
    name.className = 'fame-name';
    name.textContent = p.name;

    left.appendChild(num);
    left.appendChild(name);

    const a = document.createElement('a');
    a.className = 'fame-link';
    a.href = p.link;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = 'Открыть';

    li.appendChild(left);
    li.appendChild(a);
    fameListEl.appendChild(li);
  });

  // Прокрутить к концу списка
  fameListEl.scrollTop = fameListEl.scrollHeight;
}
renderList();

/* Canvas: плавающие красные точки */
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
let w = canvas.width = innerWidth;
let h = canvas.height = innerHeight;
window.addEventListener('resize', () => {
  w = canvas.width = innerWidth;
  h = canvas.height = innerHeight;
  initDots();
});

let dots = [];
function initDots(){
  dots = [];
  const count = Math.max(30, Math.floor((w*h)/35000));
  for(let i=0;i<count;i++){
    dots.push({
      x: Math.random()*w,
      y: Math.random()*h,
      r: 1 + Math.random()*3,
      vx: (Math.random()-0.5)*0.5,
      vy: (Math.random()-0.5)*0.5,
      alpha: 0.3 + Math.random()*0.9
    });
  }
}
initDots();

function update(){
  ctx.clearRect(0,0,w,h);
  for(const d of dots){
    d.x += d.vx;
    d.y += d.vy;
    if(d.x < -10) d.x = w + 10;
    if(d.x > w + 10) d.x = -10;
    if(d.y < -10) d.y = h + 10;
    if(d.y > h + 10) d.y = -10;
    ctx.beginPath();
    ctx.fillStyle = `rgba(255,30,30,${d.alpha})`;
    ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
    ctx.fill();
  }
  requestAnimationFrame(update);
}
update();
