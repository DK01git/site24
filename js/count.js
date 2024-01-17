function animateCount(element, target, duration) {
  let start = 0;
  const increment = target / (duration / 16);

  function updateCount() {
    start += increment;
    element.textContent = Math.round(start);

    if (start < target) {
      requestAnimationFrame(updateCount);
    }
  }

  updateCount();
}

function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const targetElement = entry.target.querySelector('.features-title');
      const targetValue = parseInt(targetElement.textContent);

      // Add a delay before starting the animation (e.g., 1000 milliseconds)
      setTimeout(() => {
        animateCount(targetElement, targetValue, 2000);
        observer.unobserve(entry.target);
      }, 100); // Adjust the delay as needed
    }
  });
}

const myObserver = new IntersectionObserver(handleIntersection, { threshold: 0.5 });

document.querySelectorAll('.features-block').forEach(block => {
  myObserver.observe(block);
});
