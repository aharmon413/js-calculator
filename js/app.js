class Calculator {
    constructor() {
        this.init();
    }
    // call app.calculator.init() when clear key is pressed to reset values to the default empty state
    init() {
        this.num1 = '';
        this.num2 = '';
        this.operator = '';
        this.total = '';
        // this.history = ''; // not sure if I want this to be an array or string yet
    }
    addNumber(num) {
        this.operator ? num2 += num 
            : num1 += num; 
    }
    addOperator(opr) {
        if (!this.operator) { 
            this.operator = opr 
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
}

class Display {
    constructor() {
        this.display = $('.display');
        //this.history = $('.history');
    }
    bindNumberHandler(handler) {
        $('.number').click(function(e) {
            console.log('a number was clicked!');
            }
        )
    }
    bindOperatorHandler(handler) {
        $('.operator').click(function(e) {
            console.log('an operator was clicked!');
            }
        )
    }
    bindClearHandler(handler) {
        $('.clear').click(

            )
    }
}
class Controller {
    constructor(calculator, display) {
        this.calculator = calculator;
        this.display = display;

        this.display.bindNumberHandler(this.handleNumber);
        this.display.bindOperatorHandler(this.handleOperator);
    }
    handleNumber = num => {
        this.calculator.addNumber(num);
    }
    handleOperator = opr => {
        this.calculator.addOperator(opr);
    }
    clearAll = () => {
        this.calculator.init();
    }
}

$(document).ready(function() {
    const app = new Controller(new Calculator(), new Display());
})