
document.addEventListener("DOMContentLoaded", () => {

document.getElementById('contactForm').addEventListener('submit', async function(e) {

  e.preventDefault();

  let valid = true;
  // Clear previous errors
  document.getElementById('nameError').textContent = '';
  document.getElementById('emailError').textContent = '';
  document.getElementById('messageError').textContent = '';

  // Name validation
  const name = document.getElementById('name').value.trim();
  if (!name) {
      document.getElementById('nameError').textContent = 'Name is required.';
      valid = false;
  }

  // Email validation
  const email = document.getElementById('email').value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
      document.getElementById('emailError').textContent = 'Email is required.';
      valid = false;
  } else if (!emailPattern.test(email)) {
      document.getElementById('emailError').textContent = 'Invalid email address.';
      valid = false;
  }

  // Message validation
  const message = document.getElementById('message').value.trim();
  if (!message) {
      document.getElementById('messageError').textContent = 'Message is required.';
      valid = false;
  }

  if (!valid) {
      return;
  }

  // If valid, send fetch POST request
  try {
      const response = await fetch('https://tools.brickmmo.com/email/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              message: message,
              name: name,
              email: email
          })
      });
      if (response.ok) {
          alert('Your message has been sent!');
          document.getElementById('contactForm').reset();
      } else {
          alert('There was an error sending your message.');
      }
  } catch (error) {
      alert('There was an error sending your message.');
  }
});

});
