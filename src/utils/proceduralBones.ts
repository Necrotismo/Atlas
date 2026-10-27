/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as THREE from 'three';
import { ViewMode } from '../types/anatomy';

// Procedural bone texture generator
export function createBoneTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Base bone ivory color
  ctx.fillStyle = '#f3ede2';
  ctx.fillRect(0, 0, 512, 512);

  // Subtle bone striae and trabecular micro-porosity
  for (let i = 0; i < 3500; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const radius = Math.random() * 1.6 + 0.3;
    const opacity = Math.random() * 0.08 + 0.02;
    ctx.fillStyle = `rgba(168, 150, 128, ${opacity})`;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  // Longitudinal bone fibers / lamellae streaks
  ctx.fillStyle = 'rgba(195, 178, 156, 0.04)';
  for (let i = 0; i < 180; i++) {
    const y = Math.random() * 512;
    const h = Math.random() * 30 + 10;
    ctx.fillRect(0, y, 512, h);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createBoneNormalMap(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Neutral normal color (128, 128, 255)
  ctx.fillStyle = 'rgb(128, 128, 255)';
  ctx.fillRect(0, 0, 256, 256);

  // Subtle grain
  const imgData = ctx.getImageData(0, 0, 256, 256);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 16;
    data[i] = Math.min(255, Math.max(0, 128 + noise));
    data[i + 1] = Math.min(255, Math.max(0, 128 + noise));
    data[i + 2] = 255;
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

export interface BoneMaterialsCollection {
  realistic: THREE.MeshStandardMaterial;
  xray: THREE.MeshPhysicalMaterial;
  axial: THREE.MeshStandardMaterial;
  appendicular: THREE.MeshStandardMaterial;
  highlighted: THREE.MeshStandardMaterial;
  spongy: THREE.MeshStandardMaterial;
  cartilage: THREE.MeshPhysicalMaterial;
  teeth: THREE.MeshStandardMaterial;
}

export function createMaterials(isSoftwareGl: boolean): BoneMaterialsCollection {
  const boneTex = createBoneTexture();
  const boneNorm = createBoneNormalMap();

  const realistic = new THREE.MeshStandardMaterial({
    color: 0xf5efe6,
    roughness: 0.38,
    metalness: 0.04,
    map: boneTex,
    normalMap: boneNorm,
    normalScale: new THREE.Vector2(0.3, 0.3),
  });

  const xray = new THREE.MeshPhysicalMaterial({
    color: 0x38bdf8,
    emissive: 0x0284c7,
    emissiveIntensity: 0.55,
    roughness: 0.2,
    metalness: 0.1,
    transparent: true,
    opacity: 0.5,
    wireframe: false,
    transmission: isSoftwareGl ? 0 : 0.45,
    depthWrite: false,
  });

  const axial = new THREE.MeshStandardMaterial({
    color: 0x38bdf8, // Cyan / Sky blue for axial skeleton
    roughness: 0.35,
    metalness: 0.1,
  });

  const appendicular = new THREE.MeshStandardMaterial({
    color: 0xf59e0b, // Amber / Warm gold for appendicular skeleton
    roughness: 0.35,
    metalness: 0.1,
  });

  const highlighted = new THREE.MeshStandardMaterial({
    color: 0x10b981, // Emerald green for selected bone
    emissive: 0x059669,
    emissiveIntensity: 0.4,
    roughness: 0.25,
    metalness: 0.05,
  });

  const spongy = new THREE.MeshStandardMaterial({
    color: 0xe2a876,
    roughness: 0.9,
    metalness: 0.0,
    wireframe: true,
  });

  const cartilage = new THREE.MeshPhysicalMaterial({
    color: 0xcde9f6,
    roughness: 0.15,
    metalness: 0.05,
    transparent: true,
    opacity: 0.75,
  });

  const teeth = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.18,
    metalness: 0.02,
  });

  return { realistic, xray, axial, appendicular, highlighted, spongy, cartilage, teeth };
}

// ---------------- MODEL BUILDERS ---------------- //

/**
 * Builds high-detail 3D Femur with trochanters, anatomical neck, head, shaft and condyles
 */
export function buildFemurModel(materials: BoneMaterialsCollection, viewMode: ViewMode): THREE.Group {
  const group = new THREE.Group();
  group.name = 'femur_group';

  const baseMat = viewMode === 'xray' ? materials.xray : materials.realistic;

  // 1. Femoral Head (Caput femoris)
  const headGeo = new THREE.SphereGeometry(0.72, 32, 24);
  const headMesh = new THREE.Mesh(headGeo, baseMat);
  headMesh.position.set(0.75, 2.7, 0.15);
  headMesh.castShadow = true;
  headMesh.receiveShadow = true;
  group.add(headMesh);

  // Fovea capitis (fosa de la cabeza para el ligamento redondo)
  const foveaGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.1, 16);
  const foveaMesh = new THREE.Mesh(foveaGeo, materials.spongy);
  foveaMesh.position.set(1.15, 2.7, 0.15);
  foveaMesh.rotation.z = Math.PI / 2;
  group.add(foveaMesh);

  // 2. Anatomical Neck (Collum femoris)
  const neckCurve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(0.65, 2.65, 0.12),
    new THREE.Vector3(0.4, 2.45, 0.05),
    new THREE.Vector3(0.15, 2.25, 0.0),
    new THREE.Vector3(0.0, 2.1, 0.0)
  );
  const neckGeo = new THREE.TubeGeometry(neckCurve, 20, 0.42, 24, false);
  const neckMesh = new THREE.Mesh(neckGeo, baseMat);
  neckMesh.castShadow = true;
  group.add(neckMesh);

  // 3. Greater Trochanter (Trochanter major)
  const gtGeo = new THREE.BoxGeometry(0.65, 0.9, 0.7, 4, 4, 4);
  const pos = gtGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    if (y > 0) {
      pos.setX(i, pos.getX(i) * 0.85);
      pos.setZ(i, pos.getZ(i) * 0.85);
    }
  }
  gtGeo.computeVertexNormals();
  const gtMesh = new THREE.Mesh(gtGeo, baseMat);
  gtMesh.position.set(-0.65, 2.4, 0.0);
  gtMesh.rotation.z = 0.2;
  gtMesh.castShadow = true;
  group.add(gtMesh);

  // 4. Lesser Trochanter (Trochanter minor)
  const ltGeo = new THREE.ConeGeometry(0.28, 0.55, 18);
  const ltMesh = new THREE.Mesh(ltGeo, baseMat);
  ltMesh.position.set(0.35, 1.85, -0.3);
  ltMesh.rotation.set(-1.1, 0.5, 0.8);
  ltMesh.castShadow = true;
  group.add(ltMesh);

  // Intertrochanteric crest / line
  const crestGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.9, 16);
  const crestMesh = new THREE.Mesh(crestGeo, baseMat);
  crestMesh.position.set(-0.15, 2.15, -0.22);
  crestMesh.rotation.z = -0.7;
  group.add(crestMesh);

  // 5. Femoral Shaft (Diáfisis) with slight anterior bow curvature
  const shaftPoints: THREE.Vector3[] = [];
  const segments = 24;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const y = 1.9 - t * 3.8;
    const anteriorBow = Math.sin(t * Math.PI) * 0.22;
    shaftPoints.push(new THREE.Vector3(0, y, anteriorBow));
  }
  const shaftCurve = new THREE.CatmullRomCurve3(shaftPoints);
  const shaftGeo = new THREE.TubeGeometry(shaftCurve, 32, 0.36, 24, false);
  const shaftMesh = new THREE.Mesh(shaftGeo, baseMat);
  shaftMesh.castShadow = true;
  group.add(shaftMesh);

  // Linea Aspera ridge on the posterior side
  const ridgeGeo = new THREE.BoxGeometry(0.08, 3.2, 0.15);
  const ridgeMesh = new THREE.Mesh(ridgeGeo, baseMat);
  ridgeMesh.position.set(0, 0.1, -0.28);
  group.add(ridgeMesh);

  // 6. Distal Epiphysis / Condyles (Cóndilos medial y lateral)
  const medialCondyleGeo = new THREE.SphereGeometry(0.6, 24, 20);
  medialCondyleGeo.scale(0.85, 0.9, 1.35);
  const medialCondyle = new THREE.Mesh(medialCondyleGeo, baseMat);
  medialCondyle.position.set(0.55, -2.4, 0.05);
  medialCondyle.castShadow = true;
  group.add(medialCondyle);

  const lateralCondyleGeo = new THREE.SphereGeometry(0.58, 24, 20);
  lateralCondyleGeo.scale(0.85, 0.88, 1.25);
  const lateralCondyle = new THREE.Mesh(lateralCondyleGeo, baseMat);
  lateralCondyle.position.set(-0.55, -2.4, 0.05);
  lateralCondyle.castShadow = true;
  group.add(lateralCondyle);

  // Articular cartilage layer on distal condyles
  const cartGeo = new THREE.SphereGeometry(0.61, 24, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
  cartGeo.scale(1.4, 0.6, 1.3);
  const cartMesh = new THREE.Mesh(cartGeo, materials.cartilage);
  cartMesh.position.set(0, -2.6, 0.1);
  group.add(cartMesh);

  // Intercondylar Fossa (depresión posterior)
  const fossaGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.7, 16);
  const fossaMesh = new THREE.Mesh(fossaGeo, materials.spongy);
  fossaMesh.position.set(0, -2.4, -0.35);
  fossaMesh.rotation.x = Math.PI / 2;
  group.add(fossaMesh);

  // Patellar groove (Tróclea femoral anterior)
  const patellarGeo = new THREE.CylinderGeometry(0.48, 0.52, 0.65, 20, 1, false, 0, Math.PI);
  const patellarMesh = new THREE.Mesh(patellarGeo, baseMat);
  patellarMesh.position.set(0, -2.25, 0.35);
  patellarMesh.rotation.y = Math.PI;
  patellarMesh.rotation.z = Math.PI / 2;
  group.add(patellarMesh);

  return group;
}

/**
 * Builds authentic, anatomical 3D Skull model (Neurocranium + Viscerocranium + Mandible)
 */
export function buildSkullModel(materials: BoneMaterialsCollection, viewMode: ViewMode): THREE.Group {
  const group = new THREE.Group();
  group.name = 'skull_group';
  const baseMat = viewMode === 'xray' ? materials.xray : materials.realistic;

  // 1. NEUROCRANIUM (Calvaria & Cranial Vault)
  // Anteroposterior cranial vault with frontal slope and parietal expansion
  const calvariaGeo = new THREE.SphereGeometry(1.28, 36, 28);
  calvariaGeo.scale(0.92, 1.08, 1.28);
  // Flatten temporal fossae and elevate parietal eminences
  const calvPos = calvariaGeo.attributes.position;
  for (let i = 0; i < calvPos.count; i++) {
    const x = calvPos.getX(i);
    const y = calvPos.getY(i);
    const z = calvPos.getZ(i);
    // Indent lateral temporal fossa
    if (Math.abs(x) > 0.65 && z > -0.2 && z < 0.6 && y < 0.8) {
      calvPos.setX(i, x * 0.88);
    }
    // Occipital protuberance contouring
    if (z < -0.8 && y < 0.2) {
      calvPos.setZ(i, z * 1.05);
    }
  }
  calvariaGeo.computeVertexNormals();

  const calvariaMesh = new THREE.Mesh(calvariaGeo, baseMat);
  calvariaMesh.position.set(0, 0.45, -0.05);
  calvariaMesh.castShadow = true;
  group.add(calvariaMesh);

  // Sutures (Coronal & Sagittal lines)
  const sutureMat = new THREE.LineBasicMaterial({ color: 0x927863, linewidth: 2 });
  const coronalPoints: THREE.Vector3[] = [];
  for (let a = -Math.PI / 2.2; a <= Math.PI / 2.2; a += 0.08) {
    coronalPoints.push(
      new THREE.Vector3(
        Math.cos(a) * 1.18,
        Math.sin(a) * 1.35 + 0.45,
        0.18 + (Math.sin(a * 25) * 0.02)
      )
    );
  }
  const coronalGeo = new THREE.BufferGeometry().setFromPoints(coronalPoints);
  group.add(new THREE.Line(coronalGeo, sutureMat));

  const sagittalPoints: THREE.Vector3[] = [];
  for (let z = -0.9; z <= 0.2; z += 0.06) {
    const y = Math.sqrt(Math.max(0, 1.4 - z * z)) * 1.15 + 0.45;
    sagittalPoints.push(new THREE.Vector3((Math.sin(z * 30) * 0.015), y, z));
  }
  const sagittalGeo = new THREE.BufferGeometry().setFromPoints(sagittalPoints);
  group.add(new THREE.Line(sagittalGeo, sutureMat));

  // 2. SUPRAORBITAL TORUS & GLABELLA (Ceja ósea y entrecejo)
  [-1, 1].forEach((side) => {
    const torusCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0, 0.72, 1.15),
      new THREE.Vector3(side * 0.48, 0.76, 1.18),
      new THREE.Vector3(side * 0.92, 0.58, 0.95)
    );
    const torusGeo = new THREE.TubeGeometry(torusCurve, 16, 0.09, 12, false);
    const torusMesh = new THREE.Mesh(torusGeo, baseMat);
    group.add(torusMesh);
  });

  // 3. ANATOMICAL ORBITS (Cuencas orbitarias profundas con inclinación lateral)
  [-0.48, 0.48].forEach((xSide) => {
    // Sharp orbital rim (margo supraorbitalis et infraorbitalis)
    const rimShape = new THREE.Shape();
    const r = 0.36;
    rimShape.moveTo(-r, -r * 0.9);
    rimShape.lineTo(r, -r * 0.9);
    rimShape.quadraticCurveTo(r * 1.1, r * 0.5, r * 0.8, r);
    rimShape.lineTo(-r * 0.8, r);
    rimShape.quadraticCurveTo(-r * 1.1, r * 0.5, -r, -r * 0.9);

    const rimGeo = new THREE.ExtrudeGeometry(rimShape, {
      depth: 0.12,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    });
    const rimMesh = new THREE.Mesh(rimGeo, baseMat);
    rimMesh.position.set(xSide, 0.42, 1.12);
    rimMesh.rotation.y = xSide > 0 ? -0.15 : 0.15;
    group.add(rimMesh);

    // Deep orbital pyramid recess
    const orbitCavityGeo = new THREE.ConeGeometry(0.34, 0.85, 16);
    orbitCavityGeo.scale(1.0, 0.9, 1.0);
    const cavityMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.95 });
    const cavityMesh = new THREE.Mesh(orbitCavityGeo, cavityMat);
    cavityMesh.position.set(xSide, 0.42, 0.82);
    cavityMesh.rotation.x = Math.PI / 2;
    cavityMesh.rotation.y = xSide > 0 ? -0.2 : 0.2;
    group.add(cavityMesh);
  });

  // 4. NASAL SKELETON: Nasal bridge, Piriform Aperture & Septum
  // Nasal bone bridge (puente nasal)
  const nasalBridgeCurve = new THREE.LineCurve3(
    new THREE.Vector3(0, 0.68, 1.16),
    new THREE.Vector3(0, 0.28, 1.34)
  );
  const nasalBridgeGeo = new THREE.TubeGeometry(nasalBridgeCurve, 8, 0.12, 10, false);
  nasalBridgeGeo.scale(1.2, 1.0, 0.6);
  const nasalBridge = new THREE.Mesh(nasalBridgeGeo, baseMat);
  group.add(nasalBridge);

  // Apertura piriforme en gota invertida
  const piriformShape = new THREE.Shape();
  piriformShape.moveTo(0, 0.26);
  piriformShape.bezierCurveTo(0.18, 0.18, 0.22, -0.1, 0.16, -0.22);
  piriformShape.bezierCurveTo(0.08, -0.28, -0.08, -0.28, -0.16, -0.22);
  piriformShape.bezierCurveTo(-0.22, -0.1, -0.18, 0.18, 0, 0.26);

  const piriformGeo = new THREE.ExtrudeGeometry(piriformShape, {
    depth: 0.4,
    bevelEnabled: true,
    bevelSegments: 2,
    bevelSize: 0.04,
    bevelThickness: 0.04,
  });
  const piriformMesh = new THREE.Mesh(piriformGeo, new THREE.MeshStandardMaterial({ color: 0x18181b }));
  piriformMesh.position.set(0, 0.05, 0.95);
  group.add(piriformMesh);

  // Nasal septum (Vómer / Lámina perpendicular del etmoides)
  const septumGeo = new THREE.BoxGeometry(0.03, 0.45, 0.38);
  const septumMesh = new THREE.Mesh(septumGeo, baseMat);
  septumMesh.position.set(0, 0.05, 1.08);
  group.add(septumMesh);

  // Anterior nasal spine (espina nasal anterior)
  const spineGeo = new THREE.ConeGeometry(0.05, 0.14, 8);
  const spineMesh = new THREE.Mesh(spineGeo, baseMat);
  spineMesh.position.set(0, -0.18, 1.25);
  spineMesh.rotation.x = Math.PI / 2.3;
  group.add(spineMesh);

  // 5. ZYGOMATIC ARCHES & MALAR BONES (Pómulos y arcos cigomáticos)
  [-1, 1].forEach((side) => {
    // Malar body (cuerpo del pómulo)
    const malarGeo = new THREE.SphereGeometry(0.32, 16, 14);
    malarGeo.scale(0.85, 1.15, 0.9);
    const malarMesh = new THREE.Mesh(malarGeo, baseMat);
    malarMesh.position.set(side * 0.78, 0.28, 0.92);
    group.add(malarMesh);

    // Zygomatic arch spanning to temporal bone
    const archCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(side * 0.82, 0.24, 0.88),
      new THREE.Vector3(side * 1.12, 0.14, 0.25),
      new THREE.Vector3(side * 0.98, -0.02, -0.42)
    );
    const archGeo = new THREE.TubeGeometry(archCurve, 18, 0.085, 12, false);
    const archMesh = new THREE.Mesh(archGeo, baseMat);
    group.add(archMesh);
  });

  // 6. MAXILLA & UPPER DENTAL ARCH
  const maxillaShape = new THREE.Shape();
  maxillaShape.moveTo(-0.55, 0);
  maxillaShape.bezierCurveTo(-0.6, -0.3, -0.35, -0.48, 0, -0.5);
  maxillaShape.bezierCurveTo(0.35, -0.48, 0.6, -0.3, 0.55, 0);
  maxillaShape.bezierCurveTo(0.4, 0.15, -0.4, 0.15, -0.55, 0);

  const maxillaGeo = new THREE.ExtrudeGeometry(maxillaShape, {
    depth: 0.55,
    bevelEnabled: true,
    bevelSegments: 3,
    bevelSize: 0.05,
    bevelThickness: 0.05,
  });
  const maxillaMesh = new THREE.Mesh(maxillaGeo, baseMat);
  maxillaMesh.position.set(0, -0.05, 0.62);
  group.add(maxillaMesh);

  // Upper teeth parabolic arcade
  for (let i = -7; i <= 7; i++) {
    const isMolar = Math.abs(i) >= 4;
    const toothGeo = new THREE.CylinderGeometry(
      isMolar ? 0.055 : 0.038,
      isMolar ? 0.065 : 0.045,
      isMolar ? 0.16 : 0.2,
      10
    );
    const tooth = new THREE.Mesh(toothGeo, materials.teeth);
    const angle = (i / 7) * (Math.PI / 2.7);
    const radX = 0.48;
    const radZ = 0.38;
    tooth.position.set(
      Math.sin(angle) * radX,
      -0.54,
      0.68 + Math.cos(angle) * radZ
    );
    tooth.rotation.y = angle;
    group.add(tooth);
  }

  // 7. ARTICULATED MANDIBLE (Mandíbula completa con mentón, gonion, ramas y cóndilos)
  const mandibleGroup = new THREE.Group();
  mandibleGroup.name = 'mandible_part';

  // Mandibular Body (Cuerpo mandibular horizontal en U)
  const mandibleBodyCurve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(-0.76, -0.72, 0.05),
    new THREE.Vector3(0, -0.92, 1.08),
    new THREE.Vector3(0.76, -0.72, 0.05)
  );
  const mandibleBodyGeo = new THREE.TubeGeometry(mandibleBodyCurve, 32, 0.16, 16, false);
  const mandibleBodyMesh = new THREE.Mesh(mandibleBodyGeo, baseMat);
  mandibleGroup.add(mandibleBodyMesh);

  // Mental Protuberance / Chin (Prominencia mentoniana anterior)
  const chinGeo = new THREE.SphereGeometry(0.24, 16, 14);
  chinGeo.scale(1.3, 0.9, 1.2);
  const chinMesh = new THREE.Mesh(chinGeo, baseMat);
  chinMesh.position.set(0, -0.98, 1.05);
  mandibleGroup.add(chinMesh);

  // Lower teeth arch
  for (let i = -7; i <= 7; i++) {
    const isMolar = Math.abs(i) >= 4;
    const toothGeo = new THREE.CylinderGeometry(
      isMolar ? 0.055 : 0.035,
      isMolar ? 0.065 : 0.042,
      isMolar ? 0.15 : 0.18,
      10
    );
    const tooth = new THREE.Mesh(toothGeo, materials.teeth);
    const angle = (i / 7) * (Math.PI / 2.8);
    const radX = 0.44;
    const radZ = 0.36;
    tooth.position.set(
      Math.sin(angle) * radX,
      -0.66,
      0.66 + Math.cos(angle) * radZ
    );
    tooth.rotation.y = angle;
    mandibleGroup.add(tooth);
  }

  // Mandibular Rami, Angle of Mandible (Gonion), Coronoid & Condylar Processes
  [-1, 1].forEach((side) => {
    // Mandibular angle (Gonion ~115°-120°)
    const angleGeo = new THREE.BoxGeometry(0.18, 0.32, 0.35);
    const angleMesh = new THREE.Mesh(angleGeo, baseMat);
    angleMesh.position.set(side * 0.76, -0.68, 0.0);
    angleMesh.rotation.y = side * 0.18;
    mandibleGroup.add(angleMesh);

    // Ascending Ramus (Rama ascendente)
    const ramusCurve = new THREE.LineCurve3(
      new THREE.Vector3(side * 0.78, -0.62, 0.0),
      new THREE.Vector3(side * 0.84, -0.18, -0.05)
    );
    const ramusGeo = new THREE.TubeGeometry(ramusCurve, 8, 0.14, 12, false);
    ramusGeo.scale(1.0, 1.0, 1.6);
    const ramusMesh = new THREE.Mesh(ramusGeo, baseMat);
    mandibleGroup.add(ramusMesh);

    // Mandibular Notch & Coronoid Process (anterior sharp projection)
    const coronoidGeo = new THREE.ConeGeometry(0.11, 0.35, 12);
    coronoidGeo.scale(1.0, 1.0, 1.6);
    const coronoidMesh = new THREE.Mesh(coronoidGeo, baseMat);
    coronoidMesh.position.set(side * 0.8, -0.08, 0.26);
    coronoidMesh.rotation.x = -0.25;
    mandibleGroup.add(coronoidMesh);

    // Mandibular Condyle (cabeza articular posterior)
    const condyleGeo = new THREE.SphereGeometry(0.15, 16, 12);
    condyleGeo.scale(1.6, 0.8, 0.9);
    const condyleMesh = new THREE.Mesh(condyleGeo, baseMat);
    condyleMesh.position.set(side * 0.92, -0.04, -0.15);
    mandibleGroup.add(condyleMesh);
  });

  group.add(mandibleGroup);

  // 8. BASE OF SKULL: Foramen Magnum, Occipital Condyles, Mastoids
  const foramenMagnoGeo = new THREE.TorusGeometry(0.26, 0.075, 16, 24);
  const foramenMagno = new THREE.Mesh(foramenMagnoGeo, baseMat);
  foramenMagno.position.set(0, -0.62, -0.42);
  foramenMagno.rotation.x = Math.PI / 2;
  group.add(foramenMagno);

  // Occipital condyles articulating with atlas C1
  [-0.32, 0.32].forEach((side) => {
    const occCondyleGeo = new THREE.SphereGeometry(0.12, 14, 10);
    occCondyleGeo.scale(1.2, 0.8, 1.8);
    const occCondyle = new THREE.Mesh(occCondyleGeo, materials.cartilage);
    occCondyle.position.set(side, -0.66, -0.42);
    group.add(occCondyle);
  });

  // Mastoid processes
  [-0.82, 0.82].forEach((side) => {
    const mastoidGeo = new THREE.ConeGeometry(0.18, 0.48, 14);
    const mastoid = new THREE.Mesh(mastoidGeo, baseMat);
    mastoid.position.set(side, -0.48, -0.52);
    mastoid.rotation.x = Math.PI;
    group.add(mastoid);

    // Styloid process (delicada apófisis estiloides)
    const styloidGeo = new THREE.CylinderGeometry(0.02, 0.015, 0.38, 8);
    const styloid = new THREE.Mesh(styloidGeo, baseMat);
    styloid.position.set(side * 0.65, -0.56, -0.32);
    styloid.rotation.z = side * -0.15;
    group.add(styloid);
  });

  return group;
}

/**
 * Builds high-detail anatomical 3D Hand model (Carpus, Metacarpals, and articulated Phalanges)
 */
export function buildHandModel(materials: BoneMaterialsCollection, viewMode: ViewMode): THREE.Group {
  const group = new THREE.Group();
  group.name = 'hand_group';
  const baseMat = viewMode === 'xray' ? materials.xray : materials.realistic;

  // 1. CARPAL BONES (8 huesos del carpo organizados en arco cóncavo palmar)
  const carpalGroup = new THREE.Group();
  carpalGroup.name = 'carpal_bones';

  // Proximal row: Scaphoid, Lunate, Triquetrum, Pisiform
  // Scaphoid (lateral, boat-shaped)
  const scaphoidGeo = new THREE.SphereGeometry(0.24, 14, 12);
  scaphoidGeo.scale(1.4, 0.9, 1.1);
  const scaphoid = new THREE.Mesh(scaphoidGeo, baseMat);
  scaphoid.position.set(-0.65, -0.9, 0.15);
  carpalGroup.add(scaphoid);

  // Lunate (crescent, central)
  const lunateGeo = new THREE.SphereGeometry(0.22, 14, 12);
  lunateGeo.scale(1.1, 1.0, 1.2);
  const lunate = new THREE.Mesh(lunateGeo, baseMat);
  lunate.position.set(-0.15, -0.95, 0.05);
  carpalGroup.add(lunate);

  // Triquetrum (pyramidal, medial)
  const triquetrumGeo = new THREE.SphereGeometry(0.2, 14, 12);
  const triquetrum = new THREE.Mesh(triquetrumGeo, baseMat);
  triquetrum.position.set(0.35, -0.9, 0.05);
  carpalGroup.add(triquetrum);

  // Pisiform (anterior palmar pebble on triquetrum)
  const pisiformGeo = new THREE.SphereGeometry(0.12, 12, 10);
  const pisiform = new THREE.Mesh(pisiformGeo, baseMat);
  pisiform.position.set(0.42, -0.78, 0.28);
  carpalGroup.add(pisiform);

  // Distal row: Trapezium, Trapezoid, Capitate, Hamate
  // Trapezium (under thumb)
  const trapeziumGeo = new THREE.BoxGeometry(0.28, 0.28, 0.3);
  const trapezium = new THREE.Mesh(trapeziumGeo, baseMat);
  trapezium.position.set(-0.8, -0.5, 0.15);
  carpalGroup.add(trapezium);

  // Trapezoid (under index)
  const trapezoidGeo = new THREE.BoxGeometry(0.22, 0.26, 0.26);
  const trapezoid = new THREE.Mesh(trapezoidGeo, baseMat);
  trapezoid.position.set(-0.35, -0.52, 0.05);
  carpalGroup.add(trapezoid);

  // Capitate (large central head)
  const capitateGeo = new THREE.CylinderGeometry(0.2, 0.22, 0.42, 14);
  const capitate = new THREE.Mesh(capitateGeo, baseMat);
  capitate.position.set(0.08, -0.5, 0.0);
  carpalGroup.add(capitate);

  // Hamate with anterior hook (Hamulus ossis hamati)
  const hamateGeo = new THREE.BoxGeometry(0.32, 0.38, 0.3);
  const hamate = new THREE.Mesh(hamateGeo, baseMat);
  hamate.position.set(0.52, -0.52, 0.05);
  carpalGroup.add(hamate);

  // Hook of Hamate (Hamulus)
  const hamulusCurve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(0.55, -0.55, 0.2),
    new THREE.Vector3(0.68, -0.65, 0.35),
    new THREE.Vector3(0.58, -0.75, 0.32)
  );
  const hamulusGeo = new THREE.TubeGeometry(hamulusCurve, 8, 0.06, 8, false);
  const hamulus = new THREE.Mesh(hamulusGeo, baseMat);
  carpalGroup.add(hamulus);

  group.add(carpalGroup);

  // 2. METACARPALS (5 huesos metacarpianos con base, diáfisis y cabeza articular)
  // Helper to build an articulated ray (metacarpal + phalanges)
  const buildFinger = (
    metaStart: [number, number, number],
    metaLength: number,
    angleY: number,
    angleZ: number,
    phalanxLengths: number[], // [proximal, middle, distal] or [proximal, distal] for thumb
    isThumb: boolean = false
  ) => {
    const fingerGroup = new THREE.Group();
    fingerGroup.position.set(metaStart[0], metaStart[1], metaStart[2]);
    fingerGroup.rotation.y = angleY;
    fingerGroup.rotation.z = angleZ;

    // Metacarpal shaft and head
    const metaCurve = new THREE.LineCurve3(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, metaLength, 0)
    );
    const metaGeo = new THREE.TubeGeometry(metaCurve, 8, isThumb ? 0.12 : 0.09, 10, false);
    const metaMesh = new THREE.Mesh(metaGeo, baseMat);
    fingerGroup.add(metaMesh);

    // Metacarpal rounded head (condyle/knuckle)
    const headGeo = new THREE.SphereGeometry(isThumb ? 0.16 : 0.14, 14, 12);
    headGeo.scale(1.0, 1.15, 1.25);
    const headMesh = new THREE.Mesh(headGeo, baseMat);
    headMesh.position.set(0, metaLength, 0);
    fingerGroup.add(headMesh);

    // Phalanges chain with natural gentle physiological flexion curve
    let currY = metaLength;
    let currZ = 0;

    phalanxLengths.forEach((pLen, pIdx) => {
      const pCurve = new THREE.LineCurve3(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, pLen, -pLen * 0.15) // Slight anterior/palmar flexion
      );
      const pRad = isThumb ? (pIdx === 0 ? 0.11 : 0.095) : 0.08 - pIdx * 0.015;
      const pGeo = new THREE.TubeGeometry(pCurve, 6, pRad, 10, false);
      const pMesh = new THREE.Mesh(pGeo, baseMat);
      pMesh.position.set(0, currY, currZ);

      // Distal tuft (ungual phalanx spatulate tip)
      if (pIdx === phalanxLengths.length - 1) {
        const tuftGeo = new THREE.SphereGeometry(pRad * 1.25, 10, 8);
        tuftGeo.scale(1.3, 0.7, 0.8);
        const tuftMesh = new THREE.Mesh(tuftGeo, baseMat);
        tuftMesh.position.set(0, pLen, -pLen * 0.15);
        pMesh.add(tuftMesh);
      }

      fingerGroup.add(pMesh);
      currY += pLen;
      currZ -= pLen * 0.15;
    });

    return fingerGroup;
  };

  // Thumb (Digit I) - Opposed, diverged laterally and anteriorly at ~35°
  const thumb = buildFinger([-0.88, -0.35, 0.22], 0.95, -0.2, 0.65, [0.72, 0.58], true);
  group.add(thumb);

  // Index (Digit II)
  const index = buildFinger([-0.42, -0.32, 0.1], 1.45, 0, 0.12, [0.95, 0.65, 0.45]);
  group.add(index);

  // Middle (Digit III) - Longest central ray
  const middle = buildFinger([-0.02, -0.28, 0.06], 1.58, 0, 0.0, [1.08, 0.74, 0.48]);
  group.add(middle);

  // Ring (Digit IV)
  const ring = buildFinger([0.36, -0.32, 0.08], 1.42, 0, -0.1, [0.98, 0.68, 0.45]);
  group.add(ring);

  // Little (Digit V) - Shortest medial ray
  const little = buildFinger([0.68, -0.38, 0.1], 1.22, 0, -0.22, [0.78, 0.52, 0.4]);
  group.add(little);

  // Shift whole hand so it centers gracefully in the viewport
  group.position.set(0, -0.6, 0);

  return group;
}

/**
 * Builds high-detail anatomical 3D Foot model (Calcaneus, Talus, Tarsus, Metatarsus, Phalanges)
 */
export function buildFootModel(materials: BoneMaterialsCollection, viewMode: ViewMode): THREE.Group {
  const group = new THREE.Group();
  group.name = 'foot_group';
  const baseMat = viewMode === 'xray' ? materials.xray : materials.realistic;

  // 1. HINDFOOT (Calcaneus and Talus)
  // Calcaneus (Heel bone)
  const calcaneusGeo = new THREE.BoxGeometry(0.85, 0.9, 1.85, 4, 4, 4);
  // Shape the calcaneal tuberosity posteriorly and plantarly
  const cPos = calcaneusGeo.attributes.position;
  for (let i = 0; i < cPos.count; i++) {
    const z = cPos.getZ(i);
    const y = cPos.getY(i);
    if (z < -0.3) {
      // Tuber calcanei expanded posterior rounded shape
      cPos.setX(i, cPos.getX(i) * 1.15);
      cPos.setY(i, y * 1.1);
    }
  }
  calcaneusGeo.computeVertexNormals();
  const calcaneus = new THREE.Mesh(calcaneusGeo, baseMat);
  calcaneus.position.set(0.08, -0.45, -1.25);
  calcaneus.castShadow = true;
  group.add(calcaneus);

  // Sustentaculum Tali (medial shelf)
  const sustGeo = new THREE.BoxGeometry(0.35, 0.22, 0.5);
  const sustMesh = new THREE.Mesh(sustGeo, baseMat);
  sustMesh.position.set(-0.52, -0.15, -1.05);
  group.add(sustMesh);

  // Talus (Astrágalo) resting upon calcaneus with superior trochlea tali
  const talusGeo = new THREE.SphereGeometry(0.55, 20, 16);
  talusGeo.scale(1.2, 0.95, 1.45);
  const talus = new THREE.Mesh(talusGeo, baseMat);
  talus.position.set(0.02, 0.35, -0.75);
  group.add(talus);

  // Trochlea tali (saddle-shaped articular dome for tibia and fibula)
  const trochleaGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.58, 20);
  const trochleaMesh = new THREE.Mesh(trochleaGeo, materials.cartilage);
  trochleaMesh.position.set(0.02, 0.72, -0.75);
  trochleaMesh.rotation.z = Math.PI / 2;
  group.add(trochleaMesh);

  // 2. MIDFOOT (Navicular, Cuboid, and 3 Cuneiforms)
  // Navicular (anterior to talus, medial)
  const navicularGeo = new THREE.CylinderGeometry(0.42, 0.45, 0.4, 16);
  navicularGeo.scale(1.2, 0.8, 1.0);
  const navicular = new THREE.Mesh(navicularGeo, baseMat);
  navicular.position.set(-0.25, 0.12, -0.05);
  navicular.rotation.x = Math.PI / 2;
  group.add(navicular);

  // Cuboid (lateral, anterior to calcaneus)
  const cuboidGeo = new THREE.BoxGeometry(0.55, 0.55, 0.65);
  const cuboid = new THREE.Mesh(cuboidGeo, baseMat);
  cuboid.position.set(0.52, -0.1, -0.12);
  group.add(cuboid);

  // 3 Cuneiforms (Medial, Intermediate, Lateral)
  [-0.45, -0.18, 0.12].forEach((xPos, idx) => {
    const cuneiGeo = new THREE.BoxGeometry(0.24, 0.45, 0.45);
    const cunei = new THREE.Mesh(cuneiGeo, baseMat);
    cunei.position.set(xPos, 0.08 - idx * 0.06, 0.45);
    group.add(cunei);
  });

  // 3. FOREFOOT (5 Metatarsals + Phalanges)
  // Metatarsals with physiological longitudinal arch (medial side lifted higher)
  const metatarsalData = [
    { x: -0.52, y: 0.12, len: 1.45, rad: 0.16, isHallux: true },   // Metatarsal I (thick, strong)
    { x: -0.24, y: 0.15, len: 1.62, rad: 0.10, isHallux: false },  // Metatarsal II (longest)
    { x: 0.04,  y: 0.08, len: 1.55, rad: 0.095, isHallux: false }, // Metatarsal III
    { x: 0.32,  y: 0.00, len: 1.45, rad: 0.09, isHallux: false },  // Metatarsal IV
    { x: 0.62,  y: -0.08, len: 1.35, rad: 0.095, isHallux: false }, // Metatarsal V (with styloid tuberosity)
  ];

  metatarsalData.forEach((meta) => {
    const metaCurve = new THREE.LineCurve3(
      new THREE.Vector3(meta.x, meta.y, 0.7),
      new THREE.Vector3(meta.x * 1.15, -0.4, 0.7 + meta.len)
    );
    const metaGeo = new THREE.TubeGeometry(metaCurve, 10, meta.rad, 10, false);
    const metaMesh = new THREE.Mesh(metaGeo, baseMat);
    group.add(metaMesh);

    // Metatarsal head (condyle)
    const headGeo = new THREE.SphereGeometry(meta.rad * 1.35, 12, 10);
    headGeo.scale(1.0, 0.9, 1.2);
    const headMesh = new THREE.Mesh(headGeo, baseMat);
    headMesh.position.set(meta.x * 1.15, -0.4, 0.7 + meta.len);
    group.add(headMesh);

    // 5th Metatarsal lateral styloid tuberosity (prominencia para el peroneo corto)
    if (meta.x > 0.5) {
      const styloidGeo = new THREE.ConeGeometry(0.12, 0.3, 10);
      const styloid = new THREE.Mesh(styloidGeo, baseMat);
      styloid.position.set(meta.x + 0.15, -0.15, 0.75);
      styloid.rotation.z = -Math.PI / 2.5;
      group.add(styloid);
    }

    // Phalanges for this toe
    const startZ = 0.7 + meta.len + 0.1;
    const startX = meta.x * 1.15;
    const phalanxCount = meta.isHallux ? 2 : 3;
    const pLengths = meta.isHallux ? [0.65, 0.48] : [0.45, 0.32, 0.25];

    let currentZ = startZ;
    pLengths.forEach((pLen, pIdx) => {
      const pCurve = new THREE.LineCurve3(
        new THREE.Vector3(startX, -0.42, currentZ),
        new THREE.Vector3(startX, -0.43, currentZ + pLen)
      );
      const pGeo = new THREE.TubeGeometry(pCurve, 6, meta.rad * (0.8 - pIdx * 0.12), 8, false);
      const pMesh = new THREE.Mesh(pGeo, baseMat);
      group.add(pMesh);
      currentZ += pLen + 0.05;
    });
  });

  // Shift whole foot to sit naturally centered and level
  group.position.set(0, 0.3, 0);

  return group;
}

/**
 * Builds high-detail 3D Vertebra model (Vertebral body, neural arch, pedicles, spinous and transverse processes, foramen)
 */
export function buildVertebraModel(materials: BoneMaterialsCollection, viewMode: ViewMode): THREE.Group {
  const group = new THREE.Group();
  group.name = 'vertebra_group';
  const baseMat = viewMode === 'xray' ? materials.xray : materials.realistic;

  // 1. Vertebral Body (Corpus vertebrae) - Kidney shaped cylinder
  const bodyShape = new THREE.Shape();
  bodyShape.moveTo(-0.9, -0.6);
  bodyShape.bezierCurveTo(-0.9, 0.6, -0.3, 0.9, 0.0, 0.75);
  bodyShape.bezierCurveTo(0.3, 0.9, 0.9, 0.6, 0.9, -0.6);
  bodyShape.bezierCurveTo(0.9, -1.1, -0.9, -1.1, -0.9, -0.6);

  const extrudeSettings = {
    depth: 0.8,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 2,
    bevelSize: 0.08,
    bevelThickness: 0.08,
  };
  const bodyGeo = new THREE.ExtrudeGeometry(bodyShape, extrudeSettings);
  const bodyMesh = new THREE.Mesh(bodyGeo, baseMat);
  bodyMesh.rotation.x = Math.PI / 2;
  bodyMesh.position.set(0, 0.4, 0.6);
  bodyMesh.castShadow = true;
  group.add(bodyMesh);

  // 2. Pedicles (Pedículos)
  [-0.65, 0.65].forEach((side) => {
    const pedicleGeo = new THREE.CylinderGeometry(0.2, 0.22, 0.8, 16);
    const pedicleMesh = new THREE.Mesh(pedicleGeo, baseMat);
    pedicleMesh.position.set(side, 0.0, 0.3);
    pedicleMesh.rotation.x = Math.PI / 2;
    group.add(pedicleMesh);
  });

  // 3. Laminae and Neural Arch creating the Vertebral Foramen
  const archCurve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(-0.65, 0.0, -0.1),
    new THREE.Vector3(0.0, 0.0, -0.8),
    new THREE.Vector3(0.65, 0.0, -0.1)
  );
  const archGeo = new THREE.TubeGeometry(archCurve, 20, 0.22, 16, false);
  const archMesh = new THREE.Mesh(archGeo, baseMat);
  group.add(archMesh);

  // 4. Spinous Process (Apófisis espinosa) projecting backwards and downwards
  const spinousPoints = [
    new THREE.Vector3(0, 0, -0.8),
    new THREE.Vector3(0, -0.25, -1.3),
    new THREE.Vector3(0, -0.55, -1.9),
  ];
  const spinousCurve = new THREE.CatmullRomCurve3(spinousPoints);
  const spinousGeo = new THREE.TubeGeometry(spinousCurve, 16, 0.2, 16, false);
  const spinousMesh = new THREE.Mesh(spinousGeo, baseMat);
  spinousMesh.castShadow = true;
  group.add(spinousMesh);

  // 5. Transverse Processes (Apófisis transversas) projecting laterally
  [-1, 1].forEach((side) => {
    const transPoints = [
      new THREE.Vector3(side * 0.65, 0.0, -0.2),
      new THREE.Vector3(side * 1.25, 0.1, -0.3),
      new THREE.Vector3(side * 1.8, 0.15, -0.35),
    ];
    const transCurve = new THREE.CatmullRomCurve3(transPoints);
    const transGeo = new THREE.TubeGeometry(transCurve, 14, 0.18, 14, false);
    const transMesh = new THREE.Mesh(transGeo, baseMat);
    transMesh.castShadow = true;
    group.add(transMesh);
  });

  // 6. Superior and Inferior Articular Facets (Carillas articulares)
  [-0.6, 0.6].forEach((side) => {
    const supFacetGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.35, 16);
    const supFacet = new THREE.Mesh(supFacetGeo, materials.cartilage);
    supFacet.position.set(side, 0.55, -0.15);
    supFacet.rotation.x = -0.3;
    group.add(supFacet);

    const infFacetGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.3, 16);
    const infFacet = new THREE.Mesh(infFacetGeo, materials.cartilage);
    infFacet.position.set(side * 0.85, -0.5, -0.45);
    infFacet.rotation.x = 0.3;
    group.add(infFacet);
  });

  return group;
}

/**
 * Builds high-detail 3D Pelvis / Coxal bone model
 */
export function buildPelvisModel(materials: BoneMaterialsCollection, viewMode: ViewMode): THREE.Group {
  const group = new THREE.Group();
  group.name = 'pelvis_group';
  const baseMat = viewMode === 'xray' ? materials.xray : materials.realistic;

  // Sacrum in the posterior center
  const sacrumGeo = new THREE.ConeGeometry(0.85, 1.6, 16);
  sacrumGeo.scale(1.2, 1.0, 0.55);
  const sacrumMesh = new THREE.Mesh(sacrumGeo, baseMat);
  sacrumMesh.position.set(0, 0.5, -0.75);
  sacrumMesh.rotation.x = 0.25;
  group.add(sacrumMesh);

  // Both Coxal Bones (Ossa coxae: Ilium, Ischium, Pubis)
  [-1, 1].forEach((side) => {
    const iliumShape = new THREE.Shape();
    iliumShape.moveTo(0, 0);
    iliumShape.bezierCurveTo(side * 0.8, 0.9, side * 1.5, 1.4, side * 1.8, 1.2);
    iliumShape.bezierCurveTo(side * 2.0, 0.6, side * 1.4, -0.1, side * 1.0, -0.5);
    iliumShape.bezierCurveTo(side * 0.5, -0.3, side * 0.2, -0.1, 0, 0);

    const iliumGeo = new THREE.ExtrudeGeometry(iliumShape, {
      depth: 0.15,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: 0.06,
      bevelThickness: 0.06,
    });
    const iliumMesh = new THREE.Mesh(iliumGeo, baseMat);
    iliumMesh.position.set(0, 0.2, 0);
    iliumMesh.castShadow = true;
    group.add(iliumMesh);

    // Acetabulum (Cavidad cotiloidea)
    const acetabulumGeo = new THREE.SphereGeometry(0.5, 20, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const acetabulum = new THREE.Mesh(acetabulumGeo, baseMat);
    acetabulum.position.set(side * 1.15, -0.2, 0.35);
    acetabulum.rotation.y = side * (Math.PI / 2.5);
    acetabulum.rotation.x = 0.3;
    group.add(acetabulum);

    // Obturator Foramen and Ischiopubic Ramus
    const obturatorRingGeo = new THREE.TorusGeometry(0.35, 0.12, 14, 20);
    const obturatorRing = new THREE.Mesh(obturatorRingGeo, baseMat);
    obturatorRing.position.set(side * 0.7, -0.85, 0.4);
    obturatorRing.rotation.y = side * 0.4;
    group.add(obturatorRing);

    // Ischial Tuberosity (Tuberosidad isquiática)
    const ischiaGeo = new THREE.SphereGeometry(0.35, 16, 14);
    ischiaGeo.scale(1.0, 1.2, 1.1);
    const ischiaMesh = new THREE.Mesh(ischiaGeo, baseMat);
    ischiaMesh.position.set(side * 0.8, -1.3, -0.45);
    group.add(ischiaMesh);
  });

  // Pubic Symphysis anterior bridge
  const symphysisGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.4, 16);
  const symphysisMesh = new THREE.Mesh(symphysisGeo, materials.cartilage);
  symphysisMesh.position.set(0, -0.8, 0.95);
  symphysisMesh.rotation.z = Math.PI / 2;
  group.add(symphysisMesh);

  return group;
}

/**
 * Builds high-detail 3D Humerus bone model
 */
export function buildHumerusModel(materials: BoneMaterialsCollection, viewMode: ViewMode): THREE.Group {
  const group = new THREE.Group();
  group.name = 'humerus_group';
  const baseMat = viewMode === 'xray' ? materials.xray : materials.realistic;

  // Head of Humerus
  const headGeo = new THREE.SphereGeometry(0.65, 30, 24);
  headGeo.scale(1.0, 1.05, 0.95);
  const headMesh = new THREE.Mesh(headGeo, baseMat);
  headMesh.position.set(-0.55, 2.3, 0.05);
  headMesh.castShadow = true;
  group.add(headMesh);

  // Greater & Lesser Tubercle
  const gtGeo = new THREE.BoxGeometry(0.5, 0.6, 0.55);
  const gtMesh = new THREE.Mesh(gtGeo, baseMat);
  gtMesh.position.set(0.45, 2.2, 0.1);
  group.add(gtMesh);

  const ltGeo = new THREE.ConeGeometry(0.24, 0.45, 16);
  const ltMesh = new THREE.Mesh(ltGeo, baseMat);
  ltMesh.position.set(-0.1, 2.05, 0.45);
  ltMesh.rotation.x = 0.5;
  group.add(ltMesh);

  // Shaft with Deltoid Tuberosity
  const shaftPoints = [
    new THREE.Vector3(0, 1.9, 0.1),
    new THREE.Vector3(0.08, 0.6, 0.0),
    new THREE.Vector3(0.0, -0.6, -0.05),
    new THREE.Vector3(0, -1.9, 0.0),
  ];
  const shaftCurve = new THREE.CatmullRomCurve3(shaftPoints);
  const shaftGeo = new THREE.TubeGeometry(shaftCurve, 24, 0.32, 20, false);
  const shaftMesh = new THREE.Mesh(shaftGeo, baseMat);
  shaftMesh.castShadow = true;
  group.add(shaftMesh);

  const deltoidGeo = new THREE.BoxGeometry(0.12, 0.8, 0.2);
  const deltoidMesh = new THREE.Mesh(deltoidGeo, baseMat);
  deltoidMesh.position.set(0.38, 0.5, 0.05);
  group.add(deltoidMesh);

  // Distal Epiphysis
  const trochleaGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.5, 20);
  const trochleaMesh = new THREE.Mesh(trochleaGeo, baseMat);
  trochleaMesh.position.set(-0.35, -2.35, 0.05);
  trochleaMesh.rotation.z = Math.PI / 2;
  group.add(trochleaMesh);

  const capitulumGeo = new THREE.SphereGeometry(0.35, 20, 16);
  const capitulumMesh = new THREE.Mesh(capitulumGeo, baseMat);
  capitulumMesh.position.set(0.38, -2.32, 0.12);
  group.add(capitulumMesh);

  const medEpicondyleGeo = new THREE.ConeGeometry(0.25, 0.55, 14);
  const medEpicondyle = new THREE.Mesh(medEpicondyleGeo, baseMat);
  medEpicondyle.position.set(-0.7, -2.2, 0.0);
  medEpicondyle.rotation.z = Math.PI / 2;
  group.add(medEpicondyle);

  const latEpicondyleGeo = new THREE.ConeGeometry(0.2, 0.45, 14);
  const latEpicondyle = new THREE.Mesh(latEpicondyleGeo, baseMat);
  latEpicondyle.position.set(0.7, -2.2, 0.0);
  latEpicondyle.rotation.z = -Math.PI / 2;
  group.add(latEpicondyle);

  const olecranonFossaGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.3, 14);
  const olecranonFossa = new THREE.Mesh(olecranonFossaGeo, materials.spongy);
  olecranonFossa.position.set(-0.1, -2.25, -0.28);
  olecranonFossa.rotation.x = Math.PI / 2;
  group.add(olecranonFossa);

  return group;
}

/**
 * Builds Full Human Skeleton (Esqueleto Humano Completo)
 * With upgraded articulated anatomical skull, hands, and feet!
 */
export function buildFullSkeletonModel(
  materials: BoneMaterialsCollection,
  viewMode: ViewMode,
  selectedBoneId?: string
): THREE.Group {
  const group = new THREE.Group();
  group.name = 'skeleton_group';

  const getMat = (boneId: string, division: 'axial' | 'apendicular') => {
    if (selectedBoneId && selectedBoneId === boneId) {
      return materials.highlighted;
    }
    if (viewMode === 'xray') return materials.xray;
    if (viewMode === 'regions') {
      return division === 'axial' ? materials.axial : materials.appendicular;
    }
    return materials.realistic;
  };

  // 1. CRANIUM (Axial) - Anatomically sculpted head
  const skullGroup = new THREE.Group();
  skullGroup.name = 'bone_craneo';
  const skullMat = getMat('craneo', 'axial');

  // Cranial Vault
  const calvGeo = new THREE.SphereGeometry(0.42, 22, 18);
  calvGeo.scale(0.9, 1.1, 1.25);
  const calvMesh = new THREE.Mesh(calvGeo, skullMat);
  calvMesh.position.set(0, 3.82, 0);
  calvMesh.castShadow = true;
  skullGroup.add(calvMesh);

  // Facial Orbits & Nose
  [-0.14, 0.14].forEach((xSide) => {
    const orbRing = new THREE.TorusGeometry(0.09, 0.025, 8, 16);
    const orbMesh = new THREE.Mesh(orbRing, skullMat);
    orbMesh.position.set(xSide, 3.75, 0.44);
    skullGroup.add(orbMesh);
  });

  const noseSpine = new THREE.ConeGeometry(0.04, 0.14, 8);
  const noseMesh = new THREE.Mesh(noseSpine, skullMat);
  noseMesh.position.set(0, 3.66, 0.48);
  noseMesh.rotation.x = Math.PI / 3;
  skullGroup.add(noseMesh);

  // Mandible
  const mandGeo = new THREE.CylinderGeometry(0.24, 0.28, 0.16, 14, 1, false, 0, Math.PI);
  const mandMesh = new THREE.Mesh(mandGeo, skullMat);
  mandMesh.position.set(0, 3.46, 0.32);
  mandMesh.rotation.y = -Math.PI / 2;
  mandMesh.rotation.x = 0.2;
  skullGroup.add(mandMesh);

  group.add(skullGroup);

  // 2. VERTEBRAL COLUMN (Axial)
  const spineGroup = new THREE.Group();
  spineGroup.name = 'bone_vertebra';
  const spineMat = getMat('vertebra', 'axial');
  for (let i = 0; i < 22; i++) {
    const t = i / 21;
    const y = 3.25 - t * 2.1;
    const zCurve = Math.sin(t * Math.PI * 2) * 0.12 - 0.05;
    const vertGeo = new THREE.CylinderGeometry(0.12 + t * 0.08, 0.14 + t * 0.08, 0.06, 12);
    const vertMesh = new THREE.Mesh(vertGeo, spineMat);
    vertMesh.position.set(0, y, zCurve);
    vertMesh.castShadow = true;
    spineGroup.add(vertMesh);
  }
  group.add(spineGroup);

  // 3. RIBCAGE & STERNUM (Axial)
  const ribcageGroup = new THREE.Group();
  ribcageGroup.name = 'bone_torax';
  const ribMat = getMat('torax', 'axial');

  const sternumGeo = new THREE.BoxGeometry(0.14, 0.9, 0.04);
  const sternumMesh = new THREE.Mesh(sternumGeo, ribMat);
  sternumMesh.position.set(0, 2.35, 0.58);
  ribcageGroup.add(sternumMesh);

  for (let r = 0; r < 10; r++) {
    const t = r / 9;
    const ribY = 2.9 - t * 1.1;
    const radiusX = 0.55 + Math.sin(t * Math.PI) * 0.35;

    [-1, 1].forEach((side) => {
      const ribCurve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, ribY + 0.08, -0.15),
        new THREE.Vector3(side * radiusX, ribY - 0.05, 0.1),
        new THREE.Vector3(side * 0.1, ribY - 0.12, 0.55)
      );
      const ribGeo = new THREE.TubeGeometry(ribCurve, 12, 0.024, 8, false);
      const ribMesh = new THREE.Mesh(ribGeo, ribMat);
      ribcageGroup.add(ribMesh);
    });
  }
  group.add(ribcageGroup);

  // 4. CLAVICLES & SCAPULAE (Appendicular)
  const scapulaGroup = new THREE.Group();
  scapulaGroup.name = 'bone_scapula';
  const scapMat = getMat('scapula', 'apendicular');
  [-1, 1].forEach((side) => {
    const clavCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(side * 0.08, 3.0, 0.45),
      new THREE.Vector3(side * 0.5, 3.05, 0.35),
      new THREE.Vector3(side * 0.95, 2.95, 0.15)
    );
    const clavGeo = new THREE.TubeGeometry(clavCurve, 10, 0.035, 8, false);
    const clavMesh = new THREE.Mesh(clavGeo, scapMat);
    scapulaGroup.add(clavMesh);

    const scapGeo = new THREE.BoxGeometry(0.35, 0.48, 0.04);
    const scapMesh = new THREE.Mesh(scapGeo, scapMat);
    scapMesh.position.set(side * 0.72, 2.65, -0.38);
    scapMesh.rotation.y = side * -0.25;
    scapulaGroup.add(scapMesh);
  });
  group.add(scapulaGroup);

  // 5. PELVIS (Appendicular)
  const pelvisGroup = new THREE.Group();
  pelvisGroup.name = 'bone_pelvis';
  const pelvisMat = getMat('pelvis', 'apendicular');
  [-1, 1].forEach((side) => {
    const iliumGeo = new THREE.SphereGeometry(0.42, 14, 12, 0, Math.PI, 0, Math.PI / 1.5);
    iliumGeo.scale(1.1, 0.9, 0.6);
    const iliumMesh = new THREE.Mesh(iliumGeo, pelvisMat);
    iliumMesh.position.set(side * 0.45, 1.0, 0.05);
    iliumMesh.rotation.z = side * -0.4;
    pelvisGroup.add(iliumMesh);
  });
  group.add(pelvisGroup);

  // 6. UPPER LIMBS: HUMERUS, FOREARM, HAND (Appendicular)
  const humerusGroup = new THREE.Group();
  humerusGroup.name = 'bone_humero';
  const humerusMat = getMat('humero', 'apendicular');
  const handMat = getMat('mano', 'apendicular');

  [-1, 1].forEach((side) => {
    // Humerus
    const humGeo = new THREE.CylinderGeometry(0.065, 0.06, 1.15, 12);
    const humMesh = new THREE.Mesh(humGeo, humerusMat);
    humMesh.position.set(side * 1.15, 2.25, 0.0);
    humerusGroup.add(humMesh);

    // Forearm (Radius & Ulna)
    const radiusGeo = new THREE.CylinderGeometry(0.045, 0.045, 1.1, 10);
    const radiusMesh = new THREE.Mesh(radiusGeo, humerusMat);
    radiusMesh.position.set(side * 1.18, 1.05, 0.05);
    humerusGroup.add(radiusMesh);

    const ulnaGeo = new THREE.CylinderGeometry(0.05, 0.038, 1.1, 10);
    const ulnaMesh = new THREE.Mesh(ulnaGeo, humerusMat);
    ulnaMesh.position.set(side * 1.08, 1.05, -0.05);
    humerusGroup.add(ulnaMesh);

    // Anatomically articulated hand assembly in skeleton
    const handGroup = new THREE.Group();
    handGroup.name = 'bone_mano';
    handGroup.position.set(side * 1.15, 0.38, 0.0);

    // Carpus block
    const carpGeo = new THREE.BoxGeometry(0.12, 0.1, 0.06);
    const carpMesh = new THREE.Mesh(carpGeo, handMat);
    handGroup.add(carpMesh);

    // Thumb diverging
    const thCurve = new THREE.LineCurve3(new THREE.Vector3(side * -0.06, -0.02, 0.02), new THREE.Vector3(side * -0.14, -0.16, 0.08));
    const thGeo = new THREE.TubeGeometry(thCurve, 4, 0.022, 6, false);
    handGroup.add(new THREE.Mesh(thGeo, handMat));

    // 4 fingers
    [-0.03, 0.0, 0.03, 0.055].forEach((fX, fIdx) => {
      const fLen = 0.22 + (fIdx === 1 ? 0.04 : 0);
      const fCurve = new THREE.LineCurve3(
        new THREE.Vector3(side * fX, -0.06, 0),
        new THREE.Vector3(side * fX, -0.06 - fLen, -0.02)
      );
      const fGeo = new THREE.TubeGeometry(fCurve, 6, 0.016, 6, false);
      handGroup.add(new THREE.Mesh(fGeo, handMat));
    });

    group.add(handGroup);
  });
  group.add(humerusGroup);

  // 7. LOWER LIMBS: FEMUR, PATELLA, TIBIA, FIBULA, FOOT (Appendicular)
  const femurGroup = new THREE.Group();
  femurGroup.name = 'bone_femur';
  const femurMat = getMat('femur', 'apendicular');
  const tibiaMat = getMat('tibia', 'apendicular');
  const footMat = getMat('pie', 'apendicular');

  [-1, 1].forEach((side) => {
    // Femur
    const femurStemGeo = new THREE.CylinderGeometry(0.09, 0.085, 1.6, 14);
    const femurStem = new THREE.Mesh(femurStemGeo, femurMat);
    femurStem.position.set(side * 0.48, -0.1, 0.0);
    femurStem.rotation.z = side * 0.08;
    femurGroup.add(femurStem);

    const fHeadGeo = new THREE.SphereGeometry(0.18, 14, 12);
    const fHead = new THREE.Mesh(fHeadGeo, femurMat);
    fHead.position.set(side * 0.32, 0.72, 0.0);
    femurGroup.add(fHead);

    // Patella
    const patellaGeo = new THREE.SphereGeometry(0.1, 12, 10);
    patellaGeo.scale(1.0, 1.2, 0.6);
    const patella = new THREE.Mesh(patellaGeo, femurMat);
    patella.position.set(side * 0.44, -1.0, 0.16);
    femurGroup.add(patella);

    // Tibia
    const tibiaGeo = new THREE.CylinderGeometry(0.1, 0.075, 1.55, 12);
    const tibia = new THREE.Mesh(tibiaGeo, tibiaMat);
    tibia.position.set(side * 0.44, -1.85, 0.0);
    group.add(tibia);

    // Fibula
    const fibulaGeo = new THREE.CylinderGeometry(0.04, 0.038, 1.5, 10);
    const fibula = new THREE.Mesh(fibulaGeo, tibiaMat);
    fibula.position.set(side * 0.62, -1.85, -0.05);
    group.add(fibula);

    // Anatomically articulated foot assembly in skeleton
    const footGroup = new THREE.Group();
    footGroup.name = 'bone_pie';
    footGroup.position.set(side * 0.44, -2.68, 0.0);

    // Calcaneus heel block
    const calcGeo = new THREE.BoxGeometry(0.14, 0.12, 0.24);
    const calcMesh = new THREE.Mesh(calcGeo, footMat);
    calcMesh.position.set(0, 0.0, -0.1);
    footGroup.add(calcMesh);

    // Talus dome
    const talGeo = new THREE.SphereGeometry(0.08, 10, 8);
    const talMesh = new THREE.Mesh(talGeo, footMat);
    talMesh.position.set(0, 0.08, 0.0);
    footGroup.add(talMesh);

    // Midfoot arch and metatarsals
    const metaGeo = new THREE.CylinderGeometry(0.02, 0.022, 0.28, 8);
    // Hallux ray
    const halluxMesh = new THREE.Mesh(metaGeo, footMat);
    halluxMesh.position.set(side * -0.04, -0.04, 0.2);
    halluxMesh.rotation.x = Math.PI / 2;
    footGroup.add(halluxMesh);

    // Lateral rays
    [0.0, 0.03, 0.06].forEach((mX) => {
      const rayMesh = new THREE.Mesh(metaGeo, footMat);
      rayMesh.position.set(side * mX, -0.04, 0.18);
      rayMesh.rotation.x = Math.PI / 2;
      footGroup.add(rayMesh);
    });

    group.add(footGroup);
  });
  group.add(femurGroup);

  return group;
}

/**
 * Builds Bone Histology / Cross-Section Model
 */
export function buildHistologyModel(materials: BoneMaterialsCollection): THREE.Group {
  const group = new THREE.Group();
  group.name = 'histology_group';

  // 1. External Periosteum outer sleeve (half cutaway)
  const periosteumGeo = new THREE.CylinderGeometry(1.62, 1.62, 3.2, 32, 1, false, 0, Math.PI * 1.35);
  const periosteumMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    roughness: 0.6,
    metalness: 0.05,
    side: THREE.DoubleSide,
  });
  const periosteum = new THREE.Mesh(periosteumGeo, periosteumMat);
  group.add(periosteum);

  // 2. Compact Bone Cortical Ring with Osteons (Haversian canals)
  const cortexGeo = new THREE.CylinderGeometry(1.58, 1.58, 3.15, 32, 1, false, 0, Math.PI * 1.35);
  const cortex = new THREE.Mesh(cortexGeo, materials.realistic);
  group.add(cortex);

  // Concentric osteon cylindrical rings visible on the cross section
  const osteonMat = new THREE.MeshStandardMaterial({ color: 0xeadbc8, roughness: 0.4 });
  for (let o = 0; o < 8; o++) {
    const angle = (o / 8) * (Math.PI * 1.35);
    const rad = 1.25;
    const osteonGeo = new THREE.CylinderGeometry(0.18, 0.18, 3.16, 16);
    const osteon = new THREE.Mesh(osteonGeo, osteonMat);
    osteon.position.set(Math.cos(angle) * rad, 0, Math.sin(angle) * rad);
    group.add(osteon);

    // Central Haversian canal (red/blue neurovascular vessel)
    const vesselGeo = new THREE.CylinderGeometry(0.04, 0.04, 3.18, 10);
    const vesselMat = new THREE.MeshStandardMaterial({
      color: o % 2 === 0 ? 0xef4444 : 0x3b82f6,
      roughness: 0.2,
    });
    const vessel = new THREE.Mesh(vesselGeo, vesselMat);
    vessel.position.set(Math.cos(angle) * rad, 0, Math.sin(angle) * rad);
    group.add(vessel);
  }

  // 3. Spongy Bone / Trabecular core
  const spongyGeo = new THREE.CylinderGeometry(0.95, 0.95, 3.1, 24, 1, false, 0, Math.PI * 1.35);
  const spongyCore = new THREE.Mesh(spongyGeo, materials.spongy);
  group.add(spongyCore);

  // 4. Medullary Cavity with Yellow/Red Bone Marrow
  const marrowGeo = new THREE.CylinderGeometry(0.45, 0.45, 3.15, 20);
  const marrowMat = new THREE.MeshStandardMaterial({
    color: 0xd97706,
    roughness: 0.7,
  });
  const marrow = new THREE.Mesh(marrowGeo, marrowMat);
  group.add(marrow);

  return group;
}
