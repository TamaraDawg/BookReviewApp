// Handle signup form event
const signupHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();
  const passwordConfirm = document
    .querySelector('#passwordConfirm')
    .value.trim();

  if (username && email && password && passwordConfirm) {
    // validate password
    if (password != passwordConfirm) {
      alert('Your passwords do not match. Please try again!');
      return;
    }

    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      alert('Your account has been created. Please login!');
      // redirecting to home page
      document.location.replace('/login');
    } else {
      alert('Failed to sign up.');
    }
  } else {
    alert('Please complete all the fields!');
  }
};

document.querySelector('#signup').addEventListener('click', signupHandler);
