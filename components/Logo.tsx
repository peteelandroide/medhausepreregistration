import React from 'react';

export const Logo: React.FC<{ variant?: 'light' | 'dark', size?: 'sm' | 'md' | 'lg' | 'xl' }> = ({ variant = 'dark', size = 'md' }) => {
  const textColor = variant === 'light' ? 'text-white' : 'text-mh-blue';
  const accentColor = 'text-mh-gold'; // Gold is always gold
  const borderColor = 'border-mh-gold'; // Border is always gold based on the image
  
  let scale = 1;
  if (size === 'sm') scale = 0.75;
  if (size === 'lg') scale = 1.5;
  if (size === 'xl') scale = 2;

  // The logo icon: A rounded square with a cross/H shape inside
  // Based on the "MedHause Cross Medical Center" logo image
  return (
    <div className={`flex flex-col items-center justify-center font-heading ${textColor}`} style={{ transform: `scale(${scale})` }}>
      {/* Icon */}
      <div className={`w-16 h-16 rounded-2xl border-4 ${borderColor} flex items-center justify-center p-1 mb-2 bg-transparent`}>
         <div className="flex gap-1 h-full w-full items-center justify-center relative">
            {/* Left Bar */}
            <div className="w-2 h-full bg-mh-blue rounded-sm"></div>
            {/* Middle Bar with Cross */}
            <div className="w-2 h-full bg-mh-gold rounded-sm relative flex items-center justify-center">
                <div className="absolute w-8 h-2 bg-mh-gold rounded-sm"></div>
            </div>
            {/* Right Bar */}
            <div className="w-2 h-full bg-mh-blue rounded-sm"></div>
         </div>
      </div>
      
      {/* Text */}
      <h1 className="text-2xl font-bold tracking-wider leading-none">MEDHAUSE</h1>
      <span className={`text-[0.4em] font-medium tracking-[0.2em] uppercase opacity-90 ${accentColor}`}>
        CROSS MEDICAL CENTER
      </span>
    </div>
  );
};