document.addEventListener('DOMContentLoaded', () => {
    const chartTypeSelect = document.getElementById('chartType');
    const barChart = document.getElementById('barChart').getContext('2d');
    const lineChart = document.getElementById('lineChart').getContext('2d');
    const pieChart = document.getElementById('pieChart').getContext('2d');
  
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  
    chartTypeSelect.addEventListener('change', updateCharts);
    updateCharts();
  
    function updateCharts() {
      const chartType = chartTypeSelect.value;
      const labels = [];
      const data = [];
  
      if (chartType === 'category') {
        const categories = [...new Set(expenses.map(expense => expense.category))];
        categories.forEach(category => {
          labels.push(category);
          data.push(expenses.filter(expense => expense.category === category).reduce((sum, expense) => sum + expense.amount, 0));
        });
      } else if (chartType === 'date') {
        const dates = [...new Set(expenses.map(expense => expense.date))];
        dates.forEach(date => {
          labels.push(date);
          data.push(expenses.filter(expense => expense.date === date).reduce((sum, expense) => sum + expense.amount, 0));
        });
      }
  
      createBarChart(labels, data);
      createLineChart(labels, data);
      createPieChart(labels, data);
    }
  
    function createBarChart(labels, data) {
      new Chart(barChart, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Expenses',
            data: data,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  
    function createLineChart(labels, data) {
      new Chart(lineChart, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Expenses',
            data: data,
            borderColor: 'rgba(54, 162, 235, 1)',
            fill: false,
            tension: 0.1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  
    function createPieChart(labels, data) {
      new Chart(pieChart, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: 'Expenses',
            data: data,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        }
      });
    }
  });
  