/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/glossaryData';
import { X, HelpCircle, CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';

interface AnatomyQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFocusBone?: (boneId: string) => void;
}

export const AnatomyQuizModal: React.FC<AnatomyQuizModalProps> = ({
  isOpen,
  onClose,
  onFocusBone,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen) return null;

  const currentQ = QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    if (option === currentQ.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden text-slate-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-300">
              <HelpCircle size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Autoevaluación de Osteología
              </h3>
              <p className="text-xs text-slate-400">
                Ponte a prueba identificando huesos y reparos anatómicos
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
        <div className="p-5">
          {!isFinished ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>
                  Pregunta <strong className="text-white">{currentIndex + 1}</strong> de {QUIZ_QUESTIONS.length}
                </span>
                <span className="font-semibold text-teal-400">Puntaje: {score}</span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-teal-500 h-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>

              <div className="py-2">
                <h4 className="text-sm font-semibold text-white leading-relaxed">
                  {currentQ.question}
                </h4>
              </div>

              {/* Options */}
              <div className="space-y-2">
                {currentQ.options.map((opt, i) => {
                  const isCorrect = opt === currentQ.correctAnswer;
                  const isChosen = selectedOption === opt;

                  let btnStyle = 'bg-slate-950/50 border-slate-800 hover:border-slate-700 text-slate-300';
                  if (isAnswered) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-500/20 border-emerald-500/80 text-emerald-300';
                    } else if (isChosen) {
                      btnStyle = 'bg-rose-500/20 border-rose-500/80 text-rose-300';
                    } else {
                      btnStyle = 'opacity-40 border-slate-800 text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={i}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(opt)}
                      className={`w-full p-3 rounded-xl border text-xs font-medium text-left transition flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {isAnswered && isCorrect && <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />}
                      {isAnswered && isChosen && !isCorrect && (
                        <XCircle size={16} className="text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Feedback */}
              {isAnswered && (
                <div className="mt-4 p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2">
                  <p className="text-slate-300 leading-relaxed">
                    <strong className="text-white">Explicación médica: </strong>
                    {currentQ.explanation}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                    {onFocusBone && (
                      <button
                        onClick={() => {
                          onFocusBone(currentQ.boneId);
                          onClose();
                        }}
                        className="text-[11px] text-teal-400 hover:text-teal-300 underline font-medium"
                      >
                        Ver este hueso en 3D →
                      </button>
                    )}
                    <button
                      onClick={handleNext}
                      className="ml-auto px-4 py-1.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs transition"
                    >
                      {currentIndex + 1 < QUIZ_QUESTIONS.length ? 'Siguiente Pregunta' : 'Ver Resultados'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Finished Results Screen */
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-300 flex items-center justify-center mx-auto">
                <Award size={32} />
              </div>

              <h4 className="text-lg font-bold text-white">¡Evaluación Completada!</h4>
              <p className="text-xs text-slate-400">
                Obtuviste <strong className="text-teal-400 text-base">{score}</strong> de{' '}
                {QUIZ_QUESTIONS.length} aciertos ({Math.round((score / QUIZ_QUESTIONS.length) * 100)}%).
              </p>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={handleRestart}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition"
                >
                  <RotateCcw size={14} /> Repetir Quiz
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs transition shadow-md"
                >
                  Continuar Explorando
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
