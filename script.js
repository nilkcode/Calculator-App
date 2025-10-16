const buttons = document.querySelectorAll('.button-section input[type="button"]');
let displayResult = document.querySelector('#inputResult');
let inputValue = document.querySelector('#inputValue');
let CheckBoxInput = document.querySelector('.checkBoxInput')
let iconTheme = document.querySelector('.icon-theme');
let themeBtn = document.querySelector('.theme-btn')

let input = "";
let resultClear = "";
let displayResultValue = 0;
let backspaceValue = ''
let isChecked = false;

// Utility to check if a character is an operator
const isOperator = (char) => /[+\-x÷%]/.test(char);

const onPressDigit = (e) => {
    let buttonValue = e.target.value.trim();

    // === Handle Numbers and Operators ===
    if (buttonValue !== "=" && buttonValue !== "c" && buttonValue !== "←") {
        const lastChar = input.slice(-1);

        // Prevent two operators in a row
        if (isOperator(buttonValue) && isOperator(lastChar)) {
            return; // skip invalid operator sequence
        }

        input += buttonValue;
        inputValue.value = input; // display user-friendly input
    }

    // === Handle Evaluation ===
    if (buttonValue === "=") {
        if (input.trim() === backspaceValue ) {
            displayResult.value = 0;
            return;
        }

        try {
            // Replace user-friendly symbols with JS equivalents
            let expression = input
                .replace(/x/g, "*")
                .replace(/÷/g, "/")
                .replace(/%/g, "/100")
                .replace(/\s+/g, '');

            displayResultValue = eval(expression);
            displayResult.value = displayResultValue;
            resultClear = input;
        } catch (error) {
            displayResult.value = "Error";
        }
    }

    // === Handle Clear ===
    if (buttonValue === "c") {
        input = "";
        inputValue.value = "";
        displayResult.value = 0;
        resultClear = "";
    }

    // === Handle Backspace ===
    if (buttonValue === "←") {
        input = input.slice(0, -1); // remove last character
        inputValue.value = input;
        backspaceValue = input
    }
};


const isThemeToogle = () => {

    isChecked =  CheckBoxInput.checked
    setTheme(isChecked)
    // 1. Toggle circle animation
 
   
}

const setTheme = (themeType) => {
    if (themeType) {
        themeBtn.classList.add('active')
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
        iconTheme.classList.add('fa-moon')
        iconTheme.classList.remove('fa-sun')
        localStorage.setItem("theme", 'dark')

    } else {
        themeBtn.classList.remove('active')

        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
          iconTheme.classList.add('fa-sun')
        iconTheme.classList.remove('fa-moon')
        localStorage.setItem("theme", 'light')

    }
}


// === Add Event Listeners ===
buttons.forEach((button) => {
    button.addEventListener("click", onPressDigit);
});


CheckBoxInput.addEventListener("change", isThemeToogle )


window.addEventListener('DOMContentLoaded', () => {
    let savedTheme = localStorage.getItem('theme')
    console.log(savedTheme)
    let themeType = savedTheme;
    themeType == "dark" ? isChecked = true :isChecked = false; 
    setTheme(isChecked)

    

     

})