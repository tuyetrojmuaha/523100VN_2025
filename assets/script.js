/* script.js - render dynamic content and fix dropdown hover
   - All image paths unified to media/...
   - subtitle handled safely to avoid "undefined"
   - dropdown hover only enabled on desktop widths
*/

/* =========================
   Data (all images in media/...)
   ========================= */
const heroSlides = [
    { img: "media/img.png", title: "Khai trương AEON Tân An", subtitle: "Ưu đãi đặc biệt mừng khai trương" },
    { img: "media/img_1.png", title: "Lễ hội Mẹ & Bé", subtitle: "Nhiều chương trình hấp dẫn cho gia đình" },
    { img: "media/img_2.png", title: "Ngày không túi ni-lông", subtitle: "Cùng AEON bảo vệ môi trường" }
];

const promotions = [
    { title: "Workshop Ẩm thực", img: "media/img_4.png" },
    { title: "Ngày hội siêu tiết kiệm", img: "media/img_5.png" },
    { title: "Ưu đãi hội viên AEON", img: "media/img_6.png" },
    { title: "Khuyến mãi sản phẩm TopValu", img: "media/img_7.png" }
];

const news = [
    { title: "AEON Việt Nam khai trương chi nhánh mới", img: "media/2.jpg", date: "01/09/2025" },
    { title: "Sự kiện Ngày không túi ni-lông", img: "media/3.jpg", date: "05/09/2025" }
];

const brands = [
    { name: "TOPVALU", logo: "media/2.jpg" },
    { name: "HOME COORDY", logo: "media/3.jpg" },
    { name: "Kids Republic", logo: "media/4.jpg" }
];

const stores = [
    { name: "AEON Tân Phú Celadon", address: "30 Bờ Bao Tân Thắng, Q. Tân Phú, TP.HCM", hotline: "1800.888.886", image: "media/2.jpg" },
    { name: "AEON Bình Dương Canary", address: "QL13, Thuận An, Bình Dương", hotline: "1800.888.887", image: "media/3.jpg" }
];

/* =========================
   Helpers
   ========================= */
function fallbackImage(el){
    // single fallback: set placeholder (remote); clear onerror to avoid loop
    if(!el) return;
    el.onerror = null;
    el.src = "https://via.placeholder.com/900x500?text=AEON";
}

function safe(id){ return document.getElementById(id) || null; }

/* =========================
   Render functions
   ========================= */
function renderHeroSlides(){
    const cont = safe("heroSlides");
    if(!cont){ console.warn("heroSlides not found"); return; }

    heroSlides.forEach((s,i) => {
        const div = document.createElement("div");
        div.className = `carousel-item ${i===0 ? "active" : ""}`;

        // create image node (so we can attach onerror programmatically too)
        const img = document.createElement("img");
        img.className = "d-block w-100";
        img.src = s.img;
        img.alt = s.title || `Slide ${i+1}`;
        img.onerror = function(){ fallbackImage(this); };

        // caption (only add subtitle if present)
        const caption = document.createElement("div");
        caption.className = "carousel-caption d-none d-md-block";
        const h = document.createElement("h5");
        h.textContent = s.title || "";
        caption.appendChild(h);
        if(s.subtitle){
            const p = document.createElement("p");
            p.textContent = s.subtitle;
            caption.appendChild(p);
        }

        div.appendChild(img);
        div.appendChild(caption);
        cont.appendChild(div);
    });
}

function renderPromotions(){
    const cont = safe("promotionsGrid");
    if(!cont){ console.warn("promotionsGrid not found"); return; }

    promotions.forEach(p => {
        const col = document.createElement("div");
        col.className = "col-sm-6 col-md-3";

        const card = document.createElement("div");
        card.className = "card h-100";

        const img = document.createElement("img");
        img.className = "card-img-top";
        img.src = p.img;
        img.alt = p.title;
        img.onerror = function(){ fallbackImage(this); };

        const body = document.createElement("div");
        body.className = "card-body";
        const h6 = document.createElement("h6");
        h6.className = "card-title";
        h6.textContent = p.title;

        body.appendChild(h6);
        card.appendChild(img);
        card.appendChild(body);
        col.appendChild(card);
        cont.appendChild(col);
    });
}

function renderNews(){
    const cont = safe("newsSlides");
    const indicators = safe("newsIndicators");
    const sideList = safe("newsListSide");

    if(!cont) console.warn("newsSlides not found");
    if(!indicators) console.warn("newsIndicators not found");
    if(!sideList) console.warn("newsListSide not found");

    news.forEach((n,i) => {
        if(cont){
            const item = document.createElement("div");
            item.className = `carousel-item ${i===0 ? "active" : ""}`;

            const img = document.createElement("img");
            img.className = "d-block w-100";
            img.src = n.img;
            img.alt = n.title;
            img.onerror = function(){ fallbackImage(this); };

            const caption = document.createElement("div");
            caption.className = "carousel-caption d-none d-md-block";
            const h6 = document.createElement("h6");
            h6.className = "mb-1";
            h6.textContent = n.title;
            const small = document.createElement("small");
            small.className = "text-light";
            small.textContent = n.date || "";

            caption.appendChild(h6);
            caption.appendChild(small);

            item.appendChild(img);
            item.appendChild(caption);
            cont.appendChild(item);
        }

        if(indicators){
            const btn = document.createElement("button");
            btn.type = "button";
            btn.setAttribute("data-bs-target", "#newsCarousel");
            btn.setAttribute("data-bs-slide-to", String(i));
            btn.setAttribute("aria-label", `Slide ${i+1}`);
            if(i===0){ btn.className = "active"; btn.setAttribute("aria-current","true"); }
            indicators.appendChild(btn);
        }

        if(sideList){
            const li = document.createElement("li");
            li.className = "mb-2";
            li.innerHTML = `<a href="#" class="text-decoration-none"><strong>${n.title}</strong><br><small class="text-muted">${n.date || ""}</small></a>`;
            sideList.appendChild(li);
        }
    });
}

function renderBrands(){
    const cont = safe("brandsGrid");
    if(!cont){ console.warn("brandsGrid not found"); return; }

    brands.forEach(b => {
        const col = document.createElement("div");
        col.className = "col-6 col-md-4 col-lg-3 text-center";
        col.innerHTML = `
      <div class="p-3 border rounded h-100 hover-scale bg-white">
        <img src="${b.logo}" alt="${b.name}" class="img-fluid mb-2" onerror="fallbackImage(this)">
        <p class="mb-0">${b.name}</p>
      </div>
    `;
        cont.appendChild(col);
    });
}

function showStoreDetail(i){
    const s = stores[i];
    if(!s) return;

    const img = safe("storeDetailImg");
    const name = safe("storeDetailName");
    const addr = safe("storeDetailAddr");
    const phone = safe("storeDetailPhone");

    if(img) { img.src = s.image; img.onerror = function(){ fallbackImage(this); }; }
    if(name) name.textContent = s.name;
    if(addr) addr.textContent = s.address;
    if(phone) phone.textContent = s.hotline || "";
}


function renderStores(){
    const cont = safe("storesList");
    if(!cont){ console.warn("storesList not found"); return; }

    stores.forEach((s,idx) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "list-group-item list-group-item-action";
        btn.innerHTML = `<strong>${s.name}</strong><br><small class="text-muted">${s.address}</small>`;
        btn.addEventListener("click", () => {
            cont.querySelectorAll(".list-group-item").forEach(el => el.classList.remove("active"));
            btn.classList.add("active");
            showStoreDetail(idx);
        });
        cont.appendChild(btn);
    });

    // default: show first
    showStoreDetail(0);
    const first = cont.querySelector(".list-group-item");
    if(first) first.classList.add("active");
}

/* set right-hand small tiles (tile1, tile2, thu4Img) */
function setStaticTileImages(){
    const tile1 = safe("tile1");
    const tile2 = safe("tile2");
    const thu4 = safe("thu4Img");

    if(tile1){ tile1.src = "media/2.jpg"; tile1.onerror = function(){ fallbackImage(this); }; }
    if(tile2){ tile2.src = "media/3.jpg"; tile2.onerror = function(){ fallbackImage(this); }; }
    if(thu4){ thu4.src = "media/4.jpg"; thu4.onerror = function(){ fallbackImage(this); }; }
}

/* =========================
   Dropdown hover fix
   - enabled only on desktop (>= 992px)
   ========================= */
function enableDropdownHover(){
    // on mobile, keep default bootstrap click/tap behaviour
    if(window.innerWidth < 992) return;

    const dropdowns = document.querySelectorAll(".nav .dropdown");
    dropdowns.forEach(drop => {
        drop.addEventListener("mouseenter", () => {
            drop.classList.add("show");
            const menu = drop.querySelector(".dropdown-menu");
            if(menu) menu.classList.add("show");
        });
        drop.addEventListener("mouseleave", () => {
            drop.classList.remove("show");
            const menu = drop.querySelector(".dropdown-menu");
            if(menu) menu.classList.remove("show");
        });
    });
}

/* =========================
   Init
   ========================= */
function initAll(){
    console.log("initAll running");
    renderHeroSlides();
    renderPromotions();
    renderNews();
    renderBrands();
    renderStores();
    setStaticTileImages();
    enableDropdownHover();

    // (Optional) if you want to debug whether elements are present:
    // console.log({ heroSlides: !!safe("heroSlides"), promotionsGrid: !!safe("promotionsGrid") });
}

/* Run init when DOM ready (works whether script loaded early or late) */
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
} else {
    initAll();
}

/* expose fallbackImage to global (used by onerror attributes in HTML) */
window.fallbackImage = fallbackImage;
