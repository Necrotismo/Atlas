/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { BONES_DATABASE, SKELETON_OVERVIEW } from './data/bonesData';
import { BoneData, BoneLandmark, ViewMode, SkeletalDivision, BoneCategory } from './types/anatomy';
import { AnatomyViewer3D } from './components/AnatomyViewer3D';
import { BottomControlDock } from './components/BottomControlDock';
import { BoneDetailPanel } from './components/BoneDetailPanel';
import { NavigationHeader } from './components/NavigationHeader';
import { LandmarkInspectorModal } from './components/LandmarkInspectorModal';
import { GlossaryModal } from './components/GlossaryModal';
import { AnatomyQuizModal } from './components/AnatomyQuizModal';
import { HistologyModal } from './components/HistologyModal';
import { Layers, Shield, Sparkles, Filter, ChevronRight, Info } from 'lucide-react';

export default function App() {
  const [selectedBone, setSelectedBone] = useState<BoneData | null>(BONES_DATABASE[0]); // default to Femur for immediate anatomical richness
  const [viewMode, setViewMode] = useState<ViewMode>('realistic');
  const [showLandmarks, setShowLandmarks] = useState<boolean>(true);
  const [activeLandmark, setActiveLandmark] = useState<BoneLandmark | null>(null);
  const [inspectorLandmark, setInspectorLandmark] = useState<BoneLandmark | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [divisionFilter, setDivisionFilter] = useState<'all' | SkeletalDivision>('all');
  const [showGlossary, setShowGlossary] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showHistology, setShowHistology] = useState(false);
  const [showOverviewDrawer, setShowOverviewDrawer] = useState(false);

  // Filter bones based on search query and division filter
  const filteredBones = useMemo(() => {
    return BONES_DATABASE.filter((bone) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        bone.name.toLowerCase().includes(q) ||
        bone.latinName.toLowerCase().includes(q) ||
        bone.region.toLowerCase().includes(q) ||
        bone.landmarks.some((lm) => lm.name.toLowerCase().includes(q));

      const matchesDivision = divisionFilter === 'all' || bone.division === divisionFilter;

      return matchesSearch && matchesDivision;
    });
  }, [searchQuery, divisionFilter]);

  const handleSelectBone = (bone: BoneData | null) => {
    setSelectedBone(bone);
    setActiveLandmark(null);
    setInspectorLandmark(null);
    if (showHistology) setShowHistology(false);
  };

  const handleSelectBoneById = (boneId: string) => {
    const found = BONES_DATABASE.find((b) => b.id === boneId);
    if (found) {
      handleSelectBone(found);
    }
  };

  const handleSelectLandmark = (landmark: BoneLandmark | null) => {
    setActiveLandmark(landmark);
    if (landmark) {
      setInspectorLandmark(landmark);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950 font-sans text-slate-100 select-none">
      {/* Top Navigation Bar */}
      <NavigationHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filteredBones={filteredBones}
        onSelectBone={handleSelectBone}
        onOpenGlossary={() => setShowGlossary(true)}
        onOpenQuiz={() => setShowQuiz(true)}
        onOpenHistology={() => setShowHistology(true)}
      />

      {/* Main 3D Anatomy Canvas */}
      <main className="w-full h-full pt-14 pb-20">
        <AnatomyViewer3D
          selectedBone={selectedBone}
          viewMode={viewMode}
          showLandmarks={showLandmarks}
          activeLandmark={activeLandmark}
          onSelectLandmark={handleSelectLandmark}
          onSelectBoneById={handleSelectBoneById}
          showHistology={showHistology}
        />
      </main>

      {/* Left Quick Region Selector / Overview Pill */}
      <div className="fixed top-20 left-4 z-20 flex flex-col gap-2 max-w-[240px]">
        {/* Toggle between Overview and Bone List */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-2.5 shadow-xl text-xs space-y-2">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              División Esquelética
            </span>
            <span className="text-[10px] text-teal-400 font-mono">206 Huesos</span>
          </div>

          <div className="grid grid-cols-3 gap-1">
            <button
              onClick={() => setDivisionFilter('all')}
              className={`py-1 text-[11px] rounded-lg transition font-medium text-center ${
                divisionFilter === 'all'
                  ? 'bg-teal-500 text-slate-950 font-bold'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => {
                setDivisionFilter('axial');
                setViewMode('regions');
              }}
              className={`py-1 text-[11px] rounded-lg transition font-medium text-center ${
                divisionFilter === 'axial'
                  ? 'bg-sky-500 text-slate-950 font-bold'
                  : 'bg-slate-800/80 text-sky-300 hover:text-white'
              }`}
            >
              Axial (80)
            </button>
            <button
              onClick={() => {
                setDivisionFilter('apendicular');
                setViewMode('regions');
              }}
              className={`py-1 text-[11px] rounded-lg transition font-medium text-center ${
                divisionFilter === 'apendicular'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-800/80 text-amber-300 hover:text-white'
              }`}
            >
              Apend. (126)
            </button>
          </div>

          {/* Quick skeleton facts or bone count */}
          <div className="pt-1 text-[10px] text-slate-400 flex items-center justify-between">
            <span>Modelos interactivos:</span>
            <strong className="text-white font-mono">{BONES_DATABASE.length} especializados</strong>
          </div>
        </div>

        {/* System Function Info Card (Collapsible) */}
        <button
          onClick={() => setShowOverviewDrawer(!showOverviewDrawer)}
          className="bg-slate-900/85 hover:bg-slate-850 border border-slate-800 rounded-xl p-2 text-left text-xs text-slate-300 flex items-center justify-between shadow-lg transition"
        >
          <div className="flex items-center gap-1.5">
            <Shield size={14} className="text-teal-400" />
            <span className="font-semibold text-white text-[11px]">Funciones del Sistema Óseo</span>
          </div>
          <ChevronRight
            size={14}
            className={`text-slate-400 transform transition-transform ${
              showOverviewDrawer ? 'rotate-90' : ''
            }`}
          />
        </button>

        {showOverviewDrawer && (
          <div className="bg-slate-900/95 border border-slate-700/80 rounded-2xl p-3 shadow-2xl text-[11px] space-y-2 animate-fade-in max-h-72 overflow-y-auto scrollbar-thin">
            <h4 className="font-bold text-white text-xs border-b border-slate-800 pb-1">
              Fisiología y Biomecánica Ósea
            </h4>
            {SKELETON_OVERVIEW.functions.map((fn, idx) => (
              <div key={idx} className="space-y-0.5">
                <strong className="text-teal-300 block">{fn.title}</strong>
                <p className="text-slate-400 leading-snug">{fn.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Bone Detail Drawer */}
      {selectedBone && !showHistology && (
        <BoneDetailPanel
          bone={selectedBone}
          activeLandmark={activeLandmark}
          onSelectLandmark={handleSelectLandmark}
          onClose={() => setSelectedBone(null)}
        />
      )}

      {/* Histology Overlay Badge */}
      {showHistology && (
        <div className="fixed top-18 right-4 z-30 bg-slate-900/95 border border-amber-500/50 rounded-2xl p-4 shadow-2xl max-w-sm text-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Histología Ósea 3D
            </span>
            <button
              onClick={() => setShowHistology(false)}
              className="text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          <h3 className="font-bold text-white text-sm">Corte Transversal del Hueso</h3>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            Estructura concéntrica de la diáfisis: periostio externo, corteza de osteonas compactas con conductos de Havers y Volkmann, médula ósea y red trabecular.
          </p>
          <div className="space-y-1 text-[11px]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              <span>Periostio Fibrovascular</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#eadbc8]" />
              <span>Osteonas Compactas (Sistemas de Havers)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span>Conductos Neurovasculares de Havers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>Médula Ósea / Hueso Esponjoso</span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Ergonomic Dock (Collapsible Zen Mode) */}
      <BottomControlDock
        viewMode={viewMode}
        onChangeViewMode={setViewMode}
        showLandmarks={showLandmarks}
        onToggleLandmarks={() => setShowLandmarks(!showLandmarks)}
        selectedBone={selectedBone}
        onSelectBone={handleSelectBone}
        allBones={BONES_DATABASE}
        showHistology={showHistology}
        onToggleHistology={() => setShowHistology(!showHistology)}
      />

      {/* Modals */}
      <LandmarkInspectorModal
        landmark={inspectorLandmark}
        bone={selectedBone}
        onClose={() => setInspectorLandmark(null)}
      />

      <GlossaryModal
        isOpen={showGlossary}
        onClose={() => setShowGlossary(false)}
      />

      <AnatomyQuizModal
        isOpen={showQuiz}
        onClose={() => setShowQuiz(false)}
        onFocusBone={handleSelectBoneById}
      />

      <HistologyModal
        isOpen={showHistology && inspectorLandmark === null && !selectedBone}
        onClose={() => {}}
        onView3DCutaway={() => setShowHistology(true)}
      />
    </div>
  );
}
