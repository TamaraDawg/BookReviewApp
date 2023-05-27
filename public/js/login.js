/* To handle log in form */

// when the log in form event occur
const loginFormHandler = async (event) => {
  event.preventDefault(); // to prevent the code from reloading
  // 
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // If the user enter both email and password
  if (email && password) {
    // Send a POST request to the login API endpoint with the user's credentials
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    // If the response is ok 
    if (response.ok) {
      // We will be directed toward homepage
      document.location.replace('/');
    } else {
      // Display an alert indicating that the login failed
      alert('Failed to log in');
    }
  }
};

// to listen to the log in form event
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
