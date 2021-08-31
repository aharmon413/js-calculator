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
        // this.history = '';
    }
    bindOnInputReceived(callback){
        this.onInputReceived = callback;
    }
    appendNumber(num) {
        if (this.onFirstNum) {
            this.num1 += num;
        } else if (this.total) {
            this.init();
            this.num1 += num;
        } else {
            this.num2 += num;
        }
        this.onInputReceived(this.num1, this.operator, this.num2, this.total);
        //console.log(this.num1, this.num2);
    }
    setOperator(opr) {
        if (this.onFirstNum && opr != '=') { 
            this.operator = opr;
            this.onFirstNum = false;
        } else if (opr === '=') {
            this.total = this.calculate(+this.num1, this.operator, +this.num2);
        }
        this.onInputReceived(this.num1, this.operator, this.num2, this.total);
        //console.log(this.operator, this.total);
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
    updateDisplay(num1, opr, num2, total) {
        if (total !== '') {
            this.input.text(total);
            //console.log('logging the total');
        } else if (opr && num2) {
            this.input.text(num2);
            //console.log('logging num2');
        } else {
            this.input.text(num1);
            //console.log('logging num1')
        }
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
    onInputReceived = (num1, opr, num2, total) => {
        this.display.updateDisplay(num1, opr, num2, total);
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