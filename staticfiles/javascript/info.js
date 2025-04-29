const renderCharts=(data,labels)=>{
    var ctx = document.getElementById('myChart').getContext('2d');
    ctx.height=100
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Last one year expense',
                data: data,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.7)',   // Teal
                    'rgba(255, 159, 64, 0.7)',   // Orange
                    'rgba(153, 102, 255, 0.7)',  // Purple
                    'rgba(255, 99, 132, 0.7)',   // Pink
                    'rgba(54, 162, 235, 0.7)',   // Blue
                    'rgba(255, 206, 86, 0.7)'    // Yellow
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 2,
                radius: 150,
                hoverOffset: 15,  // Makes segments pop out more on hover
                hoverBorderWidth: 3
            }]
        },
        options: {
            title: {
                
                display : true,
                text : 'Expense per Category',
            }
        }
    });
}

const getChartData=()=>{
    console.log('fetching');
    fetch('/info_year').then(res=>res.json()).then(results=>{
        console.log("results",results);
        const category_data = results.expense_category_data;
        const [labels,data] = [Object.keys(category_data),Object.values(category_data)]
        renderCharts(data , labels);
    })
};

document.onload = getChartData()