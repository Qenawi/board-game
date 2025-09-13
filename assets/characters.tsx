import React from 'react';

export const MageIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3v18" />
    <path d="M14 3v18" />
    <path d="M6 9h8" />
    <path d="M6 15h8" />
    <path d="M3 6l3-3 3 3" />
    <path d="M3 18l3 3 3-3" />
  </svg>
);

export const ArcherIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s-8-4.5-8-12V4l8-2 8 2v6c0 7.5-8 12-8 12z" />
    <path d="M12 12l8-4" />
    <path d="M12 12V2" />
    <path d="M12 12L4 8" />
    <path d="m15 9-3 3-3-3" />
  </svg>
);

export const WarriorIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3V6a3 3 0 0 0-3-3z" />
    <path d="M6 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3V6a3 3 0 0 0-3-3z" />
    <line x1="9" y1="12" x2="15" y2="12" />
  </svg>
);

export const AssassinIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="m9 12 2 2 4-4" />
    <path d="M14.5 9.5 12 7l-2.5 2.5" />
    <path d="M9.5 14.5 12 17l2.5-2.5" />
  </svg>
);

export const CasterIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);
