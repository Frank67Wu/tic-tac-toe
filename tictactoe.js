const gameBoard = (() => {
    let board = new Array(9);
    for (let i = 0; i < 9; i++) {
        board[i] = 0;
    }

    const getField = (num) => board[num];

    const showBoard = () => {
        console.log(`${board[0]}, ${board[1]}, ${board[2]}`);
        console.log(`${board[3]}, ${board[4]}, ${board[5]}`);
        console.log(`${board[6]}, ${board[7]}, ${board[8]}`)
    }

    const fillField = (pos, sign) => {
        if (sign == 'X') {
            board[pos] = 1;
        }
        else {
            board[pos] = -1;
        }
    }

    const checkHorizontalWin = () => {
        for (let i = 0; i < 3; i++) {
            if (board[i] == board[i+3] && board[i] == board[i+6] && board[i] != 0) {
                return board[i];
            }
        }
        return 0;
    }

    const checkVerticalWin = () => {
        for (let i = 0; i < 7; i+= 3) {
            if (board[i] == board[i+1] && board[i] == board[i+2] && board[i] != 0) {
                return board[i];
            }
        }
        return 0;
    }

    const checkDiagonalWin = () => {
        if (board[0] == board[4] && board[0] == board[8] && board[0] != 0) {
            return board[0];
        }
        if (board[2] == board[4] && board[2] == board[6] && board[2] != 0) {
            return board[0];
        }
        return 0;
    }

    const boardFilled = () => {
        for (let i = 0; i < 9; i++) {
            if (board[i] == 0) {
                return false;
            }
        }
        return true;
    }

    

    return { getField, fillField, checkVerticalWin, checkHorizontalWin, checkDiagonalWin, boardFilled, showBoard} ;
})();

const gameController = (() => {
    let sign = 'O';

    const getSign = () => sign;

    const switchSign = () => {
        if (sign == 'O') {
            sign = 'X';
        }
        else {
            sign = 'O';
        }
    }

    return { getSign, switchSign }
})();



const displayController = (() => {
    const myBoard = gameBoard;
    const myGame = gameController;
    let gameState = true;
    


    let theBoard = document.getElementsByClassName('square');
    for (let i = 0; i < 9; i++) {
        theBoard[i].addEventListener('click', e => {
            if (myBoard.getField(i) == 0 && gameState) {
                if (myGame.getSign() == 'O') {
                    theBoard[i].innerText = 'O'; 
                }
                else {
                    theBoard[i].innerText = 'X'; 
                } 
                
                myBoard.fillField(i, myGame.getSign());
                myGame.switchSign();

                myResult = document.getElementById('result');

                let horizontalCheck = myBoard.checkHorizontalWin();
                let verticalCheck = myBoard.checkVerticalWin();
                let diagonalCheck = myBoard.checkDiagonalWin();

                gameState = false;
                if (horizontalCheck == 1 || verticalCheck == 1 || diagonalCheck == 1) {
                    myResult.innerText = "X wins";
                }
                else if (horizontalCheck == -1 || verticalCheck == -1 || diagonalCheck == -1) {
                    myResult.innerText = "O wins";
                }
                else if (myBoard.boardFilled()) {
                    myResult.innerText = "It's a tie";
                }
                else {
                    gameState = true;
                }
                
                myBoard.showBoard();

            }
        })
}
})();


