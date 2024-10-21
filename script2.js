
const images = document.querySelectorAll("img");

function check(entries) {
  entries.map((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}

const observer = new IntersectionObserver(check);

images.forEach((image) => observer.observe(image));
