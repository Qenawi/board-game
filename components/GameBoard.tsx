import React from 'react';
import { CharacterState } from '../App';
import { Character } from './Character';

interface GameBoardProps {
  board: (CharacterState | null)[][];
}

export const GameBoard: React.FC<GameBoardProps> = ({ board }) => {
  return (
    <div className="w-full h-full bg-[#1E1E1E] rounded-lg shadow-2xl flex items-center justify-center p-4 border border-gray-700">
      <div className="grid grid-cols-8 gap-1 bg-gray-900 p-2 rounded-md aspect-square max-w-full max-h-full">
        {board.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${y}-${x}`}
              className="w-full h-full bg-gray-700/50 rounded-sm flex items-center justify-center aspect-square relative"
            >
              {cell && <Character character={cell} />}
            </div>
          ))
        )}
      </div>
    </div>
  );
};