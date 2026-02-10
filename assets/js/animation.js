/*------------------------------------------------------------------
Template Name: XRoof — Roofing Services HTML Template
Template URL: https://xroof.netlify.app
Description:  XRoof — Roofing Services HTML Template is a clean, modern, and fully responsive template designed specifically for roofing companies, contractors, and construction businesses. Built with the latest technologies, XRoof helps you showcase your services, projects, and team in a professional way that builds trust with customers.
Whether you’re a roofing contractor, construction service provider, or repair specialist, XRoof provides all the essential pages and components to launch your website quickly and easily. With a well-structured codebase, developers can customize it effortlessly, while end-users enjoy a smooth, fast, and mobile-friendly browsing experience.
Author: RoxThemes
Author URL: https://kits.roxthemes.com/babio
Version: 1.0
-------------------------------------------------------------------

JS INDEX
===================

1. Reuseable Animation
2. Card Stagger
3. Fade Animation
4. Helper Function
5. Hero One Area
6. About One Area
7. Services One Area
8. Why Choose Us One Area
9. Project One Area
10. Achievement One Area
11. Team One Area
12. Testimonials One Area
13. Pricing One Area
14. Faq One Area
15. Blog One Area
16. Footer One Area
17. Heo Two Area
18. About Two Area
19. Services Two Area
20. Services Two Area
21. Started One Area
22. Work Process One Area
23. Team Two Area
24. testimonials Two Area
25. Services three Area
26. Blog Two Area
27. Hero Three Area
28. About Three Area
29. Services Four Area
30. Project Three Area
31. Work Process Two Area
31. Team Three Area
32. Team Three Area
33. Contact One Area
34. Blog Three Area
35. Blog Three Area
36. Services Details
37. Project Details
38. Blog Details Content
39. Contact Two
40. Sidebar Services
41. Appointment Card
42. Sidebar Project Details
43. Sidebar Post
44. Sidebar Post

------------------------------------------------------------------*/

"use strict";

/* =============================
* 1. Reuseable Animation
============================= */

// Move Element
function elementMove(selectors) {
    if (typeof selectors === "string") {
        selectors = [selectors];
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                el.style.animation = 'elementMoveY 2s ease-in-out infinite alternate';
                obs.unobserve(el);
            }
        });
    }, observerOptions);

    selectors.forEach(selector => {
        document.querySelectorAll("." + selector).forEach(el => {
            observer.observe(el);
        });
    });
}

const style = document.createElement('style');
style.innerHTML = `
@keyframes elementMoveY {
    0% { transform: translateY(-5px); }
    100% { transform: translateY(5px); }
}
`;
document.head.appendChild(style);

function fadeAnimation(type, selectors, options = {}) {
    const selectorArray = Array.isArray(selectors) ? selectors : [selectors];

    const presets = {
        "fade-in": { opacity: 0, y: 30 },
        "fade-up": { opacity: 0, y: 80 },
        "fade-left": { opacity: 0, x: -80 },
        "fade-right": { opacity: 0, x: 80 },
        "slide-left": { opacity: 0, x: -300 },
        "slide-right": { opacity: 0, x: 300 },
        "slide-up": { opacity: 0, y: 300 },
        "slide-down": { opacity: 0, y: -300 },
        "zoom-in": { opacity: 0, scale: 0.8 },
        "zoom-out": { opacity: 0, scale: 1.2 }
    };

    const fromConfig = presets[type] || presets["fade-up"];

    selectorArray.forEach(selector => {
        const elements = document.querySelectorAll('.' + selector);
        if (!elements.length) return;

        elements.forEach((el, index) => {
            // Set initial state
            el.style.opacity = fromConfig.opacity;
            el.style.transform = `translateX(${fromConfig.x || 0}px) translateY(${fromConfig.y || 0}px) scale(${fromConfig.scale || 1})`;

            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const duration = options.duration || 0.7;
                        const easing = options.easing || 'ease-out';
                        const delay = options.delay ? index * options.delay : 0;

                        setTimeout(() => {
                            el.style.transition = `opacity ${duration}s ${easing}, transform ${duration}s ${easing}`;
                            el.style.opacity = 1;
                            el.style.transform = 'translateX(0) translateY(0) scale(1)';
                        }, delay * 1000);

                        obs.unobserve(el);
                    }
                });
            }, { root: null, rootMargin: '0px', threshold: 0.1 });

            observer.observe(el);
        });
    });
}

// Init AOS
AOS.init({
    offset: 100,
    duration: 700,
    easing: 'ease-out-cubic',
    once: true
});

/* =============================
* 3. Fade Animation
============================= */
document.addEventListener('DOMContentLoaded', function () {

    /* =============================
    * 4. Helper Function
    ============================= */
    function elementExists(classNames) {
        if (!Array.isArray(classNames)) classNames = [classNames];
        return classNames.some(cls => document.querySelector(`.${cls}`));
    }

    /* =============================
    * 5. Hero One Area
    ============================= */
    if (elementExists(['hero--style-1'])) {
        fadeAnimation('fade-up', ['hero__title', 'hero__desc', 'hero__btn-wrap', 'hero__subtitle-wrap', 'hero__img', 'hero__form-wrap', 'hero__stats-item']);
        elementMove(['hero__shape-arrow']);
    }

    /* =============================
    * 6. About One Area
    ============================= */
    if (elementExists(['about--style-1'])) {
        fadeAnimation('fade-left', ['about__img-wrap', 'about__stat']);
        fadeAnimation('fade-up', ['about__subtitle-wrap', 'about__title', 'about__desc', 'services__item', 'about__btn-wrap']);
    }

    /* =============================
    * 7. Services One Area
    ============================= */
    if (elementExists(['services--style-1'])) {
        fadeAnimation('fade-up', ['services__top-subtitle-wrap', 'services__top-title', 'services__top-desc', 'service__desc']);
    }

    /* =============================
    * 8. Why Choose Us One Area
    ============================= */
    if (elementExists(['why-choose-us--style-1'])) {
        fadeAnimation('fade-up', ['why-choose-us__subtitle-wrap', 'why-choose-us__title', 'why-choose-us__desc', 'why-choose-us__btn-wrap']);
        fadeAnimation('zoom-in', ['why-choose-us__award']);
    }

    /* =============================
    * 9. Project One Area
    ============================= */
    if (elementExists(['projects--style-1'])) {
        fadeAnimation('fade-up', ['projects__filter-item', 'projects__subtitle-wrap', 'projects__title', 'projects__desc', 'projects__btn']);
    }

    /* =============================
    * 10. Achievement One Area
    ============================= */
    if (elementExists(['achievement--style-1'])) {
        fadeAnimation('fade-up', ['achievement__left', 'achievement__subtitle-wrap', 'achievement__title', 'achievement__desc', 'achievement__stats', 'achievement__btn']);
        elementMove(['achievement__phn-number', 'achievement__home-icon', 'achievement__video-icon']);
    }

    /* =============================
    * 11. Team One Area
    ============================= */
    if (elementExists(['team--style-1'])) {
        fadeAnimation('fade-up', ['team__subtitle-wrap', 'team__title', 'team__desc', 'team__btn']);
    }

    /* =============================
    * 12. Testimonials One Area
    ============================= */
    if (elementExists(['testimonials--style-1'])) {
        fadeAnimation('fade-up', ['testimonials__subtitle-wrap', 'testimonials__title', 'testimonials__desc']);
    }

    /* =============================
    * 13. Pricing One Area
    ============================= */
    if (elementExists(['pricing--style-1'])) {
        fadeAnimation('fade-up', ['pricing__subtitle-wrap', 'pricing__title', 'pricing__desc']);
    }

    /* =============================
    * 14. Faq One Area
    ============================= */
    if (elementExists(['faq'])) {
        fadeAnimation('fade-up', ['faq__subtitle-wrap', 'faq__title', 'faq__desc']);
    }

    /* =============================
    * 15. Blog One Area
    ============================= */
    if (elementExists(['blog--style-1'])) {
        fadeAnimation('fade-up', ['blog__subtitle-wrap', 'blog__title', 'blog__desc', 'blog__btn']);
    }

    /* =============================
    * 16. Footer One Area
    ============================= */
    if (elementExists(['footer--style-1'])) {
        fadeAnimation('fade-up', ['footer__cta-title', 'footer__cta-desc', 'footer__cta-btn', 'footer__cta-bg']);
    }

    /* =============================
    * 17. Heo Two Area
    ============================= */
    if (elementExists(['hero--style-2'])) {
        fadeAnimation('fade-up', ['hero__title', 'hero__desc', 'hero__stat', 'hero__nav', 'hero__img']);
        fadeAnimation('zoom-out', ['hero__bg-text'], {
            to: {
                duration: 6,
                ease: "power2.out",
                scale: 2
            },
            scrollTrigger: {
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    }

    /* =============================
    * 18. About Two Area
    ============================= */
    if (elementExists(['about--style-2'])) {
        fadeAnimation('fade-up', ['about__title', 'about__desc', 'about__solution-text', 'about__feature']);
    }

    /* =============================
    * 19. Services Two Area
    ============================= */
    if (elementExists(['services--style-2'])) {
        fadeAnimation('fade-up', ['services__subtitle', 'services__title', 'services__desc', 'stat__number', 'stat__text']);
        fadeAnimation('fade-right', ['about__stat']);
        fadeAnimation('zoom-in', ['about__image'], {
            to: {
                ease: "power1.inOut"
            },
            scrollTrigger: {
                start: "top 80%"
            }
        });
    }

    /* =============================
    * 20. Services Two Area
    ============================= */
    if (elementExists(['projects--style-2'])) {
        fadeAnimation('fade-up', ['projects__subtitle', 'projects__title', 'projects__desc', 'projects__slider', 'slider__nav']);
    }

    /* =============================
    * 21. Started One Area
    ============================= */
    if (elementExists(['started--style-1'])) {
        fadeAnimation('fade-up', ['started__title', 'statistics__item']);
    }

    /* =============================
    * 22. Work Process One Area
    ============================= */
    if (elementExists(['work-process--style-1'])) {
        fadeAnimation('fade-up', ['work-process__title', 'work-process__desc', 'step-card']);
    }

    /* =============================
    * 23. Team Two Area
    ============================= */
    if (elementExists(['team--style-2'])) {
        fadeAnimation('fade-up', ['team__title', 'team__desc', 'team__right']);
    }

    /* =============================
    * 24. testimonials Two Area
    ============================= */
    if (elementExists(['testimonials--style-2'])) {
        fadeAnimation('fade-up', ['testimonials__subtitle', 'testimonials__title', 'testimonials__desc', 'testimonials__right']);
    }

    /* =============================
    * 25. Services three Area
    ============================= */
    if (elementExists(['services--style-3'])) {
        fadeAnimation('fade-left', ['services__top ']);

        if (elementExists(['services__video-bottom'])) {
            fadeAnimation('fade-up', ['services__video-text', 'services__video-btn']);
        }
    }

    /* =============================
    * 26. Blog Two Area
    ============================= */
    if (elementExists(['blog--style-2'])) {
        fadeAnimation('fade-up', ['blog__title', 'blog__desc', 'blog__btn',]);
    }

    /* =============================
    * 27. Hero Three Area
    ============================= */
    if (elementExists(['hero--style-3'])) {
        // Top area
        fadeAnimation('fade-up', ['hero__subtitle'], { duration: 1, delay: 0.1 });
        fadeAnimation('fade-up', ['hero__review-area'], { duration: 1, delay: 0.2 });

        // Headings
        fadeAnimation('zoom-in', ['hero__title'], { duration: 1.2, delay: 0.5 });

        // Description + Button
        fadeAnimation('fade-up', ['hero__desc'], { duration: 1, delay: 0.4 });
        fadeAnimation('fade-right', ['hero__btn-wrap'], { duration: 1, delay: 0.5 });

        // Video thumbnail
        fadeAnimation('zoom-out', ['hero__video-wrap'], { duration: 2, delay: 0.4 });

        // Social icons stagger
        fadeAnimation('fade-left', ['hero__socials'], { duration: 2, delay: 0.3 });

        elementMove(['hero__socials-link']);
    }

    /* =============================
    * 28. About Three Area
    ============================= */
    if (elementExists(['about--style-3'])) {
        fadeAnimation('fade-up', ['about__title', 'about__desc', 'about__btn-wrap', 'about__solution', 'about__img', 'year__text', 'about__stat']);
    }

    /* =============================
    * 29. Services Four Area
    ============================= */
    if (elementExists(['services--style-4'])) {
        fadeAnimation('fade-up', ['services__title', 'services__desc', 'services__btn-all']);
    }

    /* =============================
    * 30. Project Three Area
    ============================= */
    if (elementExists(['projects--style-3'])) {
        fadeAnimation('fade-up', ['projects__title', 'projects__desc', 'projects__header-btn']);
        fadeAnimation('zoom-in', ['projects__item']);
    }

    /* =============================
    * 31. Work Process Two Area
    ============================= */
    if (elementExists(['work-process--style-2'])) {
        fadeAnimation('fade-up', ['work-process__title']);
        fadeAnimation('zoom-in', ['work-process__img-wrap']);
    }

    /* =============================
    * 31. Team Three Area
    ============================= */
    if (elementExists(['team--style-3'])) {
        fadeAnimation('fade-up', ['team__title', 'team__desc', 'team__header-right', 'team-slider']);
    }

    /* =============================
    * 32. Team Three Area
    ============================= */
    if (elementExists(['award--style-1'])) {
        fadeAnimation('fade-up', ['award__subtitle', 'award__title', 'award__desc', 'award__btn', 'award__list']);
    }

    /* =============================
    * 33. Contact One Area
    ============================= */
    if (elementExists(['contact--style-1'])) {
        fadeAnimation('fade-up', ['contact__title', 'contact__form-wrap', 'contact__info-title', 'contact__info-text', 'info-card']);
    }

    /* =============================
    * 34. Blog Three Area
    ============================= */
    if (elementExists(['blog--style-3'])) {
        fadeAnimation('fade-up', ['blog__title', 'blog__desc']);
    }

    /* =============================
    * 35. Blog Three Area
    ============================= */
    if (elementExists(['breadcrumbs'])) {
        fadeAnimation('fade-up', ['breadcrumbs__title', 'breadcrumbs__list']);
    }

    /* =============================
      * 36. Services Details
       ============================= */
    if (elementExists(['services-details__highlight-thumb'])) {
        fadeAnimation('fade-up', ['services-details__highlight-thumb', 'services-details__highlight-title', 'services-details__text']);
    }

    /* =============================
      * 37. Project Details
       ============================= */
    if (elementExists(['project-details'])) {
        fadeAnimation('fade-up', ['project-details__highlight-title', 'project-details__text', 'project-details__highlight-thumb', 'project-details__quote']);
    }

    /* =============================
      * 38. Blog Details Content
       ============================= */
    if (elementExists(['blog-details__content'])) {
        fadeAnimation('fade-up', ['blog-details__text', 'blog-details__highlight-title', 'blog-details__highlight-text', 'blog-details__list-item', 'blog-details__share']);
        fadeAnimation('zoom-in', ['blog-details__highlight-thumb'])
    }

    /* =============================
      * 39. Contact Two
       ============================= */
    if (elementExists(['contact--style-2'])) {
        fadeAnimation('fade-up', ['contact__title', 'contact__desc', 'contact__card', 'contact-form']);
        fadeAnimation('zoom-in', ['contact__map'])
    }

    /* =============================
      * 40. Sidebar Services
      ============================= */
    if (elementExists(['sidebar__services'])) {
        fadeAnimation('fade-up', ['sidebar__services', 'sidebar__title', 'sidebar__item']);
    }

    /* =============================
      * 41. Appointment Card
      ============================= */
    if (elementExists(['sidebar__appointment-card'])) {
        fadeAnimation('fade-up', ['sidebar__appointment-card', 'appointment-card__heading', 'appointment-card__description', 'appointment-card__actions']);
    }

    /* =============================
      * 42. Sidebar Project Details
      ============================= */
    if (elementExists(['sidebar__project-details'])) {
        fadeAnimation('fade-up', ['sidebar__project-details', 'sidebar__title', 'project-details__item']);
    }

    /* =============================
      * 43. Sidebar Post
      ============================= */
    if (elementExists(['sidebar__posts'])) {
        fadeAnimation('fade-up', ['sidebar__posts', 'sidebar-post', 'sidebar__subtitle']);
    }

    /* =============================
    * 44. Sidebar Post
    ============================= */
    if (elementExists(['gallery'])) {
        fadeAnimation('zoom-in', ['sidebar__subtitle', 'gallery__item']);
    }

});

/* =============================
* 3. Cards Animation
============================= */
fadeAnimation('fade-up', ['services__card',
    'why-choose-us__card',
    'projects__card',
    'team__member',
    'testimonials__card',
    'faq__item',
    'blog-card',
    'pricing__card',
    'services__item',
    'blog__card',
    'process-item',
    'blog__list-item',
    'contact__card'
]);

