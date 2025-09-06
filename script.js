// Vanilla JS interactivity (typewriter, playful buttons, music + confetti)
const recipient = document.getElementById('recipient');
const sender = document.getElementById('sender');
const typewriterEl = document.getElementById('typewriter');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const musicBtn = document.getElementById('musicBtn');
const bgm = document.getElementById('bgm');

// Customize these:
const MESSAGE = [
  "Let's see.. .",
  "You're never around me",
  "Your presence makes me happy",
  "Will you be my friend ?"
].join('\n\n');

// Basic typewriter effect
async function typewriter(text, el, delay=26){
  el.textContent = '';
  for (const ch of text){
    el.textContent += ch;
    await new Promise(r=>setTimeout(r, ch==='\n' ? delay*4 : delay));
  }
}

typewriter(MESSAGE, typewriterEl);

// Playful buttons
let noClicks = 0;
noBtn.addEventListener('click', () => {
  noClicks++;
  const scale = Math.min(1 + noClicks*0.18, 2.2);
  yesBtn.style.transform = `scale(${scale})`;
  noBtn.textContent = noClicks < 3 ? 'Please?' : (noClicks < 6 ? 'Really? 🥺' : 'Ok fine 😭');
  if (noClicks > 6) {
    confetti();
  }
});

yesBtn.addEventListener('click', () => {
  confetti(240);
  yesBtn.disabled = true;
  noBtn.disabled = true;
  yesBtn.textContent = 'Yaaay! 🎉';
  noBtn.style.opacity = .5;
});

// Audio toggle
musicBtn.addEventListener('click', async () => {
  try {
    if (bgm.paused) { await bgm.play(); musicBtn.textContent = '♫ On'; }
    else { bgm.pause(); musicBtn.textContent = '♫ Off'; }
  } catch(e){ console.log(e); }
});

// Tiny confetti (no dependency)
function confetti(count=120){
  const duration = 1200;
  const end = performance.now() + duration;
  const colors = ['#ff4d8d','#ffa6c9','#fff7fb','#c8e6ff','#ffd1dc'];
  function frame(){
    const timeLeft = end - performance.now();
    const n = Math.round((count/ (duration/16)) * Math.random()*1.4);
    for(let i=0;i<n;i++){
      const s = 4 + Math.random()*6;
      const p = document.createElement('div');
      p.className = 'confetti';
      p.style.left = (Math.random()*100) + 'vw';
      p.style.top = '-10px';
      p.style.width = s + 'px';
      p.style.height = s + 'px';
      p.style.background = colors[Math.floor(Math.random()*colors.length)];
      document.body.appendChild(p);
      const dx = (Math.random()*2 - 1) * 60;
      p.animate([
        { transform: 'translate(0,0) rotate(0deg)' },
        { transform: `translate(${dx}px, 100vh) rotate(${Math.random()*720-360}deg)` }
      ], { duration: 1200 + Math.random()*800, easing: 'cubic-bezier(.2,.7,.2,1)' }).onfinish = () => p.remove();
    }
    if (timeLeft > 0) requestAnimationFrame(frame);
  }
  frame();
}
