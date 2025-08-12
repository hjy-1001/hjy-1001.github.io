(function(){
  const canvas = document.getElementById('starfield');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w,h,stars=[]; const STAR_COUNT = 160;

  function resize(){ w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
  function rand(min,max){ return Math.random()*(max-min)+min; }
  function createStars(){
    stars = Array.from({length: STAR_COUNT}, () => ({
      x: rand(0,w), y: rand(0,h), z: rand(0.2,1.2), r: rand(0.3,1.6), vx: rand(-0.05,0.05), vy: rand(-0.05,0.05)
    }));
  }
  function tick(){
    ctx.clearRect(0,0,w,h);
    // subtle gradient
    const g = ctx.createRadialGradient(w*0.8, h*0.2, 0, w*0.8, h*0.2, Math.max(w,h));
    g.addColorStop(0, 'rgba(100,210,255,0.05)'); g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g; ctx.fillRect(0,0,w,h);

    for(const s of stars){
      s.x += s.vx * s.z; s.y += s.vy * s.z;
      if(s.x<0) s.x=w; if(s.x>w) s.x=0; if(s.y<0) s.y=h; if(s.y>h) s.y=0;
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r*s.z, 0, Math.PI*2);
      ctx.fillStyle = Math.random()<0.02 ? 'rgba(123,92,255,0.9)' : 'rgba(100,210,255,0.9)';
      ctx.shadowBlur = 8; ctx.shadowColor = '#64d2ff'; ctx.fill();
    }
    requestAnimationFrame(tick);
  }
  window.addEventListener('resize', () => { resize(); createStars(); });
  resize(); createStars(); tick();
})();
