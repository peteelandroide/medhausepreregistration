import React, { useState } from 'react';
import type { Procedure } from '../types';

const procedures: Procedure[] = [
  { name: 'Aumento mamario', minUSD: 4000, maxUSD: 10000 },
  { name: 'Reducción mamaria', minUSD: 4500, maxUSD: 12000 },
  { name: 'Levantamiento mamario', minUSD: 4500, maxUSD: 12000 },
  { name: 'Rinoplastia', minUSD: 4000, maxUSD: 15000 },
  { name: 'Braquioplastia (Brazos)', minUSD: 4000, maxUSD: 10000 },
  { name: 'Lifting facial', minUSD: 7000, maxUSD: 15000 },
  { name: 'Abdominoplastia', minUSD: 6000, maxUSD: 12000 },
  { name: 'Lipoabdominoplastia', minUSD: 8000, maxUSD: 15000 },
  { name: 'Lipoescultura 360', minUSD: 5000, maxUSD: 12000 },
  { name: 'Aumento glúteo', minUSD: 6000, maxUSD: 12000 },
  { name: 'Cruroplastia (Piernas)', minUSD: 4000, maxUSD: 10000 },
  { name: 'Blefaroplastia', minUSD: 3000, maxUSD: 8000 },
  { name: 'Otoplastia', minUSD: 3000, maxUSD: 8000 },
  { name: 'Mentoplastia', minUSD: 4000, maxUSD: 10000 },
];

const currencies = [
  { code: 'COP', name: 'Peso colombiano' },
  { code: 'USD', name: 'Dólar estadounidense' },
  { code: 'MXN', name: 'Peso mexicano' },
  { code: 'CAD', name: 'Dólar canadiense' },
  { code: 'ARS', name: 'Peso argentino' },
  { code: 'BRL', name: 'Real brasileño' },
  { code: 'CLP', name: 'Peso chileno' },
  { code: 'PEN', name: 'Sol peruano' },
  { code: 'UYU', name: 'Peso uruguayo' },
  { code: 'BOB', name: 'Boliviano' },
  { code: 'PYG', name: 'Guaraní paraguayo' },
  { code: 'CRC', name: 'Colón costarricense' },
  { code: 'GTQ', name: 'Quetzal guatemalteco' },
  { code: 'HNL', name: 'Lempira hondureña' },
  { code: 'NIO', name: 'Córdoba nicaragüense' },
  { code: 'PAB', name: 'Balboa panameño' },
];

const exchangeRates: { [key: string]: number } = {
  USD: 1,
  COP: 4000,
  MXN: 17.5,
  CAD: 1.35,
  ARS: 920,
  BRL: 5.15,
  CLP: 980,
  PEN: 3.75,
  UYU: 39,
  BOB: 6.9,
  PYG: 7300,
  CRC: 515,
  GTQ: 7.8,
  HNL: 24.7,
  NIO: 36.6,
  PAB: 1,
};

const formatCurrency = (value: number, currency: string) => {
  try {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  } catch (error) {
    // Fallback for potentially unsupported currency codes
    console.error(`Currency formatting error for ${currency}:`, error);
    return `${currency} ${Math.round(value).toLocaleString('es-CO')}`;
  }
};

const PricingTable: React.FC = () => {
  const [currency, setCurrency] = useState<string>('COP');

  const currentRate = exchangeRates[currency] || 1;

  return (
    <section className="py-16 sm:py-24 bg-[#E2E2D8]">
      <div className="container mx-auto px-4">
        <h2 className="font-domine text-3xl sm:text-4xl font-bold text-center text-[#484E57] mb-8">
          Una Guía de Precios para Planificar Tu Transformación
        </h2>

        <div className="flex justify-center mb-8 font-montserrat">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <label htmlFor="currency-select" className="font-semibold text-[#484E57]">
              Mostrar precios en:
            </label>
            <select
              id="currency-select"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-[#484E57] focus:border-[#484E57] block w-full sm:w-auto p-2.5 shadow-sm"
              aria-label="Seleccionar moneda"
            >
              {currencies.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name} ({c.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full text-left font-montserrat">
            <thead className="bg-[#484E57] text-white uppercase tracking-wider text-sm">
              <tr>
                <th className="p-4 w-1/2 sm:w-1/3">Procedimiento</th>
                <th className="p-4 text-right">Precio Mínimo (Aprox.)</th>
                <th className="p-4 text-right">Precio Máximo (Aprox.)</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {procedures.map((proc, index) => (
                <tr key={proc.name} className={index % 2 === 0 ? 'bg-white' : 'bg-[#C3C6C8]/20'}>
                  <td className="p-4 font-semibold text-[#484E57]">{proc.name}</td>
                  <td className="p-4 text-right text-gray-700">
                    {formatCurrency(proc.minUSD * currentRate, currency)}
                  </td>
                  <td className="p-4 text-right text-gray-700">
                    {formatCurrency(proc.maxUSD * currentRate, currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PricingTable;
