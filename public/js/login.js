/* To handle log in form */

// when the log in form event occur
const loginClickHandler = async (event) => {
  event.preventDefault(); // to prevent the code from reloading

  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();

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
      // alert('You are now redirected to home page!!!'); // TODO: To delete later
      // We will be directed toward homepage
      document.location.replace('/');
    } else {
      // Display an alert indicating that the login failed
      alert('Incorrect email or password. Please try again!');
    }
  } else {
    alert('Please enter your email and password!');
  }
};

const createAccountHandler = (event) => {
  event.preventDefault();
  document.location.replace('/signup');
};

document.querySelector('#login').addEventListener('click', loginClickHandler);
document
  .querySelector('#create-acc')
  .addEventListener('click', createAccountHandler);
