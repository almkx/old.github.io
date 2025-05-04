const PARTICLE_COUNT = 350;
const PARTICLE_LIFETIME = 2500;
const PARTICLE_LIFETIME_HALF = PARTICLE_LIFETIME / 2;

const MIN_PARTICLE_SIZE = 3;
const MAX_PARTICLE_SIZE = 5;

const MIN_PARTICLE_SPEED = 2;
const MAX_PARTICLE_SPEED = 5;

const RAINBOW_COLORS = [
  "#CC99C9",
  "#9EC1CF",
  "#9EE09E",
  "#FDFD97",
  "#FEB144",
  "#FF6663"
];

const PARTICLES = [];

let xFactor = 0;
let yFactor = 0;

let relativeX = 0;
let relativeY = 0.5;

const particleContainer = document.querySelector('.particles');

function spawnParticle() {
  const particle = document.createElement('div');
  particle.className = 'particle';
  
  const color = RAINBOW_COLORS[Math.floor(Math.random() * RAINBOW_COLORS.length)];
  particle.style.backgroundColor = color;
  particle.style.transform = 'scale(0, 0)';
  
  const right = Math.random() * 150 - 25;
  const top = Math.random() * 150 - 25;
  const speed = Math.random() * (MAX_PARTICLE_SPEED - MIN_PARTICLE_SPEED) + MIN_PARTICLE_SPEED;
  const size = Math.random() * (MAX_PARTICLE_SIZE - MIN_PARTICLE_SIZE) + MIN_PARTICLE_SIZE;
  
  particle.style.right = right + '%';
  particle.style.top = top + '%';
  particle.style.width = size + 'px';
  particle.style.height = size + 'px';
  
  particleContainer.appendChild(particle);
  
  const delay = Math.random() * 5000 - 2500;
  
  PARTICLES.push({
    element: particle,
    speed: speed,
    right: right,
    top: top,
    lifetime: -delay
  });
}

let lastTimestamp = Date.now();
function updateParticles() {
  const targetXFactor = (1 - relativeX - 0.5) * 2;
  const targetYFactor = (relativeY - 0.5) * 2;

  xFactor = (targetXFactor * 0.2 + xFactor * 0.8);
  yFactor = (targetYFactor * 0.2 + yFactor * 0.8);

  const now = Date.now();
  const delta = now - lastTimestamp;
  lastTimestamp = now;
  
  for (let i = 0; i < PARTICLES.length; i++) {
    var particle = PARTICLES[i];
    const element = particle.element;
    
    particle.lifetime += delta;
    
    const lifetime = particle.lifetime;
    const scale = Math.max(0, Math.min(1, lifetime < PARTICLE_LIFETIME_HALF ? (lifetime / PARTICLE_LIFETIME_HALF) : (1 - (lifetime - PARTICLE_LIFETIME_HALF) / PARTICLE_LIFETIME_HALF)));
    
    particle.right += particle.speed * xFactor * delta / 1000;
    particle.top += particle.speed * yFactor * delta / 1000;
    
    let right = particle.right;
    let top = particle.top;
    
    element.style.transform = 'scale(' + scale + ', ' + scale + ')';
    element.style.right = right + '%';
    element.style.top = top + '%';
    
    if (lifetime >= PARTICLE_LIFETIME) {
      right = Math.random() * 150 - 25;
      top = Math.random() * 150 - 25;
      const speed = Math.random() * (MAX_PARTICLE_SPEED - MIN_PARTICLE_SPEED) + MIN_PARTICLE_SPEED;
      const size = Math.random() * (MAX_PARTICLE_SIZE - MIN_PARTICLE_SIZE) + MIN_PARTICLE_SIZE;

      const color = RAINBOW_COLORS[Math.floor(Math.random() * RAINBOW_COLORS.length)];
      element.style.backgroundColor = color;
  
      element.style.right = right + '%';
      element.style.top = top + '%';
      element.style.width = size + 'px';
      element.style.height = size + 'px';
      
      particle.right = right;
      particle.top = top;
      particle.speed = speed;
      particle.lifetime = Math.random() * -2500;
    }
  }
  
  window.requestAnimationFrame(updateParticles);
}

for (let i = 0; i < PARTICLE_COUNT; i++) {
  spawnParticle();
}

function updateCursor(e) {
  const width = document.body.clientWidth;
  const height = document.body.clientHeight;
  
  const x = e.pageX - e.currentTarget.offsetLeft;
  const y = e.pageY - e.currentTarget.offsetTop;
  
  relativeX = x / width;
  relativeY = y / height;
}

function getRandomColor() {
  return RAINBOW_COLORS[Math.floor(Math.random() * RAINBOW_COLORS.length)];
}

function handleEmailButton(e) {
  e.preventDefault();
  window.location.href = 'mailto:' + atob('Y29udGFjdEBiZW5lZGlrdC5kZXY=');
}

document.querySelector('.mail-button').addEventListener('click', handleEmailButton);

[...document.querySelectorAll('.random-text-color'), ...document.querySelectorAll('a')].forEach(element => {
  element.style.color = getRandomColor();
});

[...document.querySelectorAll('.current-year')].forEach(element => element.innerText = (new Date()).getFullYear())

document.body.onmouseenter = updateCursor;
document.body.onmouseleave = updateCursor;
document.body.onmousemove = updateCursor;

window.requestAnimationFrame(updateParticles);
