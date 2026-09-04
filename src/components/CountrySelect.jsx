import React, { useState, useRef, useEffect } from 'react';

const countries = [
  { code: 'CO', dialCode: '+57', name: 'Colombia' },
  { code: 'US', dialCode: '+1', name: 'Estados Unidos / Canadá' },
  { code: 'MX', dialCode: '+52', name: 'México' },
  { code: 'AR', dialCode: '+54', name: 'Argentina' },
  { code: 'ES', dialCode: '+34', name: 'España' },
  { code: 'PE', dialCode: '+51', name: 'Perú' },
  { code: 'CL', dialCode: '+56', name: 'Chile' },
  { code: 'EC', dialCode: '+593', name: 'Ecuador' },
  { code: 'VE', dialCode: '+58', name: 'Venezuela' },
  { code: 'BR', dialCode: '+55', name: 'Brasil' },
  { code: 'BO', dialCode: '+591', name: 'Bolivia' },
  { code: 'PY', dialCode: '+595', name: 'Paraguay' },
  { code: 'UY', dialCode: '+598', name: 'Uruguay' },
  { code: 'PA', dialCode: '+507', name: 'Panamá' },
  { code: 'CR', dialCode: '+506', name: 'Costa Rica' },
  { code: 'GT', dialCode: '+502', name: 'Guatemala' },
  { code: 'HN', dialCode: '+504', name: 'Honduras' },
  { code: 'SV', dialCode: '+503', name: 'El Salvador' },
  { code: 'NI', dialCode: '+505', name: 'Nicaragua' },
  { code: 'DO', dialCode: '+1809', name: 'República Dominicana' }, // Has multiple, simplifying to +1809 for demo
  { code: 'PR', dialCode: '+1787', name: 'Puerto Rico' },
  { code: 'CU', dialCode: '+53', name: 'Cuba' }
];

export default function CountrySelect({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const filteredCountries = countries.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.dialCode.includes(search)
  );

  const selected = countries.find(c => c.dialCode === value) || countries[0];

  return (
    <div className="relative flex-shrink-0" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`h-full flex items-center justify-between gap-1 px-3 bg-surface-container-low border border-r-0 border-outline-variant/40 rounded-l-sm text-on-surface hover:bg-surface-container transition-colors focus:outline-none ${isOpen ? 'border-secondary' : ''}`}
        style={{ minWidth: '90px' }}
      >
        <span className="font-medium text-sm">{selected.code} {selected.dialCode}</span>
        <span className="material-symbols-outlined text-[18px]">arrow_drop_down</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 max-h-60 overflow-y-auto bg-surface-container border border-outline-variant/30 rounded-md shadow-2xl z-50 p-2">
          <div className="sticky top-0 bg-surface-container pb-2">
            <input
              ref={inputRef}
              type="text"
              placeholder="Buscar país o código..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant/40 rounded px-3 py-2 text-sm text-on-surface focus:border-secondary focus:outline-none"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="mt-1 flex flex-col gap-1">
            {filteredCountries.map(c => (
              <button
                key={c.code}
                type="button"
                onClick={() => {
                  onChange(c.dialCode);
                  setIsOpen(false);
                  setSearch('');
                }}
                className={`w-full text-left px-3 py-2 text-sm rounded flex justify-between items-center transition-colors ${
                  value === c.dialCode 
                    ? 'bg-secondary/20 text-secondary font-medium' 
                    : 'hover:bg-surface-variant/20 text-on-surface'
                }`}
              >
                <span>{c.name}</span>
                <span className={value === c.dialCode ? 'text-secondary' : 'text-on-surface-variant'}>{c.dialCode}</span>
              </button>
            ))}
            {filteredCountries.length === 0 && (
              <p className="text-xs text-on-surface-variant text-center py-4">No se encontraron resultados.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
