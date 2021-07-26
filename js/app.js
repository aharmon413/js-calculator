let num1 = '', num2 = '', operator = '', total = '';

$(document).ready(function() {
    $('button').on('click', function(e) {
        let btn = e.target.innerHTML;
        switch (e.target.className) {
            case 'number':
                handleNumber(btn);
                break;
            case 'operator':
                handleOperator(btn);
                break;
            case 'clear':
                clear()
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
}

function handleOperator(opr) {
    if (operator === '') {
        operator = opr;
    } else {
        handleTotal();
        operator = opr;
    }
}

function handleTotal() {
    switch (operator) {
        case '+':
            total = +num1 + +num2;
            updateDisplay(total);
            break;
        case '-':
            total = +num1 - +num2;
            updateDisplay(total);
            break;
        case 'x':
            total = +num1 * +num2;
            updateDisplay(total);
            break;
        case '/':
            total = +num1 / +num2;
            updateDisplay(total);
            break;
    }
    updateVariables();
}

function updateDisplay(val) {
    $('.input').text(val);
}

function updateVariables() {
    num1 = total;
    num2 = '';
}

function clear() {
    num1 = '', num2 = '', operator = '', total = '';
    updateDisplay('0');
}