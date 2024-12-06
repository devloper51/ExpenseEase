document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const savedEmail = localStorage.getItem('email');
  const savedPassword = localStorage.getItem('password');
  const username = localStorage.getItem('username'); // Retrieve username

  // Debugging logs
  console.log('Login - savedEmail:', savedEmail);
  console.log('Login - savedPassword:', savedPassword);
  console.log('Login - username:', username);

  if (email === savedEmail && password === savedPassword) {
    localStorage.setItem('userLoggedIn', 'true');
    console.log('Login successful, redirecting to dashboard...'); // Confirm successful login

    // No need to set username again as it is already correct
    window.location.href = 'dashboard.html'; // Redirect to dashboard
  } else {
    alert('Invalid email or password');
  }
});
