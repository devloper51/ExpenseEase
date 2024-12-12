document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();

  // Both the values enetered by the user at the login page :
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // values fetched from the local storage 
  const savedEmail = localStorage.getItem('email');
  const savedPassword = localStorage.getItem('password');
  const username = localStorage.getItem('username'); // Retrieve username

  // === strict checking = data type will be checked if string == string
  if (email === savedEmail && password === savedPassword) {
    localStorage.setItem('userLoggedIn', 'true');
    console.log('Login successful, redirecting to dashboard...'); // Confirm successful login

    // No need to set username again as it is already correct
    window.location.href = 'dashboard.html'; // Redirect to dashboard  // this line of code will redirect the user to the dashboard.html page 
    // window.location is a built in  object of the java script returns the address of the same page 
  } else {
    alert('Invalid email or password');
  }
});
