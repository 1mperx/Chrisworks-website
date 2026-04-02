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
            const isActive = item.classList.contains('active');
            
            // Close all others
            faqItems.forEach(other => other.classList.remove('active'));
            
            // Toggle current
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

});

