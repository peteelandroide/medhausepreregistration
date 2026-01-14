import React from 'react';

interface Props {
  label: string;
  value: number;
  onChange: (val: number) => void;
  type?: 'currency' | 'number';
  max?: number;
  step?: number;
}

export const CalculatorInput: React.FC<Props> = ({ label, value, onChange, type = 'number', max = 100, step = 1 }) => {
  const formatCurrency = (val: number) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="mb-4 bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        <span className="text-xs font-bold text-mh-blue bg-blue-50 px-2 py-1 rounded">
          {type === 'currency' ? formatCurrency(value) : value}
        </span>
      </div>
      <div className="flex gap-4 items-center">
        <input
            type="range"
            min="0"
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="flex-grow h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-mh-blue"
        />
        <input 
            type="number"
            min="0"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-20 p-1 text-right text-sm border rounded focus:ring-2 focus:ring-mh-blue outline-none"
        />
      </div>
    </div>
  );
};