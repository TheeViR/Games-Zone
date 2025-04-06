import React, { useState } from 'react'

function TicTacToe() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    

    const calculateWinner = (board)=>{
        const winningCombinations = [
            [0,1,2],[3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8],[2,4,6]
        ];

        for(let combination of winningCombinations){
            const [a,b,c] = combination;
            if(board[a] && board[a]===board[b] && board[a]===board[c]){
                return {winner:  board[a], winningCells: [a,b,c]};
            }
        }

        return {winner:null, winningCells: []};
    };

    const handleClick = (index) => {
        if(board[index] || calculateWinner(board).winner) return;

        const newBoard = [...board];
        newBoard[index] = isXNext ? "X" : "O";

        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const resetGame = ()=>{
        setBoard(Array(9).fill(null));
        setIsXNext(true);
    };

    const {winner, winningCells} = calculateWinner(board);
    const isDraw = winner===null && board.every(cell => cell !== null);

  return (
    <div className='flex flex-col items-center justify-center min-h-140 bg-gray-700 select-none'>
        <h1 className='text-4xl font-bold mb-4 text-black drop-shadow-[2px_1px_2px_rgba(10,20,234,1)]'>Tic-Tac-Toe</h1>

        {winner ? (
            <h2 className='text-xl font-bold text-green-600 mb-2 animate-bounce'>Winner: {winner} 🏆🎉</h2>
        ) : isDraw ? (
            <h2 className='text-xl font-bold text-yellow-400 mb-2 animate-pulse'>It's A Draw! 🫱🏼‍🫲🏻</h2>
        ) : (
            <h2 className='text-lg font-bold mb-2 '>{isXNext ? "X" : "O"}'s Turn</h2>
        )
         }

        <div className='grid grid-cols-3 gap-2'>
            {board.map((value,index)=>(
                <button 
                    key={index}
                    onClick={()=> handleClick(index)}
                    className={`w-20 h-20 text-2xl font-bold border border-gray-400 bg-black cursor-pointer
                        flex items-center justify-center transition-all duration-300 ease-in-out
                        hover:scale-105 hover:text-red-400 ${winningCells.includes(index) ? "bg-green-500 scale-105 animate-pulse" : ""}`}
                >
                    {value && (
                        <span className='animate-fade-in'>{value}</span>
                    )}
                </button>
            ))}
            
        </div>

        <button
            onClick={resetGame}
            className='my-4 px-4 py-2 cursor-pointer bg-blue-500 text-black font-semibold rounded-md hover:bg-blue-400 transition duration-300'
        >
            Restart Game
        </button>
    </div>
  )
}

export default TicTacToe