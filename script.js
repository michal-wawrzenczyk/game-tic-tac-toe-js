const x_CLASS = 'x';
const o_CLASS = 'o';
// we can easily use those strings throughout the code.
const winning_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
// All possible winning combinations for the game

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageTextElement = document.querySelector('[data-message-text]');
const winningMessageElement = document.getElementById('message');
const restartButton = document.getElementById('restartButton');

let oTurn // If the variable is true, then it's O's turn, if false, then it's X's turn.

gameStart();
restartButton.addEventListener('click', gameStart);
// every time we click on it, we just want to call a gameStart function.

function gameStart() {
    oTurn = false; // to start the game
    cellElements.forEach(cell => {
        cell.classList.remove(x_CLASS);
        cell.classList.remove(o_CLASS);
        // to remove all marks from the board after click on the Restart button.
        cell.removeEventListener('click', handleClick);
        // to remove the event listener on the click together with the handleClick function.
        cell.addEventListener('click', handleClick, {once: true});
        // once we click on chosen cell, the event listener is not going to fire again when we click on the cell again. It only does a click event once in one cell.
    })
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
    // it will turn off the winning message window
}

function handleClick(e) {
    // console.log("clicked"); // to check in console if our function works properly
    // Place Mark
    const cell = e.target; // whichever cell we clicked on will be here
    const currentClass = oTurn ? o_CLASS : x_CLASS; // if it's circle turn, then we want to return the o_CLASS, otherwise return x_CLASS
    placeMark(cell, currentClass);
    // Check for Win
    if (checkWin(currentClass)) {
       // console.log('Winner!');
        gameEnd(false);
        // is it a draw or maybe not?
    } else if (isDraw()) {
        gameEnd(true);
        // Check for Draw
    } else {
        swapTurns();
        // we want to swap turns, if there is no winner yet.
        setBoardHoverClass();
        // Switch Turns - if none of those above happen
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    // when we click on a cell, the X mark will be added every time, because for now circle is always false.
}

function swapTurns() {
    oTurn = !oTurn;
    // the function takes oTurn and create the opposite to oTurn (X turn).
}

function setBoardHoverClass() {
    // the hover class must be based on whose turn currently is.
    board.classList.remove(x_CLASS);
    board.classList.remove(o_CLASS); // there are no x and o classes inside this element
    if (oTurn) {
        board.classList.add(o_CLASS);
    } else {
        board.classList.add(x_CLASS);
    }
    // if there is circle turn currently, then add the hover for circle class, otherwise add the hover for x class.
}

function checkWin(currentClass) {
    // we want to check here all the winning combinations if some of those are met by the existing combination.
    return winning_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
            // we want to return cell elements of index - so which cells, f.ex. 0, 1, 2. and then we want to check the class list if it contains the current class
        })
    })
    // it will return true, if any of the values inside it are true. Combination is going to loop over all the combinations. For each one it must check if all the values inside cell elements have the same class. If current class is placed in one of the all winning combinations - it wins. If every single cell inside the combination is correct for at least one of the winning combinations then it is a win.
}

function gameEnd(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!';
    } else {
        winningMessageTextElement.innerText = `${oTurn ? "O's" : "X's"} Wins!`;
        // it's going to check if it's circles turn, then print out O's, if X's = print X's and then print out Wins.
    }
    winningMessageElement.classList.add('show');
    // if someone wins the game, the text will be printed and it's going to show the winning message element.
}

function isDraw() {
    return [...cellElements].every(cell => {
        // cellElements does not have an "every" method, so we must destructure it into an array => [...cellElements]
        return cell.classList.contains(x_CLASS) || cell.classList.contains(o_CLASS);
        // we want to check if every cell has a class x or o. If every class has a x or o class, then we want to return true, because it is a draw.
    })
    // it needs to check if every single cell has been filled.
}