// ============ BACKGROUND MUSIC & AUDIO CONTROLS ============
const bgMusic = document.getElementById('bgMusic');
const audioToggle = document.getElementById('audioToggle');
const enterScreen = document.getElementById('enterScreen');
const nowPlayingBox = document.querySelector('.now-playing');

// 🔊 Set low volume (0.1 = 10% volume)
if (bgMusic) {
    bgMusic.volume = 0.1;
}

function startAudio() {
    if (bgMusic) {
        bgMusic.play().then(() => {
            updateAudioUI(true);
        }).catch(err => {
            console.log("Audio play blocked:", err);
        });
    }
}

function updateAudioUI(isPlaying) {
    if (!audioToggle) return;
    const icon = audioToggle.querySelector('i');
    if (isPlaying) {
        if (icon) icon.className = 'fas fa-volume-high';
        audioToggle.style.borderColor = 'var(--primary)';
        audioToggle.style.color = 'var(--primary)';
        if (nowPlayingBox) nowPlayingBox.classList.add('playing');
    } else {
        if (icon) icon.className = 'fas fa-volume-xmark';
        audioToggle.style.borderColor = 'var(--border)';
        audioToggle.style.color = 'var(--text-secondary)';
        if (nowPlayingBox) nowPlayingBox.classList.remove('playing');
    }
}

// 1. Click-to-Enter screen logic
if (enterScreen) {
    enterScreen.addEventListener('click', () => {
        enterScreen.classList.add('hidden');
        startAudio();
    });
}

// 2. Corner Audio Toggle Button logic (Play / Pause)
if (audioToggle) {
    audioToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!bgMusic) return;
        if (bgMusic.paused) {
            bgMusic.play();
            updateAudioUI(true);
        } else {
            bgMusic.pause();
            updateAudioUI(false);
        }
    });
}

// ============ COPY DISCORD FUNCTION ============
function copyDiscord() {
    const discordName = 'beamedbytokyo';

    navigator.clipboard.writeText(discordName).then(() => {
        // Show toast
        const toast = document.getElementById('copyToast');
        if (toast) {
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 3000);
        }

        // Update hero copy button
        const copyBtn = document.getElementById('copyDiscordBtn');
        const copyBtnText = document.getElementById('copyBtnText');
        if (copyBtn && copyBtnText) {
            copyBtn.classList.add('copied');
            copyBtnText.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => {
                copyBtn.classList.remove('copied');
                copyBtnText.innerHTML = 'Copy Discord';
            }, 3000);
        }

        // Update discord tag under avatar
        const discordTag = document.querySelector('.discord-tag');
        if (discordTag) {
            discordTag.classList.add('copied');
            const hint = discordTag.querySelector('.copy-hint');
            if (hint) hint.className = 'fas fa-check copy-hint';
            setTimeout(() => {
                discordTag.classList.remove('copied');
                if (hint) hint.className = 'fas fa-copy copy-hint';
            }, 3000);
        }

        // Update contact copy card
        const copyCard = document.querySelector('.copy-card');
        const copyCardDesc = document.getElementById('copyCardDesc');
        const copyCardIcon = document.getElementById('copyCardIcon');
        if (copyCard) {
            copyCard.classList.add('copied');
            if (copyCardDesc) copyCardDesc.textContent = '✓ Copied to clipboard!';
            if (copyCardIcon) copyCardIcon.className = 'fas fa-check contact-card-arrow';
            setTimeout(() => {
                copyCard.classList.remove('copied');
                if (copyCardDesc) copyCardDesc.textContent = 'Click to copy username';
                if (copyCardIcon) copyCardIcon.className = 'fas fa-copy contact-card-arrow';
            }, 3000);
        }

        // Update copy discord button in contact panel
        const copyDiscordBtn = document.querySelector('.copy-discord-btn');
        const copyAction = document.getElementById('copyAction');
        if (copyDiscordBtn) {
            copyDiscordBtn.classList.add('copied');
            if (copyAction) copyAction.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => {
                copyDiscordBtn.classList.remove('copied');
                if (copyAction) copyAction.innerHTML = '<i class="fas fa-copy"></i> Click to Copy';
            }, 3000);
        }

    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = discordName;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        const toast = document.getElementById('copyToast');
        if (toast) {
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 3000);
        }
    });
}

// ============ NAVBAR ============
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.querySelectorAll('.nav-link, .mobile-link');

window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    const sections = document.querySelectorAll('.section');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
            link.classList.add('active');
        }
    });
});

if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
}

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navToggle) navToggle.classList.remove('active');
        if (mobileMenu) mobileMenu.classList.remove('active');
    });
});

// ============ CURSOR GLOW ============
const cursorGlow = document.getElementById('cursorGlow');

document.addEventListener('mousemove', (e) => {
    if (cursorGlow) {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    }
});

// ============ PARTICLES ============
const canvas = document.getElementById('particles');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let mouse = { x: null, y: null };

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    document.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.3 + 0.1;
            this.color = Math.random() > 0.6 ? '255, 70, 85' : '23, 232, 178';
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (mouse.x !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 120) {
                    const force = (120 - distance) / 120;
                    this.x -= (dx / distance) * force * 1.2;
                    this.y -= (dy / distance) * force * 1.2;
                }
            }

            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        const num = Math.min((canvas.width * canvas.height) / 15000, 100);
        for (let i = 0; i < num; i++) {
            particlesArray.push(new Particle());
        }
    }

    function connectParticles() {
        for (let i = 0; i < particlesArray.length; i++) {
            for (let j = i + 1; j < particlesArray.length; j++) {
                const dx = particlesArray[i].x - particlesArray[j].x;
                const dy = particlesArray[i].y - particlesArray[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    const opacity = (1 - dist / 100) * 0.1;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 70, 85, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(p => { p.update(); p.draw(); });
        connectParticles();
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();
    window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });
}

// ============ COUNTER ANIMATION ============
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 2000;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);

            counter.textContent = current + (progress >= 1 ? suffix : '');

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }

        requestAnimationFrame(updateCounter);
    });
}

const statsSection = document.querySelector('.stats-bar');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
}

// ============ SCROLL REVEAL ============
function revealOnScroll() {
    const elements = document.querySelectorAll(
        '.feature-card, .service-card, .pricing-card, .order-step, .contact-card, .copy-card, .trust-banner, .now-playing, .copy-discord-section'
    );

    elements.forEach((el, i) => {
        if (!el.classList.contains('fade-up')) {
            el.classList.add('fade-up');
        }

        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight - 60) {
            setTimeout(() => {
                el.classList.add('visible');
            }, i * 50);
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ============ TILT EFFECT ============
document.querySelectorAll('.service-card, .pricing-card, .contact-card, .copy-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;

        card.style.transform = `translateY(-6px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// ============ RIPPLE EFFECT ============
document.querySelectorAll('.btn, .contact-card, .copy-card, .discord-tag, .copy-discord-btn').forEach(el => {
    el.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();

        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 70, 85, 0.3);
            width: 100px; height: 100px;
            left: ${e.clientX - rect.left - 50}px;
            top: ${e.clientY - rect.top - 50}px;
            animation: rippleEffect 0.6s ease-out forwards;
            pointer-events: none;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleEffect {
        from { transform: scale(0); opacity: 1; }
        to { transform: scale(4); opacity: 0; }
    }
`;
document.head.appendChild(rippleStyle);

// ============ SMOOTH SCROLL ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============ CONSOLE BRANDING ============
console.log(
    '%c⚡ Tokyo\'s Services',
    'font-size: 24px; color: #ff4655; font-weight: bold;'
);
console.log(
    '%cPremium Valorant Boosting & Deranking',
    'font-size: 14px; color: #17e8b2;'
);
console.log(
    '%cDiscord: beamedbytokyo',
    'font-size: 12px; color: #5865F2;'
);