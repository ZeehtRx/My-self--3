// === Dark Mode Toggle ===
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const userPref = localStorage.getItem('theme');
const systemPref = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (userPref === 'dark' || (!userPref && systemPref)) {
  body.setAttribute('data-theme', 'dark');
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
  body.setAttribute('data-theme', 'light');
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

themeToggle.addEventListener('click', () => {
  const current = body.getAttribute('data-theme');
  if (current === 'light') {
    body.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    body.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
});

// === Scroll Animation ===
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.scroll-in').forEach(el => {
  observer.observe(el);
});

// === Modal Gambar Sertifikasi ===
function openModal(imgSrc) {
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-image");
  modal.style.display = "flex";
  modalImg.src = imgSrc;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("image-modal");
  modal.style.display = "none";
  document.body.style.overflow = "";
}

document.querySelector(".close-btn").addEventListener("click", closeModal);

document.getElementById("image-modal").addEventListener("click", function(e) {
  if (e.target === this) closeModal();
});

document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") closeModal();
});

// === Custom Cursor ===
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Efek hover saat cursor di atas tombol/link
const hoverTargets = document.querySelectorAll('a, button, .cert-item, .project-item');
hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Nonaktifkan custom cursor di perangkat sentuh
if ('ontouchstart' in window || navigator.maxTouchPoints) {
  cursor.style.display = 'none';
  const style = document.createElement('style');
  style.innerHTML = '* { cursor: auto !important; }';
  document.head.appendChild(style);
}

// === Animated Background Particles ===
(function() {
  const canvas = document.getElementById('bg-animation');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;

  // Atur ukuran canvas
  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  // Partikel
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 0.6 - 0.3;
      this.speedY = Math.random() * 0.6 - 0.3;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
      if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
    }

    draw() {
      ctx.fillStyle = 'var(--accent)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Buat partikel
  function init() {
    particles = [];
    const particleCount = Math.min(window.innerWidth * window.innerHeight / 5000, 80);
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  // Animasi
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Gunakan warna dari CSS variable
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    ctx.fillStyle = isDark ? 'rgba(74, 111, 165, 0.3)' : 'rgba(74, 111, 165, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    animationId = requestAnimationFrame(animate);
  }

  // Handle resize
  window.addEventListener('resize', () => {
    setCanvasSize();
    init();
  });

  // Mulai animasi
  setCanvasSize();
  init();
  animate();

  // Update saat ganti tema
  const originalThemeToggle = document.getElementById('theme-toggle');
  const observer = new MutationObserver(() => {
    // Warna partikel otomatis ikut CSS variable
  });
  observer.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });
})();

// === Animasi Pembuka Selamat Datang ===
(function() {
  const welcomeScreen = document.getElementById('welcome-screen');
  
  // Cek apakah sudah pernah muncul di sesi ini
  if (!sessionStorage.getItem('welcomeShown')) {
    // Tampilkan
    setTimeout(() => {
      welcomeScreen.classList.add('hidden');
      sessionStorage.setItem('welcomeShown', 'true');
    }, 2800); // Hilang setelah 2.8 detik

    // Klik untuk tutup lebih cepat
    welcomeScreen.addEventListener('click', () => {
      welcomeScreen.classList.add('hidden');
      sessionStorage.setItem('welcomeShown', 'true');
    });
  } else {
    // Langsung sembunyikan jika sudah pernah muncul
    welcomeScreen.style.display = 'none';
  }
})();