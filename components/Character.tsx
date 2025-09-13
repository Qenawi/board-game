import React from 'react';
import { CharacterState } from '../App';
import { MageIcon, ArcherIcon, WarriorIcon, AssassinIcon, CasterIcon } from '../assets/characters';

interface CharacterProps {
  character: CharacterState;
}

const characterIconMap = {
  Mage: MageIcon,
  Archer: ArcherIcon,
  Warrior: WarriorIcon,
  Assassin: AssassinIcon,
  Caster: CasterIcon,
};

export const Character: React.FC<CharacterProps> = ({ character }) => {
  const Icon = characterIconMap[character.type] || CasterIcon;
  const colorClass = character.player === 1 ? 'text-blue-400' : 'text-red-400';

  let animationClass = 'animate-fade-in';
  if (character.status === 'attacking') {
    animationClass = 'animate-shake';
  } else if (character.status === 'dying') {
    animationClass = 'animate-fade-out';
  }

  return (
    <div 
      className={`w-full h-full flex items-center justify-center ${animationClass}`} 
      title={`${character.type} (Player ${character.player})`}
    >
      <Icon className={`w-3/4 h-3/4 ${colorClass} drop-shadow-lg`} />
    </div>
  );
};
