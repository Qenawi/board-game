
import React from 'react';

export const TerminalHeader: React.FC = () => {
  return (
    <div className="bg-gray-700 p-2 flex items-center border-b border-gray-600">
      <div className="flex space-x-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <div className="flex-grow text-center text-sm text-gray-300">
        python - game_dev_session.py
      </div>
    </div>
  );
};
