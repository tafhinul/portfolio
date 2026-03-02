// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href').charAt(0) !== '#') return;

        e.preventDefault();
        
        // Play click sound
        const audio = document.getElementById('click-sound');
        if (audio) {
            audio.currentTime = 0;
            audio.play();
        }
        
        // Close mobile menu if open
        navLinks.classList.remove('active');

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Typing Animation for Hero Section
const heroText = document.querySelector('.hero h1');

if (heroText) {
    const text1 = "Hi, I'm ";
    const text2 = "Tafhinul Hossain Shahim";
    
    heroText.innerHTML = ""; // Clear content initially
    heroText.classList.add('typing-cursor');
    
    let i = 0;
    
    function type() {
        if (i < text1.length) {
            heroText.innerHTML += text1.charAt(i);
            i++;
            setTimeout(type, 100);
        } else if (i < text1.length + text2.length) {
            let span = heroText.querySelector('.highlight');
            if (!span) {
                span = document.createElement('span');
                span.classList.add('highlight');
                heroText.appendChild(span);
            }
            span.textContent += text2.charAt(i - text1.length);
            i++;
            setTimeout(type, 100);
        }
    }
    
    setTimeout(type, 500); // Start delay
}

// Scroll Animation for Project Cards
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); // Run animation only once
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.card').forEach(card => {
    observer.observe(card);
});

// About Description Typing Animation
const aboutDesc = document.getElementById('about-description');
if (aboutDesc) {
    const fullText = aboutDesc.textContent.trim().replace(/\s+/g, ' ');
    aboutDesc.textContent = '';

    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let i = 0;
                function typeWriter() {
                    if (i < fullText.length) {
                        aboutDesc.textContent += fullText.charAt(i);
                        i++;
                        setTimeout(typeWriter, 20);
                    }
                }
                typeWriter();
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    aboutObserver.observe(aboutDesc);
}

// Dynamic Year
document.getElementById('year').textContent = new Date().getFullYear();

// Project Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-grid .card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Modal Logic
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalLink = document.getElementById('modal-link');
const closeModal = document.querySelector('.close-modal');

document.querySelectorAll('.project-details-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const card = e.currentTarget.closest('.card');
        const title = card.querySelector('h3').innerText;
        const desc = card.getAttribute('data-details');
        const link = card.getAttribute('data-link');
        
        modalTitle.innerText = title;
        modalDesc.innerText = desc;
        if (modalLink) {
            modalLink.href = link || '#';
            if (!link || link === '#') {
                modalLink.style.display = 'none';
            } else {
                modalLink.style.display = 'inline-block';
            }
        }
        modal.classList.add('active');
    });
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// Particle Animation (Slow Motion)
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray;
    let explosionParticles = [];
    let hue = 0;

    let mouse = {
        x: null,
        y: null,
        radius: 150
    };

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    window.addEventListener('mouseout', () => {
        mouse.x = undefined;
        mouse.y = undefined;
    });

    window.addEventListener('click', (e) => {
        for (let i = 0; i < 20; i++) {
            explosionParticles.push(new ExplosionParticle(e.clientX, e.clientY));
        }
    });

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25; // Slow motion
            this.speedY = Math.random() * 0.5 - 0.25; // Slow motion
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
            if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
        }
    }

    class ExplosionParticle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 5 + 2;
            this.speedX = Math.random() * 6 - 3;
            this.speedY = Math.random() * 6 - 3;
            this.life = 100;
        }
        update() {
            // this.speedY += 0.5;
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= 2;
        }
        draw() {
            ctx.fillStyle = `hsla(${hue}, 100%, 50%, ${this.life / 100})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        particlesArray = [];
        const numberOfParticles = (canvas.height * canvas.width) / 15000;
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hue += 0.5;
        
        let scrollY = window.scrollY;
        let parallaxShift = (scrollY * 0.2) % canvas.height;

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            
            // Calculate visual position with parallax
            let visualY = particlesArray[i].y - parallaxShift;
            if (visualY < 0) visualY += canvas.height;

            // Draw Particle
            ctx.fillStyle = `hsla(${hue}, 100%, 50%, 0.5)`;
            ctx.beginPath();
            ctx.arc(particlesArray[i].x, visualY, particlesArray[i].size, 0, Math.PI * 2);
            ctx.fill();
            
            // Connect particles
            for (let j = i; j < particlesArray.length; j++) {
                let visualY2 = particlesArray[j].y - parallaxShift;
                if (visualY2 < 0) visualY2 += canvas.height;

                const dx = particlesArray[i].x - particlesArray[j].x;
                const dy = visualY - visualY2;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `hsla(${hue}, 100%, 50%, ${0.2 - distance / 500})`; // Subtle lines
                    ctx.lineWidth = 1;
                    ctx.moveTo(particlesArray[i].x, visualY);
                    ctx.lineTo(particlesArray[j].x, visualY2);
                    ctx.stroke();
                }
            }

            // Connect to Mouse
            let dx = particlesArray[i].x - mouse.x;
            let dy = visualY - mouse.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius) {
                ctx.beginPath();
                ctx.strokeStyle = `hsla(${hue}, 100%, 50%, ${0.2 - distance / mouse.radius})`;
                ctx.lineWidth = 1;
                ctx.moveTo(particlesArray[i].x, visualY);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        }

        // Handle Explosion Particles
        for (let i = 0; i < explosionParticles.length; i++) {
            explosionParticles[i].update();
            explosionParticles[i].draw();
            if (explosionParticles[i].life <= 0) {
                explosionParticles.splice(i, 1);
                i--;
            }
        }

        requestAnimationFrame(animate);
    }

    init();
    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });
}

// Preloader Logic
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});


// Terminal Typing Animation
document.addEventListener('DOMContentLoaded', () => {
    const cmd1Element = document.getElementById('cmd-1');
    const cmd2Element = document.getElementById('cmd-2');
    const output1 = document.getElementById('output-1');
    const output2 = document.getElementById('output-2');
    
    const line2 = document.getElementById('line-2');
    const lineCursor = document.getElementById('line-cursor');
    const cursor1 = document.getElementById('cursor-1');
    const cursor2 = document.getElementById('cursor-2');

    // Data to type
    const cmd1Text = "whoami";
    const output1Text = "Tafhinul Hossain Shahim";
    
    const cmd2Text = "cat profile.txt";
    const output2Lines = [
        "> Building scalable web apps",
        "> Exploring Computer Vision",
        "> Mastering Oracle APEX"
    ];

    const typeSpeed = 80;   // Speed for commands
    const fastSpeed = 30;   // Speed for output results (hacker style is fast)
    const delay = 400;      // Pause between steps

    // Helper: Type text into an element
    function type(element, text, speed, callback) {
        let i = 0;
        element.innerHTML = "";
        function typing() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            } else if (callback) {
                callback();
            }
        }
        typing();
    }

    // Helper: Type array of lines with <br>
    function typeLines(element, lines, speed, callback) {
        let lineIdx = 0;
        element.innerHTML = "";
        
        function processLine() {
            if (lineIdx < lines.length) {
                let currentLine = lines[lineIdx];
                let charIdx = 0;
                
                function typeChar() {
                    if (charIdx < currentLine.length) {
                        element.innerHTML += currentLine.charAt(charIdx);
                        charIdx++;
                        setTimeout(typeChar, speed);
                    } else {
                        element.innerHTML += "<br>";
                        lineIdx++;
                        setTimeout(processLine, speed * 3); // Pause slightly between lines
                    }
                }
                typeChar();
            } else if (callback) {
                callback();
            }
        }
        processLine();
    }
    
    // Start Animation Sequence
    setTimeout(() => {
        if(cursor1) cursor1.style.display = 'inline-block';
        
        // 1. Type 'whoami'
        type(cmd1Element, cmd1Text, typeSpeed, () => {
            if(cursor1) cursor1.style.display = 'none';
            if(output1) output1.style.display = 'block';
            
            // 2. Type Name Output
            type(output1, output1Text, fastSpeed, () => {
                if(line2) line2.style.display = 'block';
                if(cursor2) cursor2.style.display = 'inline-block';
                
                setTimeout(() => {
                    // 3. Type 'cat profile.txt'
                    type(cmd2Element, cmd2Text, typeSpeed, () => {
                        if(cursor2) cursor2.style.display = 'none';
                        if(output2) output2.style.display = 'block';
                        
                        // 4. Type Skills List
                        typeLines(output2, output2Lines, fastSpeed, () => {
                            if(lineCursor) lineCursor.style.display = 'block';
                        });
                    });
                }, delay);
            });
        });
    }, delay);
});

// Draggable Terminal Window
const terminal = document.querySelector('.terminal-window');
const terminalHeader = document.querySelector('.terminal-header');

if (terminal && terminalHeader) {
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    terminalHeader.addEventListener('mousedown', dragStart);
    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('mousemove', drag);

    function dragStart(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;

        if (e.target === terminalHeader || terminalHeader.contains(e.target)) {
            isDragging = true;
            terminalHeader.style.cursor = 'grabbing';
        }
    }

    function dragEnd() {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
        terminalHeader.style.cursor = 'grab';
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;

            xOffset = currentX;
            yOffset = currentY;

            terminal.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        }
    }
}

// Timeline Animation
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('slide-in');
            timelineObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.timeline-item').forEach(item => {
    timelineObserver.observe(item);
});

// Contact Form Handling (EmailJS)
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    // Initialize EmailJS
    // TODO: Replace 'YOUR_PUBLIC_KEY' with your actual Public Key from EmailJS
    emailjs.init("XWQ1OGJqEcp764bP8");

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const btn = this.querySelector('button[type="submit"]');
        const originalText = btn.innerText;
        
        btn.innerText = 'Sending...';
        btn.disabled = true;

        // TODO: Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual IDs
        emailjs.sendForm('service_2so3ru6', 'template_9ddpg9w', this)
            .then(() => {
                btn.innerText = 'Message Sent!';
                this.reset();
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                }, 3000);
            }, (error) => {
                console.error('FAILED...', error);
                btn.innerText = 'Failed to Send';
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                }, 3000);
            });
    });
}

// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

if (themeToggle && themeIcon) {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'light') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    });
}

// 3D Animation Doll (Three.js)
const hero3DContainer = document.getElementById('hero-3d-container');

if (hero3DContainer && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const width = hero3DContainer.clientWidth || 300;
    const height = hero3DContainer.clientHeight || 500;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(width, height);
    hero3DContainer.innerHTML = '';
    hero3DContainer.appendChild(renderer.domElement);

    // Create Robot Group
    const robot = new THREE.Group();
    robot.scale.set(1.2, 1.2, 1.2);

    // Materials
    const yellowMat = new THREE.MeshStandardMaterial({ color: 0xEDAA25, roughness: 0.6, metalness: 0.4 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x2A2A2A, roughness: 0.8, metalness: 0.3 });
    const metalMat = new THREE.MeshStandardMaterial({ color: 0xA0A0A0, roughness: 0.4, metalness: 0.6 });
    const eyeHousingMat = new THREE.MeshStandardMaterial({ color: 0xDDDDDD, roughness: 0.5, metalness: 0.5 });
    const lensMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.1, metalness: 0.9 });
    const glowMat = new THREE.MeshBasicMaterial({ color: 0x4444ff });

    // Body
    const bodyGeo = new THREE.BoxGeometry(1.1, 1.0, 1.0);
    const body = new THREE.Mesh(bodyGeo, yellowMat);
    robot.add(body);

    // Front Plate
    const plateGeo = new THREE.BoxGeometry(0.9, 0.8, 0.05);
    const plate = new THREE.Mesh(plateGeo, metalMat);
    plate.position.set(0, 0, 0.52);
    body.add(plate);

    // Tracks (Triangular Prism shape)
    const trackShape = new THREE.Shape();
    trackShape.moveTo(0, 0);
    trackShape.lineTo(1.2, 0);
    trackShape.lineTo(0.9, 0.7);
    trackShape.lineTo(0.3, 0.7);
    trackShape.lineTo(0, 0);

    const trackExtrudeSettings = { steps: 1, depth: 0.25, bevelEnabled: false };
    const trackGeo = new THREE.ExtrudeGeometry(trackShape, trackExtrudeSettings);
    trackGeo.center();

    const leftTrack = new THREE.Mesh(trackGeo, darkMat);
    leftTrack.position.set(-0.75, -0.4, 0);
    robot.add(leftTrack);
    
    const rightTrack = new THREE.Mesh(trackGeo, darkMat);
    rightTrack.position.set(0.75, -0.4, 0);
    robot.add(rightTrack);

    // Neck
    const neckGroup = new THREE.Group();
    neckGroup.position.y = 0.5;
    robot.add(neckGroup);

    const neckPost = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.4), yellowMat);
    neckPost.position.y = 0.2;
    neckGroup.add(neckPost);

    // Head
    const headGroup = new THREE.Group();
    headGroup.position.y = 0.4;
    neckGroup.add(headGroup);

    // Eyes
    const eyeGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.6, 32);
    eyeGeo.rotateZ(Math.PI / 2);

    const leftEyeMesh = new THREE.Mesh(eyeGeo, eyeHousingMat);
    leftEyeMesh.position.set(-0.28, 0, 0);
    leftEyeMesh.rotation.z = -0.15;
    headGroup.add(leftEyeMesh);

    const rightEyeMesh = new THREE.Mesh(eyeGeo, eyeHousingMat);
    rightEyeMesh.position.set(0.28, 0, 0);
    rightEyeMesh.rotation.z = 0.15;
    headGroup.add(rightEyeMesh);

    // Lenses
    const pupilGeo = new THREE.CircleGeometry(0.22, 32);
    const leftLens = new THREE.Mesh(pupilGeo, lensMat);
    leftLens.position.set(0, 0, 0.26);
    leftLens.rotation.y = 0;
    leftEyeMesh.add(leftLens);

    const rightLens = new THREE.Mesh(pupilGeo, lensMat);
    rightLens.position.set(0, 0, 0.26);
    rightLens.rotation.y = 0;
    rightEyeMesh.add(rightLens);
    
    // Glow
    const glowGeo = new THREE.CircleGeometry(0.05, 16);
    const leftGlow = new THREE.Mesh(glowGeo, glowMat);
    leftGlow.position.set(0, 0, 0.01);
    leftLens.add(leftGlow);
    
    const rightGlow = new THREE.Mesh(glowGeo, glowMat);
    rightGlow.position.set(0, 0, 0.01);
    rightLens.add(rightGlow);

    // Arms
    const armGeo = new THREE.BoxGeometry(0.1, 0.7, 0.1);
    armGeo.translate(0, -0.35, 0); // Pivot at top

    const leftArm = new THREE.Mesh(armGeo, metalMat);
    leftArm.position.set(-0.6, 0.3, 0);
    leftArm.rotation.z = 0.2;
    robot.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, metalMat);
    rightArm.position.set(0.6, 0.3, 0);
    rightArm.rotation.z = -0.2;
    robot.add(rightArm);

    // Hands
    const handGeo = new THREE.BoxGeometry(0.15, 0.2, 0.05);
    const leftHand = new THREE.Mesh(handGeo, metalMat);
    leftHand.position.set(0, -0.7, 0);
    leftArm.add(leftHand);

    const rightHand = new THREE.Mesh(handGeo, metalMat);
    rightHand.position.set(0, -0.7, 0);
    rightArm.add(rightHand);

    scene.add(robot);

    // Plant in Boot
    const bootGroup = new THREE.Group();
    bootGroup.position.set(1.0, -1.0, 0);
    bootGroup.scale.set(0.6, 0.6, 0.6);

    // Boot Materials
    const bootMat = new THREE.MeshStandardMaterial({ color: 0x5D4037, roughness: 0.9 });
    const plantMat = new THREE.MeshStandardMaterial({ color: 0x4CAF50, roughness: 0.5 });
    const dirtMat = new THREE.MeshStandardMaterial({ color: 0x3E2723, roughness: 1 });

    // Boot Shape
    const bootGeo = new THREE.CylinderGeometry(0.3, 0.25, 0.5, 16);
    const boot = new THREE.Mesh(bootGeo, bootMat);
    bootGroup.add(boot);

    const toeGeo = new THREE.SphereGeometry(0.28, 16, 16);
    toeGeo.scale(1, 0.6, 1.2);
    const toe = new THREE.Mesh(toeGeo, bootMat);
    toe.position.set(0, -0.25, 0.2);
    bootGroup.add(toe);

    // Dirt
    const dirtGeo = new THREE.CircleGeometry(0.22, 16);
    const dirt = new THREE.Mesh(dirtGeo, dirtMat);
    dirt.rotation.x = -Math.PI / 2;
    dirt.position.y = 0.24;
    bootGroup.add(dirt);

    // Plant
    const stemGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.5);
    const stem = new THREE.Mesh(stemGeo, plantMat);
    stem.position.y = 0.45;
    bootGroup.add(stem);

    const leafGeo = new THREE.SphereGeometry(0.1, 8, 8);
    leafGeo.scale(1, 0.1, 0.5);
    
    const leaf1 = new THREE.Mesh(leafGeo, plantMat);
    leaf1.position.set(0.1, 0.65, 0);
    leaf1.rotation.z = -0.5;
    bootGroup.add(leaf1);

    const leaf2 = new THREE.Mesh(leafGeo, plantMat);
    leaf2.position.set(-0.1, 0.6, 0.1);
    leaf2.rotation.z = 0.5;
    bootGroup.add(leaf2);

    scene.add(bootGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x3b82f6, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 4;
    camera.position.y = 1;

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - window.innerWidth / 2);
        mouseY = (event.clientY - window.innerHeight / 2);
    });

    // Waving Logic
    let isWaving = false;
    let waveTimer = 0;

    renderer.domElement.style.cursor = 'pointer';
    renderer.domElement.addEventListener('click', () => {
        if (!isWaving) {
            isWaving = true;
            waveTimer = 0;
        }
    });

    // Animation Loop
    function animate3D() {
        requestAnimationFrame(animate3D);
        
        // Floating animation
        robot.position.y = Math.sin(Date.now() * 0.002) * 0.1 - 0.8;
        
        // Boot Floating
        bootGroup.position.y = Math.sin(Date.now() * 0.0015 + 2) * 0.08 - 1.0;
        bootGroup.rotation.z = Math.sin(Date.now() * 0.001) * 0.1;

        // Body Rotation (Slight movement)
        robot.rotation.y += 0.02 * (mouseX * 0.0005 - robot.rotation.y);

        // Head Rotation (Independent looking)
        headGroup.rotation.y += 0.05 * (mouseX * 0.0015 - headGroup.rotation.y);
        headGroup.rotation.x += 0.05 * (mouseY * 0.0015 - headGroup.rotation.x);

        // Waving Animation
        if (isWaving) {
            waveTimer += 0.05;
            if (waveTimer < 1) {
                // Raise arm
                rightArm.rotation.z = -0.2 + (3.0 - (-0.2)) * waveTimer;
            } else if (waveTimer < 3) {
                // Wave hand
                rightArm.rotation.z = 3.0 + Math.sin((waveTimer - 1) * 15) * 0.5;
            } else if (waveTimer < 4) {
                // Lower arm
                rightArm.rotation.z = 3.0 - (3.0 - (-0.2)) * (waveTimer - 3);
            } else {
                isWaving = false;
                rightArm.rotation.z = -0.2;
            }
        }

        renderer.render(scene, camera);
    }
    animate3D();

    // Handle Resize
    window.addEventListener('resize', () => {
        if (hero3DContainer) {
            const width = hero3DContainer.clientWidth;
            const height = hero3DContainer.clientHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        }
    });
}