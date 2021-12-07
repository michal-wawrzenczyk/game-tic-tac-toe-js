const x_CLASS = 'x';
const o_CLASS = 'o';
// we can easily use those strings throughout the code.

const cellElements = document.querySelectorAll('[data-cell]');

let oTurn // If the variable is true, then it's O's turn, if false, then it's X's turn.

cellElements.forEach(cell => {
    cell.addEventListener('click', handleClick, {once: true});
    // once we click on chosen cell, the event listener is not going to fire again when we click on the cell again. It only does a click event once in one cell.
})

function handleClick(e) {
    // console.log("clicked"); // to check in console if our function works properly
    const cell = e.target; // whichever cell we clicked on will be here
    const currentClass = oTurn ? o_CLASS : x_CLASS; // if it's circle turn, then we want to return the o_CLASS, otherwise return x_CLASS
    placeMark(cell, currentClass);
    // Check for Win
    // Check for Draw
    // Switch Turns - in none of those above happen
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    // when we click on a cell, the X mark will be added every time, because for now circle is always false.
}
