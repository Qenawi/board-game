import React, { useState, useCallback } from 'react';
import { runCommand, GameAction } from './services/geminiService';
import { GameBoard } from './components/GameBoard';
import { Terminal } from './components/Terminal';

export interface CharacterState {
  id: string;
  type: 'Mage' | 'Archer' | 'Warrior' | 'Assassin' | 'Caster';
  player: 1 | 2;
  status?: 'attacking' | 'dying';
}

const BOARD_SIZE = 8;

const initialHistory = [
    'Python Game Dev Terminal [Version 1.0.0]',
    '(c) AI Corporation. All rights reserved.',
    '',
    'Welcome! The game board is now interactive.',
    'Try commands like:',
    '- `place an Archer for player 2 at (7, 4)`',
    '- `move character from (7, 4) to (6, 4)`',
    '- `archer at (6, 4) attacks mage at (0, 4)`',
    ''
];

const App: React.FC = () => {
  const [history, setHistory] = useState<string[]>(initialHistory);
  const [isProcessing, setIsProcessing] = useState(false);
  const [board, setBoard] = useState<(CharacterState | null)[][]>(
    Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null))
  );

  const handleCommand = useCallback(async (command: string) => {
    if (isProcessing) return;
    
    setHistory(prev => [...prev, `>>> ${command}`]);

    if (command.trim().toLowerCase() === 'clear') {
      setHistory([]);
      setBoard(Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null)));
      return;
    }

    setIsProcessing(true);
    try {
      const result: GameAction = await runCommand(command);
      
      const formattedResult = result.textResponse.replace(/```python\n|```/g, '').trim();
      setHistory(prev => [...prev, formattedResult, '']);
      
      if (result.action === 'place' && result.details?.position) {
        const { character, player, position } = result.details;
        if (position.x < BOARD_SIZE && position.y < BOARD_SIZE) {
            setBoard(prevBoard => {
                const newBoard = prevBoard.map(row => [...row]);
                newBoard[position.y][position.x] = {
                    id: `${character}-${player}-${Date.now()}`,
                    type: character,
                    player: player,
                };
                return newBoard;
            });
        }
      } else if (result.action === 'move' && result.details?.from && result.details?.to) {
        const { from, to } = result.details;
        if (from.x < BOARD_SIZE && from.y < BOARD_SIZE && to.x < BOARD_SIZE && to.y < BOARD_SIZE) {
          setBoard(prevBoard => {
            const newBoard = prevBoard.map(row => [...row]);
            const characterToMove = newBoard[from.y][from.x];
            if (characterToMove && !newBoard[to.y][to.x]) {
              newBoard[to.y][to.x] = characterToMove;
              newBoard[from.y][from.x] = null;
            }
            return newBoard;
          });
        }
      } else if (result.action === 'attack' && result.details?.attacker && result.details?.target) {
        const { attacker, target } = result.details;
        
        setBoard(prevBoard => {
            const newBoard = prevBoard.map(row => row.map(cell => cell ? {...cell} : null));
            const attackingChar = newBoard[attacker.y]?.[attacker.x];
            const targetChar = newBoard[target.y]?.[target.x];

            if (attackingChar) attackingChar.status = 'attacking';
            if (targetChar) targetChar.status = 'dying';
            
            return newBoard;
        });

        setTimeout(() => {
            setBoard(prevBoard => {
                const newBoard = prevBoard.map(row => row.map(cell => cell ? {...cell} : null));
                const attackingChar = newBoard[attacker.y]?.[attacker.x];
                if (attackingChar) delete attackingChar.status;
                newBoard[target.y][target.x] = null;
                return newBoard;
            });
        }, 300); // Duration of animations
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      setHistory(prev => [...prev, `Error: ${errorMessage}`, '']);
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing]);

  return (
    <div className="bg-gray-900 text-white min-h-screen font-mono flex items-center justify-center p-4">
      <div className="w-full max-w-7xl h-[90vh] grid grid-cols-1 md:grid-cols-2 gap-4">
        <Terminal 
          history={history}
          isProcessing={isProcessing}
          onCommand={handleCommand}
        />
        <GameBoard board={board} />
      </div>
    </div>
  );
};

export default App;