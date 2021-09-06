class Calculator {
    constructor() {
        this.init();
    }
    init() {
        this.num1 = '';
        this.num2 = '';
        this.operator = '';
        this.total = '';
        this.onFirstNum = true;
        //this.history = '';
    }
    bindOnInputReceived(callback){
        this.onInputReceived = callback;
    }
    appendNumber(num) {
        if (this.onFirstNum) {
            this.num1 += num;
            this.onInputReceived(this.num1);
        } else if (this.operator === '=') {
            this.init();
            this.num1 += num;
            this.onInputReceived(this.num1);
        } else {
            this.num2 += num;
            this.onInputReceived(this.num2);
        }
        //console.log(`num1: ${this.num1} num2: ${this.num2} opr: ${this.operator} total: ${this.total} onFirstNum: ${this.onFirstNum}`);
    }
    setOperator(opr) {
        if (this.onFirstNum && opr != '=') { 
            if (this.num1 === '') {this.num1 = '0'};
            this.onFirstNum = false;
        } else if (this.operator === '=') {
            this.total = this.calculate(+this.num1, this.operator, +this.num2);
            this.onInputReceived(this.total);
        } else if (this.num2) {
            this.total = this.calculate(+this.num1, this.operator, +this.num2);
            this.num1 = this.total;
            this.num2 = '';
            this.onInputReceived(this.total);
        }
        this.operator = opr;
        //console.log(`num1: ${this.num1} num2: ${this.num2} opr: ${this.operator} total: ${this.total} onFirstNum: ${this.onFirstNum}`);
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
}

class Display {
    constructor() {
        this.input = $('.input');
        //this.history = $('.history');
    }
    bindNumberHandler(handler) {
        $('.number').click(function(e) {
            //console.log('a number was clicked!');
            handler(e.target.innerHTML);
            }
        )
    }
    bindOperatorHandler(handler) {
        $('.operator').click(function(e) {
            //console.log('an operator was clicked!');
            handler(e.target.innerHTML);
            }
        )
    }
    bindClearHandler(handler) {
        $('.clear').click(() => {
            //console.log('clear was clicked!');
            this.input.text('0');
            handler();
            }   
        )
    }
    updateDisplay(valueToDisplay) {
        this.input.text(valueToDisplay);
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
    }
    onInputReceived = (valueToDisplay) => {
        this.display.updateDisplay(valueToDisplay);
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
}

$(document).ready(function() {
    const app = new Controller(new Calculator(), new Display());
})