
/*============== Hero Slider========= */
if (document.querySelector(".card")) {
    const cards = document.querySelectorAll('.card');
    const dotsContainer = document.getElementById('dots');
    let currentIndex = 3; // Starting with the 4th image (index 3)

    // Generate Bullets
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

        currentIndex = index;
        const dots = document.querySelectorAll('.dot');

        cards.forEach((card, i) => {
            card.classList.remove('active', 'prev', 'next');
            dots[i].classList.remove('active');

            if (i === index) {
                card.classList.add('active');
                dots[i].classList.add('active');
            } else if (i === index - 1) {
                card.classList.add('prev');
            } else if (i === index + 1) {
                card.classList.add('next');
            }
        });
    }

    // Drag/Swipe Support for Mobile
    let startX = 0;
    document.getElementById('track').addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX;
    });

    document.getElementById('track').addEventListener('touchend', (e) => {
        let endX = e.changedTouches[0].pageX;
        if (startX - endX > 50 && currentIndex < cards.length - 1) {
            updateMobileGallery(currentIndex + 1);
        } else if (startX - endX < -50 && currentIndex > 0) {
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
// ================================================
// Global variables
// ================================================

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
    // Quantity functionality
    // ================================================
    let qty = 2;
    const qtyElement = document.getElementById("qty");
    if (qtyElement) qtyElement.textContent = qty;

    window.changeQty = function (delta) {
        qty = Math.max(1, qty + delta);
        if (qtyElement) qtyElement.textContent = qty;
    };

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






// ================testimonials==========================
document.addEventListener('DOMContentLoaded', () => {
    // ১. আপনার কন্টেন্ট ডাটা
    const data = [
        { name: "John Smith", text: "Text for the first avatar. Great experience!" },
        { name: "Sarah Khan", text: "This break was exactly what I needed to recharge." },
        { name: "Lieke Visser", text: "My screen-time report was bullying me. I bought this hoping it would stop my 11 PM doomscrolling — and somehow it worked." },
        { name: "Ahmed Raza", text: "The quality and focus I gained are amazing for my work." },
        { name: "Elena Doe", text: "I traded hours of scrolling for hours of creating every day!" }
    ];

    const allAvatars = document.querySelectorAll('.avatar');
    const allDots = document.querySelectorAll('.dot');
    const textEl = document.getElementById('testimonial-text');
    const authorEl = document.getElementById('testimonial-author');

    // ২. কমন ফাংশন যা সবকিছু আপডেট করবে
    function updateActiveSlide(index) {
        console.log("Updating to slide:", index); // ডিবাগিং এর জন্য

        // সব ইমেজ এবং ডট থেকে active ক্লাস রিমুভ করা
        allAvatars.forEach(av => av.classList.remove('active'));
        allDots.forEach(dot => dot.classList.remove('active'));

        // ক্লিক করা ইনডেক্স অনুযায়ী active ক্লাস অ্যাড করা
        allAvatars[index].classList.add('active');
        allDots[index].classList.add('active');

        // কন্টেন্ট আপডেট (Fade Effect সহ)
        if (textEl && authorEl) {
            textEl.parentElement.style.opacity = '0';
            setTimeout(() => {
                textEl.textContent = data[index].text;
                authorEl.textContent = data[index].name;
                textEl.parentElement.style.opacity = '1';
                textEl.parentElement.style.transition = 'opacity 0.4s';
            }, 200);
        }
    }

    // ৩. প্যাগিনেশন ডটে ক্লিক লজিক
    allDots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            updateActiveSlide(i);
        });
    });

    // ৪. ইমেজে ক্লিক লজিক (ইমেজে ক্লিক করলেও যেন ডট চেঞ্জ হয়)
    allAvatars.forEach((avatar, i) => {
        avatar.addEventListener('click', () => {
            updateActiveSlide(i);
        });
    });
});