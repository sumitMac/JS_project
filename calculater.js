document.addEventListener('DOMContentLoaded', () => {
    const screen = document.getElementById('calculator-screen');
    let currentInput = '';
    let currentOperator = '';
    let previousInput = '';
  
   
    const updateScreen = () => {
        screen.textContent = currentInput || '0';
    };  ``
  
    
    const handleNumberClick = (num) => {
        currentInput += num;
        updateScreen();
    };
  
    const handleOperatorClick = (operator) => {
        if (currentInput !== '') {
            if (previousInput !== '') {
                currentInput = performCalculation(previousInput, currentInput, currentOperator);
                previousInput = '';
            }
            previousInput = currentInput;
            currentInput = '';
            currentOperator = operator;
            updateScreen();
        }
    };
  
    const performCalculation = (num1, num2, operator) => {
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);
        switch (operator) {
            case '+':
                return (num1 + num2).toString();
            case '-':
                return (num1 - num2).toString();
            case 'X':
                return (num1 * num2).toString();
            case '/':
                if (num2 === 0) return 'Error';
                return (num1 / num2).toString();
            default:
                return num2.toString();
        }
    };
  
    document.querySelectorAll('.container button').forEach((button) => {
        button.addEventListener('click', () => {
            const buttonValue = button.textContent;
            if (!isNaN(buttonValue) || buttonValue === '.') {
                handleNumberClick(buttonValue);
            } else if (['+', '-', 'X', '/'].includes(buttonValue)) {
                handleOperatorClick(buttonValue);
            } else if (buttonValue === '=') {
                if (currentInput !== '' && currentOperator !== '') {
                    currentInput = performCalculation(previousInput, currentInput, currentOperator);
                    previousInput = '';
                    currentOperator = '';
                    updateScreen();
                }
            } else if (buttonValue === 'C') {
                currentInput = '';
                previousInput = '';
                currentOperator = '';
                updateScreen();
            } else if (buttonValue === 'DEL') {
                currentInput = currentInput.slice(0, -1);
                updateScreen();
            }
        });
    });
  });