
import React from 'react';

export const RtgIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2 12h20"/>
    <path d="M4 12v6h2v-6"/>
    <path d="M18 12v6h2v-6"/>
    <path d="M12 12v-4"/>
    <path d="M10 8h4"/>
    <circle cx="6" cy="20" r="2"/>
    <circle cx="18" cy="20" r="2"/>
  </svg>
);
