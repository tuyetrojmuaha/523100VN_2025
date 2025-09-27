document.addEventListener('DOMContentLoaded', () => {
    // News Section Pagination
    const newsPages = document.querySelectorAll('.news-page');
    const prevNewsBtn = document.querySelector('.prev-news-btn');
    const nextNewsBtn = document.querySelector('.next-news-btn');
    const currentPageSpan = document.getElementById('current-page');
    const totalPagesSpan = document.getElementById('total-pages');

    let currentNewsPage = 0;
    const totalNewsPages = newsPages.length;

    if (totalPagesSpan) {
        totalPagesSpan.textContent = totalNewsPages;
    }

    function showNewsPage(index) {
        newsPages.forEach((page, i) => {
            page.classList.remove('active');
            if (i === index) {
                page.classList.add('active');
            }
        });
        if (currentPageSpan) {
            currentPageSpan.textContent = index + 1;
        }
    }

    if (prevNewsBtn && nextNewsBtn) {
        prevNewsBtn.addEventListener('click', () => {
            if (currentNewsPage > 0) {
                currentNewsPage--;
            } else {
                currentNewsPage = totalNewsPages - 1;
            }
            showNewsPage(currentNewsPage);
        });

        nextNewsBtn.addEventListener('click', () => {
            if (currentNewsPage < totalNewsPages - 1) {
                currentNewsPage++;
            } else {
                currentNewsPage = 0;
            }
            showNewsPage(currentNewsPage);
        });
        showNewsPage(currentNewsPage);
    }
    
    // Lifestyle Carousel
    const lifestyleCarousel = document.querySelector('.lifestyle-images');
    const lifestylePrevBtn = document.querySelector('.lifestyle-carousel .prev-btn');
    const lifestyleNextBtn = document.querySelector('.lifestyle-carousel .next-btn');
    
    if (lifestyleCarousel) {
        // Cần đảm bảo rằng các hình ảnh đã load để lấy kích thước chính xác
        let imageWidth = lifestyleCarousel.querySelector('img') ? lifestyleCarousel.querySelector('img').clientWidth : 0;
        let currentPosition = 0;
        const totalImages = lifestyleCarousel.children.length;

        // Cập nhật lại kích thước khi cửa sổ thay đổi
        window.addEventListener('resize', () => {
            imageWidth = lifestyleCarousel.querySelector('img') ? lifestyleCarousel.querySelector('img').clientWidth : 0;
            lifestyleCarousel.style.transform = `translateX(${currentPosition}px)`;
        });

        if (imageWidth > 0) {
            lifestyleNextBtn.addEventListener('click', () => {
                currentPosition -= imageWidth;
                if (currentPosition < -imageWidth * (totalImages - 1)) {
                    currentPosition = 0;
                }
                lifestyleCarousel.style.transform = `translateX(${currentPosition}px)`;
            });

            lifestylePrevBtn.addEventListener('click', () => {
                currentPosition += imageWidth;
                if (currentPosition > 0) {
                    currentPosition = -imageWidth * (totalImages - 1);
                }
                lifestyleCarousel.style.transform = `translateX(${currentPosition}px)`;
            });
        }
    }

    // Find Store Section - Filtering & Tab Switching
    const storeItems = document.querySelectorAll('.store-item');
    const cityDropdownLinks = document.querySelectorAll('#cityDropdownBtn + .dropdown-menu a');
    const storeDetailsContainer = document.getElementById('overview');

    function updateStoreDetails(storeId) {
        // Dữ liệu giả định chi tiết của từng siêu thị
        const storeData = {
            'aeon-tan-phu-celadon': {
                img: 'https://example.com/aeon-tan-phu-celadon.jpg',
                name: 'AEON Tân Phú Celadon',
                contact: 'Liên hệ DVKH 1800.888.886 - Zalo: 0366 565454',
                desc: 'Với diện tích hơn 70.000 m2, trung tâm thương mại AEON MALL Tân Phú Celadon là một trung tâm phức hợp với nhiều tiện ích hoàn hảo...'
            },
            'aeon-binh-tan': {
                img: 'https://example.com/aeon-binh-tan.jpg',
                name: 'AEON BÌNH TÂN',
                contact: 'Liên hệ DVKH 1800.888.886 - Zalo: 0366 565455',
                desc: 'Trung tâm mua sắm AEON Bình Tân cung cấp đa dạng sản phẩm và dịch vụ...'
            },
            'aeon-long-bien': {
                img: 'https://example.com/aeon-long-bien.jpg',
                name: 'AEON LONG BIÊN',
                contact: 'Liên hệ DVKH 1800.888.886 - Zalo: 0366 565456',
                desc: 'AEON Long Biên là điểm đến lý tưởng cho những ai muốn trải nghiệm mua sắm hiện đại tại Hà Nội.'
            },
        };

        const details = storeData[storeId];
        if (details && storeDetailsContainer) {
            storeDetailsContainer.innerHTML = `
                <div class="store-details">
                    <img src="${details.img}" class="img-fluid rounded-3 mb-3" alt="${details.name}">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h3>${details.name}</h3>
                        <a href="#" class="btn btn-info rounded-pill text-white">WEBSITE</a>
                    </div>
                    <p>${details.contact}</p>
                    <p class="store-description">${details.desc}</p>
                </div>
            `;
        }
    }

    if (storeItems.length > 0) {
        storeItems.forEach(item => {
            item.addEventListener('click', () => {
                const storeId = item.getAttribute('data-store');
                storeItems.forEach(store => store.classList.remove('active'));
                item.classList.add('active');
                updateStoreDetails(storeId);
            });
        });

        // Thiết lập trạng thái ban đầu
        storeItems[0].classList.add('active');
        const initialStoreId = storeItems[0].getAttribute('data-store');
        updateStoreDetails(initialStoreId);
    }

    if (cityDropdownLinks) {
        cityDropdownLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const selectedCity = e.target.getAttribute('data-value');
                document.getElementById('cityDropdownBtn').textContent = selectedCity;
                
                storeItems.forEach(item => {
                    const itemCity = item.getAttribute('data-city');
                    if (selectedCity === 'Tỉnh/Thành phố' || itemCity === selectedCity) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Scroll to top button
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.style.display = 'block';
            } else {
                scrollToTopBtn.style.display = 'none';
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    // ... (Giữ nguyên các hàm JavaScript trước đó) ...

    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Hiển thị nút khi cuộn xuống 300px
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', scrollToTop);
});
document.addEventListener('DOMContentLoaded', () => {
    // ... (Giữ nguyên các hàm carousel trước đó nếu có) ...

    const lifestyleCarousel = document.querySelector('.lifestyle-carousel');
    const lifestyleCards = document.querySelectorAll('.lifestyle-card');
    const prevLifestyleBtn = document.querySelector('.lifestyle-arrow.prev-arrow');
    const nextLifestyleBtn = document.querySelector('.lifestyle-arrow.next-arrow');

    let currentLifestyleIndex = 1; // Bắt đầu từ ảnh giữa (index 1)

    function updateLifestyleCarousel() {
        const cardWidth = lifestyleCards[0].offsetWidth; // Lấy chiều rộng của một thẻ
        const gap = 15; // Khoảng cách giữa các thẻ

        // Tính toán vị trí cuộn để ảnh active nằm chính giữa
        const scrollPosition = (cardWidth + gap) * (currentLifestyleIndex - 1);
        lifestyleCarousel.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });

        lifestyleCards.forEach((card, index) => {
            card.classList.remove('active');
            if (index === currentLifestyleIndex) {
                card.classList.add('active');
            }
        });
    }

    prevLifestyleBtn.addEventListener('click', () => {
        if (currentLifestyleIndex > 0) {
            currentLifestyleIndex--;
            updateLifestyleCarousel();
        } else {
            // Quay lại ảnh cuối cùng nếu đang ở ảnh đầu tiên
            currentLifestyleIndex = lifestyleCards.length - 1;
            updateLifestyleCarousel();
        }
    });

    nextLifestyleBtn.addEventListener('click', () => {
        if (currentLifestyleIndex < lifestyleCards.length - 1) {
            currentLifestyleIndex++;
            updateLifestyleCarousel();
        } else {
            // Quay lại ảnh đầu tiên nếu đang ở ảnh cuối cùng
            currentLifestyleIndex = 0;
            updateLifestyleCarousel();
        }
    });

    // Khởi tạo carousel phong cách sống khi tải trang
    updateLifestyleCarousel();
});