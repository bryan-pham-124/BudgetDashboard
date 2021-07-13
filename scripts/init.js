 
 
let sortOrderArr = [];

let hiddenTransactions = true;
 
// function from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function randomData(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function generateSampleData(){
    
    let rEntryAmt = randomData(1,7);
    console.log(rEntryAmt);
    let rCategories = ['Sales', 'Rent', 'Production Cost', 'Advertising'];
    let rNames = ['Camden', 'Alanis', 'Bob', 'John', 'Joe', 'Alex', 'V'];
 
    for(let i = 0; i < rEntryAmt; i++){

        let rCategory = rCategories[randomData(0, rCategories.length-1)];
      
        let rName = rNames[randomData(0, rNames.length-1)];
        let rMonth  = randomData(1, 12);
        let rDay = randomData(1, 31);
        let rYear = randomData(1980, 2050);
    
        let rDate =  rMonth + "/" + rDay + '/' + rYear;
    
        let rIncome = randomData(0, 1000);
        let rExpense = randomData(0, 1000);
    
        let rProfit = rIncome - rExpense;


        createTransaction({value:  rNames[randomData(0, rNames.length-1)] }, {value: rCategory}, {value: rDate}, {value: rIncome}, {value: 'income'});
        addChartData(myChart );

        createTransaction({value:  rNames[randomData(0, rNames.length-1)] }, {value: rCategory}, {value: rDate}, {value: rExpense}, {value: 'expense'})
        addChartData(myChart );
    }
    

}



generateSampleData();
hideTransactions();

let entryCount = document.getElementsByClassName('transaction-row').length - 1;
console.log('ec ' + (entryCount));

if(entryCount < 6){
    showMore.style.display = 'none';
}


// all code below is adding listeners to all page elements

window.addEventListener('load', function(e){
    console.log('Page is loaded');
    modal.style.display = "block";

})

formElms.slice(0,2).forEach(function(elm){
     
    elm.addEventListener('blur', function(e){
        checkBlank(elm);
        checkElmLength(elm);
    });
    
}); 

date.addEventListener('blur', function(e){
    checkDate(formElms[2]);
    //console.log("the value of form elms is : " + formElms[2].value);
});

amount.addEventListener('blur', function(e){
    checkNum(amount);
    
});

inc.addEventListener('blur', function(e){
    checkIncExp(inc);
});
 
 
btn.addEventListener('click', function(e) {
    const validForm = validateForm();
    if(validForm){
        formContainer.classList.remove("visible");
        // placeholderElm.classList.add("hide-item");
        createTransaction(username, transType, date, amount, inc);
        repositionFilter();
        if(hiddenTransactions){
            hideTransactions();
        }

        addChartData(myChart );
        entryCount = document.getElementsByClassName('transaction-row').length - 1;
        if(entryCount > 5){
            showMore.style.display = "block";
        }
    }
    
});


window.addEventListener('resize', repositionFilter);


dateAsc.addEventListener('click', function(e){
    sortRows('date', 'asc');
    sortOrderArr.push('date', 'asc');

});

dateDesc.addEventListener('click', function(e){
    sortRows('date', 'desc');
    sortOrderArr.push('date', 'desc');
});


amountAsc.addEventListener('click', function(e){
    sortRows('amt', 'asc');
    sortOrderArr.push('amt', 'asc');
     
});

amountDesc.addEventListener('click', function(e){
    sortRows('amt', 'desc');
    sortOrderArr.push('amt', 'desc');
});

showMore.addEventListener('click', function(e){


    let lastSortCategory =  sortOrderArr[sortOrderArr.length- 2];
    let lastSortOrder  = sortOrderArr[sortOrderArr.length - 1];

    if(hiddenTransactions){

        showAllTransactions();
        hiddenTransactions = false;
        sortRows(lastSortCategory, lastSortOrder);
        showMore.textContent = "Show less entries";
        //console.log(sortOrderArr);

    } else if(!hiddenTransactions){
        
        hideTransactions();
        hiddenTransactions = true;
        sortRows(lastSortCategory, lastSortOrder);
        showMore.textContent = "Show more entries";
        
    }


})

sampleDataBtn.addEventListener('click', function(e){
    sampleDataBtn.classList.add('hide');
    let deletedEntries = document.getElementsByClassName('transaction-row');
    deletedEntries = [].slice.call(deletedEntries).slice(1);
    deletedEntries.forEach(elm => {
        elm.remove();
    });
    clearChartData(myChart);
    clearTiles();
    showMore.style.display = 'none';
})

