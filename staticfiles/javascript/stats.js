// Make sure Chart.js is properly imported first
const renderCharts = (data, labels) => {
    // Get the canvas element
    const canvas = document.getElementById('myChart');
    if (!canvas) {
        console.error('Canvas element not found');
        return;
    }

    const ctx = canvas.getContext('2d');
    
    // Destroy existing chart if any
    if (window.myChart instanceof Chart) {
        window.myChart.destroy();
    }

    // Create new chart
    window.myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Last one month expense',
                data: data,
                backgroundColor: [
                    'rgba(45, 152, 218, 0.2)',
                    'rgba(52, 231, 228, 0.2)',
                    'rgba(103, 230, 140, 0.2)',
                    'rgba(254, 164, 127, 0.2)',
                    'rgba(168, 107, 255, 0.2)',
                    'rgba(255, 184, 76, 0.2)'
                ],
                borderColor: [
                    'rgb(45, 152, 218)',
                    'rgb(52, 231, 228)',
                    'rgb(103, 230, 140)',
                    'rgb(254, 164, 127)',
                    'rgb(168, 107, 255)',
                    'rgb(255, 184, 76)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Expense per Category',
                    font: {
                        size: 16
                    }
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
};

const getChartData = () => {
    console.log('fetching');
    fetch('/expense_month')
        .then(res => res.json())
        .then(results => {
            console.log("results", results);
            const category_data = results.expense_category_data;
            const labels = Object.keys(category_data);
            const data = Object.values(category_data);
            renderCharts(data, labels);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
};

// Correct way to run code on page load
document.addEventListener('DOMContentLoaded', function() {
    getChartData();
});