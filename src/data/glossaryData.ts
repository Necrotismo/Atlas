/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuizQuestion } from '../types/anatomy';

export interface OsteologyTerm {
  term: string;
  category: 'eminencia_articular' | 'eminencia_no_articular' | 'depresion' | 'orificio' | 'histologia';
  definition: string;
  example: string;
}

export const OSTEOLOGY_GLOSSARY: OsteologyTerm[] = [
  {
    term: 'Cóndilo',
    category: 'eminencia_articular',
    definition: 'Protuberancia ósea redondeada y convexa que forma parte de una articulación sinovial con otro hueso.',
    example: 'Cóndilos del fémur, cóndilos occipitales.'
  },
  {
    term: 'Cabeza (Caput)',
    category: 'eminencia_articular',
    definition: 'Extremo articular esferoideo o semiesférico y ensanchado de un hueso, sostenido por un cuello más estrecho.',
    example: 'Cabeza del fémur, cabeza del húmero, cabeza del radio.'
  },
  {
    term: 'Tróclea',
    category: 'eminencia_articular',
    definition: 'Superficie articular en forma de polea o diábolo con una garganta central que permite movimientos en bisagra.',
    example: 'Tróclea humeral en el codo, tróclea del astrágalo en el tobillo.'
  },
  {
    term: 'Apófisis (Proceso)',
    category: 'eminencia_no_articular',
    definition: 'Cualquier proyección o prominencia ósea notable que sirve predominantemente para la inserción de tendones y ligamentos.',
    example: 'Apófisis espinosa de las vértebras, apófisis mastoides del temporal.'
  },
  {
    term: 'Tubérculo y Tuberosidad',
    category: 'eminencia_no_articular',
    definition: 'Eminencia ósea elevada; el tubérculo es más pequeño y delimitado, mientras la tuberosidad es más amplia y rugosa.',
    example: 'Tubérculo mayor del húmero, tuberosidad isquiática, tuberosidad tibial.'
  },
  {
    term: 'Cresta',
    category: 'eminencia_no_articular',
    definition: 'Borde o reborde óseo estrecho y prominente, a menudo alargado y rugoso.',
    example: 'Cresta ilíaca en la pelvis, cresta intertrocantérica.'
  },
  {
    term: 'Espina',
    category: 'eminencia_no_articular',
    definition: 'Proyección puntiaguda y delgada que sobresale de una superficie ósea.',
    example: 'Espina de la escápula, espina ciática/isquiática, espina nasal.'
  },
  {
    term: 'Trocánter',
    category: 'eminencia_no_articular',
    definition: 'Gran eminencia irregular cuadrangular o cónica situada exclusivamente en la porción proximal del fémur.',
    example: 'Trocánter mayor y menor del fémur.'
  },
  {
    term: 'Fosa',
    category: 'depresion',
    definition: 'Zona cóncava o depresión amplia y poco profunda en la superficie de un hueso.',
    example: 'Fosa olecraniana del húmero, fosa intercondílea, fosa ilíaca.'
  },
  {
    term: 'Surco (Sulcus)',
    category: 'depresion',
    definition: 'Canal estrecho o hendidura alargada sobre el hueso por donde discurren tendones, nervios o vasos sanguíneos.',
    example: 'Surco intertubercular (corredera bicipital), surco del nervio radial, surco costal.'
  },
  {
    term: 'Foramen (Agujero)',
    category: 'orificio',
    definition: 'Abertura o conducto redondeado a través del hueso que permite el paso de nervios, arterias o venas.',
    example: 'Foramen magno del occipital, foramen obturador de la pelvis, agujero vertebral.'
  },
  {
    term: 'Meato o Conducto',
    category: 'orificio',
    definition: 'Conducto tubular alargado que atraviesa el espesor de una estructura ósea.',
    example: 'Meato auditivo externo e interno en el hueso temporal.'
  },
  {
    term: 'Osteona (Sistema de Havers)',
    category: 'histologia',
    definition: 'Unidad funcional fundamental del hueso compacto, formada por láminas concéntricas de matriz mineralizada dispuestas alrededor de un conducto central neurovascular de Havers.',
    example: 'Estructura microscópica de la cortical ósea.'
  },
  {
    term: 'Periostio',
    category: 'histologia',
    definition: 'Membrana fibrovascular densa que recubre la superficie externa del hueso excepto en las carillas articulares; contiene células osteogénicas y rica inervación nociceptiva.',
    example: 'Responsable del dolor agudo en las fracturas y del crecimiento en grosor (aposicional).'
  },
  {
    term: 'Hueso Trabecular (Esponjoso)',
    category: 'histologia',
    definition: 'Malla tridimensional porosa de espículas o trabéculas alineadas siguiendo las líneas de tensión mecánica; contiene médula ósea en sus cavidades.',
    example: 'Epífisis de los huesos largos, cuerpos vertebrales y díploe craneal.'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: '¿En qué hueso se localiza el "Trocánter Mayor", punto clave de inserción para el glúteo medio y menor?',
    boneId: 'femur',
    options: ['Húmero', 'Fémur', 'Tibia', 'Pelvis'],
    correctAnswer: 'Fémur',
    explanation: 'El trocánter mayor es una eminencia no articular prominente situada superolateralmente en el fémur proximal.',
    landmarkFocus: 'trocanter-mayor'
  },
  {
    id: 'q2',
    question: '¿Qué gran orificio óseo en la base del cráneo permite la transición del bulbo raquídeo a médula espinal?',
    boneId: 'craneo',
    options: ['Foramen Oval', 'Foramen Magno', 'Foramen Yugular', 'Conducto Auditivo'],
    correctAnswer: 'Foramen Magno',
    explanation: 'El Foramen Magno se encuentra en el hueso occipital y es la vía principal por donde emerge la médula espinal e ingresan las arterias vertebrales.',
    landmarkFocus: 'agujero-magno'
  },
  {
    id: 'q3',
    question: '¿Qué accidente óseo del hueso coxal aloja la cabeza del fémur para formar la articulación coxofemoral?',
    boneId: 'pelvis',
    options: ['Tuberosidad isquiática', 'Fosa ilíaca', 'Acetábulo (cotilo)', 'Agujero obturador'],
    correctAnswer: 'Acetábulo (cotilo)',
    explanation: 'El acetábulo es la cavidad hemisférica profunda donde confluyen el ilion, isquion y pubis para articular con la cabeza femoral.',
    landmarkFocus: 'acetabulo'
  },
  {
    id: 'q4',
    question: 'En el húmero distal, ¿qué estructura articular con forma de polea engrana con la escotadura troclear del cúbito?',
    boneId: 'humero',
    options: ['Capítulo', 'Tróclea humeral', 'Fosa coronoidea', 'Epicóndilo lateral'],
    correctAnswer: 'Tróclea humeral',
    explanation: 'La tróclea humeral es la superficie en polea sobre la que pivota el cúbito en la articulación del codo.',
    landmarkFocus: 'troclea-humeral'
  },
  {
    id: 'q5',
    question: '¿Cuál es la función del agujero o foramen vertebral que se forma entre el cuerpo y el arco neural?',
    boneId: 'vertebra',
    options: ['Producir células sanguíneas', 'Alojar y proteger la médula espinal', 'Conectar con las costillas', 'Permitir el paso del nervio ciático'],
    correctAnswer: 'Alojar y proteger la médula espinal',
    explanation: 'La superposición de los forámenes vertebrales conforma el conducto raquídeo que protege a la médula espinal y meninges.',
    landmarkFocus: 'foramen-vertebral'
  },
  {
    id: 'q6',
    question: 'El "Ángulo de Louis" o ángulo esternal es un hito anatómico palpable que indica el nivel de:',
    boneId: 'torax',
    options: ['La 1ª costilla', 'La 2ª costilla y bifurcación traqueal', 'La apófisis xifoides', 'El diafragma'],
    correctAnswer: 'La 2ª costilla y bifurcación traqueal',
    explanation: 'El ángulo de Louis marca la unión manubrioesternal, corresponde a la 2ª costilla y señala a nivel posterior el disco entre T4 y T5.',
    landmarkFocus: 'angulo-de-louis'
  },
  {
    id: 'q7',
    question: '¿Qué hueso del carpo, situado bajo la tabaquera anatómica, es el que con mayor frecuencia sufre fracturas y riesgo de necrosis?',
    boneId: 'mano',
    options: ['Semilunar', 'Trapecio', 'Escafoides', 'Ganchoso'],
    correctAnswer: 'Escafoides',
    explanation: 'El escafoides sufre el 70% de las fracturas del carpo; su irrigación arterial retrógrada distal a proximal lo hace vulnerable a necrosis avascular.',
    landmarkFocus: 'hueso-escafoides'
  }
];
