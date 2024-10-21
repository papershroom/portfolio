function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((element) => {
        if (isInViewport(element)) {
            element.style.opacity = '1'; 
            element.style.transform = 'translateY(0)'; 
            element.style.transform = 'translateX(0)'; 

            element.style.transition = 'opacity 1s ease-out, transform 1s ease-out'; 
        }
    });

}
function initRevealElements() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((element) => {
        element.style.opacity = '0';
        element.style.position = 'relative'; 
    });
}

// Run the reveal function on scroll
window.addEventListener('scroll', revealOnScroll);

window.addEventListener('load', () => {
    initRevealElements();
    revealOnScroll(); 
});
