/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Activity, Layers, Shield, Droplets } from 'lucide-react';

interface HistologyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onView3DCutaway: () => void;
}

export const HistologyModal: React.FC<HistologyModalProps> = ({
  isOpen,
  onClose,
  onView3DCutaway,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[88vh] flex flex-col overflow-hidden text-slate-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
              <Activity size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Microarquitectura e Histología del Tejido Óseo
              </h3>
              <p className="text-xs text-slate-400">
                Estructura microscópica, componentes celulares y vascularización ósea
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs scrollbar-thin">
          {/* Quick CTA to see the 3D model */}
          <div className="bg-gradient-to-r from-amber-500/20 via-slate-900 to-slate-900 border border-amber-500/40 rounded-xl p-3.5 flex items-center justify-between gap-3">
            <div>
              <h4 className="font-bold text-white text-sm">Visualización 3D de Corte Óseo</h4>
              <p className="text-slate-300 text-[11px] mt-0.5">
                Observa en el visor 3D las osteonas concéntricas, los vasos de Havers, el periostio y el canal medular.
              </p>
            </div>
            <button
              onClick={() => {
                onView3DCutaway();
                onClose();
              }}
              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition shrink-0 shadow-md"
            >
              Cargar Modelo 3D
            </button>
          </div>

          {/* Main Layers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-slate-950/50 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-teal-300 font-bold">
                <Shield size={16} />
                <span>1. Periostio (Capa Externa)</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Membrana fibrovascular que envuelve toda la superficie ósea externa, excepto en las superficies articulares revestidas por cartílago hialino. Su capa interna osteogénica provee osteoblastos para el crecimiento aposicional y reparación de fracturas.
              </p>
            </div>

            <div className="bg-slate-950/50 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-sky-300 font-bold">
                <Layers size={16} />
                <span>2. Hueso Compacto (Cortical)</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Estructura densa y rígida formada por millones de unidades cilíndricas llamadas <strong>Osteonas o Sistemas de Havers</strong>. Confiere una resistencia sobresaliente a la compresión, flexión y torsión.
              </p>
            </div>

            <div className="bg-slate-950/50 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-300 font-bold">
                <Activity size={16} />
                <span>3. Hueso Esponjoso (Trabecular)</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Red tridimensional porosa de finas láminas y espículas óseas (trabéculas) orientadas en la dirección exacta de las líneas de carga y tensión biomecánica, reduciendo el peso del esqueleto manteniendo alta resistencia.
              </p>
            </div>

            <div className="bg-slate-950/50 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-300 font-bold">
                <Droplets size={16} />
                <span>4. Médula Ósea (Roja y Amarilla)</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Ocupa el conducto medular y los espacios trabeculares. La médula roja es el tejido hematopoyético que produce células sanguíneas; con la edad, en las diáfisis de huesos largos es reemplazada por médula amarilla (adiposa).
              </p>
            </div>
          </div>

          {/* Microscopic Canal System */}
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Sistema de Vascularización: Conductos de Havers y Volkmann
            </h4>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Los <strong>conductos de Havers</strong> transcurren longitudinalmente por el centro de cada osteona, conteniendo arteriolas, vénulas y fibras nerviosas. Los <strong>conductos de Volkmann</strong> discurren en sentido transversal y perpendicular, conectando los vasos periósticos externos con los conductos de Havers y la cavidad medular interna.
            </p>
          </div>

          {/* Cellular Components */}
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Línea Celular Ósea (Remodelado Óseo)
            </h4>
            <div className="grid grid-cols-3 gap-2 pt-1 text-[11px]">
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                <strong className="text-teal-300 block mb-1">Osteoblastos</strong>
                <span>Células formadoras que sintetizan colágeno y mineralizan la matriz ósea con cristales de hidroxiapatita.</span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                <strong className="text-sky-300 block mb-1">Osteocitos</strong>
                <span>Células maduras atrapadas en lagunas; actúan como mecanosensores coordinando la respuesta a las fuerzas físicas.</span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                <strong className="text-rose-300 block mb-1">Osteoclastos</strong>
                <span>Células gigantes multinucleadas que degradan y reabsorben hueso mediante secreción de ácido clorhídrico y colagenasas.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
