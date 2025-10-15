
const buttons = document.querySelectorAll('.button-section input[type="button"]');
let displayResult = document.querySelector('#inputResult')
const inputValue = document.querySelector('#inputValue')
let input = "";
let displayResultValue = 0;

const onPressDigit = (e) => {
    let buttonValue = e.target.value.trim();

    if (buttonValue !== "=" && buttonValue !== "c") {
         input += buttonValue
         let displaexpression = input
            .replace(/x/g, "*")   // multiplication
            .replace(/÷/g, "/")   // division (if using ÷)
            .replace(/%/g, "/100") // percent
            .replace(/\s+/g, '');  // remove extra spaces
        // console.log(input)
        inputValue.value = displaexpression;
         

    }

    if(buttonValue == "=") {debugger
          let expression = input
            .replace(/x/g, "*")   // multiplication
            .replace(/÷/g, "/")   // division (if using ÷)
            .replace(/%/g, "/100") // percent
            .replace(/\s+/g, '');  // remove extra spaces
                      
         displayResultValue = eval(expression)
         displayResult.value =  displayResultValue
    }

    if(buttonValue == "c") {
        input = ''
        displayResult.value = 0
        inputValue.value = '';
        
    }

}



buttons.forEach((button) => {
    button.addEventListener("click", onPressDigit)
})