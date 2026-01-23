
// --- Configuration: list your projects here ---
const PROJECTS = [
  { id: 'bouncing-balls', title: 'Bouncing Balls', path: 'projects/bouncing-balls/index.html', 
    description: 'A simple physics simulation of bouncing balls.' },
  { id: 'psychodelic-tunnel', title: 'Psychodelic Tunnel', path: 'projects/psychodelic-tunnel/index.html', 
    description: 'Drag your mouse around the screen to trigger a colorful tunnel [careful with the strobing effect!]' },
  { id: 'grid-trip', title: 'Grid Trip', path: 'projects/grid-trip/index.html', 
    description: 'Drag this infinite grid of squares around.\nDouble-click to reset the red squares.' },
  { id: 'light-bars', title: 'Light Bars', path: 'projects/light-bars/index.html',
    description: 'I like to imagine this is what the slit experiment feels like for a photon. Click the button to change modes.'
  },
];

const q = (sel, el=document) => el.querySelector(sel);
const qa = (sel, el=document) => Array.from(el.querySelectorAll(sel));

function getInitialProjectId() {
  const url = new URL(window.location.href);
  const id = url.searchParams.get('project') || window.location.hash.replace('#','');
  if (PROJECTS.some(p => p.id === id)) return id;
  return PROJECTS[0].id;
}

function setProjectById(id) {
  const proj = PROJECTS.find(p => p.id === id) || PROJECTS[0];
  const frame = q('#sketchFrame');
  frame.src = proj.path;
  qa('.project-button').forEach(btn => btn.setAttribute('aria-current', String(btn.dataset.id === proj.id)));
  const descEl = q('#projectDescription');
  descEl.textContent = proj.description;
  descEl.classList.remove('fade-in-left');
  void descEl.offsetWidth; // Trigger reflow to restart animation
  descEl.classList.add('fade-in-left');
  const url = new URL(window.location.href);
  url.searchParams.set('project', proj.id);
  history.replaceState({}, '', url);
}

function renderStrip() {
  const list = q('#projectList');
  list.innerHTML = '';
  PROJECTS.forEach(p => {
    const li = document.createElement('li');
    li.className = 'project-item';
    const btn = document.createElement('button');
    btn.className = 'project-button';
    btn.type = 'button';
    btn.textContent = p.title;
    btn.dataset.id = p.id;
    btn.addEventListener('click', () => setProjectById(p.id));
    li.appendChild(btn);
    list.appendChild(li);
  });
}

function scrollStrip(delta) {
  const list = q('#projectList');
  list.scrollBy({ left: delta, behavior: 'smooth' });
}

function focusSelectedInStrip() {
  const current = q('.project-button[aria-current="true"]');
  if (current) current.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' });
}

function init() {
  renderStrip();
  q('#scrollLeft').addEventListener('click', () => scrollStrip(-300));
  q('#scrollRight').addEventListener('click', () => scrollStrip(300));
  window.addEventListener('keydown', (e) => {
    if (['ArrowLeft','ArrowRight'].includes(e.key)) {
      e.preventDefault();
      const idx = PROJECTS.findIndex(p => q('.project-button[aria-current="true"]').dataset.id === p.id);
      let nextIdx = idx;
      if (e.key === 'ArrowLeft') nextIdx = Math.max(0, idx - 1);
      if (e.key === 'ArrowRight') nextIdx = Math.min(PROJECTS.length - 1, idx + 1);
      setProjectById(PROJECTS[nextIdx].id);
      focusSelectedInStrip();
    }
  });
  const initial = getInitialProjectId();
  setProjectById(initial);
  focusSelectedInStrip();
}

document.addEventListener('DOMContentLoaded', init);