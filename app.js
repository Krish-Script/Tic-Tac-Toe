let cells = document.querySelectorAll(".cell");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enableCells();
    msgContainer.classList.add("hide");
};

cells.forEach((cell) => {
    cell.addEventListener("click", () => {
        if (turnO) {
            cell.textContent = "O";
            turnO = false;
        } else {
            cell.textContent = "X";
            turnO = true;
        }
        cell.disabled = true;
        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableCells();
};

const disableCells = () => {
    for(let cell of cells) {
        cell.disabled = true;
    }
};
const enableCells = () => {
    for(let cell of cells) {
        cell.disabled = false;
        cell.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableCells();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = cells[pattern[0]].innerText;
        let pos2Val = cells[pattern[1]].innerText;
        let pos3Val = cells[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
        if (pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            return true;
            }
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame); 