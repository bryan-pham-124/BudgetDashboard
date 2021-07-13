 

const sampleDataBtn = document.getElementById('sample-button');
 

let chartDataset = [];
 
function groupDate(dateParam) {
 
    
    let transEntries = document.getElementsByClassName("transaction-row");
    const main = document.querySelector('.flex-transactions');
    let main_children = document.querySelectorAll('.flex-transactions > *')

    let datesArr = [].slice.call(transEntries).slice(1);
    let totalExpenses = 0;
    let totalIncome = 0;
    let totalProfit = 0;
    
    datesArr.forEach(elm => {
        let date = elm.querySelector('.transaction-row .date').innerText;
       
        if(date === dateParam){
            
            let amount = elm.querySelector('.transaction-row .amount').innerText;
            let expOrInc = elm.querySelector('.transaction-row .exp-or-inc').innerText;

            amount= +(amount.slice(1));
            expOrInc = expOrInc.toLowerCase().trim();
          
            totalExpenses += (expOrInc === 'expense' ? amount: 0);
            totalIncome += (expOrInc === 'income' ? amount: 0);
            totalProfit = totalIncome - totalExpenses;
            if(date === '1/1/2021'){
                //console.log(amount);
            }
        }
       
    });
    
    let dateObject = {
        date: dateParam,
        expenses: 0 +  totalExpenses, 
        income: 0 + totalIncome,
        profit: 0 + totalProfit
    };

    return dateObject;
 
} // group date end


// maybe will use later --> dont delete
function createDataset() {
    // get all dates first
    let transEntries = document.getElementsByClassName("transaction-row");
    const main = document.querySelector('.flex-transactions');
    let main_children = document.querySelectorAll('.flex-transactions > *')

    let datesArr = [].slice.call(transEntries).slice(1);

    let datesInArr = []

    //populate a new array of dates so we can remove duuplicate dates
    datesArr.forEach(elm => {
        let date = elm.querySelector('.transaction-row .date').innerText;
        datesInArr.push(date);  
    });

    // modified code from https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
    datesInArr = datesInArr.filter((v, i, a) => a.indexOf(v) === i);
    //console.log(datesInArr);


    datesInArr.forEach(date => {
        chartDataset.push(groupDate(date));
    })

    //console.log(chartDataset);

}
 


function filterDataUpdate(){
    let helpArr = [];

    chartDataset.forEach((element, index) => {

        let findIndex = helpArr.map(e => { return e.date; }).indexOf(element.date);
        if(findIndex === -1){
            helpArr.push(element);
        }
    });

    return helpArr;
}

function updateDatasetChart( newDate, newAmt, newExp){

    let count = 0;
    let foundDate = false;
     newAmt = +(newAmt)
    let newExpense =  (newExp === 'expense' ? newAmt: 0);
    let newInc  = (newExp === 'income' ? newAmt: 0);

    chartDataset.forEach((dateElm, index) => {
        if(newDate === dateElm.date){

            count += 1;
            dateElm.expenses += newExpense;
            dateElm.income += newInc;
            dateElm.profit += (newInc - newExpense);
            foundDate = true;
        }
    });
     
    if(!foundDate){ // handles new dates added
        let newObj = {
            date: newDate,
            expenses: 0 + newExpense, 
            income: 0 + newInc,
            profit:  newInc - newExpense
        }
        //console.log("dasfsasfa: " + newDate);
        chartDataset.push(newObj);
    }
    // console.log(count);
    //console.log(chartDataset);
} // updateDataset end


function getData(elm){
    
    const dataArr =  chartDataset.map(data => {
         //console.log(data[elm])
         return data[elm];
    }) 
 
    //console.log(chartDataset);
    //dataArr.forEach(e => console.log('datesArr is: ' + e));
    return dataArr;
    
}

console.log(getData('profit'));
var chart = document.getElementById('myChart').getContext('2d');
 

var myChart = new Chart(chart, {
    type: 'bar',
    data: {
        labels: getData('date'),
        datasets: [
            {
                label: 'Income',
                data: getData('income'), 
                backgroundColor:  '#759116'
            },
            {
                label: 'Expenses',
                data: getData('expenses'), 
                backgroundColor: '#BF1029' 
            },
            {
                label: 'Profit',
                data: getData('profit'), 
                backgroundColor: '#222'  
            }
            
        ]
    },
    options: {
        plugins: {
            legend: {
                labels: {
                    padding: 10
                }
            },
            title: {
                display: true,
                text: 'Monthly Expenses, Income and Profit',
                font: {
                    size: 20
                }
                
            }
        }, // plugin end
        scales: {
          y: {
            ticks: {
              font: {
                size: 18,
                weight: 'bold',
                fontColor: '#222'
              }
            }
          },
          x: {
            ticks: {
              font: {
                size: 18,
                weight: 'bold',
                 color: '#222'
              }
            }
          }
        } // scale end
    }
});


function addChartData(chart) {
   
    let finalIndex = chartDataset.length -1;
 
    let label = chartDataset[finalIndex].date;
    let incomeNew = chartDataset[finalIndex].income;
    let expenseNew = chartDataset[finalIndex].expenses;
 
    //chartDataset.forEach(elm => console.log(elm.expenses))
    
    // sort labels before adding
    chartDataset = chartDataset.sort(
        function(a,b){
            return new Date(a.date ) - new Date(b.date)
        }
    );

    chart.data.labels = getData('date');

    
    //console.log(getData('income'));
    // console.log('chart ==== ' +  chart.data.datasets.data)
   
    chart.data.datasets[0].data =  getData('income');
    chart.data.datasets[1].data =  getData('expenses');
    chart.data.datasets[2].data =  getData('profit');


    let profitNew = incomeNew - expenseNew;

    //myChart.data.datasets.forEach(elm => console.log(elm))
    /*
    chartDataset.forEach(elm => console.log('exp ' + elm.expenses))
    chartDataset.forEach(elm => console.log('income ' + elm.income))
    */
    chart.update();
}

function clearChartData(chart) {
     
    chartDataset = [];
    chart.data.labels =  getData('date');
    chart.data.datasets[0].data =  getData('income');
    chart.data.datasets[1].data =  getData('expenses');
    chart.data.datasets[2].data =  getData('profit');
    chart.update();
}
