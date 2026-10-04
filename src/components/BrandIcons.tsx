import React from 'react';

// Icônes de réseaux sociaux en SVG intégré : ne dépendent pas de lucide-react
// (qui retire ses icônes de marque dans ses versions récentes).
type P = { size?: number; className?: string };
const svg = (size: number, className?: string) => ({ width: size, height: size, viewBox: '0 0 24 24', className, 'aria-hidden': true as const });

export const FacebookIcon = ({ size = 18, className }: P) => (
    <svg {...svg(size, className)} fill="currentColor"><path d="M13.5 21v-8h2.7l.5-3.3h-3.2V7.6c0-.9.3-1.5 1.6-1.5h1.7V3.2c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.5H7.5V13h2.9v8z" /></svg>
);

export const InstagramIcon = ({ size = 18, className }: P) => (
    <svg {...svg(size, className)} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
);

export const LinkedinIcon = ({ size = 18, className }: P) => (
    <svg {...svg(size, className)} fill="currentColor">
        <rect x="3.5" y="9" width="3.4" height="11.5" />
        <circle cx="5.2" cy="5" r="2" />
        <path d="M10 9h3.2v1.6c.6-1 1.8-1.9 3.6-1.9 3.4 0 4.2 2.2 4.2 5.1v6.7h-3.4v-5.9c0-1.4 0-3.2-2-3.2s-2.2 1.5-2.2 3.1v6H10z" />
    </svg>
);

export const YoutubeIcon = ({ size = 18, className }: P) => (
    <svg {...svg(size, className)} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
        <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
        <path d="M10 9.2v5.6l5-2.8z" fill="currentColor" />
    </svg>
);

export const XIcon = ({ size = 18, className }: P) => (
    <svg {...svg(size, className)} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <path d="M4.5 4.5l15 15M19.5 4.5l-15 15" />
    </svg>
);

export const TiktokIcon = ({ size = 18, className }: P) => (
    <svg {...svg(size, className)} fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.63 4.14 1.02 1.11 2.45 1.8 3.94 2.01v4.06c-1.74-.01-3.41-.65-4.73-1.68-.31-.24-.59-.51-.85-.8-.06 2.8-.03 5.6-.04 8.41-.05 1.94-.57 3.86-1.55 5.48-1.57 2.6-4.52 4.13-7.53 3.9-2.82-.12-5.46-1.75-6.72-4.27-1.55-2.91-1.25-6.81 1.05-9.39 1.65-1.92 4.1-2.96 6.6-2.84v4.18c-1.46-.14-2.98.37-3.87 1.48-.99 1.15-1.12 2.9-.38 4.18.73 1.34 2.37 2.1 3.9 1.87 1.4-.12 2.63-1.16 2.94-2.52.12-.51.11-1.04.11-1.56V0h2.91z" />
    </svg>
);