document.addEventListener('DOMContentLoaded', () => {
  const expenseForm = document.getElementById('expenseForm');
  const expenseList = document.getElementById('expenseList');
  const viewListBtn = document.getElementById('viewListBtn');
  const downloadPdfBtn = document.getElementById('downloadPdfBtn');
  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

  // Display existing expenses
  displayExpenses();

  // Add new expense
  expenseForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const expenseName = document.getElementById('expenseName').value;
      const date = document.getElementById('date').value;
      const category = document.getElementById('category').value;
      const currency = document.getElementById('currency').value;
      const amount = parseFloat(document.getElementById('amount').value);
      const expense = { expenseName, date, category, currency, amount };
      expenses.push(expense);
      localStorage.setItem('expenses', JSON.stringify(expenses));
      updateTotalExpense();
      displayExpenses();
      expenseForm.reset();
  });

  // View list button
  viewListBtn.addEventListener('click', () => {
      expenseList.classList.toggle('hidden');
      viewListBtn.textContent = expenseList.classList.contains('hidden') ? 'View List' : 'Hide List';
  });

  // Download PDF button
  downloadPdfBtn.addEventListener('click', () => {
      const { jsPDF } = window.jspdf; // Ensure jsPDF is available  and it uses destructuirng to extract js pdf file 
      const doc = new jsPDF();  // this will  create a  new page for the pdf 

      // Document Header
      doc.setFontSize(25);
      doc.setTextColor(0, 0, 255); // here RGB COLOR THEME IS USED 0 for red , 0 for green and the 255 for the blue 
      doc.setFont('helvetica', 'bold');
      doc.text('ExpenseEase', 105, 20, { align: 'center' });  // here 105 is for the x cordinate and the 20 is for the y cordinate 

      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);  // here r,g,b = (0,0,0) this means the color is black 
      doc.setFont('helvetica', 'normal');
      doc.text('expenseease@gmail.com', 105, 30, { align: 'center' });
      doc.text('GST: 06ABCPQ1234R1Z5', 105, 40, { align: 'center' });
      doc.text('Phone: +91-9053129511 ', 105, 50, { align: 'center' });
      doc.text('Email: contact@ExpenseEase.com', 105, 60, { align: 'center' });

      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(1);
      doc.line(10, 65, 200, 65); // Line separator

      // Table Header
      let y = 75;
      doc.setFont('helvetica', 'bold');
      doc.text('Description', 10, y);
      doc.text('Category', 60, y);
      doc.text('Amount', 120, y);
      doc.text('Date', 170, y);
      y += 10;

      doc.setFont('helvetica', 'normal');

      // Table Content (Expense Data)
      expenses.forEach(expense => {
          doc.text(expense.expenseName, 10, y);
          doc.text(expense.category, 60, y);
          doc.text(expense.amount.toFixed(2), 120, y); 
          doc.text(new Date(expense.date).toLocaleDateString(), 170, y);
          y += 10;

          // Start a new page if necessary
          if (y > 280) {
              doc.addPage();
              y = 10;
          }
      });

      // Total Spend Calculation
      const totalSpend = expenses.reduce((sum, expense) => sum + expense.amount, 0);
      doc.setFontSize(14);
      doc.setTextColor(255, 0, 0);
      doc.setFont('helvetica', 'bold');
      doc.text(`Total Spend: ${totalSpend.toFixed(2)}`, 10, y + 10);

      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(1);
      doc.line(10, y + 20, 200, y + 20); // Line separator

      // Footer with dynamic date and time
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString();
      const formattedTime = currentDate.toLocaleTimeString();
      
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`© 2024 ExpenseEase. All rights reserved. Generated on: ${formattedDate} at ${formattedTime}`, 10, y + 40);

      // Save the PDF
      doc.save('ExpenseReport.pdf');
  });

  // Display expenses
  function displayExpenses() {
      expenseList.innerHTML = '<h2 class="text-2xl font-bold mb-4">Expense List</h2>';
      expenses.forEach((expense, index) => {
          const expenseItem = document.createElement('div');
          expenseItem.className = 'flex justify-between items-center mb-2 bg-gray-200 p-2 rounded-md shadow-sm';
          expenseItem.innerHTML = `
              <div>
                  <p><strong>Name:</strong> ${expense.expenseName}</p>
                  <p><strong>Date:</strong> ${expense.date}</p>
                  <p><strong>Category:</strong> ${expense.category}</p>
                  <p><strong>Amount:</strong> ${expense.amount.toFixed(2)}</p> <!-- Directly display amount -->
              </div>
              <button class="remove-expense" data-index="${index}">
                  <img src="images/close.png" alt="Remove Expense" class="w-5 h-5 mr-2">
              </button>
          `;
          expenseList.appendChild(expenseItem);
      });

      // Add event listeners to remove buttons
      document.querySelectorAll('.remove-expense').forEach(button => {
          button.addEventListener('click', (e) => {
              const index = e.currentTarget.dataset.index;
              expenses.splice(index, 1);
              localStorage.setItem('expenses', JSON.stringify(expenses));
              updateTotalExpense();
              displayExpenses();
          });
      });

      // Display total expense
      displayTotalExpense();
  }

  // Function to calculate and display total expense
  function displayTotalExpense() {
      const totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0);
      const totalExpenseContainer = document.createElement('div');
      totalExpenseContainer.className = 'mt-4 p-2 bg-gray-300 rounded-md text-center';
      totalExpenseContainer.innerHTML = `<strong>Total Expense: ${totalExpense.toFixed(2)}</strong>`; // No currency symbol
      expenseList.appendChild(totalExpenseContainer);
      localStorage.setItem('totalExpense', totalExpense); // Save total expense in local storage
  }

  // Function to update total expense without rendering
  function updateTotalExpense() {
      const totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0);
      localStorage.setItem('totalExpense', totalExpense);
  }
});
