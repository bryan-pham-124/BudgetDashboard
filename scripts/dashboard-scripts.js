



// reposition filter button when new transaction is added
function repositionFilter(){
    const screenWidth  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let hideItem = document.getElementsByClassName('hide-item');
   

    if(hideItem.length > 0 ){
        console.log(screenWidth);
        if(screenWidth >= 900 && screenWidth < 1200) {
            filterEntries.style.left = '700px';
             
        } else if (screenWidth >= 1200){
            filterEntries.style.left = '1050px';
             
        }
    }
    
   
}




function updateDasboard(elm, elm2){

    let incomeInnerTextValue = +(incomeTile.innerText.slice(1));
    let expenseInnerTextValue = +(expenseTile.innerText.slice(1));
    let profitInnerTextValue = +(profitTile.innerText.slice(1));

    ///console.log(incomeInnerTextValue);
    //let cleanInc = elm.value.trim().toLowerCase();
    //let cleanAmount = elm2.value.trim().toLowerCase();

    let cleanInc = '';
    let cleanAmount = '';

    try {
        cleanInc = elm.value.trim().toLowerCase();
        cleanAmount = elm2.value.trim().toLowerCase();
    } catch(error){
        cleanInc = elm.value;
        cleanAmount = elm2.value;
    }

     sumProfit = '0';

    //exponential notation for large numbers to prevent numbers from spilling over
    
    if(cleanInc === "income"){
        let sumInc =  ((+cleanAmount) + incomeInnerTextValue);
        if(Math.abs(sumInc) > 1000000) {
            sumInc = sumInc.toExponential(3);
        }
        incomeTile.innerText = '$' + sumInc;

    } else if(cleanInc === "expense"){
        let sumExp =  ((+cleanAmount) + expenseInnerTextValue);
        if(Math.abs(sumExp) > 1000000) {
            sumExp = sumExp.toExponential(3);
        }
        expenseTile.innerText = '$' + sumExp;
    }

    sumProfit = ( 
        (+(incomeTile.innerText.slice(1)) 
        - (+(expenseTile.innerText.slice(1))))
    );

    if(Math.abs(sumProfit) > 1000000){
        profitTile.innerText = '$' + (sumProfit.toExponential(3));
    } else {
        profitTile.innerText = '$' + sumProfit;
    }
    
    if(sumProfit < 0 ){
        //console.log('eaew')
        //use style.color cause classlist doesnt work
        profitTile.style.color ="#BF1029";
         
    } else {
        profitTile.style.color = "#759116";
    }
    
    /*
    profitTile.classList.toggle('.income', sumProfit < 0);
    profitTile.classList.toggle('.expense', sumProfit > 0);
    */

}

function clearTiles(){
    incomeTile.innerText = '$' + 0;
    expenseTile.innerText = '$' + 0;
    profitTile.innerText = '$' + 0;
}

let formElms = [username, transType, date, amount, inc];