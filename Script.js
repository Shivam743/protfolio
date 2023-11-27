// Enhanced smooth scroll functionality for anchor links with animation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));

    // Animate the scroll
    const targetPosition = target.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
      if (progress < duration) window.requestAnimationFrame(step);
    }

    window.requestAnimationFrame(step);
  });
});

// Easing function for the smooth scroll animation (easeInOutCubic)
function easeInOutCubic(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t * t + b;
  t -= 2;
  return c / 2 * (t * t * t + 2) + b;
}

// Contact form submission handler with animated feedback
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();

  // Gather input data here
  var formData = {
    name: this.querySelector('input[name="name"]').value,
    email: this.querySelector('input[name="email"]').value,
    message: this.querySelector('textarea[name="message"]').value
  };

  // Process the form data, e.g., send it to a server or display a success message
  console.log(formData);

  // Show an animated thank-you message
  const thanksMessage = document.createElement('div');
  thanksMessage.innerHTML = `Thank you for your message, ${formData.name}!`;
  thanksMessage.style.position = 'fixed';
  thanksMessage.style.left = '50%';
  thanksMessage.style.top = '50%';
  thanksMessage.style.transform = 'translate(-50%, -50%)';
  thanksMessage.style.padding = '2rem';
  thanksMessage.style.background = '#5cb85c';
  thanksMessage.style.color = '#fff';
  thanksMessage.style.textAlign = 'center';
  thanksMessage.style.borderRadius = '10px';
  thanksMessage.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  thanksMessage.style.opacity = '0';
  thanksMessage.style.transition = 'opacity 0.5s';
  document.body.appendChild(thanksMessage);

  // Fade in the thank-you message and then fade out
  setTimeout(() => { thanksMessage.style.opacity = '1'; }, 10);
  setTimeout(() => { thanksMessage.style.opacity = '0'; }, 3000);
  setTimeout(() => { document.body.removeChild(thanksMessage); }, 3500);

  // Reset the contact form
  this.reset();
});
