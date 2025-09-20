// Ví dụ: nút back-to-top
document.addEventListener("DOMContentLoaded", function() {
  const backToTop = document.createElement("button");
  backToTop.innerText = "↑";
  backToTop.id = "backToTop";
  document.body.appendChild(backToTop);

  backToTop.style.position = "fixed";
  backToTop.style.bottom = "20px";
  backToTop.style.right = "20px";
  backToTop.style.display = "none";
  backToTop.style.background = "#e6007e";
  backToTop.style.color = "#fff";
  backToTop.style.border = "none";
  backToTop.style.borderRadius = "50%";
  backToTop.style.width = "40px";
  backToTop.style.height = "40px";

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      backToTop.style.display = "block";
    } else {
      backToTop.style.display = "none";
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

