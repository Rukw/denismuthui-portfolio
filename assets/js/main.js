// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Loading spinner functionality
    const loader = document.querySelector('.loader');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            loader.classList.add('hidden');
        }, 500);
    });
    
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Initialize theme based on saved preference
    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            body.setAttribute('data-theme', savedTheme);
            const icon = themeToggle?.querySelector('i');
            if (icon) {
                icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
        }
    }

    // Theme toggle functionality
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update icon
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
        });

        // Initialize theme on page load
        initializeTheme();
    }
    
    // Toggle mobile navigation
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('open');
            // Toggle aria-expanded for accessibility
            const isExpanded = navLinks.classList.contains('open');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navLinks.contains(event.target)) {
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // Close mobile nav when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('open');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinksArray = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const headerHeight = document.querySelector('header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksArray.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Project filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Form submission with validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Construct the mailto URL with the form data
            const mailtoLink = `mailto:denismuthui@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            
            // Create a temporary link element and trigger it
            const tempLink = document.createElement('a');
            tempLink.href = mailtoLink;
            tempLink.style.display = 'none';
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);
            
            // Reset the form
            contactForm.reset();
            
            // Show success message
            alert('Thank you for your message! Your email client should open automatically.');
        });
    }

    // Modal functionality
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    const closeModal = document.querySelector('.modal-close');

    // Project data
    const projectData = {
        project1: {
            title: 'E-commerce Website',
            category: 'Web Development',
            duration: '3 months',
            technologies: ['HTML/CSS', 'JavaScript', 'React'],
            description: 'A fully responsive e-commerce platform with product filtering, cart functionality, and secure checkout. The project involved creating a modern, user-friendly interface with seamless payment integration and inventory management.',
            media: [
                { type: 'image', url: '/imgs/camera-541213_640.jpg' },
                { type: 'image', url: '/imgs/camera-541213_640.jpg' },
                { type: 'video', url: '/videos/project1-demo.mp4' }
            ],
            liveDemo: '#',
            github: '#'
        },
        project2: {
            title: 'Dark n Lovely Promo',
            category: 'Photography Projects',
            duration: '4 months',
            technologies: ['Lightroom', 'Photoshop'],
            description: 'Promotion of Dark and lovely hair products. I was tasked to take photos of the whole shot from styling of models to the end result at studio.',
            media: [
                { type: 'image', url: '/imgs/INSTUDIO.png' },
                { type: 'image', url: '/imgs/INSTUDIO.png' },
                { type: 'video', url: '/videos/project2-behind-the-scenes.mp4' }
            ],
            liveDemo: '#',
            github: '#'
        },
        project3: {
            title: 'Photography',
            category: 'Photography Projects',
            duration: '4 months',
            technologies: ['Lightroom', 'Photoshop'],
            description: 'Promotion of Dark and lovely hair products. I was tasked to take photos of the whole shot from styling of models to the end result at studio.',
            media: [
                { type: 'image', url: '/imgs/INSTUDIO.png' },
                { type: 'image', url: '/imgs/INSTUDIO.png' },
                { type: 'video', url: '/videos/project3-behind-the-scenes.mp4' }
            ],
            liveDemo: '#',
            github: '#'
        },
        project4: {
            title: 'Photography',
            category: 'Photography Projects',
            duration: '4 months',
            technologies: ['Lightroom', 'Photoshop'],
            description: 'Promotion of Dark and lovely hair products. I was tasked to take photos of the whole shot from styling of models to the end result at studio.',
            media: [
                { type: 'image', url: '/imgs/INSTUDIO.png' },
                { type: 'image', url: '/imgs/INSTUDIO.png' },
                { type: 'video', url: '/videos/project4-behind-the-scenes.mp4' }
            ],
            liveDemo: '#',
            github: '#'
        },
        project5: {
            title: 'Photography',
            category: 'Photography Projects',
            duration: '4 months',
            technologies: ['Lightroom', 'Photoshop'],
            description: 'Promotion of Dark and lovely hair products. I was tasked to take photos of the whole shot from styling of models to the end result at studio.',
            media: [
                { type: 'image', url: '/imgs/INSTUDIO.png' },
                { type: 'image', url: '/imgs/INSTUDIO.png' },
                { type: 'video', url: '/videos/project5-behind-the-scenes.mp4' }
            ],
            liveDemo: '#',
            github: '#'
        },
        project6: {
            title: 'Financial Dashboard UI',
            category: 'UI/UX Design',
            duration: '2 months',
            technologies: ['Figma', 'Adobe XD', 'Sketch'],
            description: 'A modern financial dashboard interface designed for financial analysts and investors. The design focuses on data visualization, user experience, and accessibility while maintaining a professional aesthetic.',
            media: [
                { type: 'image', url: 'https://via.placeholder.com/800x400' },
                { type: 'image', url: 'https://via.placeholder.com/800x400' },
                { type: 'image', url: 'https://via.placeholder.com/800x400' }
            ],
            liveDemo: '#',
            github: '#'
        }
    };

    // Function to create carousel items
    function createCarouselItems(media) {
        return media.map((item, index) => {
            if (item.type === 'image') {
                return `<div class="carousel-item">
                    <img src="${item.url}" alt="Project image ${index + 1}">
                </div>`;
            } else {
                return `<div class="carousel-item">
                    <video controls>
                        <source src="${item.url}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>`;
            }
        }).join('');
    }

    // Function to create carousel indicators
    function createCarouselIndicators(count) {
        return Array(count).fill('').map((_, index) => `
            <div class="carousel-indicator ${index === 0 ? 'active' : ''}" data-index="${index}"></div>
        `).join('');
    }

    // Function to open modal with project details
    function openProjectModal(projectId) {
        const project = projectData[projectId];
        if (!project) return;

        const modalHTML = `
            <div class="carousel-container">
                <button class="carousel-btn prev-btn"><i class="fas fa-chevron-left"></i></button>
                <div class="carousel">
                    <div class="carousel-track">
                        ${createCarouselItems(project.media)}
                    </div>
                </div>
                <button class="carousel-btn next-btn"><i class="fas fa-chevron-right"></i></button>
                <div class="carousel-indicators">
                    ${createCarouselIndicators(project.media.length)}
                </div>
            </div>
            <h2>${project.title}</h2>
            <div class="project-info">
                <div class="project-info-item">
                    <span class="info-label">Category:</span>
                    <span>${project.category}</span>
                </div>
                <div class="project-info-item">
                    <span class="info-label">Duration:</span>
                    <span>${project.duration}</span>
                </div>
                <div class="project-info-item">
                    <span class="info-label">Technologies:</span>
                    <span>${project.technologies.join(', ')}</span>
                </div>
            </div>
            <div class="project-description">
                <p>${project.description}</p>
            </div>
            <div class="project-buttons">
                <a href="${project.liveDemo}" class="project-btn primary" target="_blank">Live Demo</a>
                <a href="${project.github}" class="project-btn secondary" target="_blank">View Code</a>
            </div>
        `;

        modalContent.innerHTML = modalHTML;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Initialize carousel functionality
        initializeCarousel();
    }

    // Function to initialize carousel
    function initializeCarousel() {
        const track = document.querySelector('.carousel-track');
        const items = document.querySelectorAll('.carousel-item');
        const indicators = document.querySelectorAll('.carousel-indicator');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        let currentIndex = 0;

        function updateCarousel() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % items.length;
            updateCarousel();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateCarousel();
        }

        // Event listeners
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
            });
        });

        // Auto-play functionality (optional)
        let autoplayInterval = setInterval(nextSlide, 5000);

        // Pause autoplay on hover
        const carousel = document.querySelector('.carousel');
        carousel.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
        carousel.addEventListener('mouseleave', () => {
            autoplayInterval = setInterval(nextSlide, 5000);
        });
    }

    // Close modal
    function closeProjectModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listeners for modal
    closeModal.addEventListener('click', closeProjectModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProjectModal();
        }
    });

    // Add click event listeners to project buttons
    document.querySelectorAll('.project-btn[data-project]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = button.getAttribute('data-project');
            openProjectModal(projectId);
        });
    });

    // Add scroll progress indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.transform = `scaleX(${scrolled / 100})`;
    });

    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Handle hero video loading
    const heroVideo = document.querySelector('.hero-video');
    const video = heroVideo?.querySelector('video');
    
    if (video) {
        heroVideo.classList.add('loading');
        
        video.addEventListener('loadeddata', function() {
            heroVideo.classList.remove('loading');
            heroVideo.classList.add('loaded');
        });

        // Fallback in case the video takes too long to load
        setTimeout(() => {
            if (heroVideo.classList.contains('loading')) {
                heroVideo.classList.remove('loading');
                heroVideo.classList.add('loaded');
            }
        }, 3000);
    }

});