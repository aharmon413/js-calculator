class Calculator {
    constructor() {
        this.init();
    }
    init() {
        this.num1 = '';
        this.num2 = '';
        this.operator = '';
        this.total = '';
        this.history = '';
        this.onFirstNum = true;
    }
    bindOnInputReceived(callback){
        this.onInputReceived = callback;
    }
    appendNumber(num) {
        if (this.operator === '=') {this.init();} // start over if user presses a number without an operator to chain it to the existing equation
        this.updateHistoryString(num);
        if (this.onFirstNum) {
            this.num1 += num;
            this.onInputReceived(this.num1, this.history);
        } else {
            this.num2 += num;
            this.onInputReceived(this.num2, this.history);
        }
        //console.log(`num1: ${this.num1} num2: ${this.num2} opr: ${this.operator} total: ${this.total} onFirstNum: ${this.onFirstNum} history: ${this.history}`); //debug
    }
    setOperator(opr) {
        if (this.history.substr(-1) === ' ' || this.num1 === '') {return};
        this.updateHistoryString(opr);
        if (this.onFirstNum && opr != '=') { 
            this.onFirstNum = false;
        } else if (this.num2) {
            this.total = this.calculate(+this.num1, this.operator, +this.num2);
            this.num1 = this.total;
            this.num2 = '';
        }
        this.onInputReceived(this.total || this.num1, this.history);
        this.operator = opr;
        //console.log(`num1: ${this.num1} num2: ${this.num2} opr: ${this.operator} total: ${this.total} onFirstNum: ${this.onFirstNum} history: ${this.history}`); //debug
    }
    updateHistoryString(value, replace = false) {
        if (replace) {
            this.history = this.history.replace(new RegExp (value + '$'), this.num2 || this.num1);
            this.onInputReceived(this.num2 || this.num1, this.history);
        } else if (Number.isInteger(+value)) {
            this.history += value;
        } else {
            if (value != '=') {this.history += ` ${value} `;}; // Equals sign doesn't appear in history string
        }
    }
    calculate(a, opr, b) {
        switch (opr) {
            case '+':
                return a+b;
                break;
            case '-':
                return a-b;
                break;
            case 'x':
                return a*b;
                break;
            case '/':
                return a/b;
                break;
        }
    }
    reverseSign() {
        if (this.history.substr(-1) === ' ') {return}; // don't do anything if previously pressed key was an operator
        let previousValue = (this.num2 || this.num1);
        this.onFirstNum ? this.num1 *= -1 : this.num2 *= -1;
        if (previousValue != 0) {this.updateHistoryString(previousValue, true)};
    }
}

class Display {
    constructor() {
        this.input = $('.input');
        this.history = $('.history');
    }
    bindNumberHandler(handler) {
        $('.number').click(function(e) {
            handler(e.target.innerHTML);
            }
        )
    }
    bindOperatorHandler(handler) {
        $('.operator').click(function(e) {
            handler(e.target.innerHTML);
            }
        )
    }
    bindClearHandler(handler) {
        $('.clear').click(() => {
            this.input.text('0');
            this.history.text('0');
            handler();
            }
        )
    }
    bindSignHandler(handler) {
        $('.pos-neg').click(() => {
            handler();
        })
    }
    updateDisplay(valueToDisplay, history) {
        this.input.text(valueToDisplay);
        this.history.text(history);
    }
}

class Controller {
    constructor(calculator, display) {
        this.calculator = calculator;
        this.display = display;

        this.calculator.bindOnInputReceived(this.onInputReceived);
        this.display.bindNumberHandler(this.handleNumber);
        this.display.bindOperatorHandler(this.handleOperator);
        this.display.bindClearHandler(this.handleClear);
        this.display.bindSignHandler(this.handleSign);
    }
    onInputReceived = (valueToDisplay, history) => {
        this.display.updateDisplay(valueToDisplay, history);
    }
    handleNumber = num => {
        this.calculator.appendNumber(num);
    }
    handleOperator = opr => {
        this.calculator.setOperator(opr);
    }
    handleClear = () => {
        this.calculator.init();
    }
    handleSign = () => {
        this.calculator.reverseSign();
    }
}

$(document).ready(function() {
    const app = new Controller(new Calculator(), new Display());
})