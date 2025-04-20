document.addEventListener('DOMContentLoaded', function() {
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const themeToggle = document.createElement('div');
    themeToggle.className = 'theme-toggle';
    themeToggle.id = 'themeToggle';
    
    themeToggle.innerHTML = `
        <div class="toggle-icon">
            <svg class="sun-moon" width="24" height="24" viewBox="0 0 24 24">
                <defs>
                    <mask id="moon-mask">
                        <rect x="0" y="0" width="24" height="24" fill="white" />
                        <circle cx="17" cy="7" r="6" fill="black" />
                    </mask>
                </defs>

                <circle class="sun-core" cx="12" cy="12" r="6" fill="currentColor" />

                <g class="sun-beams">
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </g>

                <circle class="moon" cx="12" cy="12" r="6" fill="currentColor" mask="url(#moon-mask)" />
            </svg>

        </div>
    `;
    document.body.appendChild(themeToggle);
    
    const themeTransition = document.createElement('div');
    themeTransition.className = 'theme-transition';
    document.body.appendChild(themeTransition);
    
    if (savedTheme === 'dark') {
        themeToggle.classList.add('dark-mode');
    }
    
    themeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        themeToggle.classList.toggle('dark-mode');
        
        themeTransition.innerHTML = '';

        const toggleRect = themeToggle.getBoundingClientRect();
        const rippleOriginX = toggleRect.left + toggleRect.width/2;
        const rippleOriginY = toggleRect.top + toggleRect.height/2;
        
        const rippleX = (rippleOriginX / window.innerWidth) * 100;
        const rippleY = (rippleOriginY / window.innerHeight) * 100;
        
        const mainRipple = document.createElement('div');
        mainRipple.className = 'theme-ripple';
        mainRipple.style.left = `${rippleX}vw`;
        mainRipple.style.top = `${rippleY}vh`;
        themeTransition.appendChild(mainRipple);
        
        const elements = newTheme === 'dark' ? 
            [
                {shape: 'star', color: '#8A2BE2'}, 
                {shape: 'moon', color: '#9945FF'}, 
                {shape: 'circle', color: '#A16AE8'}, 
                {shape: 'star', color: '#FF4A6E'}
            ] : 
            [
                {shape: 'sun', color: '#FFD700'}, 
                {shape: 'circle', color: '#FF9800'}, 
                {shape: 'triangle', color: '#FFC107'}, 
                {shape: 'sun', color: '#FFE57F'}
            ];
        
        for (let i = 0; i < 10; i++) {
            const element = elements[i % elements.length];
            const floatingEl = document.createElement('div');
            floatingEl.className = `floating-element ${element.shape}`;
            floatingEl.style.backgroundColor = element.color;
            
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 30 + 5;
            const x = rippleX + Math.cos(angle) * distance;
            const y = rippleY + Math.sin(angle) * distance;
            
            floatingEl.style.left = `${x}vw`;
            floatingEl.style.top = `${y}vh`;
            
            const size = Math.random() * 30 + 10;
            floatingEl.style.width = `${size}px`;
            floatingEl.style.height = `${size}px`;
            
            floatingEl.style.animationDelay = `${Math.random() * 0.5}s`;
            floatingEl.style.animationDuration = `${Math.random() * 0.5 + 0.8}s`;
            
            themeTransition.appendChild(floatingEl);
        }
        
        themeTransition.classList.add('active');
        
        setTimeout(() => {
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            setTimeout(() => {
                themeTransition.classList.remove('active');
            }, 1000);
        }, 200);
    });
    
    themeToggle.addEventListener('mouseenter', () => {
        themeToggle.classList.add('hover');
    });

    themeToggle.addEventListener('mouseleave', () => {
        themeToggle.classList.remove('hover');
    });
    
});
    
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(preloader);

    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.style.opacity = '0';
            setTimeout(function() {
                preloader.style.display = 'none';
                
                document.querySelectorAll('.animate-text').forEach(item => {
                    item.classList.add('fade-in');
                });
            }, 500);
        }, 500);
    });

    gsap.registerPlugin(ScrollTrigger);

    const cursor = document.querySelector('.cursor');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    const links = document.querySelectorAll('a, button, .project-card, .social-link, .theme-switch');

    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.width = '30px';
            cursor.style.height = '30px';
            cursor.style.border = '1px solid var(--primary-color)';
            cursor.style.background = 'rgba(108, 99, 255, 0.1)';
        });
        
        link.addEventListener('mouseleave', () => {
            cursor.style.width = '12px';
            cursor.style.height = '12px';
            cursor.style.border = '2px solid var(--primary-color)';
            cursor.style.background = 'transparent';
        });
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.9)';
        cursor.style.background = 'rgba(108, 99, 255, 0.2)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.background = 'transparent';
    });

    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    const toggleMenu = document.querySelector('.toggle-menu');
    const nav = document.querySelector('nav');
    
    toggleMenu.addEventListener('click', () => {
        toggleMenu.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu.classList.remove('active');
            nav.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projects.forEach(project => {
                if (filter === 'all' || project.getAttribute('data-category') === filter) {
                    project.classList.remove('hide');
                    gsap.to(project, { scale: 1, opacity: 1, duration: 0.3 });
                } else {
                    gsap.to(project, { 
                        scale: 0.8, 
                        opacity: 0, 
                        duration: 0.3,
                        onComplete: () => {
                            project.classList.add('hide');
                        }
                    });
                }
            });
        });
    });

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return false;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return false;
            }
            
            const formBtn = contactForm.querySelector('button[type="submit"]');
            formBtn.innerHTML = 'Sending...';
            formBtn.disabled = true;
            
            const formData = {
                name: name,
                email: email,
                subject: subject,
                message: message
            };
            
            fetch('http://localhost:3000/api/v1/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                contactForm.reset();
                formBtn.innerHTML = 'Message Sent!';
                
                setTimeout(() => {
                    formBtn.innerHTML = 'Send Message';
                    formBtn.disabled = false;
                }, 3000);
            })
            .catch(error => {
                console.error('Error:', error);
                formBtn.innerHTML = 'Error! Try Again';
                
                setTimeout(() => {
                    formBtn.innerHTML = 'Send Message';
                    formBtn.disabled = false;
                }, 3000);
            });
        });
    }
    gsap.utils.toArray('.skill-progress').forEach(skill => {
        const width = skill.style.width;
        skill.style.width = 0;
        
        ScrollTrigger.create({
            trigger: skill,
            start: 'top 90%',
            onEnter: () => {
                gsap.to(skill, {
                    width: width,
                    duration: 1.5,
                    ease: 'power3.out'
                });
            }
        });
    });

    gsap.from('.about-image', {
        scrollTrigger: {
            trigger: '.about-content',
            start: 'top 80%'
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.about-text', {
        scrollTrigger: {
            trigger: '.about-content',
            start: 'top 80%'
        },
        x: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3
    });

    gsap.from('.project-card', {
        scrollTrigger: {
            trigger: '.project-grid',
            start: 'top 80%'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });

    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '.contact-content',
            start: 'top 80%'
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact-content',
            start: 'top 80%'
        },
        x: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3
    });

    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 80%'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    const createPageTransition = () => {
        const transition = document.createElement('div');
        transition.className = 'page-transition';
        document.body.appendChild(transition);
        
        return transition;
    };
    
    const pageTransition = createPageTransition();
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                gsap.timeline()
                    .to(pageTransition, {
                        scaleY: 1,
                        transformOrigin: 'top',
                        duration: 0.5,
                        ease: 'power4.inOut'
                    })
                    .to(pageTransition, {
                        scaleY: 0,
                        transformOrigin: 'bottom',
                        duration: 0.5,
                        delay: 0.2,
                        ease: 'power4.inOut'
                    });
                
                setTimeout(() => {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'auto'
                    });
                }, 500);
            }
        });
    });
    
    function setupTypingEffect() {
        const words = ["Developer & Creator", "App Builder", "Web Designer", "Full-Stack Dev"];
        const typingElement = document.querySelector('.hero h2');
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 150;
        
        function typeEffect() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 150;
            }
            
            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typingSpeed = 1500; 
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 500; 
            }
            
            setTimeout(typeEffect, typingSpeed);
        }
        
        setTimeout(typeEffect, 2000);
    }
    
    setupTypingEffect();
    
    window.addEventListener('scroll', function() {
        const scrollValue = window.scrollY;
        const heroSection = document.querySelector('.hero');
        
        if (heroSection) {
            heroSection.style.backgroundPosition = `center ${scrollValue * 0.5}px`;
        }
    });
    
    const revealElements = document.querySelectorAll('.section-header, .about-content, .project-card, .contact-content');
    
    revealElements.forEach((element, index) => {
        gsap.set(element, { y: 50, opacity: 0 });
        
        ScrollTrigger.create({
            trigger: element,
            start: 'top 80%',
            onEnter: () => {
                gsap.to(element, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: 'power3.out'
                });
            },
            once: true
        });
    });
