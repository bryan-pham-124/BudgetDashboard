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

        if(type === 'amt'){
            firstElm = a.querySelector('.transaction-row .amount').innerText;
            secondElm =  b.querySelector('.transaction-row .amount').innerText;
            firstElm = +(firstElm.slice(1));
            secondElm = +(secondElm.slice(1));

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

 