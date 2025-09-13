
import React, { useState, useRef, useEffect } from 'react';

interface TerminalInputProps {
  onCommand: (command: string) => void;
  isProcessing: boolean;
}

export const TerminalInput: React.FC<TerminalInputProps> = ({ onCommand, isProcessing }) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isProcessing) {
      inputRef.current?.focus();
    }
  }, [isProcessing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (value.trim()) {
        onCommand(value);
        setValue('');
      }
    }
  };

  if (isProcessing) {
    return (
        <div className="flex items-center">
            <span className="text-gray-400">Processing...</span>
            <span className="w-2 h-4 bg-green-400 animate-pulse ml-2"></span>
        </div>
    );
  }

  return (
    <div className="flex items-center">
      <span className="text-green-400 mr-2">&gt;&gt;&gt;</span>
      <input
        id="terminal-input"
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="bg-transparent text-green-400 focus:outline-none w-full"
        autoFocus
        autoComplete="off"
        spellCheck="false"
        disabled={isProcessing}
      />
    </div>
  );
};
