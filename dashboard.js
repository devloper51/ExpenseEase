window.onload = function () {
  // Check if the user is logged in by checking localStorage
  if (!localStorage.getItem('userLoggedIn')) {
    window.location.href = 'loginpage.html'; // Redirect if not logged in
  } else {
    const username = localStorage.getItem('username');
    console.log('Dashboard - retrieved username:', username); // Debugging log

    if (username) {
      document.getElementById('username').innerText = `Hello, ${username}`; // Update the dashboard username
    } else {
      document.getElementById('username').innerText = 'Hello, User!'; // Fallback
    }
  }

  // Show dropdown menu when profile button is clicked
  document.getElementById('profileBtn').addEventListener('click', function () {
    const dropdown = document.getElementById('profileDropdown');
    dropdown.classList.toggle('hidden'); // Toggle dropdown visibility
  });

  // Logout function
  document.getElementById('logoutBtn').addEventListener('click', function () {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('username');
    window.location.href = 'homepage.html'; // Redirect to homepage after logout
  });

  // Retrieve total expense from local storage
  const totalExpense = parseFloat(localStorage.getItem('totalExpense')) || 0;
  updateTotalExpenseUI(totalExpense, 'INR'); // Default currency to INR

  // Currency Selector functionality
  document.getElementById('currencySelector').addEventListener('change', function () {
    const selectedCurrency = this.value;
    updateCurrency(selectedCurrency, totalExpense);
  });
};

// Function to update total expense UI
function updateTotalExpenseUI(totalExpense, currency) {
  const conversionRates = {
    USD: 1 / 75,
    EUR: 0.85 / 75,
    INR: 1,
    GBP: 0.75 / 75
  };

  const currencySymbols = {
    USD: '$',
    EUR: '€',
    INR: '₹',
    GBP: '£'
  };

  const rate = conversionRates[currency];
  const symbol = currencySymbols[currency];
  const convertedExpense = totalExpense * rate;

  document.getElementById('totalExpenses').innerText = `${symbol}${convertedExpense.toFixed(2)}`;
}

// Function to handle currency conversion
function updateCurrency(currency, totalExpense) {
  updateTotalExpenseUI(totalExpense, currency);
}
