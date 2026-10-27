/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ViewMode, BoneData } from '../types/anatomy';
import { Layers, Eye, Sparkles, Box, ChevronDown, ChevronUp, Activity } from 'lucide-react';

interface BottomControlDockProps {
  viewMode: ViewMode;
  onChangeViewMode: (mode: ViewMode) => void;
  showLandmarks: boolean;
  onToggleLandmarks: () => void;
  selectedBone: BoneData | null;
  onSelectBone: (bone: BoneData | null) => void;
  allBones: BoneData[];
  showHistology: boolean;
  onToggleHistology: () => void;
}

export const BottomControlDock: React.FC<BottomControlDockProps> = ({
  viewMode,
  onChangeViewMode,
  showLandmarks,
  onToggleLandmarks,
  selectedBone,
  onSelectBone,
  allBones,
  showHistology,
  onToggleHistology,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center w-full max-w-[920px] px-4 pointer-events-none transition-all duration-300">
      {/* Collapse / Expand Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="pointer-events-auto mb-2 px-3.5 py-1 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/70 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-lg transition"
      >
        {isCollapsed ? (
          <>
            <ChevronUp size={14} /> Mostrar Panel de Controles 3D
          </>
        ) : (
          <>
            <ChevronDown size={14} /> Ocultar Controles (Modo Cine)
          </>
        )}
      </button>

      {/* Main Dock Container */}
      {!isCollapsed && (
        <div className="pointer-events-auto w-full bg-slate-900/95 border border-slate-700/80 rounded-2xl shadow-2xl p-3 flex flex-col gap-2.5">
          {/* Top row: Quick 3D Bone Selector Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 pl-1 shrink-0">
              Modelos 3D:
            </span>
            <button
              onClick={() => {
                if (showHistology) onToggleHistology();
                onSelectBone(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition shrink-0 flex items-center gap-1.5 ${
                !selectedBone && !showHistology
                  ? 'bg-teal-500 text-slate-950 font-semibold shadow-md'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              <Box size={13} /> Esqueleto Completo
            </button>

            {allBones.map((b) => (
              <button
                key={b.id}
                onClick={() => {
                  if (showHistology) onToggleHistology();
                  onSelectBone(b);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition shrink-0 ${
                  selectedBone?.id === b.id && !showHistology
                    ? 'bg-teal-500 text-slate-950 font-semibold shadow-md'
                    : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                {b.name}
              </button>
            ))}

            <button
              onClick={onToggleHistology}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition shrink-0 flex items-center gap-1.5 ${
                showHistology
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-md'
                  : 'bg-slate-800/80 text-amber-300 hover:text-amber-200 hover:bg-slate-700'
              }`}
            >
              <Activity size={13} /> Corte Óseo 3D
            </button>
          </div>

          <div className="w-full h-px bg-slate-800/80" />

          {/* Bottom row: Visual Rendering Modes & Landmark Toggles */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">Modo Visual:</span>
              <div className="bg-slate-800/90 rounded-xl p-1 flex gap-1">
                <button
                  onClick={() => onChangeViewMode('realistic')}
                  className={`px-2.5 py-1 rounded-lg transition font-medium ${
                    viewMode === 'realistic'
                      ? 'bg-slate-700 text-teal-300 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Anatómico Real
                </button>
                <button
                  onClick={() => onChangeViewMode('xray')}
                  className={`px-2.5 py-1 rounded-lg transition font-medium flex items-center gap-1 ${
                    viewMode === 'xray'
                      ? 'bg-slate-700 text-sky-300 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Sparkles size={12} /> Rayos X
                </button>
                <button
                  onClick={() => onChangeViewMode('regions')}
                  className={`px-2.5 py-1 rounded-lg transition font-medium flex items-center gap-1 ${
                    viewMode === 'regions'
                      ? 'bg-slate-700 text-amber-300 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Axial (Cian) vs Apendicular (Ámbar)"
                >
                  <Layers size={12} /> Regiones
                </button>
              </div>
            </div>

            {/* Reparos Óseos 3D Pins Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={onToggleLandmarks}
                className={`px-3 py-1.5 rounded-xl font-medium transition flex items-center gap-1.5 ${
                  showLandmarks
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white'
                }`}
              >
                <Eye size={13} />
                <span>Reparos Óseos 3D</span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    showLandmarks ? 'bg-teal-400' : 'bg-slate-600'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
