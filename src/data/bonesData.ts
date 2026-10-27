/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BoneData } from '../types/anatomy';

export const BONES_DATABASE: BoneData[] = [
  // --- MIEMBRO INFERIOR ---
  {
    id: 'femur',
    name: 'Fémur',
    latinName: 'Os femoris',
    division: 'apendicular',
    category: 'largo',
    region: 'miembro-inferior',
    countInBody: 2,
    description: 'El hueso más largo, pesado, resistente y voluminoso del cuerpo humano. Conforma la estructura ósea del muslo, articulando superiormente con el acetábulo del coxal e inferiormente con la tibia y la rótula.',
    articulations: ['Articulación coxofemoral (cadera) con el hueso coxal', 'Articulación femorotibial (rodilla) con la tibia', 'Articulación femoropatelar con la patela/rótula'],
    muscularAttachments: ['Músculo cuádriceps femoral', 'Músculos glúteos (mayor, medio y menor)', 'Músculo iliopsoas (trocánter menor)', 'Músculos aductores (línea áspera)', 'Músculos gemelos y plantar'],
    landmarks: [
      {
        id: 'cabeza-femoral',
        name: 'Cabeza del Fémur (Caput femoris)',
        type: 'eminencia_articular',
        description: 'Eminencia esférica (2/3 de esfera) revestida de cartílago hialino que encaja en la fosa acetabular del hueso coxal. Presenta la fosita para el ligamento redondo.',
        clinicalSignificance: 'Vulnerable a necrosis avascular (enfermedad de Perthes o traumatismos que lesionan la arteria de la cabeza femoral procedente de las circunflejas).',
        coordinates3D: [0.75, 2.7, 0.15]
      },
      {
        id: 'cuello-anatomico',
        name: 'Cuello Anatómico (Collum femoris)',
        type: 'eminencia_no_articular',
        description: 'Segmento cilíndrico oblicuo que une la cabeza con la diáfisis femoral en un ángulo de inclinación de 125°-130° (ángulo cérvico-diafisario).',
        clinicalSignificance: 'Sitio clásico de fracturas en ancianos con osteoporosis (fractura subcapital o transcervical). Requiere con frecuencia artroplastia parcial o total de cadera.',
        coordinates3D: [0.45, 2.45, 0.05]
      },
      {
        id: 'trocanter-mayor',
        name: 'Trocánter Mayor (Trochanter major)',
        type: 'eminencia_no_articular',
        description: 'Gran prominencia cuadrangular situada superolateralmente. En su cara medial se encuentra la fosa trocantérica (digital).',
        clinicalSignificance: 'Inserción del glúteo medio, glúteo menor, piriforme y obturador interno. Punto de referencia clave para inyecciones intramusculares e incisión quirúrgica.',
        coordinates3D: [-0.65, 2.4, 0.0]
      },
      {
        id: 'trocanter-menor',
        name: 'Trocánter Menor (Trochanter minor)',
        type: 'eminencia_no_articular',
        description: 'Prominencia cónica posteromedial en la unión del cuello con la diáfisis femoral.',
        clinicalSignificance: 'Punto de inserción fundamental del tendón común del músculo iliopsoas, el flexor primario más potente de la cadera.',
        coordinates3D: [0.35, 1.85, -0.3]
      },
      {
        id: 'linea-aspera',
        name: 'Línea Áspera (Linea aspera)',
        type: 'eminencia_no_articular',
        description: 'Cresta ósea longitudinal rugosa en la cara posterior de la diáfisis, dividida en labio medial y labio lateral con un intersticio intermedio.',
        clinicalSignificance: 'Provee inserción a los músculos aductores del muslo, pectíneo y la porción corta del bíceps femoral.',
        coordinates3D: [0.0, 0.2, -0.28]
      },
      {
        id: 'condilo-medial',
        name: 'Cóndilo Medial (Condylus medialis)',
        type: 'eminencia_articular',
        description: 'Masa articular convexa inferior más larga y curvada que el cóndilo lateral, diseñada para articular con la carilla articular de la meseta tibial medial.',
        clinicalSignificance: 'Superficie de carga principal de la rodilla. En el epicóndilo medial se inserta el ligamento colateral medial (tibial).',
        coordinates3D: [0.55, -2.6, 0.1]
      },
      {
        id: 'condilo-lateral',
        name: 'Cóndilo Lateral (Condylus lateralis)',
        type: 'eminencia_articular',
        description: 'Masa articular más ancha e inclinada anteroposteriormente que el medial; articula con el platillo tibial lateral.',
        clinicalSignificance: 'Sitio de fijación del ligamento colateral lateral (peroneo) y tendón del músculo poplíteo.',
        coordinates3D: [-0.55, -2.6, 0.1]
      },
      {
        id: 'fosa-intercondilea',
        name: 'Fosa Intercondílea (Fossa intercondylaris)',
        type: 'depresion',
        description: 'Profunda escotadura en la cara posterior que separa ambos cóndilos femorales.',
        clinicalSignificance: 'Alojamiento crucial donde se originan y anclan los ligamentos cruzados anterior (LCA) y posterior (LCP) de la rodilla.',
        coordinates3D: [0.0, -2.55, -0.3]
      }
    ],
    clinicalNotes: 'Las fracturas del cuello femoral son una de las principales causas de morbilidad en adultos mayores. El ángulo cérvico-diafisario disminuido (<120°) se denomina coxa vara, y el aumentado (>135°) coxa valga, alterando la marcha.',
    modelType: 'femur',
    colorTag: '#38bdf8'
  },

  // --- CRÁNEO Y CARA ---
  {
    id: 'craneo',
    name: 'Cráneo (Cranium)',
    latinName: 'Cranium humanum',
    division: 'axial',
    category: 'plano',
    region: 'craneo',
    countInBody: 22,
    description: 'Estructura ósea compleja constituida por el Neurocráneo (8 huesos que albergan y protegen el encéfalo) y el Viscerocráneo o esqueleto facial (14 huesos que sustentan los órganos de los sentidos y la masticación).',
    articulations: ['Articulación temporomandibular (sinovial bicondílea)', 'Articulación atlanto-occipital con C1 (Atlas)', 'Suturas craneales fibrosas (coronal, sagital, lambdoidea, escamosa)'],
    muscularAttachments: ['Músculos de la mímica facial', 'Músculos de la masticación (temporal, masetero, pterigoideos)', 'Músculos esternocleidomastoideo y trapecio', 'Músculos de la nuca'],
    landmarks: [
      {
        id: 'agujero-magno',
        name: 'Foramen Magno (Foramen magnum)',
        type: 'orificio',
        description: 'Gran orificio oval en la base del hueso occipital que comunica la cavidad endocraneal con el conducto raquídeo.',
        clinicalSignificance: 'Punto de transición del bulbo raquídeo a médula espinal, paso de arterias vertebrales y nervios accesorios (XI par). En hipertensión endocraneana puede ocurrir herniación amigdalina mortal.',
        coordinates3D: [0.0, -0.65, -0.4]
      },
      {
        id: 'orbita-ocular',
        name: 'Cavidad Orbitaria (Orbita)',
        type: 'depresion',
        description: 'Cavidad piramidal cuadrangular formada por 7 huesos (frontal, esfenoides, cigomático, maxilar, lagrimal, etmoides y palatino) que aloja el globo ocular.',
        clinicalSignificance: 'Fracturas en "blow-out" del suelo orbitario tras traumatismos directos, que pueden atrapar al músculo recto inferior causando diplopía.',
        coordinates3D: [0.55, 0.45, 1.05]
      },
      {
        id: 'mandibula-apofisis',
        name: 'Mandíbula y Cóndilo Mandibular',
        type: 'eminencia_articular',
        description: 'Único hueso móvil del cráneo. Posee un cuerpo en herradura y dos ramas ascendentes con la apófisis coronoides y el cóndilo mandibular.',
        clinicalSignificance: 'Participa en la Articulación Temporomandibular (ATM). El síndrome doloroso de disfunción de ATM causa cefalea, chasquidos y trismo.',
        coordinates3D: [0.0, -1.0, 0.85]
      },
      {
        id: 'silla-turca',
        name: 'Silla Turca (Sella turcica)',
        type: 'depresion',
        description: 'Depresión en forma de silla de montar ubicada en el cuerpo del esfenoides, en el centro de la fosa craneal media.',
        clinicalSignificance: 'Aloja a la glándula hipófisis (pituitaria). Adenomas hipofisarios pueden erosionar la silla turca y comprimir el quiasma óptico generando hemianopsia bitemporal.',
        coordinates3D: [0.0, 0.05, 0.05]
      },
      {
        id: 'apofisis-mastoides',
        name: 'Apófisis Mastoides (Processus mastoideus)',
        type: 'eminencia_no_articular',
        description: 'Prominencia ósea cónica del hueso temporal situada detrás del conducto auditivo externo, neumatizada con celdillas mastoideas.',
        clinicalSignificance: 'Inserción del músculo esternocleidomastoideo. La mastoiditis aguda es una complicación grave de las otitis medias no tratadas.',
        coordinates3D: [-0.95, -0.4, -0.55]
      },
      {
        id: 'arco-cigomatico',
        name: 'Arco Cigomático (Arcus zygomaticus)',
        type: 'eminencia_no_articular',
        description: 'Puente óseo horizontal formado por la apófisis temporal del hueso cigomático y la apófisis cigomática del hueso temporal.',
        clinicalSignificance: 'Sitio de origen del músculo masetero y contorno de la mejilla. Muy propenso a fracturas directas en agresiones físicas y accidentes viales.',
        coordinates3D: [0.95, 0.0, 0.45]
      }
    ],
    clinicalNotes: 'Los puntos craneométricos (Pterion, Asterion, Bregma, Lambda) son referencias neuroquirúrgicas vitales. El Pterion es una zona frágil donde una fractura puede desgarrar la arteria meníngea media provocando un hematoma epidural agudo.',
    modelType: 'skull',
    colorTag: '#a78bfa'
  },

  // --- COLUMNA VERTEBRAL ---
  {
    id: 'vertebra',
    name: 'Vértebra Tipo y Columna',
    latinName: 'Columna vertebralis',
    division: 'axial',
    category: 'irregular',
    region: 'columna',
    countInBody: 33,
    description: 'La columna vertebral consta de 33 vértebras (7 cervicales, 12 torácicas, 5 lumbares, 5 sacras fusionadas y 4 coxígeas). Provee el eje mecánico del cuerpo y protege el cordón medular.',
    articulations: ['Articulaciones intervertebrales con disco fibrocartilaginoso', 'Articulaciones cigapofisarias (sinoviales planas)', 'Articulaciones costovertebrales (a nivel dorsal)'],
    muscularAttachments: ['Músculos erectores de la columna (iliocostal, longísimo, espinoso)', 'Músculos transversoespinosos (multífidos, rotadores)', 'Músculo psoas mayor (vértebras lumbares)', 'Músculos prevertebrales del cuello'],
    landmarks: [
      {
        id: 'cuerpo-vertebral',
        name: 'Cuerpo Vertebral (Corpus vertebrae)',
        type: 'eminencia_no_articular',
        description: 'Masa cilíndrica anterior de hueso esponjoso trabecular que soporta el peso axial. Aumenta de tamaño progresivamente de C1 a L5.',
        clinicalSignificance: 'Susceptible a fracturas por compresión osteoporóticas y acuñamiento anterior, produciendo cifosis senil patológica.',
        coordinates3D: [0.0, 0.0, 1.1]
      },
      {
        id: 'foramen-vertebral',
        name: 'Agujero Vertebral (Foramen vertebrale)',
        type: 'orificio',
        description: 'Orificio delimitado por la cara posterior del cuerpo y el arco vertebral posterior. Su superposición forma el conducto raquídeo.',
        clinicalSignificance: 'Aloja la médula espinal, las meninges y las raíces nerviosas. La estenosis del canal lumbar o cervical provoca claudicación neurogénica.',
        coordinates3D: [0.0, 0.0, 0.0]
      },
      {
        id: 'apofisis-espinosa',
        name: 'Apófisis Espinosa (Processus spinosus)',
        type: 'eminencia_no_articular',
        description: 'Proyección ósea dorsal media dirigida hacia atrás y hacia abajo, palpable a lo largo de toda la línea media de la espalda.',
        clinicalSignificance: 'C7 (vértebra prominente) sirve como hito de palpación clínica. Actúa como palanca para ligamentos supraespinosos y extensores del raquis.',
        coordinates3D: [0.0, -0.3, -1.5]
      },
      {
        id: 'apofisis-transversas',
        name: 'Apófisis Transversas (Processus transversus)',
        type: 'eminencia_no_articular',
        description: 'Dos prolongaciones laterales simétricas del arco neural. En cervicales presentan el foramen transverso por donde transcurre la arteria vertebral.',
        clinicalSignificance: 'En vértebras torácicas contienen la fosita costal transversa para articular con el tubérculo de la costilla.',
        coordinates3D: [1.35, 0.15, -0.3]
      },
      {
        id: 'carillas-articulares',
        name: 'Carillas Articulares Superiores e Inferiores',
        type: 'eminencia_articular',
        description: 'Superficies sinoviales revestidas de cartílago que forman las articulaciones facetarias o cigapofisarias entre vértebras contiguas.',
        clinicalSignificance: 'La orientación determina el rango y plano de movilidad (rotación en torácicas, flexoextensión en lumbares). Frecuente artrosis facetaria causante de lumbalgia mecánica.',
        coordinates3D: [-0.6, 0.65, 0.2]
      },
      {
        id: 'pediculos-vertebrales',
        name: 'Pedículos y Escotaduras Vertebrales',
        type: 'depresion',
        description: 'Pilares cilíndricos que unen el cuerpo con la lámina. Entre dos pedículos adyacentes se delimita el agujero de conjunción o intervertebral.',
        clinicalSignificance: 'Paso obligado de los nervios raquídeos espinales. Una hernia discal posterolateral o hipertrofia del ligamento amarillo comprime aquí la raíz nerviosa generando radiculopatía (ciática).',
        coordinates3D: [0.65, 0.2, 0.45]
      }
    ],
    clinicalNotes: 'La lordosis cervical y lumbar junto a la cifosis torácica y sacra otorgan resistencia mecánica 10 veces superior a una columna recta (ley de Delpech). La escoliosis representa una desviación tridimensional patológica.',
    modelType: 'vertebra',
    colorTag: '#10b981'
  },

  // --- PELVIS Y HUESO COXAL ---
  {
    id: 'pelvis',
    name: 'Pelvis y Hueso Coxal',
    latinName: 'Os coxae / Pelvis ossea',
    division: 'apendicular',
    category: 'plano',
    region: 'pelvis',
    countInBody: 2,
    description: 'Hueso par irregular y plano formado por la sinostosis de tres piezas embrionarias primitivas: Ilion, Isquion y Pubis, que confluyen en el acetábulo.',
    articulations: ['Articulación sacroilíaca (anfiartrosis sinovial)', 'Sínfisis del pubis (anfiartrosis fibrocartilaginosa)', 'Articulación coxofemoral (enartrosis esferoidea)'],
    muscularAttachments: ['Músculos de la pared abdominal (recto, oblicuos, transverso)', 'Músculos del piso pélvico (elevador del ano, coccígeo)', 'Músculos glúteos e isquiotibiales', 'Músculos aductores y gracilis'],
    landmarks: [
      {
        id: 'acetabulo',
        name: 'Acetábulo o Cóndilo Cotiloideo (Acetabulum)',
        type: 'depresion',
        description: 'Profunda cavidad hemisférica en la cara externa del coxal circunscrita por el rodete acetabular (labrum) con superficie semilunar articular.',
        clinicalSignificance: 'Recibe la cabeza del fémur. La displasia del desarrollo de la cadera (DDC) se debe a un acetábulo plano que predispone a subluxación congénita.',
        coordinates3D: [1.15, -0.2, 0.35]
      },
      {
        id: 'cresta-iliaca',
        name: 'Cresta Ilíaca (Crista iliaca)',
        type: 'eminencia_no_articular',
        description: 'Borde superior convexo y rugoso del ala del ilion, curvado en forma de "S" itálica.',
        clinicalSignificance: 'Fácilmente palpable en la exploración física. Sitio predilecto para biopsia de médula ósea y obtención de injertos óseos autólogos.',
        coordinates3D: [1.3, 1.25, -0.1]
      },
      {
        id: 'espina-iliaca-anterosuperior',
        name: 'Espina Ilíaca Anterosuperior (EIAS)',
        type: 'eminencia_no_articular',
        description: 'Prominencia palpable en el extremo anterior de la cresta ilíaca.',
        clinicalSignificance: 'Punto de origen del ligamento inguinal, músculo sartorio y tensor de la fascia lata. Referencia para medir la longitud de las extremidades inferiores.',
        coordinates3D: [1.4, 0.75, 0.9]
      },
      {
        id: 'tuberosidad-isquiatica',
        name: 'Tuberosidad Isquiática (Tuber ischiadicum)',
        type: 'eminencia_no_articular',
        description: 'Masa ósea rugosa y posteroinferior sobre la cual descansa el peso del cuerpo en posición sentada.',
        clinicalSignificance: 'Origen de los tendones de los músculos isquiotibiales (bíceps femoral, semitendinoso, semimembranoso). Susceptible a bursitis isquiática.',
        coordinates3D: [0.8, -1.3, -0.45]
      },
      {
        id: 'agujero-obturador',
        name: 'Foramen Obturador (Foramen obturatum)',
        type: 'orificio',
        description: 'Gran apertura oval en el hombre y triangular en la mujer, casi totalmente ocluida por la membrana obturatriz.',
        clinicalSignificance: 'En su margen superior queda libre el conducto obturador por donde emergen los vasos y el nervio obturador.',
        coordinates3D: [0.6, -0.85, 0.4]
      },
      {
        id: 'sinfisis-pubis',
        name: 'Sínfisis del Pubis (Symphysis pubica)',
        type: 'eminencia_articular',
        description: 'Unión medial anterior entre los dos huesos púbicos mediante un disco fibrocartilaginoso interpúbico.',
        clinicalSignificance: 'Bajo la influencia de la hormona relaxina durante el embarazo se reblandece para facilitar el canal de parto; su inflamación crónica genera osteítis del pubis.',
        coordinates3D: [0.0, -0.8, 0.95]
      }
    ],
    clinicalNotes: 'La pelvis femenina (ginecoide) presenta una abertura superior más ancha y redondeada, ángulo subpubiano obtuso (>90°) y espinas isquiáticas menos prominentes, adaptada para la gestación y el parto.',
    modelType: 'pelvis',
    colorTag: '#f59e0b'
  },

  // --- MIEMBRO SUPERIOR: HÚMERO ---
  {
    id: 'humero',
    name: 'Húmero',
    latinName: 'Humerus',
    division: 'apendicular',
    category: 'largo',
    region: 'miembro-superior',
    countInBody: 2,
    description: 'Hueso largo que forma el esqueleto del brazo. Articula proximalmente con la cavidad glenoidea de la escápula y distalmente con el cúbito y el radio en el codo.',
    articulations: ['Articulación glenohumeral (hombro, enartrosis esferoidea de máxima amplitud)', 'Articulación humeroulnar (tróclea, gínglimo)', 'Articulación humeroradial (cóndilo capitular, condílea)'],
    muscularAttachments: ['Músculo deltoides (tuberosidad deltoidea)', 'Manguito rotador (supraespinoso, infraespinoso, redondo menor, subescapular)', 'Pectoral mayor, dorsal ancho y redondo mayor', 'Bíceps, braquial anterior y tríceps braquial'],
    landmarks: [
      {
        id: 'cabeza-humeral',
        name: 'Cabeza del Húmero (Caput humeri)',
        type: 'eminencia_articular',
        description: 'Superficie lisa casi hemisférica orientada hacia medial, superior y posterior que articula con la cavidad glenoidea escapular.',
        clinicalSignificance: 'Posee poca contención ósea intrínseca (cavidad glenoidea poco profunda), requiriendo del labrum glenoideo y manguito de los rotadores para estabilidad.',
        coordinates3D: [-0.6, 2.3, 0.1]
      },
      {
        id: 'tuberculo-mayor',
        name: 'Tubérculo Mayor o Troquiter (Tuberculum majus)',
        type: 'eminencia_no_articular',
        description: 'Prominencia ósea lateral situada junto a la cabeza, dividida en tres facetas para inserción tendinosa.',
        clinicalSignificance: 'Punto de fijación de 3 músculos del manguito de los rotadores: supraespinoso (faceta sup.), infraespinoso (media) y redondo menor (inf.).',
        coordinates3D: [0.45, 2.2, 0.15]
      },
      {
        id: 'tuberculo-menor',
        name: 'Tubérculo Menor o Troquín (Tuberculum minus)',
        type: 'eminencia_no_articular',
        description: 'Prominencia anteromedial pequeña pero prominente.',
        clinicalSignificance: 'Inserción del tendón del músculo subescapular, el potente rotador interno del hombro.',
        coordinates3D: [-0.15, 2.05, 0.45]
      },
      {
        id: 'surco-intertubercular',
        name: 'Surco Intertubercular o Corredera Bicipital',
        type: 'depresion',
        description: 'Canal vertical entre el troquiter y el troquín que aloja el tendón de la cabeza larga del bíceps.',
        clinicalSignificance: 'Frecuente tendinitis bicipital o subluxación del tendón fuera del surco ante roturas del ligamento humeral transverso.',
        coordinates3D: [0.15, 2.0, 0.4]
      },
      {
        id: 'troclea-humeral',
        name: 'Tróclea Humeral (Trochlea humeri)',
        type: 'eminencia_articular',
        description: 'Estructura en forma de polea en el extremo distal medial que engrana con la escotadura troclear del cúbito.',
        clinicalSignificance: 'Permite el movimiento bisagra puro de flexo-extensión del codo.',
        coordinates3D: [-0.35, -2.45, 0.1]
      },
      {
        id: 'capitulo-humeral',
        name: 'Capítulo o Cóndilo Humeral (Capitulum humeri)',
        type: 'eminencia_articular',
        description: 'Eminencia redondeada lisa situada en el extremo distal lateral que articula con la cúpula radial.',
        clinicalSignificance: 'Permite la pronosupinación del antebrazo.',
        coordinates3D: [0.4, -2.4, 0.15]
      },
      {
        id: 'fosa-olecraniana',
        name: 'Fosa Olecraniana (Fossa olecrani)',
        type: 'depresion',
        description: 'Profunda cavidad en la cara posterior proximal a la tróclea.',
        clinicalSignificance: 'Recibe al pico del olécranon cubital en la extensión completa del codo, bloqueando mecánicamente la hiperextensión.',
        coordinates3D: [-0.1, -2.3, -0.3]
      },
      {
        id: 'epicondilo-lateral-medial',
        name: 'Epicóndilo Medial (Epitróclea) y Lateral',
        type: 'eminencia_no_articular',
        description: 'Relieves extraarticulares medial y lateral para inserciones de grupos musculares antebraquiales.',
        clinicalSignificance: 'La epitrocleítis o codo de golfista afecta al medial; la epicondilitis o codo de tenista afecta a los extensores en el lateral. Detrás del medial transita el nervio cubital en su canal.',
        coordinates3D: [-0.65, -2.2, 0.0]
      }
    ],
    clinicalNotes: 'El cuello quirúrgico (inmediatamente distal a los tubérculos) es el punto más débil y frecuente de fractura, con alto riesgo de lesión del nervio axilar y arteria circunfleja humeral posterior.',
    modelType: 'humerus',
    colorTag: '#ec4899'
  },

  // --- ESCÁPULA (OMÓPLATO) ---
  {
    id: 'scapula',
    name: 'Escápula (Omóplato)',
    latinName: 'Scapula',
    division: 'apendicular',
    category: 'plano',
    region: 'cintura-escapular',
    countInBody: 2,
    description: 'Hueso plano triangular delgado ubicado en la región posterolateral del tórax entre la 2ª y 7ª costilla. Conecta la clavícula con el húmero dotando de extraordinaria movilidad al cíngulo escapular.',
    articulations: ['Articulación acromioclavicular con la clavícula', 'Articulación glenohumeral con la cabeza del húmero', 'Articulación escápulotorácica (sisarcosis funcional contra la parrilla costal)'],
    muscularAttachments: ['Trapecio y elevador de la escápula', 'Romboides mayor y menor', 'Serrato anterior (borde medial)', 'Manguito rotador y deltoides'],
    landmarks: [
      {
        id: 'espina-escapular',
        name: 'Espina de la Escápula y Acromion',
        type: 'eminencia_no_articular',
        description: 'Cresta ósea oblicua que recorre la cara posterior dividiéndola en fosa supraespinosa e infraespinosa, continuándose lateralmente en el proceso acromial.',
        clinicalSignificance: 'El acromion articula con la clavícula. Un acromion ganchoso (tipo III de Bigliani) favorece el síndrome de pinzamiento subacromial del tendón supraespinoso.',
        coordinates3D: [0.0, 0.6, -0.5]
      },
      {
        id: 'cavidad-glenoidea',
        name: 'Cavidad Glenoidea (Cavitas glenoidalis)',
        type: 'eminencia_articular',
        description: 'Superficie cóncava piriforme que recibe a la cabeza del húmero.',
        clinicalSignificance: 'Bordeada por el rodete glenoideo fibrocartilaginoso; roturas en este margen constituyen la lesión de Bankart o SLAP.',
        coordinates3D: [1.3, 0.4, 0.1]
      },
      {
        id: 'apofisis-coracoides',
        name: 'Apófisis Coracoides (Processus coracoideus)',
        type: 'eminencia_no_articular',
        description: 'Robusta proyección anterior curvada en pico de cuervo situada sobre el borde superior de la glena.',
        clinicalSignificance: 'Punto de fijación del tendón conjunto (cabeza corta del bíceps y coracobraquial), pectoral menor y ligamentos coracoclaviculares.',
        coordinates3D: [0.9, 0.7, 0.6]
      }
    ],
    clinicalNotes: 'La parálisis del nervio torácico largo que inerva al serrato anterior provoca la escápula alada (el borde medial se despega de la pared torácica al empujar una pared).',
    modelType: 'scapula',
    colorTag: '#f97316'
  },

  // --- TÓRAX: ESTERNÓN Y COSTILLAS ---
  {
    id: 'torax',
    name: 'Caja Torácica (Esternón y Costillas)',
    latinName: 'Thorax / Costae et Sternum',
    division: 'axial',
    category: 'plano',
    region: 'torax',
    countInBody: 25,
    description: 'Armazón osteocartilaginoso formado por el esternón y 24 costillas (12 pares: 7 verdaderas, 3 falsas y 2 flotantes) que protegen los pulmones, corazón y grandes vasos mediastínicos.',
    articulations: ['Articulaciones condroesternales y costocondrales', 'Articulaciones costovertebrales y costotransversas', 'Articulación manubrioesternal'],
    muscularAttachments: ['Músculos pectorales mayor y menor', 'Músculos intercostales (externo, interno, íntimo)', 'Músculo diafragma (reborde costal inferior)', 'Músculo esternocleidomastoideo'],
    landmarks: [
      {
        id: 'angulo-de-louis',
        name: 'Ángulo Esternal o Ángulo de Louis',
        type: 'eminencia_no_articular',
        description: 'Unión palpable entre el manubrio y el cuerpo del esternón.',
        clinicalSignificance: 'Hito clínico esencial para contar las costillas (corresponde a la 2ª costilla), marca el nivel del disco T4-T5, bifurcación traqueal (carina) y cayado aórtico.',
        coordinates3D: [0.0, 1.1, 0.9]
      },
      {
        id: 'apofisis-xifoides',
        name: 'Apófisis Xifoides (Processus xiphoideus)',
        type: 'eminencia_no_articular',
        description: 'Extremo inferior cartilaginoso u osificado del esternón.',
        clinicalSignificance: 'Marca el límite inferior del corazón, el centro tendinoso del diafragma y la línea alba abdominal.',
        coordinates3D: [0.0, -0.6, 0.85]
      },
      {
        id: 'surco-costal',
        name: 'Surco Costal Subcostal (Sulcus costae)',
        type: 'depresion',
        description: 'Canal en el borde inferior interno de cada costilla.',
        clinicalSignificance: 'Aloja al paquete vasculonervioso intercostal (Vena, Arteria, Nervio - regla nemotécnica VAN de superior a inferior). Las toracocentesis deben realizarse sobre el borde superior de la costilla inferior para no lesionarlo.',
        coordinates3D: [1.2, 0.2, 0.2]
      }
    ],
    clinicalNotes: 'El tórax inestable o volet costal ocurre cuando múltiples fracturas costales segmentarias independizan un fragmento de pared que se mueve paradójicamente con la respiración.',
    modelType: 'ribcage',
    colorTag: '#06b6d4'
  },

  // --- MIEMBRO INFERIOR: TIBIA Y PERONÉ ---
  {
    id: 'tibia',
    name: 'Tibia y Fíbula (Peroné)',
    latinName: 'Tibia et Fibula',
    division: 'apendicular',
    category: 'largo',
    region: 'miembro-inferior',
    countInBody: 4,
    description: 'Los dos huesos paralelos de la pierna. La tibia es medial, voluminosa y transmite el peso corporal; el peroné es posterolateral, delgado y sirve como pilar de inserción muscular y polea articular.',
    articulations: ['Articulación femorotibial proximal (rodilla)', 'Articulaciones tibioperoneas proximal y distal (sindesmosis)', 'Articulación talocrural (tobillo con el astrágalo)'],
    muscularAttachments: ['Músculo tibial anterior y posterior', 'Músculos tríceps sural (gastrocnemios y sóleo)', 'Músculos peroneos largo y corto', 'Músculos de la pata de ganso (sartorio, grácil, semitendinoso)'],
    landmarks: [
      {
        id: 'tuberosidad-anterior-tibia',
        name: 'Tuberosidad de la Tibia (Tuberositas tibiae)',
        type: 'eminencia_no_articular',
        description: 'Prominencia ósea oval en la cara anterior proximal de la tibia.',
        clinicalSignificance: 'Punto de anclaje del tendón rotuliano. En adolescentes en crecimiento puede inflamarse con avulsión parcial (enfermedad de Osgood-Schlatter).',
        coordinates3D: [0.0, 2.0, 0.6]
      },
      {
        id: 'maleolo-medial',
        name: 'Maléolo Medial (Malleolus medialis)',
        type: 'eminencia_articular',
        description: 'Prominencia piramidal inferior de la tibia que conforma el tobillo interno.',
        clinicalSignificance: 'Articula con el astrágalo y ancla el ligamento deltoideo. Por detrás transita el tendón del tibial posterior y el nervio tibial (túnel del tarso).',
        coordinates3D: [-0.65, -2.4, 0.15]
      },
      {
        id: 'maleolo-lateral',
        name: 'Maléolo Lateral (Malleolus lateralis)',
        type: 'eminencia_articular',
        description: 'Extremo distal expandido del peroné que conforma el tobillo externo.',
        clinicalSignificance: 'Desciende más bajo que el maléolo medial impidiendo la eversión excesiva. Sitio más común de fracturas de tobillo (clasificación de Danis-Weber).',
        coordinates3D: [0.7, -2.55, 0.1]
      },
      {
        id: 'meseta-tibial',
        name: 'Meseta Tibial y Espinas Intercondíleas',
        type: 'eminencia_articular',
        description: 'Superficie articular proximal casi plana dividida en platillos medial y lateral con eminencias intercondíleas centrales.',
        clinicalSignificance: 'Sustenta a los meniscos fibrocartilaginosos. Fracturas de meseta tibial por impacto axial alteran la congruencia articular.',
        coordinates3D: [0.0, 2.6, 0.0]
      }
    ],
    clinicalNotes: 'La diáfisis tibial carece de cobertura muscular en su borde anteromedial (la "espinilla"), situándose directamente bajo la piel; por ello, es el hueso largo más proclive a fracturas expuestas.',
    modelType: 'femur', // Can share visualizer or use specialized skeleton
    colorTag: '#6366f1'
  },

  // --- MANO: CARPO, METACARPO Y FALANGES ---
  {
    id: 'mano',
    name: 'Mano (Carpo, Metacarpo y Falanges)',
    latinName: 'Manus (Ossa carpi, metacarpi et digitorum)',
    division: 'apendicular',
    category: 'corto',
    region: 'miembro-superior',
    countInBody: 54,
    description: 'La extremidad distal del miembro superior posee 27 huesos: 8 huesos carpianos (dispuestos en hilera proximal y distal), 5 metacarpianos y 14 falanges digitales.',
    articulations: ['Articulación radiocarpiana de la muñeca', 'Articulación carpometacarpiana del pulgar (en silla de montar)', 'Articulaciones metacarpofalángicas e interfalángicas'],
    muscularAttachments: ['Músculos tenares e hipotenares', 'Músculos lumbricales e interóseos', 'Tendones flexores profundos y superficiales'],
    landmarks: [
      {
        id: 'hueso-escafoides',
        name: 'Hueso Escafoides (Os scaphoideum)',
        type: 'eminencia_no_articular',
        description: 'Hueso con forma de barquilla en la hilera proximal del carpo, situado bajo la tabaquera anatómica.',
        clinicalSignificance: 'El hueso carpiano más frecuentemente fracturado tras caída con la mano extendida. Debido a su irrigación retrógrada distal a proximal, tiene alto riesgo de pseudoartrosis y necrosis avascular.',
        coordinates3D: [-0.65, -0.9, 0.15]
      },
      {
        id: 'tunel-carpiano',
        name: 'Canal o Túnel Carpiano',
        type: 'depresion',
        description: 'Conducto osteofibroso delimitado por la concavidad de los huesos carpianos (escafoides, trapecio, ganchoso y pisiforme).',
        clinicalSignificance: 'Por él transcurren 9 tendones flexores y el nervio mediano. El síndrome del túnel carpiano genera compresión nerviosa, dolor nocturno y debilidad tenar.',
        coordinates3D: [0.0, -0.6, 0.35]
      },
      {
        id: 'gancho-del-ganchoso',
        name: 'Gancho del Ganchoso (Hamulus ossis hamati)',
        type: 'eminencia_no_articular',
        description: 'Prominencia ósea anterior curvada hacia lateral en el hueso ganchoso (carpo distal).',
        clinicalSignificance: 'Límite lateral del conducto de Guyón por donde pasa el nervio y arteria cubital. Fracturas por impacto directo con bates o raquetas.',
        coordinates3D: [0.65, -0.65, 0.3]
      },
      {
        id: 'cabeza-metacarpianos',
        name: 'Cabezas Metacarpianas (Nudillos)',
        type: 'eminencia_articular',
        description: 'Extremos distales convexos esferoideos de los 5 metacarpianos que articulan con las bases de las falanges proximales.',
        clinicalSignificance: 'La fractura del cuello del quinto metacarpiano se conoce clásicamente como "fractura del boxeador".',
        coordinates3D: [0.0, 0.8, 0.15]
      },
      {
        id: 'articulacion-trapeciometacarpiana',
        name: 'Articulación Trapeciometacarpiana (Silla de montar)',
        type: 'eminencia_articular',
        description: 'Articulación por encaje recíproco entre el trapecio y el primer metacarpiano.',
        clinicalSignificance: 'Permite la oposición del pulgar fundamental para la prensión en pinza. Frecuente rizatrosis del pulgar (artrosis incapacitante).',
        coordinates3D: [-1.15, -0.3, 0.2]
      }
    ],
    clinicalNotes: 'La arquitectura en arco del carpo y las tres arcadas falángicas otorgan a la mano su extraordinaria versatilidad de prensión y destreza fina motora.',
    modelType: 'hand',
    colorTag: '#14b8a6'
  },

  // --- PIE: TARSO, METATARSO Y FALANGES ---
  {
    id: 'pie',
    name: 'Pie (Tarso, Metatarso y Falanges)',
    latinName: 'Pes (Ossa tarsi, metatarsi et digitorum pedis)',
    division: 'apendicular',
    category: 'corto',
    region: 'miembro-inferior',
    countInBody: 52,
    description: 'Estructura ósea distal del miembro inferior compuesta por 26 huesos organizados en tres segmentos: Tarso posterior (calcáneo y astrágalo), Tarso anterior (navicular, cuboides y 3 cuñas), 5 Metatarsianos y 14 Falanges.',
    articulations: ['Articulación talocrural del tobillo', 'Articulación subtalar (talocalcánea)', 'Articulación transversa del tarso (de Chopart)', 'Articulación tarsometatarsiana (de Lisfranc)'],
    muscularAttachments: ['Tendón de Aquiles (calcáneo)', 'Músculo tibial anterior y posterior', 'Músculos peroneo largo y corto', 'Músculos intrínsecos plantares (flexor corto, abductor del hallux)'],
    landmarks: [
      {
        id: 'tuberosidad-calcanea',
        name: 'Tuberosidad del Calcáneo (Tuber calcanei)',
        type: 'eminencia_no_articular',
        description: 'Gran masa ósea posterior del talón que transmite la mayor parte de la carga corporal hacia el suelo.',
        clinicalSignificance: 'Punto de anclaje del tendón calcáneo (Aquiles) y de la fascia plantar. Frecuente sitio de fascitis plantar y formación de espolón calcáneo inferior.',
        coordinates3D: [0.0, -0.4, -2.1]
      },
      {
        id: 'troclea-astragalo',
        name: 'Tróclea del Astrágalo (Trochlea tali)',
        type: 'eminencia_articular',
        description: 'Superficie superior convexa en forma de polea revestida de cartílago hialino que articula con la mortaja tibioperonea.',
        clinicalSignificance: 'Es el hueso clave que transmite el peso desde la pierna hacia el pie. Carece de inserciones musculares directas; sus fracturas comprometen severamente el flujo vascular con alto riesgo de necrosis.',
        coordinates3D: [0.0, 0.85, -0.9]
      },
      {
        id: 'sustentaculum-tali',
        name: 'Sustentáculo del Astrágalo (Sustentaculum tali)',
        type: 'eminencia_no_articular',
        description: 'Repisa ósea horizontal saliente en la cara medial del calcáneo que sirve de apoyo a la faceta media del astrágalo.',
        clinicalSignificance: 'Por su canal inferior discurre el tendón del músculo flexor largo del dedo gordo (hallux).',
        coordinates3D: [-0.75, 0.1, -1.1]
      },
      {
        id: 'tuberosidad-quinto-metatarsiano',
        name: 'Tuberosidad del 5º Metatarsiano',
        type: 'eminencia_no_articular',
        description: 'Prominencia palpable en la base lateral del quinto metatarsiano.',
        clinicalSignificance: 'Punto de anclaje del tendón del músculo peroneo corto. Sitio típico de la "fractura de Jones" y fracturas por avulsión durante esguinces en inversión.',
        coordinates3D: [1.1, -0.2, 0.6]
      },
      {
        id: 'primer-metatarsofalangica',
        name: 'Articulación Metatarsofalángica del Hallux (1ª MTF)',
        type: 'eminencia_articular',
        description: 'Articulación entre la cabeza del primer metatarsiano y la base de la falange proximal del dedo gordo, flanqueada por dos huesos sesamoideos plantares.',
        clinicalSignificance: 'Soporta hasta el 50% de la carga del antepié en la fase de despegue de la marcha. Frecuente desarrollo de juanete (hallux valgus) y ataques agudos de gota (podagra).',
        coordinates3D: [-0.75, -0.15, 2.1]
      }
    ],
    clinicalNotes: 'La arquitectura en triple arco del pie (longitudinal medial, longitudinal lateral y transversal) actúa como un sistema de resorte y amortiguación dinámico. Su colapso produce pie plano (pes planus).',
    modelType: 'foot',
    colorTag: '#0ea5e9'
  }
];

export const SKELETON_OVERVIEW = {
  totalBones: 206,
  axialBones: 80,
  appendicularBones: 126,
  categoriesCount: {
    largos: 90,
    cortos: 32,
    planos: 36,
    irregulares: 44,
    sesamoideos: 4
  },
  functions: [
    { title: 'Sostén Mecánico', desc: 'Constituye el armazón rígido que soporta el peso y los tejidos blandos del organismo.' },
    { title: 'Protección de Órganos Vitales', desc: 'El cráneo protege el encéfalo, la columna la médula espinal y la caja torácica el corazón y pulmones.' },
    { title: 'Palancas Biomecánicas', desc: 'Los huesos actúan como palancas accionadas por los músculos esqueléticos para producir movimiento.' },
    { title: 'Hematopoyesis', desc: 'La médula ósea roja produce eritrocitos, leucocitos y plaquetas (hasta 500 billones de células al día).' },
    { title: 'Depósito Mineral y Homeostasis', desc: 'Almacena el 99% del calcio y 85% del fósforo del cuerpo, regulado por la PTH y calcitonina.' }
  ]
};
