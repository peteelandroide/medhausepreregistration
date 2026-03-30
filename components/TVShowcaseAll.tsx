import React, { useState, useEffect } from 'react';
import { TVShowcase } from './TVShowcase';
import { TVShowcaseSergio } from './TVShowcaseSergio';
import { TVShowcaseVanessa } from './TVShowcaseVanessa';
import { TVShowcaseOmar } from './TVShowcaseOmar';
import { TVShowcaseJohn } from './TVShowcaseJohn';
import { TVShowcaseDaniela } from './TVShowcaseDaniela';
import { TVShowcaseKeyla } from './TVShowcaseKeyla';

const components = [
  TVShowcase,
  TVShowcaseSergio,
  TVShowcaseVanessa,
  TVShowcaseOmar,
  TVShowcaseJohn,
  TVShowcaseDaniela,
  TVShowcaseKeyla
];

export const TVShowcaseAll: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Cycle every 20 seconds (20000 ms)
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % components.length);
        }, 20000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="fixed inset-0 bg-slate-950 overflow-hidden">
            {components.map((ShowcaseComponent, index) => {
                const isActive = index === currentIndex;
                return (
                    // Render all components simultaneously, but toggle opacity to show the active one.
                    // This avoids remounting React components and reloading images, ensuring smooth performance
                    // on slow computers.
                    <div 
                        key={index}
                        className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                        style={{ 
                            opacity: isActive ? 1 : 0,
                            pointerEvents: isActive ? 'auto' : 'none',
                            zIndex: isActive ? 10 : 0 
                        }}
                    >
                        <ShowcaseComponent />
                    </div>
                );
            })}
        </div>
    );
};
