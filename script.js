AOS.init({
  duration: 1000,
  once: false,
  mirror: true,
  offset: 100
});




let lastScrollTop = 0;
const header = document.querySelector("header");
let ticking = false;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (!ticking) {
    window.requestAnimationFrame(() => {
      if (currentScroll > lastScrollTop && currentScroll > 80) {
        // Lefelé görgetés + ne triggereljen már 5px után
        header.classList.add("hide");
      } else {
        // Felfelé görgetés vagy az oldal tetején vagyunk
        header.classList.remove("hide");
      }
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
      ticking = false;
    });

    ticking = true;
  }
});

window.addEventListener("scroll", () => {
  const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  document.getElementById("progress-bar").style.width = scrolled + "%";
});


const sections = document.querySelectorAll("section");
const dots = document.querySelectorAll(".timeline .dot");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;

    if (scrollY >= top - height / 3) {
      current = section.getAttribute("id");
    }
  });

  dots.forEach((dot) => {
    dot.classList.remove("active");
    if (dot.dataset.target === current) {
      dot.classList.add("active");
    }
  });
});


dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    document.getElementById(dot.dataset.target).scrollIntoView({
      behavior: "smooth"
    });
  });
});