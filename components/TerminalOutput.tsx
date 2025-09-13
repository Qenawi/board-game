
import React from 'react';

interface TerminalOutputProps {
  history: string[];
}

export const TerminalOutput: React.FC<TerminalOutputProps> = ({ history }) => {
  return (
    <div>
      {history.map((line, index) => (
        <div key={index} className="whitespace-pre-wrap break-words">
          {line.startsWith('>>>') ? (
            <span>
              <span className="text-green-400">{line.substring(0, 3)}</span>
              <span className="text-gray-200">{line.substring(3)}</span>
            </span>
          ) : (
            <span className="text-gray-300">{line}</span>
          )}
        </div>
      ))}
    </div>
  );
};
