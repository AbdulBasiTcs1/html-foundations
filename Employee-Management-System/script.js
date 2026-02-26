/* =========================================================
   EMS Pro – Employee Management System
   script.js
   COMSATS University Islamabad, Attock Campus
   Web Technology – Lab Assignment 1
   ========================================================= */

'use strict';

/* ========== IMAGE SLIDER ========== */
(function () {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let current = 0;
    let autoTimer = null;

    function goTo(index) {
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startAuto() {
        stopAuto();
        autoTimer = setInterval(next, 4500);
    }

    function stopAuto() {
        if (autoTimer) clearInterval(autoTimer);
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => { prev(); startAuto(); });
        nextBtn.addEventListener('click', () => { next(); startAuto(); });
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => { goTo(i); startAuto(); });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') { prev(); startAuto(); }
        if (e.key === 'ArrowRight') { next(); startAuto(); }
    });

    // Touch / swipe support
    const sliderWrapper = document.querySelector('.slider-wrapper');
    if (sliderWrapper) {
        let touchStartX = 0;
        sliderWrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].clientX;
        }, { passive: true });
        sliderWrapper.addEventListener('touchend', (e) => {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 40) {
                diff > 0 ? next() : prev();
                startAuto();
            }
        }, { passive: true });
    }

    startAuto();
})();


/* ========== EMPLOYEE TABLE SEARCH ========== */
(function () {
    const searchInput = document.getElementById('searchInput');
    const tableBody = document.querySelector('#empTable tbody');
    const tableCount = document.getElementById('tableCount');

    if (!searchInput || !tableBody) return;

    const allRows = Array.from(tableBody.querySelectorAll('tr'));

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();
        let visible = 0;

        allRows.forEach((row) => {
            const text = row.textContent.toLowerCase();
            if (text.includes(query)) {
                row.style.display = '';
                visible++;
            } else {
                row.style.display = 'none';
            }
        });

        if (tableCount) {
            tableCount.textContent = query
                ? `Showing ${visible} of ${allRows.length} employees`
                : `Showing ${allRows.length} employees`;
        }
    });
})();


/* ========== CONTACT FORM HANDLER ========== */
function handleSubmit(event) {
    event.preventDefault();
    const btn = document.getElementById('submitBtn');
    const formMsg = document.getElementById('formMsg');

    // Basic validation
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields before submitting.');
        return;
    }

    // Simulate sending
    btn.disabled = true;
    btn.textContent = 'Sending…';

    setTimeout(() => {
        btn.textContent = '✅ Sent!';
        formMsg.style.display = 'block';
        event.target.reset();

        setTimeout(() => {
            btn.disabled = false;
            btn.textContent = 'Send Message ✉️';
            formMsg.style.display = 'none';
        }, 5000);
    }, 1200);
}


/* ========== NAVBAR SCROLL EFFECT ========== */
(function () {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.style.background = 'rgba(15, 28, 51, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
        } else {
            navbar.style.background = 'rgba(15, 28, 51, 0.92)';
            navbar.style.boxShadow = 'none';
        }
    });
})();


/* ========== SCROLL-IN ANIMATION ========== */
(function () {
    const animatables = document.querySelectorAll(
        '.feature-card, .float-card, .contact-item, .ext-link, .emp-table tbody tr'
    );

    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    animatables.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = `opacity 0.5s ease ${i * 60}ms, transform 0.5s ease ${i * 60}ms`;
        observer.observe(el);
    });
})();


/* ========== SMOOTH ACTIVE NAV LINK ========== */
(function () {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!sections.length || !navLinks.length) return;

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach((sec) => {
            if (window.scrollY >= sec.offsetTop - 90) {
                current = sec.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            link.style.color = link.getAttribute('href') === `#${current}`
                ? '#ffffff'
                : 'rgba(255,255,255,0.75)';
        });
    });
})();
