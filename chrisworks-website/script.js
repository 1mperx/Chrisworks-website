document.addEventListener('DOMContentLoaded', () => {

    /* --- Scroll Reveal Animations --- */
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

    /* --- Magnetic Buttons (Hover effect that tracks mouse) --- */
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            // Calculate distance from center (-1 to 1) 
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

    /* --- Interactive Background Shapes & Parallax --- */
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
        
        // Random start position within viewport bounds of hero
        const top = Math.random() * 80; // 0 to 80%
        const left = Math.random() * 90; // 0 to 90%
        shape.style.top = `${top}%`;
        shape.style.left = `${left}%`;
        
        // Parallax speed modifier
        const parallaxSpeed = Math.random() * 0.1 + 0.02;
        shape.setAttribute('data-speed', parallaxSpeed);

        shapeContainer.appendChild(shape);
        shapes.push(shape);
    }

    // Parallax effect on mouse move in hero area
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

    /* --- Cursor Trail --- */
    let dots = [];
    const maxDots = 20;

    document.addEventListener('mousemove', (e) => {
        const dot = document.createElement('div');
        dot.className = 'trail-dot';
        dot.style.left = `${e.clientX}px`;
        dot.style.top = `${e.clientY}px`;
        document.body.appendChild(dot);
        dots.push(dot);

        // Remove dots if too many
        if (dots.length > maxDots) {
            const oldDot = dots.shift();
            // oldDot.style.opacity = '0';
            setTimeout(() => oldDot.remove(), 100);
        }

        // Auto shrink and remove logic
        setTimeout(() => {
            dot.style.width = '2px';
            dot.style.height = '2px';
            dot.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            if (dot.parentNode) dot.remove();
        }, 500);
    });

    /* --- Number Counter Animation for Stats --- */
    // A simple logic to animate the numbers on the card stack when hovered
    const statCards = document.querySelectorAll('.visual-card');
    
    statCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const target = card.querySelector('.target');
            // Re-trigger animation with glow
            target.style.transform = 'scale(1.1)';
            target.style.textShadow = '0 0 20px rgba(163, 230, 53, 0.5)';
            setTimeout(() => { 
                target.style.transform = 'scale(1)'; 
                target.style.textShadow = 'none';
            }, 300);
        });
    });

});
