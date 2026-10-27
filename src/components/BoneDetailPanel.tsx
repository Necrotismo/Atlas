/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BoneData, BoneLandmark } from '../types/anatomy';
import {
  X,
  Stethoscope,
  Activity,
  Layers,
  MapPin,
  ChevronRight,
  Maximize2,
  Minimize2,
  Info,
  BookOpen,
} from 'lucide-react';

interface BoneDetailPanelProps {
  bone: BoneData;
  activeLandmark: BoneLandmark | null;
  onSelectLandmark: (landmark: BoneLandmark) => void;
  onClose: () => void;
}

export const BoneDetailPanel: React.FC<BoneDetailPanelProps> = ({
  bone,
  activeLandmark,
  onSelectLandmark,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'reparos' | 'general' | 'articulaciones' | 'clinica'>('reparos');
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`fixed top-16 right-4 z-30 transition-all duration-300 flex flex-col bg-slate-900/95 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden ${
        isExpanded
          ? 'w-[520px] max-w-[94vw] h-[calc(100vh-140px)]'
          : 'w-[380px] max-w-[94vw] h-[calc(100vh-160px)]'
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-950/70 flex items-start justify-between">
        <div className="flex-1 pr-2">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                bone.division === 'axial'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}
            >
              Esqueleto {bone.division}
            </span>
            <span className="text-[10px] uppercase font-medium tracking-wide text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-full">
              Hueso {bone.category}
            </span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            {bone.name}
          </h2>
          <p className="text-xs italic text-teal-400 font-mono mt-0.5">{bone.latinName}</p>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            title={isExpanded ? 'Reducir ancho' : 'Ampliar ancho'}
          >
            {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition"
            title="Cerrar ficha"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-800/80 bg-slate-900 text-xs">
        <button
          onClick={() => setActiveTab('reparos')}
          className={`flex-1 py-2.5 font-medium transition flex items-center justify-center gap-1.5 border-b-2 ${
            activeTab === 'reparos'
              ? 'text-teal-400 border-teal-500 bg-teal-500/5'
              : 'text-slate-400 border-transparent hover:text-slate-200'
          }`}
        >
          <MapPin size={13} />
          <span>Reparos ({bone.landmarks.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('general')}
          className={`flex-1 py-2.5 font-medium transition flex items-center justify-center gap-1.5 border-b-2 ${
            activeTab === 'general'
              ? 'text-teal-400 border-teal-500 bg-teal-500/5'
              : 'text-slate-400 border-transparent hover:text-slate-200'
          }`}
        >
          <BookOpen size={13} />
          <span>Anatomía</span>
        </button>

        <button
          onClick={() => setActiveTab('articulaciones')}
          className={`flex-1 py-2.5 font-medium transition flex items-center justify-center gap-1.5 border-b-2 ${
            activeTab === 'articulaciones'
              ? 'text-teal-400 border-teal-500 bg-teal-500/5'
              : 'text-slate-400 border-transparent hover:text-slate-200'
          }`}
        >
          <Layers size={13} />
          <span>Músculos</span>
        </button>

        <button
          onClick={() => setActiveTab('clinica')}
          className={`flex-1 py-2.5 font-medium transition flex items-center justify-center gap-1.5 border-b-2 ${
            activeTab === 'clinica'
              ? 'text-teal-400 border-teal-500 bg-teal-500/5'
              : 'text-slate-400 border-transparent hover:text-slate-200'
          }`}
        >
          <Stethoscope size={13} />
          <span>Clínica</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin text-slate-300 text-xs space-y-4">
        {activeTab === 'reparos' && (
          <div className="space-y-3">
            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
              <Info size={14} className="text-teal-400 shrink-0" />
              <span>
                Haz clic en cualquier reparo óseo para resaltarlo e inspeccionarlo en el modelo 3D.
              </span>
            </div>

            <div className="space-y-2">
              {bone.landmarks.map((lm) => {
                const isSelected = activeLandmark?.id === lm.id;
                return (
                  <div
                    key={lm.id}
                    onClick={() => onSelectLandmark(lm)}
                    className={`p-3 rounded-xl border cursor-pointer transition text-left ${
                      isSelected
                        ? 'bg-teal-500/15 border-teal-500/80 shadow-md ring-1 ring-teal-500/50'
                        : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                            lm.type === 'eminencia_articular'
                              ? 'bg-sky-400'
                              : lm.type === 'depresion'
                              ? 'bg-amber-400'
                              : lm.type === 'orificio'
                              ? 'bg-purple-400'
                              : 'bg-emerald-400'
                          }`}
                        />
                        <h4 className="font-semibold text-white text-xs">{lm.name}</h4>
                      </div>
                      <ChevronRight size={14} className="text-slate-500" />
                    </div>

                    <span className="inline-block text-[10px] text-slate-400 uppercase tracking-wider mt-1 mb-1.5 capitalize font-mono">
                      {lm.type.replace('_', ' ')}
                    </span>

                    <p className="text-[11px] text-slate-300 leading-relaxed">{lm.description}</p>

                    {lm.clinicalSignificance && (
                      <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-start gap-1.5 text-[11px] text-teal-300/90">
                        <Activity size={12} className="shrink-0 mt-0.5 text-teal-400" />
                        <span>{lm.clinicalSignificance}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'general' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-slate-400 uppercase text-[10px] tracking-wider font-bold mb-1">
                Descripción Anatómica
              </h3>
              <p className="leading-relaxed text-slate-200">{bone.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                  Cantidad en el cuerpo
                </span>
                <p className="text-lg font-bold text-white mt-0.5">
                  {bone.countInBody} {bone.countInBody === 1 ? 'hueso' : 'huesos'}
                </p>
              </div>

              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Región</span>
                <p className="text-sm font-semibold text-teal-300 capitalize mt-0.5">
                  {bone.region.replace('-', ' ')}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-slate-400 uppercase text-[10px] tracking-wider font-bold mb-2">
                Articulaciones Principales
              </h3>
              <ul className="space-y-1.5">
                {bone.articulations.map((art, idx) => (
                  <li
                    key={idx}
                    className="bg-slate-950/40 p-2 rounded-lg border border-slate-800/80 text-[11px] flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                    <span>{art}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'articulaciones' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-slate-400 uppercase text-[10px] tracking-wider font-bold mb-2">
                Inserciones Musculares y Tendinosas
              </h3>
              <ul className="space-y-1.5">
                {bone.muscularAttachments.map((musc, idx) => (
                  <li
                    key={idx}
                    className="bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/80 text-[11px] flex items-center gap-2 text-slate-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    <span>{musc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'clinica' && (
          <div className="space-y-4">
            <div className="bg-rose-950/20 border border-rose-900/40 rounded-xl p-3">
              <div className="flex items-center gap-2 text-rose-300 font-bold mb-1.5 text-xs">
                <Stethoscope size={15} />
                <span>Correlación Clínica y Patología</span>
              </div>
              <p className="text-[11px] text-rose-200/90 leading-relaxed">{bone.clinicalNotes}</p>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-xs font-semibold text-white">Importancia Quirúrgica</h4>
              <p className="text-[11px] leading-relaxed text-slate-300">
                Los accidentes óseos sirven como hitos de abordaje anatómico, palpación percutánea
                para inyecciones o vías venosas profundas, y puntos de anclaje de osteosíntesis
                (placas, clavos intramedulares y tornillos).
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
