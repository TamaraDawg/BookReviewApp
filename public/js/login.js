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
      console.log("You are now redirected to home page!!!") // TODO: To delete later
      // We will be directed toward homepage
      document.location.replace('/');
    } else {
      // Display an alert indicating that the login failed
      alert('Failed to log in');
    }
  }
};

// Handle signup form event
const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    console.log("Successfully sign up"); // TODO: Delete later before submission
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // redirecting to home page
      document.location.replace('/');
    } else {
      alert('Failed to sign up.');
    }
  }
};

// from html select element with login-form class
// add event listener for login form
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

// from html select element with submit-form class
// add event listener for submit form
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
  