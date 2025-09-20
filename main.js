
const langBtn = document.getElementById('langBtn');
const langMenu = document.getElementById('langMenu');

langBtn.addEventListener('click', () => {
    // toggle hiển thị
    langMenu.style.display = langMenu.style.display === 'block' ? 'none' : 'block';
});

langMenu.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', () => {
        // Cập nhật trạng thái active
        document.querySelectorAll('.lang-menu li').forEach(item =>
            item.classList.remove('active')
        );
        li.classList.add('active');

        // Hiển thị tên mới trên nút
        langBtn.innerHTML = li.dataset.lang + ' <i class="fa fa-chevron-down"></i>';

        // ĐÓNG menu cho dù chọn lại chính ngôn ngữ đó
        langMenu.style.display = 'none';
    });
});

// Đóng menu khi click ra ngoài
document.addEventListener('click', e => {
    if (!langBtn.contains(e.target) && !langMenu.contains(e.target)) {
        langMenu.style.display = 'none';
    }
});
document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo carousel chính (hero)
    const mainCarousel = new bootstrap.Carousel(document.getElementById('mainCarousel'), {
        interval: 3000,
        pause: 'hover'
    });
    const lifestyleCarousel = new bootstrap.Carousel(document.getElementById('lifestyleCarousel'), {
        interval: 4000, // Tự động chuyển sau 4 giây
        pause: 'hover'
    });
    
    // Khởi tạo carousel "MUA SẮM ONLINE"
    const onlineCarousel = new bootstrap.Carousel(document.getElementById('onlineCarousel'), {
        interval: 5000, // Tự động chuyển sau 5 giây
        pause: 'hover'
    });

    // ... (Giữ nguyên phần code xử lý ngôn ngữ, nếu có)

    // Xử lý hover cho các nút của carousel online
    const prevBottomButton = document.querySelector('.carousel-control-prev-bottom');
    const nextBottomButton = document.querySelector('.carousel-control-next-bottom');

    if (prevBottomButton && nextBottomButton) {
        prevBottomButton.addEventListener('mouseover', function() {
            this.querySelector('i').style.color = '#fff';
        });
        prevBottomButton.addEventListener('mouseout', function() {
            this.querySelector('i').style.color = '#fff'; // Giữ màu trắng khi hover
        });

        nextBottomButton.addEventListener('mouseover', function() {
            this.querySelector('i').style.color = '#fff';
        });
        nextBottomButton.addEventListener('mouseout', function() {
            this.querySelector('i').style.color = '#fff'; // Giữ màu trắng khi hover
        });
    }
});