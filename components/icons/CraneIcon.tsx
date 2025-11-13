
import React from 'react';

export const CraneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 2v6"/>
    <path d="M12 8h8"/>
    <path d="M18 8v4"/>
    <path d="M12 2L6 8"/>
    <path d="M6 8H4a2 2 0 00-2 2v8a2 2 0 002 2h16a2 2 0 002-2v-8a2 2 0 00-2-2h-2"/>
  </svg>
);
