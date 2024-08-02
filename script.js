document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('nav ul li a');
    const scrollDownButton = document.querySelector('.scroll-down');
    const progressBars = document.querySelectorAll('.progress');

    // Animate elements on scroll
    const scrollHandler = () => {
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                element.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', scrollHandler);
    scrollHandler();

    // Smooth scroll for navigation links
    const smoothScroll = (targetId) => {
        const section = document.getElementById(targetId);
        const headerHeight = header.offsetHeight;
        const scrollToPosition = section.offsetTop - headerHeight - 20; 
        window.scrollTo({ top: scrollToPosition, behavior: 'smooth' });
    };

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            smoothScroll(targetId);
        });
    });

    // Smooth scroll for scroll down button
    if (scrollDownButton) {
        scrollDownButton.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScroll('about');
        });
    }

    // Change header background on scroll
    const headerScrollHandler = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', headerScrollHandler);

    // Animate progress bars
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress');
                const width = progressBar.getAttribute('style').match(/width: (\d+)%/)[1];
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = `${width}%`;
                    progressBar.style.transition = 'width 1s ease-in-out';
                }, 100);
            }
        });
    }, {
        threshold: 1.0,
    });

    progressBars.forEach((bar) => {
        observer.observe(bar.parentNode);
    });

    const darkModeToggle = document.getElementById('dark-mode-toggle');

    darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.classList.toggle('dark-mode-active');
    if (darkModeToggle.classList.contains('dark-mode-active')) {
        darkModeToggle.querySelector('.dark-mode-text').textContent = '';
    } else {
        darkModeToggle.querySelector('.dark-mode-text').textContent = '';
    }
    });

    const hamburger = document.getElementById('hamburger');
    const nav = document.querySelector('nav');

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('hamburger-active');
        hamburger.classList.toggle('like');
    });

    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
    
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                document.getElementById('thank-you').style.display = 'block';
                form.reset();
            } else {
                alert('There was a problem with your submission. Please try again.');
            }
        }).catch(error => {
            alert('There was a problem with your submission. Please try again.');
        });
    });

});
