const dateAsc = document.getElementById("Date-Asc");
const dateDesc = document.getElementById("Date-Desc");
const amountAsc = document.getElementById("Amount-Asc");
const amountDesc = document.getElementById("Amount-Desc");



function sortRows(type, sortOrder){
    
    let transEntries = document.getElementsByClassName("transaction-row");
    const main = document.querySelector('.flex-transactions');
    let main_children = document.querySelectorAll('.flex-transactions > *')
   
    let sortedEntries = [].slice.call(transEntries);

    main_children = sortedEntries.sort((a,b)=> {

        // use slice to skip dollar sign for sorting
        let firstElm = '';
        let secondElm = '';

        let firstQuery = ''
        let secondQuery = '';

        if(type === 'amt'){
            firstElm = a.querySelector('.transaction-row .amount').innerText;
            secondElm =  b.querySelector('.transaction-row .amount').innerText;

            firstQuery = a.querySelector('.transaction-row .amount');
            secondQuery =  b.querySelector('.transaction-row .amount');
        
            let numIndexFirst = 0;
            let numIndexSec = 0

            // two loops get the value of first number that appears in entry
            for(let i = 0; i < firstElm.length; i++){
                if(isNaN(firstElm[i]) == false){
                    numIndexFirst = i;
                    break;
                }
            }

            for(let i = 0; i < secondElm.length; i++){
                if(isNaN(secondElm[i]) == false){
                    numIndexSec= i;
                    break;
                }
            }
            
            if(firstQuery.classList.contains('expense')){
                firstElm = +(firstElm.slice(numIndexFirst)) * -1 ;
            }  else {
                firstElm = +(firstElm.slice(numIndexFirst))
            }
            
            if(secondQuery.classList.contains('expense')){
                secondElm = +(secondElm.slice(numIndexSec)) * -1;
            }  else {
                secondElm = +(secondElm.slice(numIndexFirst))
            }

            /*
            firstElm = +(firstElm.slice(numIndexFirst));
            secondElm = +(secondElm.slice(numIndexSec));
            */
           
        } else if(type === 'date'){
            firstElm = a.querySelector('.transaction-row .date').innerText;
            secondElm =  b.querySelector('.transaction-row .date').innerText;
            firstElm = new Date(firstElm );
            secondElm = new Date(secondElm);
        }


        sortedOrder = sortOrder === 'desc' ? firstElm - secondElm: secondElm - firstElm;

        return  sortedOrder;
       
    });
 
    // change flexbox row order
    main_children.forEach((child, index) => {

        child.style.order = index;
        
    })
  
}

 