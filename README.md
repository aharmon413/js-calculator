# JavaScript Calculator 
![Screenshot of the calculator](https://user-images.githubusercontent.com/83358042/133934554-33440f16-33fd-4925-970d-57d1bc9cd0cf.png)
[View live demo](https://calculator.amberharmon.com/)\
\
A simple calculator written in (mostly) vanilla JavaScript. It performs the four basic mathematical operations and displays the history of your current equation.
It also has decimal point, positive/negative 
sign, delete/backspace, and clear buttons.

## Technologies Used
* HTML 5
* CSS 3
* JavaScript
* jQuery

## Challenges & Solutions
This calculator was my first "real" JavaScript project, so there was much learning to be done here. The biggest roadblock I ran into was about halfway through the project. While I had a calculator that was basically functional, the code was very unorganized and it was difficult to expand and add new functionalities without majorly breaking something else in the process.

I ended up making the tough decision to scrap most of what I had written so far and tackle it again with a different approach. After some research, I decided to implement an MVC
design pattern to neatly seperate the business and display logic for better organization. I saw the difference in ease of development almost immediately.

Check out [the pull request](https://github.com/aharmon413/js-calculator/pull/3/files) from when we merged the refactoring branch into the main branch: you can see how much 
better it looks!

## Credits

* Huge thank you to [Kevin](https://github.com/mage7223) for setting up my domain name and deployment workflow, as well as giving me feedback and motivation throughout the project
* Tania Rascia's [article on building an MVC app in JavaScript](https://www.taniarascia.com/javascript-mvc-todo-app/) was a crucial resource during the refactoring phase
* [Canva's color palette generator](https://www.canva.com/colors/color-palette-generator/) for selecting colors to use
* [ShapeDivider](https://www.shapedivider.app/) to easily generate the SVGs used in the project
