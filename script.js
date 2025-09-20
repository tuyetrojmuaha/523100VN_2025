// Hàm tạo carousel tùy chỉnh
function createCarousel(containerId, images) {
    let index = 0;
    const container = document.getElementById(containerId);
    if (!container) return;

    const img = container.querySelector('.carousel-inner img');
    const [prevBtn, nextBtn] = [
        container.querySelector('.carousel-control-prev'),
        container.querySelector('.carousel-control-next')
    ];

    const update = () => img.src = images[index];

    prevBtn.addEventListener('click', () => {
        index = (index - 1 + images.length) % images.length;
        update();
    });

    nextBtn.addEventListener('click', () => {
        index = (index + 1) % images.length;
        update();
    });

    setInterval(() => {
        index = (index + 1) % images.length;
        update();
    }, 5000);
}

// Khởi tạo các carousel
createCarousel('main-carousel', [
    "upload/anh1.jpg",
    "upload/anh2.jpg",
    "upload/anh3.jpg",
    "upload/anh4.jpg"
]);

createCarousel('wednesday-carousel', [
    "upload/anhvv1.png",
    "upload/anhvv2.png",
    "upload/anhvv3.png"
]);

// Bootstrap carousels
['news-carousel', 'lifestyle-carousel'].forEach(id =>
    new bootstrap.Carousel(document.getElementById(id), {
        interval: false,
        wrap: true
    })
);
