// src/App.js
import React, { useState } from 'react';

const TOTAL_CELLS = 36;
const SAFE_ZONES = [0, 8, 13, 21]; // Define safe zones for the game

function App() {
  const [diceValue, setDiceValue] = useState(1);
  const [playerPositions, setPlayerPositions] = useState([0, 0, 0, 0]); // Track position of each player
  const [currentPlayer, setCurrentPlayer] = useState(0); // Track the current player's turn
  const [gameOver, setGameOver] = useState(false);

  // Function to roll the dice
  const rollDice = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceValue(roll);
  };

  // Function to move player
  const movePlayer = () => {
    setPlayerPositions((prevPositions) => {
      const newPositions = [...prevPositions];
      const newPosition = newPositions[currentPlayer] + diceValue;

      // Check for win condition
      if (newPosition >= TOTAL_CELLS) {
        alert(`Player ${currentPlayer + 1} wins!`);
        setGameOver(true);
        return newPositions;
      }

      // Check if the new position is a safe zone or an attack zone
      if (!SAFE_ZONES.includes(newPosition)) {
        newPositions.forEach((pos, index) => {
          if (index !== currentPlayer && pos === newPosition) {
            // Send other player's token back to the start
            newPositions[index] = 0;
            alert(`Player ${currentPlayer + 1} attacked Player ${index + 1}!`);
          }
        });
      }

      newPositions[currentPlayer] = newPosition;
      return newPositions;
    });

    // Move to the next player
    setCurrentPlayer((prev) => (prev + 1) % 4);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Ludo Game</h1>

      {/* Dice Section */}
      <div className="mb-4">
        {gameOver ? (
          <p className="text-xl text-green-500">Game Over! Refresh to restart.</p>
        ) : (
          <>
            <p className="text-xl">Dice Roll: {diceValue}</p>
            <button
              onClick={rollDice}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Roll Dice
            </button>
            <p className="text-lg mt-4">Player {currentPlayer + 1}'s turn</p>
            <button
              onClick={movePlayer}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
              disabled={diceValue === 0}
            >
              Move Player {currentPlayer + 1}
            </button>
          </>
        )}
      </div>

      {/* Ludo Board */}
      <div className="grid grid-cols-6 gap-2 mb-4">
        {[...Array(TOTAL_CELLS)].map((_, i) => (
          <div
            key={i}
            className={`w-16 h-16 border-2 ${
              playerPositions.includes(i)
                ? 'bg-yellow-300'
                : SAFE_ZONES.includes(i)
                ? 'bg-blue-300'
                : 'bg-green-200'
            } flex items-center justify-center`}
          >
            {playerPositions.map((pos, index) =>
              pos === i ? `P${index + 1}` : ''
            )}
          </div>
        ))}
      </div>

      {/* Players Section */}
      <div className="flex space-x-4">
        {[0, 1, 2, 3].map((player) => (
          <div
            key={player}
            className={`px-4 py-2 rounded ${
              currentPlayer === player ? 'bg-red-500 text-white' : 'bg-gray-500 text-white'
            }`}
          >
            Player {player + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
