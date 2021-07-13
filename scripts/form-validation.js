const form = document.getElementById('form');
const username = document.getElementById('form-name');
const transType = document.getElementById('form-trans-type');
const date = document.getElementById('form-date');
const amount = document.getElementById('form-amount');
const inc = document.getElementById('form-income-expense');
const btn = document.getElementById('form-btn');
//form container variable already declared in formscript.js

const transContainer = document.getElementById("transaction-container");
const placeholderElm = document.getElementById("placeholder-text");


const incomeTile = document.getElementById("income-tile");
const expenseTile = document.getElementById("expenses-tile");
const profitTile = document.getElementById("profit-tile");

const filterEntries = document.getElementById('filter-entries');

const flexTransactions = document.getElementsByClassName('flex-transactions')[0];

const showMore = document.getElementById('transaction-btn');

let transArr = [];



//Put error message on webpage
function getErrorMsg(elm, msg){
    
    elm.className = 'form-control error';
    const small = elm.querySelector('small');
    small.innerText = msg;
   
}



 //Check if element is blank
function checkBlank(elm){
   
    //elmArr.forEach(function(elm){
     
        if(elm.value.trim() === '') {
           getErrorMsg(elm.parentElement,  `Please fill in the ${elm.id} field`);
           return false;
        } 
    //});

    return true;
}


function checkElmLength(elm){
    const minChar = 2;
    const maxChar = 17;
  

    let correctInput = true; 

 

    if(elm.value.length > maxChar){
        getErrorMsg(elm.parentElement, `Error - The max character limit is ${maxChar} characters`);
        correctInput = false;

    } else if(elm.value.length < minChar) { 
        getErrorMsg(elm.parentElement, `Error - The min character limit is ${minChar} characters`);
        correctInput = false;
    }
    

    if(correctInput) {
        //console.log("parent elm is " + elm.parentElement);
        elm.parentElement.className = "form-control";
        //console.log(elm.parentElement);
    }

    
}

// from https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript/49178339

// Code is modified by me to meet project's neeeds

// Validates that the input string is a valid date formatted as "mm/dd/yyyy"
function checkDate(elm)
{

    let dateString = elm.value.trim();

    //console.log(dateString);
    //console.log(dateString.length);

    // First check for the pattern
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)){
        getErrorMsg(elm.parentElement, `Error - Date is not in mm/dd/yyyy`);
        
        return;
    }
         

    // Parse the date parts to integers
    var parts = dateString.split("/");
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);

    // console.log(year < 1000);

    // Check the ranges of month and year
    if(year < 1000 || year > 9999  ){
        
        getErrorMsg(elm.parentElement, `Error - Year has to be between 1000 and 3000`);
        return;
    } else if( month == 0 || month > 12){

        getErrorMsg(elm.parentElement, `Error - Month has to be betwen 1 and 12`);
        return;
    } else if(day < 1 && day > 31){

        getErrorMsg(elm.parentElement, `Error -  Day has to between 1 and 31`);
        return;
    }

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    if((day > 0 && day <= monthLength[month - 1])) {
        elm.parentElement.className = "form-control";
        return;
        
    } else {
        getErrorMsg(elm.parentElement, `Error - Date is not in mm/dd/yyyy or date is invalid`);
        return;
    }
    
}; // parse date end



function checkNum(elm){

    let cleanValue = elm.value.trim();

    if(cleanValue[0] === "$"){
        cleanValue = +(cleanValue.slice(1));
    } else {
        cleanValue = +cleanValue;
    }

    //console.log(isNaN(cleanValue));

    if(isNaN(cleanValue) || cleanValue < 0){
        getErrorMsg(elm.parentElement, `Error - Amount must be a number greater than 0`);
        return;
    } else {
        elm.parentElement.className = "form-control";
        return;
    }

} //checkNum end



function checkIncExp(elm){

    let cleanValue = elm.value.trim().toLowerCase();
    //console.log(cleanValue);

    if(cleanValue !== 'income' && cleanValue !== 'expense'){
        getErrorMsg(elm.parentElement, `Error - You must enter 'income' or 'expense' `);
    } else {
        elm.parentElement.className = "form-control";
    }
} //checkIncExp


function validateForm(){
    let formElms = [username, transType, date, amount, inc];
    let errorElms = document.getElementsByClassName('error');
    let validForm = true;

    //checks if elements are blank  
    formElms.forEach(function(elm){
        if(!checkBlank(elm)){
            validForm = false;
        }
    });

    if(errorElms.length != 0){
        validForm = false;
    }

    /*
    if (!validForm){
        alert("Please put valid information into the form")
    } else {
        alert("All information is valid. Your entry will be displayed on the page.")
    }
    */

    return validForm;
   
} // validateForm end




