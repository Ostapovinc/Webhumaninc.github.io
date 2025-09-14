/* ---- конфигурация ---- */
const creatorTelegram = 'https://t.me/ostapovxyz'; // <-- замените на реальный аккаунт создателя

const adminPassword = 'bandy123edy';

/* начальный список (из запроса) */
const initialList = [
  {name: 'Остапов', link: 'https://ostapovxyz.t.me'},
  {name: 'Ивав', link: 'https://userivav.t.me'},
  {name: 'Гришаня Доксеров', link: 'https://xiidu.t.me'},
  {name: 'Чапер', link: 'https://vkchaperr.t.me'},
  {name: 'София Докс', link: 'https://amglev.t.me'},
  {name: 'Антифобов', link: 'https://ANTIFOBOVVV.t.me'},
  {name: 'Флейтов', link: 'https://fleytovv.t.me'},
  {name: 'Лианов', link: 'https://nadzemniy.t.me'},
  {name: 'Вк пират', link: 'https://vkpiratt.t.me'},
  {name: 'Катана', link: 'https://pvpfreak.t.me'},
  {name: 'Древний Рус', link: 'https://pixxxion1x.t.me'},
  {name: 'Лолик', link: 'https://loliambassador.t.me'},
  {name: 'Филосовский', link: 'https://unluckxyle.t.me'},
  {name: 'Тимокса', link: 'https://daxindex.t.me'}
];

/* ---- DOM элементы ---- */
const fameListEl = document.getElementById('fameList');
const openAdminBtn = document.getElementById('openAdmin');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const creatorBtn = document.getElementById('creatorBtn');
const canvas = document.getElementById('bg');

/* set creator link */
creatorBtn.href = creatorTelegram;

/* список хранится в localStorage чтобы добавления сохранялись */
const STORAGE_KEY = 'web_fame_list_v1';
let fameList = JSON.parse(localStorage.getItem(STORAGE_KEY)) || initialList.slice();
save();

/* отрисовка списка */
function renderList(){
  fameListEl.innerHTML = '';
  fameList.forEach((item, idx) => {
    const li = document.createElement('li');
    li.className = 'fame-item';
    const span = document.createElement('span');
    span.className = 'fame-name';
    span.textContent = `${idx+1}. ${item.name}`;
    const a = document.createElement('a');
    a.className = 'fame-link';
    a.href = item.link;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = 'Открыть';
    li.appendChild(span);
    li.appendChild(a);
    fameListEl.appendChild(li);
  });
}
renderList();

/* save */
function save(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(fameList));
}

/* Админ: шаг 1 — запрос пароля */
openAdminBtn.addEventListener('click', () => {
  showPasswordPrompt();
});

function showPasswordPrompt(){
  modal.classList.remove('hidden');
  modalContent.innerHTML = `
    <h3>Введите пароль</h3>
    <input id="pw" class="input" type="password" placeholder="Пароль" />
    <div class="row">
      <button id="pwCancel" class="btn cancel">Отмена</button>
      <button id="pwOk" class="btn ok">Далее</button>
    </div>
  `;
  document.getElementById('pwCancel').onclick = closeModal;
  document.getElementById('pwOk').onclick = checkPassword;
  document.getElementById('pw').addEventListener('keydown', (e)=>{ if(e.key==='Enter') checkPassword(); });
}

function checkPassword(){
  const val = document.getElementById('pw').value;
  if(val === adminPassword){
    showAddForm();
  } else {
    alert('Неверный пароль');
    closeModal();
  }
}

/* Админ: шаг 2 — форма добавления */
function showAddForm(){
  modalContent.innerHTML = `
    <h3>Добавить участника</h3>
    <input id="newName" class="input" type="text" placeholder="Имя участника" />
    <input id="newLink" class="input" type="text" placeholder="Ссылка на профиль (https://t.me/...)" />
    <div class="row">
      <button id="addCancel" class="btn cancel">Отмена</button>
      <button id="addOk" class="btn ok">Добавить</button>
    </div>
  `;
  document.getElementById('addCancel').onclick = closeModal;
  document.getElementById('addOk').onclick = addParticipant;
}

function addParticipant(){
  const name = document.getElementById('newName').value.trim();
  let link = document.getElementById('newLink').value.trim();
  if(!name || !link){ alert('Заполните оба поля'); return; }
  // простая нормализация ссылки
  if(!/^https?:\/\//i.test(link)) link = 'https://' + link;
  fameList.push({name, link});
  save();
  renderList();
  closeModal();
}

/* закрыть модал */
function closeModal(){
  modal.classList.add('hidden');
  modalContent.innerHTML = '';
}

/* ---- фон: плавающие красные точки ---- */
const ctx = canvas.getContext('2d');
let w = canvas.width = innerWidth;
let h = canvas.height = innerHeight;
window.addEventListener('resize', ()=>{ w=canvas.width=innerWidth; h=canvas.height=innerHeight; initDots(); });

let dots = [];
function initDots(){
  dots = [];
  const count = Math.max(30, Math.floor((w*h)/40000));
  for(let i=0;i<count;i++){
    dots.push({
      x: Math.random()*w,
      y: Math.random()*h,
      r: 1 + Math.random()*3,
      vx: (Math.random()-0.5)*0.3,
      vy: (Math.random()-0.5)*0.3,
      alpha: 0.4 + Math.random()*0.8
    });
  }
}
initDots();

function update(){
  ctx.clearRect(0,0,w,h);
  for(const d of dots){
    d.x += d.vx;
    d.y += d.vy;
    if(d.x<0) d.x = w;
    if(d.x>w) d.x = 0;
    if(d.y<0) d.y = h;
    if(d.y>h) d.y = 0;
    ctx.beginPath();
    ctx.fillStyle = `rgba(255,30,30,${d.alpha})`;
    ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
    ctx.fill();
  }
  requestAnimationFrame(update);
}
update();
