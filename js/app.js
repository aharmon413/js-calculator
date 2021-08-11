let num1 = '', num2 = '', operator = '', total = '', history = '', clear_history = false;

$(document).ready(function() {
    $('button').on('click', function(e) {
        let btn = e.target.innerHTML;
        switch (e.target.className) {
            case 'number':
                handleNumber(btn);
                break;
            case 'operator':
            case 'equals':
                handleOperator(btn);
                break;
            case 'clear':
                clearAll()
                break;
            case 'pos-neg':
                oppositeSign();
                break;
        }
    })
});

function handleNumber(num) {
    if (operator === '') {
        num1 += num;
        updateDisplay(num1);
    } else {
        num2 += num;
        updateDisplay(num2);
    }
    updateHistory(num);
}

function handleOperator(opr) {
    if (operator === '') {
        operator = opr;
        updateHistory(operator);      
    } else if (history.substr(-1) != ' ') {
        total = calculate(+num1, +num2);
        updateDisplay(total);
        updateVariables();
        operator = opr;
        updateHistory(operator);
        clear_history = (operator === '=');
    }
}

function updateDisplay(val) {
    $('.input').text(val);
}

function updateHistory(val) {
    if( clear_history == true ){
        history = '';
        $('.history').text(history);
        clear_history = false;
    } 
    if (Number.isInteger(+val)) {
        history += val;
        $('.history').text(history);
    } else if (val != '=') {
        $('.history').text(history += " " + val + " ");
    }
}

function calculate(num1, num2) {
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case 'x':
            return num1 * num2;
        case '/':
            return num1 / num2;
    } 
}

function updateVariables() {
    num1 = total;
    num2 = '';
}

function clearAll() {
    num1 = '', num2 = '', operator = '', total = '', history = '';
    updateDisplay('0');
    $('.history').text('0');
}