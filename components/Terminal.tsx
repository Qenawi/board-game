import React, { useRef, useEffect } from 'react';
import { TerminalInput } from './TerminalInput';
import { TerminalOutput } from './TerminalOutput';
import { TerminalHeader } from './TerminalHeader';

interface TerminalProps {
    history: string[];
    isProcessing: boolean;
    onCommand: (command: string) => void;
}

export const Terminal: React.FC<TerminalProps> = ({ history, isProcessing, onCommand }) => {
    const terminalRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [history, isProcessing]);

    return (
        <div className="w-full h-full bg-[#1E1E1E] rounded-lg shadow-2xl flex flex-col overflow-hidden border border-gray-700">
            <TerminalHeader />
            <div
                ref={terminalRef}
                className="flex-grow p-4 overflow-y-auto"
                onClick={() => document.getElementById('terminal-input')?.focus()}
            >
                <TerminalOutput history={history} />
                <TerminalInput onCommand={onCommand} isProcessing={isProcessing} />
            </div>
        </div>
    );
};