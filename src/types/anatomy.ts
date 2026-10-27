/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SkeletalDivision = 'axial' | 'apendicular';

export type BoneCategory = 'largo' | 'corto' | 'plano' | 'irregular' | 'sesamoideo';

export type AnatomicalRegion =
  | 'craneo'
  | 'columna'
  | 'torax'
  | 'cintura-escapular'
  | 'miembro-superior'
  | 'pelvis'
  | 'miembro-inferior';

export type LandmarkType =
  | 'eminencia_articular'      // Cóndilo, cabeza, tróclea
  | 'eminencia_no_articular'   // Apófisis, tubérculo, cresta, espina, tuberosidad
  | 'depresion'                // Fosa, surco, fisura
  | 'orificio';                // Foramen, agujero, conducto

export interface BoneLandmark {
  id: string;
  name: string;
  type: LandmarkType;
  description: string;
  clinicalSignificance?: string;
  coordinates3D?: [number, number, number]; // Position in the 3D local coordinate space of the bone model
}

export interface BoneData {
  id: string;
  name: string;
  latinName: string;
  division: SkeletalDivision;
  category: BoneCategory;
  region: AnatomicalRegion;
  countInBody: number;
  description: string;
  articulations: string[];
  muscularAttachments: string[];
  landmarks: BoneLandmark[];
  clinicalNotes: string;
  modelType: 'full-skeleton' | 'femur' | 'skull' | 'vertebra' | 'pelvis' | 'humerus' | 'hand' | 'foot' | 'scapula' | 'ribcage';
  colorTag?: string;
}

export type ViewMode = 'realistic' | 'xray' | 'regions' | 'wireframe';

export interface QuizQuestion {
  id: string;
  question: string;
  boneId: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  landmarkFocus?: string;
}
