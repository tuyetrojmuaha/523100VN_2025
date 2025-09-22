// Hero Banner Slider Functionality
class HeroSlider {
    constructor(bannerElement) {
        this.bannerElement = bannerElement || document.querySelector('.hero-banner');
        if (!this.bannerElement) return;
        
        this.slides = this.bannerElement.querySelectorAll('.banner-slide');
        this.dots = this.bannerElement.querySelectorAll('.dot');
        this.prevBtn = this.bannerElement.querySelector('.prev-btn');
        this.nextBtn = this.bannerElement.querySelector('.next-btn');
        this.currentSlide = 0;
        this.slideInterval = null;
        
        // Preload slide images to prevent blank flashes
        this.bannerElement.querySelectorAll('.banner-slide img').forEach(img => {
            const preloader = new Image();
            preloader.src = img.src;
        });
        
        this.init();
    }
    
    init() {
        if (!this.slides.length) return;
        this.bindEvents();
        this.showSlide(this.currentSlide);
        this.startAutoSlide();
    }
    
    bindEvents() {
        // Previous button
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.stopAutoSlide();
                this.previousSlide();
                this.startAutoSlide();
            });
        }
        
        // Next button
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.stopAutoSlide();
                this.nextSlide();
                this.startAutoSlide();
            });
        }
        
        // Dots navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.stopAutoSlide();
                this.goToSlide(index);
                this.startAutoSlide();
            });
        });
        
        // Pause on hover
        this.bannerElement.addEventListener('mouseenter', () => this.stopAutoSlide());
        this.bannerElement.addEventListener('mouseleave', () => this.startAutoSlide());
    }
    
    showSlide(index) {
        const total = this.slides.length;
        const normalizedIndex = ((index % total) + total) % total;
        
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.dots.forEach(dot => dot.classList.remove('active'));
        
        this.slides[normalizedIndex].classList.add('active');
        if (this.dots[normalizedIndex]) this.dots[normalizedIndex].classList.add('active');
        
        this.currentSlide = normalizedIndex;
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(nextIndex);
    }
    
    previousSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prevIndex);
    }
    
    goToSlide(index) {
        this.showSlide(index);
    }
    
    startAutoSlide() {
        if (this.slideInterval) return;
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    
    stopAutoSlide() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }
}

// Shopping Cart Functionality
class ShoppingCart {
    constructor() {
        this.cart = [];
        this.cartCount = document.querySelector('.cart-count');
        this.addToCartBtns = document.querySelectorAll('.add-to-cart');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateCartCount();
    }
    
    bindEvents() {
        this.addToCartBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productCard = e.target.closest('.product-card');
                const productName = productCard.querySelector('h3').textContent;
                const productPrice = productCard.querySelector('.product-price').textContent;
                
                this.addToCart({
                    name: productName,
                    price: productPrice,
                    id: Date.now() // Simple ID generation
                });
                
                this.showAddToCartAnimation(e.target);
            });
        });
    }
    
    addToCart(product) {
        this.cart.push(product);
        this.updateCartCount();
        this.showNotification(`${product.name} added to cart!`);
    }
    
    updateCartCount() {
        if (this.cartCount) {
            this.cartCount.textContent = this.cart.length;
        }
    }
    
    showAddToCartAnimation(button) {
        const originalText = button.textContent;
        button.textContent = 'Added!';
        button.style.background = '#27ae60';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '#3498db';
        }, 1500);
    }
    
    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Search Functionality
class SearchFeature {
    constructor() {
        this.searchInput = document.querySelector('.search-input');
        this.searchBtn = document.querySelector('.search-btn');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        this.searchBtn.addEventListener('click', () => this.performSearch());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });
    }
    
    performSearch() {
        const query = this.searchInput.value.trim();
        if (query) {
            this.showNotification(`Searching for: "${query}"`);
            // Here you would typically send the search query to a server
            // For now, we'll just show a notification
        }
    }
    
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #3498db;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Newsletter Subscription
class NewsletterSubscription {
    constructor() {
        this.newsletterInput = document.querySelector('.newsletter-input');
        this.newsletterBtn = document.querySelector('.newsletter-btn');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        this.newsletterBtn.addEventListener('click', () => this.subscribe());
        this.newsletterInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.subscribe();
            }
        });
    }
    
    subscribe() {
        const email = this.newsletterInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            this.showNotification('Please enter your email address', 'error');
            return;
        }
        
        if (!emailRegex.test(email)) {
            this.showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        this.showNotification('Thank you for subscribing to our newsletter!', 'success');
        this.newsletterInput.value = '';
    }
    
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        const bgColor = type === 'success' ? '#27ae60' : '#e74c3c';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${bgColor};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Smooth Scrolling for Navigation
class SmoothScrolling {
    constructor() {
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        // Add smooth scrolling to all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}


// Language Switcher Functionality - Fixed Version
function initLanguageSwitcher() {
    // Wait for DOM to be fully loaded
    setTimeout(function() {
        console.log('Initializing language switcher...');
        
        const langBtn = document.getElementById('lang-btn');
        const langDropdown = document.getElementById('lang-dropdown');
        
        console.log('Lang button found:', langBtn);
        console.log('Lang dropdown found:', langDropdown);
        
        if (!langBtn || !langDropdown) {
            console.error('Language switcher elements not found!');
            return;
        }
        
        // Toggle dropdown when clicking the language button
        langBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Language button clicked');
            
            // Toggle the show class
            if (langDropdown.classList.contains('show')) {
                langDropdown.classList.remove('show');
                langBtn.classList.remove('active');
                console.log('Hiding dropdown');
            } else {
                langDropdown.classList.add('show');
                langBtn.classList.add('active');
                console.log('Showing dropdown');
            }
        });
        
        // Handle language selection
        langDropdown.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (e.target.tagName === 'A') {
                const lang = e.target.getAttribute('data-lang');
                console.log('Language selected:', lang);
                
                // Update button text
                const currentLangSpan = langBtn.querySelector('.current-lang');
                if (currentLangSpan) {
                    currentLangSpan.textContent = lang.toUpperCase();
                }
                
                // Update active state
                langDropdown.querySelectorAll('a').forEach(function(link) {
                    link.classList.remove('active');
                });
                e.target.classList.add('active');
                
                // Close dropdown
                langDropdown.classList.remove('show');
                langBtn.classList.remove('active');
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
                langDropdown.classList.remove('show');
                langBtn.classList.remove('active');
            }
        });
        
    }, 100);
}

function showLanguageNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #3498db;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 2000);
}

// Find AEON Near Me Functionality - Disabled
class FindAEONNearMe {
    constructor() {
        // Button exists but no functionality
        this.findBtn = document.querySelector('.find-aeon-btn');
        // No initialization needed - button does nothing
    }
}

// Lifestyle mini carousel (3 items)
(function initLifestyleCarousel(){
    const track = document.querySelector('.ls-track');
    if (!track) return;
    const prevBtn = document.querySelector('.ls-prev');
    const nextBtn = document.querySelector('.ls-next');

    function syncMain(){
        const items = Array.from(track.querySelectorAll('.ls-item'));
        items.forEach((el, idx) => el.classList.toggle('ls-main', idx === 1));
    }

    function rotateLeft(){
        const items = track.querySelectorAll('.ls-item');
        if (items.length !== 3) return;
        // Move first to the end so second becomes center
        track.appendChild(items[0]);
        syncMain();
    }

    function rotateRight(){
        const items = track.querySelectorAll('.ls-item');
        if (items.length !== 3) return;
        // Move last to the front so it becomes center after reorder
        track.insertBefore(items[2], items[0]);
        syncMain();
    }

    prevBtn && prevBtn.addEventListener('click', rotateLeft);
    nextBtn && nextBtn.addEventListener('click', rotateRight);
    syncMain();
})();

// News pagination: show 3 at a time
(function initNewsPager(){
    const grid = document.getElementById('news-grid');
    const nextBtn = document.getElementById('news-next');
    const prevBtn = document.getElementById('news-prev');
    const pageEl = document.getElementById('news-page');
    if (!grid || !nextBtn || !prevBtn || !pageEl) return;

    const cards = Array.from(grid.querySelectorAll('.news-card'));
    const pageSize = 3;
    const actualPages = Math.ceil(cards.length / pageSize);
    const totalPagesDisplay = 4; // force display to 4 as requested
    let page = 0; // 0..totalPagesDisplay-1

    function render(){
        const actualPageIndex = page % actualPages; // map displayed page to actual content pages
        const start = actualPageIndex * pageSize;
        const end = start + pageSize;
        cards.forEach((card, idx) => {
            card.style.display = (idx >= start && idx < end) ? '' : 'none';
        });
        pageEl.textContent = `${page + 1} / ${totalPagesDisplay}`;
    }

    nextBtn.addEventListener('click', () => {
        page = (page + 1) % totalPagesDisplay;
        render();
    });

    prevBtn.addEventListener('click', () => {
        page = (page - 1 + totalPagesDisplay) % totalPagesDisplay;
        render();
    });

    render();
})();

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Initializing features...');
    
    // Initialize one slider per hero banner
    document.querySelectorAll('.hero-banner').forEach(banner => new HeroSlider(banner));
    
    new ShoppingCart();
    new SearchFeature();
    new NewsletterSubscription();
    new SmoothScrolling();
    initLanguageSwitcher(); // Use the new function
    new FindAEONNearMe();
    
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Test language switcher after a delay
    setTimeout(() => {
        const langBtn = document.getElementById('lang-btn');
        const langDropdown = document.getElementById('lang-dropdown');
        console.log('Final check - Lang button:', langBtn);
        console.log('Final check - Lang dropdown:', langDropdown);
        
        if (langBtn && langDropdown) {
            console.log('Language switcher elements are ready!');
        } else {
            console.error('Language switcher elements still not found!');
        }
    }, 500);
});
