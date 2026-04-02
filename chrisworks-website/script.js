document.addEventListener('DOMContentLoaded', () => {

    // ===== Mobile Hamburger Menu =====
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-cta');

    if (hamburgerBtn && mobileNav) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        });

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
                hamburgerBtn.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ===== Hero Text Rotation =====
    const changingTextElement = document.getElementById('hero-changing-text');
    if (changingTextElement) {
        // Words to cycle through
        const words = ['SCALE', 'DEVELOP', 'GROW', 'OPTIMIZE'];
        let wordIndex = 0;

        setInterval(() => {
            // Fade out and slide up slightly
            changingTextElement.style.transition = 'opacity 0.4s ease, transform 0.4s ease, color 0.4s ease';
            changingTextElement.style.opacity = '0';
            changingTextElement.style.transform = 'translateY(-15px)';

            setTimeout(() => {
                // Change word
                wordIndex = (wordIndex + 1) % words.length;
                changingTextElement.textContent = words[wordIndex];
                
                // Reset position to bottom for slide up
                changingTextElement.style.transition = 'none';
                changingTextElement.style.transform = 'translateY(15px)';
                
                // Force reflow
                void changingTextElement.offsetWidth;
                
                // Fade in and slide to original position
                changingTextElement.style.transition = 'opacity 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), color 0.4s ease';
                changingTextElement.style.opacity = '1';
                changingTextElement.style.transform = 'translateY(0)';
            }, 400); // Must match CSS fade out duration
        }, 3000); // Change roughly every 3 seconds
    }

    const reveals = document.querySelectorAll('.reveal');

    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 100; // Trigger distance from bottom

        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Check on load

    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            // distance from center
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const strength = 15; // Max translation in px
            const moveX = ((x - centerX) / centerX) * strength;
            const moveY = ((y - centerY) / centerY) * strength;
            
            btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            // Reset position
            btn.style.transform = `translate(0px, 0px)`;
        });
    });

    const shapeContainer = document.getElementById('shapes-container');
    const shapeTypes = ['shape-star', 'shape-circle', 'shape-square'];
    const shapes = [];

    // Generate shapes
    for(let i = 0; i < 15; i++) {
        const shape = document.createElement('div');
        const randomType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        shape.className = `shape ${randomType}`;
        
        // Random size between 30px and 80px
        const size = Math.random() * 50 + 30;
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        
        const top = Math.random() * 80;
        const left = Math.random() * 90; // 0 to 90%
        shape.style.top = `${top}%`;
        shape.style.left = `${left}%`;
        
        // Parallax speed modifier
        const parallaxSpeed = Math.random() * 0.1 + 0.02;
        shape.setAttribute('data-speed', parallaxSpeed);

        shapeContainer.appendChild(shape);
        shapes.push(shape);
    }

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        shapes.forEach(shape => {
            const speed = parseFloat(shape.getAttribute('data-speed'));
            const moveX = (x - centerX) * speed;
            const moveY = (y - centerY) * speed;
            
            // Add a slight rotation based on movement
            const rot = (moveX + moveY) * 0.5;
            
            shape.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rot}deg)`;
        });
    });



    const statCards = document.querySelectorAll('.visual-card');
    
    statCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const target = card.querySelector('.target');
            target.style.transform = 'scale(1.1)';
            target.style.textShadow = '0 0 20px rgba(163, 230, 53, 0.5)';
            setTimeout(() => { 
                target.style.transform = 'scale(1)'; 
                target.style.textShadow = 'none';
            }, 300);
        });
    });

    // ===== FAQ Accordion =====
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('faq-open');
            
            // Close all others
            faqItems.forEach(other => other.classList.remove('faq-open'));
            
            // Toggle current
            if (!isActive) {
                item.classList.add('faq-open');
            }
        });
    });

    // ==========================================
    // 🤫 EASTER EGGS / TROLLS
    // ==========================================

    // 1. Console Troll
    console.log("%c🛑 WAIT A MINUTE! 🛑", "color: red; font-size: 40px; font-weight: bold; text-shadow: 2px 2px 0 #000;");
    console.log("%cWe both know you're just inspecting the element to see how we made this site. If you're a dev, stop snooping and just join us 😂: https://discord.gg/BT7VHqh67z", "color: #FF9900; font-size: 14px; font-weight: bold; padding: 10px; border: 1px solid #FF9900; background: #111; border-radius: 5px; line-height: 1.5;");

    // 2. The Classic "OOF" Logo Clicker
    let logoClicks = 0;
    let logoTimeout = null;
    const logo = document.querySelector('.logo');
    if(logo) {
        logo.addEventListener('click', (e) => {
            logoClicks++;
            if(logoClicks === 7) {
                e.preventDefault(); // Prevent navigating if it's a link
                const oofAudio = new Audio('https://www.myinstants.com/media/sounds/roblox-death-sound_1.mp3');
                oofAudio.volume = 0.5;
                oofAudio.play().catch(e => console.log('Oof sound blocked by browser!'));
                
                logo.style.transition = "transform 0.5s ease";
                logo.style.transform = "rotate(180deg) scale(0.5)";
                setTimeout(() => { logo.style.transform = "none"; }, 1000);
                logoClicks = 0;
            }
            
            // Revert clicks if they stop clicking
            clearTimeout(logoTimeout);
            logoTimeout = setTimeout(() => { logoClicks = 0; }, 2000);
        });
    }

    // 3. Konami Code (Up Up Down Down Left Right Left Right B A)
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex] || e.key.toLowerCase() === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Trigger Barrel Roll
                document.body.style.transition = "transform 2s ease-in-out";
                document.body.style.transform = "rotate(360deg)";
                setTimeout(() => {
                    document.body.style.transition = "none";
                    document.body.style.transform = "none";
                    alert("🎮 CHEAT CODE ACTIVATED: Unlimited Robux granted... (just kidding)");
                }, 2000);
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0; // Reset if wrong key
        }
    });

});

