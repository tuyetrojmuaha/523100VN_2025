// Tự động focus vào ô tìm kiếm khi tải trang
window.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.querySelector('.search-box input');
  if (searchInput) searchInput.focus();
});

// Thông báo khi bấm nút "TÌM AEON GẦN BẠN"
document.querySelector('.btn-pink').addEventListener('click', function() {
  alert('Tính năng này đang được phát triển!');
});

// Xử lý chọn ngôn ngữ (demo)
document.querySelectorAll('.dropdown-item').forEach(function(item) {
  item.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('.btn-lang').textContent = item.textContent;
  });
});

// Hiện overlay khi click vào event-card, ẩn khi click ra ngoài hoặc click lại
document.querySelectorAll('.event-card').forEach(function(card) {
  card.addEventListener('click', function(e) {
    // Ẩn overlay của các card khác
    document.querySelectorAll('.event-card .event-overlay').forEach(function(overlay) {
      overlay.style.opacity = '0';
    });
    // Hiện overlay của card vừa click
    const overlay = card.querySelector('.event-overlay');
    if (overlay) overlay.style.opacity = '1';
    // Ngăn sự kiện lan ra ngoài
    e.stopPropagation();
  });
});

// Ẩn overlay khi click ra ngoài vùng card
document.body.addEventListener('click', function() {
  document.querySelectorAll('.event-card .event-overlay').forEach(function(overlay) {
    overlay.style.opacity = '0';
  });
});

document.querySelectorAll('.find-aeon-section .list-group-item').forEach(function(item) {
  item.addEventListener('click', function() {
    document.querySelectorAll('.find-aeon-section .list-group-item').forEach(function(i) {
      i.classList.remove('active');
      i.style.background = '';
      i.style.color = '';
    });
    item.classList.add('active');
    item.style.background = '#ffe6f0';
    item.style.color = '#e6007e';

    const name = item.getAttribute('data-name');
    const img = item.getAttribute('data-img');
    const contact = item.getAttribute('data-contact');
    const desc = item.getAttribute('data-desc');

    const infoBox = document.querySelector('.find-aeon-section .col-md-8 .card');
    infoBox.querySelector('img').src = img;
    infoBox.querySelector('h4').textContent = name;
    infoBox.querySelector('.mb-2.text-secondary').innerHTML = contact + ' <a href="#" class="btn btn-pink float-end px-4 rounded-pill">WEBSITE</a>';
    infoBox.querySelector('p').textContent = desc;
  });
});

document.querySelectorAll('.find-aeon-section .tab-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    // Xóa active ở tất cả nút
    document.querySelectorAll('.find-aeon-section .tab-btn').forEach(function(b) {
      b.classList.remove('btn-pink');
      b.style.background = '#ffe6f0';
      b.style.color = '';
    });
    // Đánh dấu active cho nút vừa chọn
    btn.classList.add('btn-pink');
    btn.style.background = '';
    btn.style.color = '#fff';

    // Ẩn tất cả tab-content
    document.querySelectorAll('.find-aeon-section .tab-content').forEach(function(tab) {
      tab.style.display = 'none';
    });
    // Hiện tab-content tương ứng
    document.querySelector('.find-aeon-section .tab-' + btn.dataset.tab).style.display = 'block';
  });
});

// Lấy nút cuộn lên đầu trang
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

// Hiển thị hoặc ẩn nút khi cuộn trang
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

// Xử lý sự kiện click để cuộn lên đầu trang
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
// Thêm đoạn mã này vào file JavaScript của bạn hoặc vào thẻ <script>
document.addEventListener('DOMContentLoaded', function () {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', function() {
            this.querySelector('.dropdown-menu').classList.add('show');
        });

        dropdown.addEventListener('mouseleave', function() {
            this.querySelector('.dropdown-menu').classList.remove('show');
        });
    });
});