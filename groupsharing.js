document.addEventListener('DOMContentLoaded', () => {
    const groupSharingForm = document.getElementById('groupSharingForm');
    const totalAmountInput = document.getElementById('totalAmount');
    const numPeopleInput = document.getElementById('numPeople');
    const sharedExpensesList = document.getElementById('sharedExpensesList');
    let sharedExpenses = JSON.parse(localStorage.getItem('sharedExpenses')) || [];
  
    // Display existing shared expenses
    displaySharedExpenses();
  
    // Calculate and Share expense
    groupSharingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const totalAmount = parseFloat(totalAmountInput.value);
      const numPeople = parseInt(numPeopleInput.value);
      const category = document.getElementById('category').value;
      const amountPerPerson = (totalAmount / numPeople).toFixed(2);
  
      const sharedExpense = { totalAmount, numPeople, category, amountPerPerson };
      sharedExpenses.push(sharedExpense);
      localStorage.setItem('sharedExpenses', JSON.stringify(sharedExpenses));
      displaySharedExpenses();
      groupSharingForm.reset();
    });
  
    // Display shared expenses
    function displaySharedExpenses() {
      sharedExpensesList.innerHTML = '<h2 class="text-2xl font-bold mb-4">Shared Expenses</h2>';
      sharedExpenses.forEach((expense, index) => {
        const expenseItem = document.createElement('div');
        expenseItem.className = 'flex justify-between items-center mb-2 bg-gray-200 p-2 rounded-md shadow-sm';
        expenseItem.innerHTML = `
          <div>
            <p><strong>Total Amount:</strong> ₹${expense.totalAmount.toFixed(2)}</p>
            <p><strong>Number of People:</strong> ${expense.numPeople}</p>
            <p><strong>Category:</strong> ${expense.category}</p>
            <p><strong>Amount Per Person:</strong> ₹${expense.amountPerPerson}</p>
          </div>
        `;
        sharedExpensesList.appendChild(expenseItem);
      });
    }
  });
  