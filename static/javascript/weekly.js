const renderCharts=(data,labels)=>{
    var ctx = document.getElementById('myChart').getContext('2d');
    ctx.height=100
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'weekly expense',
                data: data,
                backgroundColor: [
                    'rgba(45, 152, 218, 0.2)',  // Fresh blue
                    'rgba(52, 231, 228, 0.2)',  // Turquoise
                    'rgba(103, 230, 140, 0.2)', // Mint green
                    'rgba(254, 164, 127, 0.2)', // Coral
                    'rgba(168, 107, 255, 0.2)', // Purple
                    'rgba(255, 184, 76, 0.2)'   // Golden yellow
                ],
                borderColor: [
                    'rgb(45, 152, 218)',
                    'rgb(52, 231, 228)',
                    'rgb(103, 230, 140)',
                    'rgb(254, 164, 127)',
                    'rgb(168, 107, 255)',
                    'rgb(255, 184, 76)'
                ],
                borderWidth: 2,
                radius: 150
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
    fetch('/expense_week').then(res=>res.json()).then(results=>{
        console.log("results",results);
        const category_data = results.expense_category_data;
        const [labels,data] = [Object.keys(category_data),Object.values(category_data)]
        renderCharts(data , labels);
    })
};

document.onload = getChartData()
