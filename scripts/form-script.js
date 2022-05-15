//Selectdom elements
const closeBtn = document.getElementById("form-close-btn");
const formContainer = document.getElementById("form-container");
const transactionBtn = document.getElementById("transactionBtn")
const centerForm = document.getElementById("center-form");

let count = 0;


//open form menu
transactionBtn.addEventListener('click', () => {
    formContainer.classList.add("visible");
});

//close form menu
closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    formContainer.classList.remove("visible");
});


/*
window.addEventListener('click' , e => 
    
    //console.log(e.target)
    e.target == centerForm ? formContainer.classList.remove('visible'): false
   
);
 */
 
