
/*============== Hero Slider========= */
if (document.querySelector(".card")) {
    const cards = document.querySelectorAll('.card');
    const dotsContainer = document.getElementById('dots');
    const totalCards = cards.length;
    let currentIndex = 3; 

    function initGallery() {
        dotsContainer.innerHTML = '';
        cards.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => updateMobileGallery(i));
            dotsContainer.appendChild(dot);
        });
        updateMobileGallery(currentIndex);
    }

    function updateMobileGallery(index) {
        if (window.innerWidth > 1024) return;

        // --- INFINITE LOOP LOGIC ---
        // যদি ইনডেক্স শেষ হয়ে যায় তবে শুরুতে ফিরবে, আর শুরুতে থাকলে শেষে যাবে
        currentIndex = (index + totalCards) % totalCards; 
        
        const dots = document.querySelectorAll('.dot');
        const prevIndex = (currentIndex - 1 + totalCards) % totalCards;
        const nextIndex = (currentIndex + 1) % totalCards;

        cards.forEach((card, i) => {
            card.classList.remove('active', 'prev', 'next');
            dots[i].classList.remove('active');

            if (i === currentIndex) {
                card.classList.add('active');
                dots[i].classList.add('active');
            } else if (i === prevIndex) {
                card.classList.add('prev');
            } else if (i === nextIndex) {
                card.classList.add('next');
            }
        });
    }

    // Drag/Swipe Support (Updated condition)
    let startX = 0;
    document.getElementById('track').addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX;
    });

    document.getElementById('track').addEventListener('touchend', (e) => {
        let endX = e.changedTouches[0].pageX;
        if (startX - endX > 50) { 
            // Swipe Left -> Next Card
            updateMobileGallery(currentIndex + 1);
        } else if (startX - endX < -50) { 
            // Swipe Right -> Prev Card
            updateMobileGallery(currentIndex - 1);
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth <= 1024) updateMobileGallery(currentIndex);
    });

    initGallery();
}

/*============== Product Slider========= */
if (document.querySelector(".product__slider_1")) {
    var product_slider_1 = new Swiper(".product__slider_1", {
        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true,
        },
    });
}

/* ======================= Faq ======================= */
if (document.querySelector(".faq__item")) {
    document.addEventListener('DOMContentLoaded', () => {
        const items = document.querySelectorAll('.faq__item');

        const toggleItem = (item) => {
            const content = item.querySelector('.faq__content');

            if (item.classList.contains('faq__item--active')) {
                content.style.maxHeight = content.scrollHeight + 14 + "px";
            } else {
                content.style.maxHeight = "0px";
            }
        };

        items.forEach(item => toggleItem(item));
        items.forEach(item => {
            const header = item.querySelector('.faq__header');

            header.addEventListener('click', () => {
                const isActive = item.classList.contains('faq__item--active');
                console.log('cliked');
                items.forEach(i => {
                    i.classList.remove('faq__item--active');
                    i.querySelector('.faq__content').style.maxHeight = "0px";
                });

                if (!isActive) {
                    item.classList.add('faq__item--active');
                    toggleItem(item);
                }
            });
        });
    })
};

/*============== Product Card Image Slider========= */
if (document.querySelector(".product--details")) {
    let currentIndex = 0;

    // DOM elements
    const slider = document.getElementById("slider");
    const sliderInner = document.getElementById("sliderInner");
    const thumbnails = document.getElementById("thumbnails");

    // All thumbnail elements (already in HTML)
    const thumbElements = thumbnails.querySelectorAll(".product-card__thumb");

    // All slide elements (already in HTML)
    const slideElements = sliderInner.querySelectorAll(".product-card__slide");

    // Number of images/slides
    const totalSlides = slideElements.length;

    // ================================================
    // Thumbnail click handling
    // ================================================
    thumbElements.forEach((thumb, index) => {
        thumb.addEventListener("click", () => {
            currentIndex = index;
            goToIndex(currentIndex);
            updateActiveThumb();
        });
    });

    // ================================================
    // Active thumbnail highlight
    // ================================================
    function updateActiveThumb() {
        thumbElements.forEach((thumb, i) => {
            thumb.classList.toggle("product-card__thumb--active", i === currentIndex);
        });
    }

    // ================================================
    // Move slider to specific index
    // ================================================
    function goToIndex(idx, smooth = true) {
        sliderInner.style.transition = smooth
            ? "transform 0.45s cubic-bezier(0.23, 1, 0.32, 1)"
            : "none";

        sliderInner.style.transform = `translateX(-${idx * 100}%)`;

        currentIndex = idx;
        updateActiveThumb();
    }

    // ================================================
    // Initialize on page load
    // ================================================
    function init() {
        // Make sure first thumbnail is active
        updateActiveThumb();

        // Show first slide without animation
        goToIndex(0, false);
    }

    init();


    // ================================================
    // Drag / Swipe logic
    // ================================================
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationFrame;

    function getPositionX(e) {
        return e.type.includes("mouse") ? e.pageX : (e.touches?.[0]?.clientX || 0);
    }

    function setSliderPosition() {
        sliderInner.style.transform = `translateX(${currentTranslate}px)`;
    }

    function animation() {
        setSliderPosition();
        if (isDragging) animationFrame = requestAnimationFrame(animation);
    }

    function touchStart(e) {
        isDragging = true;
        startX = getPositionX(e);
        prevTranslate = -currentIndex * slider.offsetWidth;
        currentTranslate = prevTranslate;

        sliderInner.style.transition = "none";
        cancelAnimationFrame(animationFrame);
        animationFrame = requestAnimationFrame(animation);

        e.preventDefault(); // prevent page scroll on touch
    }

    function touchMove(e) {
        if (!isDragging) return;
        const currentX = getPositionX(e);
        currentTranslate = prevTranslate + currentX - startX;

        // Optional light resistance at edges
        const max = 0;
        const min = -(totalSlides - 1) * slider.offsetWidth;
        if (currentTranslate > max) {
            currentTranslate = max + (currentTranslate - max) * 0.4;
        }
        if (currentTranslate < min) {
            currentTranslate = min + (currentTranslate - min) * 0.4;
        }
    }

    function touchEnd() {
        if (!isDragging) return;
        isDragging = false;
        cancelAnimationFrame(animationFrame);

        const movedBy = currentTranslate - prevTranslate;
        const threshold = slider.offsetWidth * 0.22; // 22% of width → change slide

        let targetIndex = currentIndex;

        if (movedBy < -threshold && currentIndex < totalSlides - 1) {
            targetIndex++;
        } else if (movedBy > threshold && currentIndex > 0) {
            targetIndex--;
        }

        sliderInner.style.transition = "transform 0.42s cubic-bezier(0.25, 0.8, 0.25, 1)";
        goToIndex(targetIndex);
    }

    // Attach events
    slider.addEventListener("mousedown", touchStart);
    window.addEventListener("mousemove", touchMove);
    window.addEventListener("mouseup", touchEnd);
    window.addEventListener("mouseleave", touchEnd);

    slider.addEventListener("touchstart", touchStart, { passive: false });
    window.addEventListener("touchmove", touchMove, { passive: false });
    window.addEventListener("touchend", touchEnd);
    window.addEventListener("touchcancel", touchEnd);

    // Prevent image dragging
    slider.addEventListener("dragstart", e => e.preventDefault());

}

// =====================Quantity functionality===================
document.addEventListener('DOMContentLoaded', () => {
    const qtyWrappers = document.querySelectorAll('.product__qty-control, .product-card__quantity');

    qtyWrappers.forEach(wrapper => {
        const qtyElement = wrapper.querySelector('.product__qty-number');
        const btnIncrement = wrapper.querySelector('.product__qty-btn--increment');
        const btnDecrement = wrapper.querySelector('.product__qty-btn--decrement');

        if (qtyElement && btnIncrement && btnDecrement) {
            
            btnIncrement.addEventListener('click', (e) => {
                e.preventDefault();
                let currentQty = parseInt(qtyElement.textContent) || 1;
                qtyElement.textContent = currentQty + 1;
            });

            btnDecrement.addEventListener('click', (e) => {
                e.preventDefault();
                let currentQty = parseInt(qtyElement.textContent) || 1;
                if (currentQty > 1) {
                    qtyElement.textContent = currentQty - 1;
                }
            });
        }
    });
});

// ================Vanish Submit Btn==========================
if (document.querySelector(".vanish__input")) {
    const input = document.querySelector(".vanish__input");
    const submitBtn = document.querySelector(".vanish__button");

    input.addEventListener("input", function () {
        if (input.value.trim() === "") {
            submitBtn.setAttribute("disabled", "true");
            submitBtn.classList.add("disabled");
        } else {
            submitBtn.removeAttribute("disabled");
            submitBtn.classList.remove("disabled");
        }
    });
}

// ========================Offcanvas==============================
document.addEventListener('DOMContentLoaded', function () {
    const offcanvas = document.querySelector('.offcanvas');
    const offcanvasToggle = document.querySelector('#offcanvas-toggle');
    const offcanvasClose = document.querySelector('#offcanvas-close');
    const offcanvasNavMenu = document.querySelector('#offcanvas-nav-menu');
    const body = document.body;

    if (offcanvas) {
        const overlay = document.createElement('div');
        overlay.classList.add('offcanvas-overlay');
        document.body.appendChild(overlay);

        const openOffcanvas = () => {
            offcanvas.classList.add('active');
            overlay.classList.add('offcanvas-overlay---active');
            body.classList.add('offcanvas-active');
        };

        const closeOffcanvas = () => {
            offcanvas.classList.remove('active');
            overlay.classList.remove('offcanvas-overlay---active');
            body.classList.remove('offcanvas-active');
        };

        offcanvasToggle.addEventListener('click', openOffcanvas);

        if (offcanvasClose) {
            offcanvasClose.addEventListener('click', closeOffcanvas);
        }

        overlay.addEventListener('click', closeOffcanvas);

        const parentLinks = offcanvasNavMenu.querySelectorAll('.nav__item-has-children > .nav__link');
        parentLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                this.classList.toggle('active');

                const submenu = this.nextElementSibling;
                if (submenu) {
                    submenu.classList.toggle('active');
                }
            });
        });

        document.addEventListener('click', function (e) {
            if (offcanvas.classList.contains('active') && !offcanvas.contains(e.target) && !offcanvasToggle.contains(e.target) && !overlay.contains(e.target)) {
                closeOffcanvas();
            }
        });

        const navLinks = offcanvasNavMenu.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                const parentItem = this.parentElement;
                if (!parentItem.classList.contains('nav__item-has-children')) {
                    closeOffcanvas();
                }
            });
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 1200 && offcanvas.classList.contains('active')) {
                closeOffcanvas();
            }

            if (window.innerWidth > 1200) {
                document.querySelectorAll('.nav__item-has-children > .nav__link').forEach(link => {
                    link.classList.remove('active');
                });
                document.querySelectorAll('.nav__submenu').forEach(submenu => {
                    submenu.classList.remove('active');
                });
            }
        });
    }
});