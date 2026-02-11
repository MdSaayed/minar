/*------------------------------------------------------------------
Template Name: Minar Ease
Template URL: https://minar-ease.netlify.app
Description:
Author: Kitdokan
Author URL: https://themeforest.net/user/kitdokan
Version: 1.0
-------------------------------------------------------------------

JS INDEX
=================== */


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

            /* Initial state */
            el.style.opacity = fromConfig.opacity;
            el.style.transform =
                `translateX(${fromConfig.x || 0}px)
                 translateY(${fromConfig.y || 0}px)
                 scale(${fromConfig.scale || 1})`;

            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {

                        const duration = options.duration || 0.7;
                        const easing = options.easing || 'ease-out';
                        const delay = options.delay ? index * options.delay : 0;

                        setTimeout(() => {

                            el.style.transition =
                                `opacity ${duration}s ${easing},
                                 transform ${duration}s ${easing}`;

                            el.style.opacity = 1;
                            el.style.transform =
                                'translateX(0) translateY(0) scale(1)';

                            /* animation end হলে reset */
                            el.addEventListener('transitionend', () => {
                                el.classList.remove('aos-animate');
                                el.removeAttribute('data-aos');

                                el.style.removeProperty('transition');
                                el.style.removeProperty('transform'); // IMPORTANT
                                el.style.removeProperty('opacity');

                            }, { once: true });

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

    function elementExists(classNames) {
        if (!Array.isArray(classNames)) classNames = [classNames];
        return classNames.some(cls => document.querySelector(`.${cls}`));
    }

    // Hero Area
    if (elementExists(['hero--one'])) {
        fadeAnimation('fade-up', ['hero__title', 'hero__subtitle-text', 'hero__desc', 'hero__btn-wrap'], {
            delay: 0.3,
            duration: 0.7,
            easing: 'ease-out'
        });
    }
    if (elementExists(['hero--one'])) {
        fadeAnimation('zoom-in', ['hero__gallery-wrapper'], {
            delay: 0.3,
            duration: 0.7,
            easing: 'ease-out'
        });
    }

    // Awareness Area
    if (elementExists(['awareness'])) {
        fadeAnimation('fade-in', ['awareness__subtitle-wrap', 'awareness__title', 'awareness__subtitle-text', 'awareness__desc', 'awareness__btn'], {
            delay: 0.3,
            duration: 0.7,
            easing: 'ease-out'
        });
    }

    if (elementExists(['awareness'])) {
        fadeAnimation('zoom-in', ['awareness__image'], {
            delay: 0.3,
            duration: 0.7,
            easing: 'ease-out'
        });
    }

    // Product Area
    if (elementExists(['product--home-page'])) {
        fadeAnimation('fade-in', ['product__area'], {
            delay: 0.3,
            duration: 0.7,
            easing: 'ease-out'
        });
    }

    // Why Choose Us Area
    if (elementExists(['why-choose-us'])) {
        fadeAnimation('fade-in', ['why-choose-us__subtitle', 'why-choose-us__title', 'why-choose-us__subtitle-text', 'why-choose-us__desc', 'why-choose-us__btn-wrap'], {
            delay: 0.3,
            duration: 0.7,
            easing: 'ease-out'
        });
    }

    if (elementExists(['why-choose-us'])) {
        fadeAnimation('zoom-in', ['why-choose-us__orbit-area'], {
            delay: 0.3,
            duration: 0.7,
            easing: 'ease-out'
        });
    }

    // Testimonials Area
    if (elementExists(['testimonials--style-one'])) {
        fadeAnimation('fade-in', ['testimonials__subtitle', 'testimonials__title', 'testimonials__subtitle-text', 'testimonials__text', 'testimonials__author-name', 'testimonials__content'], {
            delay: 0.3,
            duration: 0.7,
            easing: 'ease-out'
        });
    }

    if (elementExists(['testimonials--style-one'])) {
        fadeAnimation('zoom-in', ['testimonials__orbit'], {
            delay: 0.3,
            duration: 0.7,
            easing: 'ease-out'
        });
    }

    // Breadcrumbs Area
    if (elementExists(['breadcrumbs'])) {
        fadeAnimation('fade-in', ['breadcrumbs__title', 'breadcrumbs__subtitle-wrap', 'breadcrumbs__desc'], {
            delay: 0.3,
            duration: 0.7,
            easing: 'ease-out'
        });
    }
    if (elementExists(['breadcrumbs'])) {
        fadeAnimation('zoom-in', ['mission__image-wrap'], {
            delay: 0.5,
            duration: 0.7,
            easing: 'ease-out'
        });
    }

    // Mission Area
    if (elementExists(['mission--style-one'])) {
        fadeAnimation('zoom-in', ['mission__image-wrap'], {
            delay: 0.5,
            duration: 0.7,
            easing: 'ease-out'
        });
    }

    if (elementExists(['mission--style-one'])) {
        fadeAnimation('fade-in', ['mission__bottom', 'mission__title', 'mission__subtitle-text', 'mission__text--left','mission__text-limit'], {
            delay: 0.3,
            duration: 0.7,
            easing: 'ease-out'
        });
    }

    // Experience Area
    if (elementExists(['experience'])) {
        fadeAnimation('fade-in', ['experience__subtitle-wrap', 'experience__title'], {
            delay: 0.3,
            duration: 0.7,
            easing: 'ease-out'
        });
    }
    if (elementExists(['experience'])) {
        fadeAnimation('zoom-in', ['experience__card'], {
            delay: 0.3,
            duration: 0.4,
            easing: 'ease-out'
        });
    }

    // Product Card
    if (elementExists(['product--product-page'])) {
        fadeAnimation('fade-in', ['product--product-page', 'product__card'], {
            delay: 0.3,
            duration: 0.7,
            easing: 'ease-out'
        });
    }

    // Faq Area
    if (elementExists(['faq'])) {
        fadeAnimation('fade-in', ['faq__title', 'faq__item'], {
            delay: 0.3,
            duration: 0.7,
            easing: 'ease-out'
        });
    }

});


