/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { OSTEOLOGY_GLOSSARY, OsteologyTerm } from '../data/glossaryData';
import { X, BookOpen, Search, Filter } from 'lucide-react';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'Todos los términos' },
    { id: 'eminencia_articular', label: 'Eminencias Articulares' },
    { id: 'eminencia_no_articular', label: 'Eminencias No Articulares' },
    { id: 'depresion', label: 'Depresiones y Fosas' },
    { id: 'orificio', label: 'Forámenes y Conductos' },
    { id: 'histologia', label: 'Histología Ósea' },
  ];

  const filteredTerms = OSTEOLOGY_GLOSSARY.filter((term) => {
    const matchesSearch =
      term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.example.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden text-slate-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-300">
              <BookOpen size={17} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Glosario de Términos y Reparos Osteológicos
              </h3>
              <p className="text-xs text-slate-400">
                Diccionario de accidentes anatómicos y morfología ósea
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/40 space-y-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar término (ej: cóndilo, fosa, osteona, trocánter...)"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-teal-500/80"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                  selectedCategory === c.id
                    ? 'bg-teal-500 text-slate-950 font-semibold'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Terms List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
          {filteredTerms.length === 0 ? (
            <p className="text-center text-xs text-slate-500 py-8">
              No se encontraron términos que coincidan con la búsqueda.
            </p>
          ) : (
            filteredTerms.map((term, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-slate-950/50 rounded-xl border border-slate-800 space-y-1.5 hover:border-slate-700 transition"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">{term.term}</h4>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-slate-800 text-teal-400">
                    {term.category.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{term.definition}</p>
                <div className="pt-1 text-[11px] text-slate-400 flex items-center gap-1.5">
                  <span className="font-semibold text-slate-300">Ejemplos clínicos:</span>
                  <span className="italic text-teal-300/80">{term.example}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
