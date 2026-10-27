/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BoneData, BoneLandmark } from '../types/anatomy';
import { X, MapPin, Activity, Stethoscope, CheckCircle2 } from 'lucide-react';

interface LandmarkInspectorModalProps {
  landmark: BoneLandmark | null;
  bone: BoneData | null;
  onClose: () => void;
}

export const LandmarkInspectorModal: React.FC<LandmarkInspectorModalProps> = ({
  landmark,
  bone,
  onClose,
}) => {
  if (!landmark) return null;

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'eminencia_articular':
        return { label: 'Eminencia Articular', color: 'bg-sky-500/20 text-sky-300 border-sky-500/40' };
      case 'eminencia_no_articular':
        return { label: 'Eminencia No Articular (Inserción)', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' };
      case 'depresion':
        return { label: 'Depresión / Fosa / Surco', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' };
      case 'orificio':
        return { label: 'Orificio / Foramen / Conducto', color: 'bg-purple-500/20 text-purple-300 border-purple-500/40' };
      default:
        return { label: type, color: 'bg-slate-500/20 text-slate-300 border-slate-500/40' };
    }
  };

  const typeInfo = getTypeLabel(landmark.type);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden text-slate-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/80 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-300 shrink-0 mt-0.5">
              <MapPin size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${typeInfo.color}`}>
                  {typeInfo.label}
                </span>
                {bone && (
                  <span className="text-[10px] text-slate-400 font-medium">
                    Hueso: {bone.name}
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">
                {landmark.name}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 text-xs">
          <div>
            <h4 className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1.5">
              Definición y Morfología Anatómica
            </h4>
            <p className="text-slate-200 leading-relaxed text-sm">
              {landmark.description}
            </p>
          </div>

          {landmark.clinicalSignificance && (
            <div className="bg-teal-950/30 border border-teal-800/50 rounded-xl p-3.5 space-y-1.5">
              <div className="flex items-center gap-2 text-teal-300 font-bold text-xs">
                <Stethoscope size={15} />
                <span>Relevancia Clínica y Quirúrgica</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {landmark.clinicalSignificance}
              </p>
            </div>
          )}

          <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-teal-400" /> Coordenadas 3D mapeadas en el modelo
            </span>
            <span className="font-mono text-slate-500">
              [{landmark.coordinates3D?.join(', ')}]
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold rounded-xl text-xs transition shadow-md"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
