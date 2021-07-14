
function createTransaction(usernameP, transTypeP, dateP, amountP, incP){
    let formElms = [usernameP, transTypeP, dateP, amountP, incP];
    let classNames= ["name", "transaction-Type", "date", "amount", "exp-or-inc"];

    let index = 0;

    const transactionRow =  document.createElement('div');
    transactionRow.classList.add('transaction-row');
    
    
    let cleanInc = incP.value.trim().toLowerCase();

    let  transEntry = "";
    formElms.forEach(function(elm){
        
        transEntry = document.createElement('div');
         
        transEntry.classList.add(classNames[index]);

        // change color of amount based on income or expense
        if (classNames[index] === "amount"){
            let cleanValue = formElms[index+1].value.trim().toLowerCase();
            transEntry.classList.add(
                cleanValue === "income"? 'income': 'expense'
            );

            if(cleanValue === 'expense'){
                transEntry.innerHTML = `-$${elm.value}`;
            } else {
                transEntry.innerHTML = `$${elm.value}`;
            }
           
            
        } else {

            transEntry.innerHTML = `${elm.value}`;
        }

        transactionRow.appendChild(transEntry);

        index++;
    });
    
    updateDasboard(incP, amountP);
    updateDatasetChart(dateP.value, +amountP.value, cleanInc);
    transArr.push(formElms);
    //console.log(transArr);
    flexTransactions.insertBefore(transactionRow, flexTransactions.childNodes[0])
    
} //createTransaction end


//  only show top 5 transactions
function hideTransactions(){
    
    let mainChildren = document.querySelectorAll('.flex-transactions > *');
    mainChildren.forEach((child, index) => {
        if(index > 4){
            child.style.display = "none";
        }
    })
} //hideTransactions end


function showAllTransactions(){
    let mainChildren = document.querySelectorAll('.flex-transactions > *');
    mainChildren.forEach((child, index) => {

        if(index > 4){
             
            child.style.display = "flex";
            //console.log(index); 
        }
    })
}// showAllTransactions end




 




 