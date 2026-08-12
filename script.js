/**
 * Putri Ratnaningtyas Portfolio Interactive Logic
 * Fully responsive, accessible, clean, and modern.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------------------------
    // 1. Initialize Lucide Icons
    // --------------------------------------------------------------------------
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // --------------------------------------------------------------------------
    // 2. Dark Mode System
    // --------------------------------------------------------------------------
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.remove('dark');
    }

    themeToggle.addEventListener('click', () => {
        htmlElement.classList.toggle('dark');
        const currentTheme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
    });

    // --------------------------------------------------------------------------
    // 3. Header Styling & Scroll Progress
    // --------------------------------------------------------------------------
    const header = document.querySelector('.header');
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        // Progress bar width
        scrollProgress.style.width = scrollPercent + '%';

        // Sticky header class
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (scrollTop > 600) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Back to top scroll interaction
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --------------------------------------------------------------------------
    // 4. Mobile Navigation Menu
    // --------------------------------------------------------------------------
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
        mobileToggle.setAttribute('aria-expanded', !isExpanded);
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent background scroll when mobile menu is active
        document.body.style.overflow = !isExpanded ? 'hidden' : 'auto';
    };

    mobileToggle.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // --------------------------------------------------------------------------
    // 5. Scroll Active Navigation Highlighting & Reveal Animations
    // --------------------------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    
    // Intersection Observer for scroll-spy active state
    const scrollSpyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        root: null,
        rootMargin: '-30% 0px -60% 0px', // Trigger active when section occupies center window
        threshold: 0
    });

    sections.forEach(section => {
        scrollSpyObserver.observe(section);
    });

    // Intersection Observer for slide/fade reveal animation
    const revealElements = document.querySelectorAll('.reveal, .stat-card, .about-card, .skills-category-card, .project-card, .timeline-item, .certificate-card, .contact-info-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Once animate is done, no need to keep observing
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.15
    });

    revealElements.forEach(element => {
        element.classList.add('reveal'); // Dynamically add style class
        revealObserver.observe(element);
    });

    // --------------------------------------------------------------------------
    // 6. Projects Filtering System
    // --------------------------------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update button active state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategories = card.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || cardCategories.includes(filterValue)) {
                    card.classList.remove('fade-out');
                    card.classList.add('fade-in');
                } else {
                    card.classList.remove('fade-in');
                    card.classList.add('fade-out');
                }
            });
        });
    });

    // --------------------------------------------------------------------------
    // 7. Projects Detailed Data & Modal Handler
    // --------------------------------------------------------------------------
    const projectsData = [
        {
            title: "Penilaian Dosen",
            role: "Backend Developer",
            image: "assets/project_web_penilaian_dosen.png",
            link: "https://github.com/putriratnaningtyas01/PenilaianDosen-Kel1/tree/FINAL_PROJECT",
            linkLabel: "GitHub Repository",
            tags: ["Laravel", "Filament", "MySQL"],
            overview: "Penilaian Dosen is a web-based academic system developed to support the process of lecturer evaluation by students. The project provides a structured system for managing lecturer evaluation data and presenting the results.",
            responsibilities: "Worked on the backend development of the system using Laravel and Filament, including database integration, data management, and the development of system functions required for the lecturer evaluation process.",
            features: [
                "Lecturer evaluation data management",
                "Student evaluation and assessment process",
                "Database integration for storing evaluation data",
                "Administrative interface for managing system data"
            ],
            challenges: "Developing a system that can manage evaluation data in a structured way while keeping the process simple and easy to use.",
            lessons: "This project strengthened my understanding of Laravel, Filament, database management, and how backend systems support academic processes."
        },
        {
            title: "EduSphare LMS",
            role: "UI/UX Designer",
            image: "assets/project_edusphare.png",
            link: "https://www.figma.com/design/nhlvCUg0HvUIiw2KWjFWky/PROJECT-UI-UX-EDUSPHARE?node-id=2912-13937&t=aYzteiKUAkCCu7Xw-1",
            linkLabel: "Figma Design",
            tags: ["Figma", "UI/UX Design"],
            overview: "EduSphare LMS is a UI/UX design project for a learning platform aimed at vocational high school students. The design focuses on creating a simple, clear, and engaging learning experience for students.",
            responsibilities: "Designed the user interface and user experience of the platform using Figma, including page layouts, navigation flow, visual elements, and interactive prototype design.",
            features: [
                "Student-focused learning interface",
                "Clear and simple navigation",
                "Organized learning content and information",
                "Interactive prototype designed in Figma"
            ],
            challenges: "Creating an interface that feels engaging for vocational high school students while keeping the learning experience simple and easy to understand.",
            lessons: "This project helped me understand that good UI/UX design is not only about creating an attractive interface, but also about making information easy to find and the overall experience comfortable for users."
        },
        {
            title: "SPK – Sistem Pendukung Keputusan",
            role: "Developer",
            image: "assets/project_streamlit.png",
            link: "https://github.com/putriratnaningtyas01/STREAMLIT_UAS_SPK",
            linkType: "github",
            linkLabel: "GitHub Repository",
            tags: ["Python", "Streamlit"],
            overview: "SPK (Sistem Pendukung Keputusan) is a web-based application developed with Streamlit to support multi-criteria decision-making. The application allows users to choose between the SAW and TOPSIS methods, input decision data, perform calculations, and view the resulting ranking.",
            responsibilities: "Developed the Streamlit-based application interface and implemented the decision-making workflow, including method selection, data input, calculation process, and presentation of the final results.",
            features: [
                "Multi-criteria decision-making using SAW and TOPSIS",
                "Method selection between SAW and TOPSIS",
                "Interactive input for decision-making data",
                "Automatic calculation and ranking of alternatives",
                "Result presentation through a structured web interface"
            ],
            challenges: "Implementing two different decision-making methods in one application while keeping the calculation process and user flow simple and easy to understand.",
            lessons: "This project strengthened my understanding of Python, Streamlit, and the implementation of multi-criteria decision-making methods such as SAW and TOPSIS into an interactive web application."
        },
        {
            title: "SIMPUB",
            role: "Web Developer",
            image: "assets/project_simpub.png",
            link: "https://web-simpub-manpro.vercel.app/",
            linkType: "website",
            linkLabel: "Live Website",
            tags: ["React", "Vite", "JavaScript", "Node.js"],
            overview: "SIMPUB (Sistem Manajemen Pengaduan dan Umpan Balik) is a web-based system designed to help manage complaints and feedback in a more structured way. The project focuses on organizing complaint information and supporting a clearer management process.",
            responsibilities: "Worked on the development of the web application, including designing the interface, implementing system functions, connecting the application with the database, and organizing the complaint management flow.",
            features: [
                "Complaint and feedback data management",
                "Structured complaint submission process",
                "Complaint status and information management",
                "Database integration for storing complaint data"
            ],
            challenges: "Designing a complaint management flow that is easy to understand while keeping complaint information organized and accessible.",
            lessons: "This project helped me understand how a web-based information system can be designed to organize complaint data and support a more structured management process."
        },
        {
            title: "APSI MATH HERO",
            role: "UI/UX Designer",
            image: "assets/project_mathhero.png",
            link: "https://www.figma.com/design/BXXkyQ8o3vUWG3VqwrGNhO/APSI-MATH-HERO?node-id=0-1&t=B2UqSymfy6ZbTKR0-1",
            linkType: "figma",
            linkLabel: "Figma Design",
            tags: ["Figma", "UI/UX Design"],
            overview: "MATH HERO is a UI/UX design project for a gamified mathematics learning platform. The design aims to make mathematics learning more engaging and enjoyable through interactive learning activities, exercises, and a colorful, student-friendly interface.",
            responsibilities: "Designed the user interface and user experience in Figma, including the login and registration flow, dashboard, learning pages, exercise interfaces, and supporting visual elements. Also developed the interactive prototype to demonstrate the overall user flow.",
            features: [
                "Gamified mathematics learning interface",
                "Student dashboard and learning navigation",
                "Interactive mathematics exercises and question pages",
                "Login and registration flow",
                "Colorful and student-friendly visual design",
                "Interactive prototype developed in Figma"
            ],
            challenges: "Creating a learning interface that feels fun and engaging while keeping the mathematics content, navigation, and exercise flow clear and easy for students to understand.",
            lessons: "This project strengthened my understanding of designing educational interfaces, creating engaging user flows, and using visual elements and gamification concepts to make learning experiences more enjoyable."
        }
    ];

    const projectModal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const modalBodyContent = document.getElementById('modal-body-content');
    const openDetailsBtns = document.querySelectorAll('.open-details-btn');

    const openProjectModal = (index) => {
        const data = projectsData[index];
        if (!data) return;

        // Build HTML template
        let featuresHTML = "";
        data.features.forEach(feat => {
            featuresHTML += `<li>${feat}</li>`;
        });

        let tagsHTML = "";
        data.tags.forEach(t => {
            tagsHTML += `<span class="tech-badge">${t}</span>`;
        });

        modalBodyContent.innerHTML = `
            <div class="modal-project-header">
                <span class="modal-project-role">${data.role}</span>
                <h3 class="modal-project-title">${data.title}</h3>
                <div class="project-tech-badges" style="margin-bottom: 0;">
                    ${tagsHTML}
                </div>
            </div>
            
            <img src="${data.image}" alt="${data.title} Presentation" class="modal-project-img">
            
            <div class="modal-project-meta-grid">
                <div class="meta-item">
                    <h5>Role</h5>
                    <p>${data.role}</p>
                </div>
                <div class="meta-item">
                    <h5>Technologies</h5>
                    <p>${data.tags.join(', ')}</p>
                </div>
                <div class="meta-item">
                    <h5>Project Link</h5>
                    <p>
                        <a href="${data.link}"
                        target="_blank"
                        rel="noopener noreferrer"
                        style="color: var(--accent); text-decoration: underline;">
                            ${data.linkLabel}
                        </a>
                    </p>
                </div>
            </div>

            <div class="modal-section">
                <h4><i data-lucide="info"></i> Project Overview</h4>
                <p>${data.overview}</p>
            </div>

            <div class="modal-section">
                <h4><i data-lucide="user"></i> Responsibilities & Roles</h4>
                <p>${data.responsibilities}</p>
            </div>

            <div class="modal-section">
                <h4><i data-lucide="layers"></i> Key Features</h4>
                <ul class="modal-features-list">
                    ${featuresHTML}
                </ul>
            </div>

            <div class="modal-section">
                <h4><i data-lucide="alert-triangle"></i> Key Challenges</h4>
                <p>${data.challenges}</p>
            </div>

            <div class="modal-section">
                <h4><i data-lucide="check-circle"></i> Lessons Learned</h4>
                <p>${data.lessons}</p>
            </div>
        `;

        // Re-trigger lucide icons inside modal
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        projectModal.classList.add('active');
        projectModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Stop background scroll
    };

    const closeProjectModal = () => {
        projectModal.classList.remove('active');
        projectModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto'; // Restore scroll
    };

    openDetailsBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.getAttribute('data-project'));
            openProjectModal(index);
        });
    });

    modalClose.addEventListener('click', closeProjectModal);
    
    // Close modal when clicking on background overlay
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            closeProjectModal();
        }
    });

    // Close modal on escape press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.classList.contains('active')) {
            closeProjectModal();
        }
    });

    // --------------------------------------------------------------------------
    // 8. Certificate Modal Preview
    // --------------------------------------------------------------------------
    const certModal = document.getElementById('cert-modal');
    const certModalImg = document.getElementById('cert-modal-img');
    const certModalTitle = document.getElementById('cert-modal-title');
    const certModalIssuer = document.getElementById('cert-modal-issuer');
    const certModalYear = document.getElementById('cert-modal-year');
    const certModalClose = document.getElementById('cert-modal-close');
    const previewCertBtns = document.querySelectorAll('.preview-cert-btn');

    const openCertModal = (btn) => {
        const certSrc = btn.getAttribute('data-cert');
        const title = btn.getAttribute('data-title');
        const issuer = btn.getAttribute('data-issuer');
        const year = btn.getAttribute('data-year');

        certModalImg.setAttribute('src', certSrc);
        certModalTitle.textContent = title;
        certModalIssuer.textContent = `Issued by: ${issuer}`;
        certModalYear.textContent = `Year: ${year}`;

        certModal.classList.add('active');
        certModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeCertModal = () => {
        certModal.classList.remove('active');
        certModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
    };

    previewCertBtns.forEach(btn => {
        btn.addEventListener('click', () => openCertModal(btn));
    });

    certModalClose.addEventListener('click', closeCertModal);
    certModal.addEventListener('click', (e) => {
        if (e.target === certModal) {
            closeCertModal();
        }
    });

    // --------------------------------------------------------------------------
    // 9. Contact Form Simulation & Toast Notification
    // --------------------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('form-submit-btn');
    const submitIcon = document.getElementById('submit-icon');
    const submitSpinner = document.getElementById('submit-spinner');
    const toast = document.getElementById('toast');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Trigger loading state
        submitBtn.disabled = true;
        submitIcon.style.display = 'none';
        submitSpinner.style.display = 'inline-block';
        submitBtn.querySelector('span').textContent = 'Sending Message...';

        // Simulate async network submission
        setTimeout(() => {
            // Restore button state
            submitBtn.disabled = false;
            submitIcon.style.display = 'inline-block';
            submitSpinner.style.display = 'none';
            submitBtn.querySelector('span').textContent = 'Send Message';

            // Show Toast Notification
            toast.classList.add('active');
            
            // Hide toast after 4 seconds
            setTimeout(() => {
                toast.classList.remove('active');
            }, 4000);

            // Reset form fields
            contactForm.reset();
        }, 1500);
    });

    // --------------------------------------------------------------------------
    // 10. Update copyright year dynamically
    // --------------------------------------------------------------------------
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});
