document.getElementById('signup-form').addEventListener('submit', function(e) {
  e.preventDefault();

  // Extracting the values of the input fileds filled by the user and storing them into a new variable and then by using this variable value will be set in the local storage 
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Saving user data to localStorage
  // set the data in the local storage  by using the localstorage.setItem 
  // Local storage can only store the string data so if we have any other type of data we will have to convert the data into strings by uisng the function JSON.stringify()

  // Two Important Functions used :
  // JSON.stringify() - This will converts an Object into a string to save the data in the local storage :
  // JSON.parse() - This will convert the string data into the object :
  // Both functions will take input a variable 
  // localStorage.setItem(key:string , value:string )
  localStorage.setItem('userLoggedIn', 'true');
  localStorage.setItem('username', username);
  localStorage.setItem('email', email);
  localStorage.setItem('password', password);

  console.log('Signup - username:', username);

  window.location.href = 'dashboard.html'; // Redirect to dashboard
  // window.location is a  built in java script object - represents the current url of the window  and the href is the hypertext reference  href is used to get/set the utl of the page url=uniform resource locator it is reference or the address is used to access the resources on the internet 
});
