document.addEventListener('DOMContentLoaded', function () {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function () {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Sticky Header
    window.addEventListener('scroll', function () {
        const header = document.querySelector('header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-level');

    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '100';

            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }

                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Form submission
    // const form = document.getElementById("contactForm");
    // // === Contact form (AJAX + validation) ===
    // (function () {
    //     const form = document.getElementById('contact-form');
    //     if (!form) return;

    //     const statusEl = document.getElementById('form-status');

    //     // helper: show field error
    //     function showFieldError(input, msg) {
    //         input.classList.add('invalid');
    //         let err = input.parentElement.querySelector('.error');
    //         if (!err) {
    //             err = document.createElement('small');
    //             err.className = 'error';
    //             err.style.color = '#c0362c';
    //             err.style.display = 'block';
    //             err.style.marginTop = '6px';
    //             input.parentElement.appendChild(err);
    //         }
    //         err.textContent = msg;
    //     }

    //     // helper: clear all errors
    //     function clearErrors() {
    //         form.querySelectorAll('.error').forEach(e => e.remove());
    //         form.querySelectorAll('input, textarea').forEach(el => el.classList.remove('invalid'));
    //         statusEl.textContent = '';
    //         statusEl.className = 'form-message';
    //     }

    //     form.addEventListener('submit', async (e) => {
    //         e.preventDefault();
    //         clearErrors();

    //         const fd = new FormData(form);
    //         const name = (fd.get('name') || '').toString().trim();
    //         const email = (fd.get('email') || '').toString().trim();
    //         const subject = (fd.get('subject') || '').toString().trim();
    //         const message = (fd.get('message') || '').toString().trim();

    //         let hasError = false;
    //         const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    //         if (!name) { showFieldError(form.querySelector('[name="name"]'), 'Please enter your name'); hasError = true; }
    //         if (!emailPattern.test(email)) { showFieldError(form.querySelector('[name="email"]'), 'Please enter a valid email'); hasError = true; }
    //         if (!subject) { showFieldError(form.querySelector('[name="subject"]'), 'Please enter a subject'); hasError = true; }
    //         if (!message) { showFieldError(form.querySelector('[name="message"]'), 'Please enter your message'); hasError = true; }

    //         if (hasError) {
    //             statusEl.textContent = 'Please fix the errors above.';
    //             statusEl.classList.add('error');
    //             return;
    //         }

    //         // disable button / show sending…
    //         const btn = form.querySelector('button[type="submit"]');
    //         const originalBtnText = btn.textContent;
    //         btn.disabled = true;
    //         btn.textContent = 'Sending...';

    //         try {
    //             const res = await fetch('save_contact.php', {
    //                 method: 'POST',
    //                 body: fd
    //             });

    //             const data = await res.json().catch(() => ({}));

    //             if (res.ok && data.ok) {
    //                 statusEl.textContent = data.message || 'Thanks! Your message has been sent.';
    //                 statusEl.classList.add('success');
    //                 form.reset();
    //             } else {
    //                 if (data.errors) {
    //                     Object.entries(data.errors).forEach(([field, msg]) => {
    //                         const input = form.querySelector(`[name="${field}"]`);
    //                         if (input) showFieldError(input, msg);
    //                     });
    //                 } else {
    //                     statusEl.textContent = data.message || 'Something went wrong. Please try again.';
    //                     statusEl.classList.add('error');
    //                 }
    //             }
    //         } catch (err) {
    //             statusEl.textContent = 'Network error. Please try again.';
    //             statusEl.classList.add('error');
    //         } finally {
    //             btn.disabled = false;
    //             btn.textContent = originalBtnText;
    //         }
    //     });
    //     form.addEventListener("submit", function () {
    //         // reset all fields immediately after submission
    //         setTimeout(() => form.reset(), 100);
    //     });
    // })();



    // Initialize animations when skills section is in view
    const skillsSection = document.getElementById('skills');

    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        skillsObserver.observe(skillsSection);
    }

    // Disable right-click anywhere
    document.addEventListener("contextmenu", function (e) {
        e.preventDefault();
    });

    // Disable common keyboard shortcuts
    document.addEventListener("keydown", function (e) {
        // Ctrl+S, Ctrl+U, Ctrl+C, Ctrl+Shift+I, F12
        if ((e.ctrlKey && ["s", "u", "c", "i"].includes(e.key.toLowerCase())) || e.key === "F12") {
            e.preventDefault();
        }
    });

    // Disable copy/cut/paste
    ["copy", "cut", "paste"].forEach(evt => {
        document.addEventListener(evt, e => e.preventDefault());
    });
});
