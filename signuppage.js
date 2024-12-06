document.getElementById('signup-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Saving user data to localStorage
  localStorage.setItem('userLoggedIn', 'true');
  localStorage.setItem('username', username);
  localStorage.setItem('email', email);
  localStorage.setItem('password', password);

  console.log('Signup - username:', username);

  window.location.href = 'dashboard.html'; // Redirect to dashboard
});
