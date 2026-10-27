/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BoneData } from '../types/anatomy';
import {
  Search,
  BookOpen,
  HelpCircle,
  Activity,
  Layers,
  X,
} from 'lucide-react';

interface NavigationHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  filteredBones: BoneData[];
  onSelectBone: (bone: BoneData | null) => void;
  onOpenGlossary: () => void;
  onOpenQuiz: () => void;
  onOpenHistology: () => void;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  searchQuery,
  onSearchChange,
  filteredBones,
  onSelectBone,
  onOpenGlossary,
  onOpenQuiz,
  onOpenHistology,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-14 z-30 bg-slate-950/90 border-b border-slate-800/80 px-4 flex items-center justify-between gap-4">
      {/* Brand & Title */}
      <div className="flex items-center gap-3">
        <div
          onClick={() => onSelectBone(null)}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 font-bold group-hover:scale-105 transition shadow-lg shadow-teal-500/10">
            <span className="text-base font-serif">🦴</span>
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              OsteoAtlas 3D
              <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.2 bg-teal-500/15 text-teal-300 border border-teal-500/30 rounded">
                Anatomía Humana
              </span>
            </h1>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              206 Huesos • Reparos Óseos y Accidentes Anatómicos
            </p>
          </div>
        </div>
      </div>

      {/* Universal Search Bar */}
      <div className="relative flex-1 max-w-md hidden md:block">
        <div className="relative flex items-center">
          <Search size={15} className="absolute left-3 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar hueso o reparo (ej: fémur, trocánter, foramen magno...)"
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-8 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-teal-500/80 transition"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 text-slate-400 hover:text-white"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {searchQuery.trim().length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl max-h-72 overflow-y-auto p-1.5 z-50">
            {filteredBones.length === 0 ? (
              <p className="text-xs text-slate-400 p-3 text-center">
                No se encontraron huesos o reparos para "{searchQuery}"
              </p>
            ) : (
              filteredBones.map((bone) => (
                <div
                  key={bone.id}
                  onClick={() => {
                    onSelectBone(bone);
                    onSearchChange('');
                  }}
                  className="p-2 rounded-lg hover:bg-slate-800 cursor-pointer transition flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white text-xs">{bone.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono italic">
                        {bone.latinName}
                      </span>
                    </div>
                    <span className="text-[10px] text-teal-400 capitalize">
                      {bone.division} • {bone.category} • {bone.landmarks.length} reparos óseos
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    3D
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Auxiliary Tool Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenHistology}
          className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 rounded-xl text-xs font-medium flex items-center gap-1.5 transition shadow-sm"
          title="Microestructura e histología ósea"
        >
          <Activity size={14} className="text-amber-400" />
          <span className="hidden lg:inline">Histología Ósea</span>
        </button>

        <button
          onClick={onOpenGlossary}
          className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 rounded-xl text-xs font-medium flex items-center gap-1.5 transition shadow-sm"
          title="Diccionario de reparos y accidentes óseos"
        >
          <BookOpen size={14} className="text-teal-400" />
          <span className="hidden lg:inline">Glosario</span>
        </button>

        <button
          onClick={onOpenQuiz}
          className="px-2.5 py-1.5 bg-teal-500/15 hover:bg-teal-500/25 text-teal-300 border border-teal-500/40 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
          title="Autoevaluación de osteología"
        >
          <HelpCircle size={14} />
          <span>Quiz</span>
        </button>
      </div>
    </header>
  );
};
