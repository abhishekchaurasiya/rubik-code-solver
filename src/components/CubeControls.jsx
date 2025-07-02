/* eslint-disable no-unused-vars */
import React from "react";

const CubeControls = ({
  onMove,
  onScramble,
  onReset,
  onSolve,
  isDisabled = false,
}) => {
  const moves = [
    "F",
    "F'",
    "R",
    "R'",
    "U",
    "U'",
    "L",
    "L'",
    "D",
    "D'",
    "B",
    "B'",
  ];
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Manual Controls</h3>
        <div className="grid grid-cols-6 gap-3 max-w-md mx-auto">
          {moves.map((move) => (
            <button
              key={move}
              onClick={() => onMove(move)}
              disabled={isDisabled}
              className="bg-pink-600 py-1 px-3 text-white rounded hover:bg-pink-700 transition-colors text-sm font-mono font-semibold cursor-pointer disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              {move}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={onScramble}
          disabled={isDisabled}
          className="cursor-pointer px-6 py-2 bg-orange-500 text-white rounded hover:bg-green-600 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors "
        >
          Scramble
        </button>

        <button
          onClick={onReset}
          disabled={isDisabled}
          className="cursor-pointer px-6 py-2 bg-slate-500 text-white rounded hover:bg-green-600 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
        >
          Reset
        </button>

        <button
          onClick={onSolve}
          disabled={isDisabled}
          className="cursor-pointer px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
        >
          Solve
        </button>
      </div>
    </div>
  );
};

export default CubeControls;
