/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { BoneData, BoneLandmark, ViewMode } from '../types/anatomy';
import {
  buildFemurModel,
  buildFootModel,
  buildFullSkeletonModel,
  buildHandModel,
  buildHistologyModel,
  buildHumerusModel,
  buildPelvisModel,
  buildSkullModel,
  buildVertebraModel,
  createMaterials,
} from '../utils/proceduralBones';

interface AnatomyViewer3DProps {
  selectedBone: BoneData | null;
  viewMode: ViewMode;
  showLandmarks: boolean;
  activeLandmark: BoneLandmark | null;
  onSelectLandmark: (landmark: BoneLandmark | null) => void;
  onSelectBoneById: (boneId: string) => void;
  showHistology: boolean;
}

export const AnatomyViewer3D: React.FC<AnatomyViewer3DProps> = ({
  selectedBone,
  viewMode,
  showLandmarks,
  activeLandmark,
  onSelectLandmark,
  onSelectBoneById,
  showHistology,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const currentModelGroupRef = useRef<THREE.Group | null>(null);
  const pinsGroupRef = useRef<THREE.Group | null>(null);

  const [hoveredLandmark, setHoveredLandmark] = useState<BoneLandmark | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const [isRotating, setIsRotating] = useState(false);

  // Keep latest props in refs to avoid recreating the Three.js loop
  const propsRef = useRef({
    selectedBone,
    viewMode,
    showLandmarks,
    activeLandmark,
    onSelectLandmark,
    onSelectBoneById,
    showHistology,
  });
  useEffect(() => {
    propsRef.current = {
      selectedBone,
      viewMode,
      showLandmarks,
      activeLandmark,
      onSelectLandmark,
      onSelectBoneById,
      showHistology,
    };
  }, [selectedBone, viewMode, showLandmarks, activeLandmark, onSelectLandmark, onSelectBoneById, showHistology]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Detect Software WebGL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 2. Initialize Renderer
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 3. Scene and Horizon Fog
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0f1d); // Deep slate medical background
    scene.fog = new THREE.Fog(0x0a0f1d, 7, 24);
    sceneRef.current = scene;

    // Studio Environment Reflection via RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 4. Camera & OrbitControls
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 7.5);
    cameraRef.current = camera;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.05;
    controls.minDistance = 1.8;
    controls.maxDistance = 16.0;
    controls.target.set(0, 0.5, 0);
    controlsRef.current = controls;

    // 5. Lighting Rig (Warm Key Light, Cool Sky Fill, Rim Light)
    const keyLight = new THREE.DirectionalLight(0xfff8eb, 2.0);
    keyLight.position.set(4, 7, 5);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.shadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const fillLight = new THREE.HemisphereLight(0x7dd3fc, 0x1e293b, 1.2);
    fillLight.position.set(0, 8, 0);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xa5f3fc, 1.4);
    rimLight.position.set(-5, 4, -5);
    scene.add(rimLight);

    // Soft Contact Shadow Ground Plane
    const shadowGeo = new THREE.PlaneGeometry(10, 10);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x030712,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -3.1;
    scene.add(shadowPlane);

    // Subtle Ground Grid
    const gridHelper = new THREE.GridHelper(12, 24, 0x1e293b, 0x0f172a);
    gridHelper.position.y = -3.09;
    scene.add(gridHelper);

    // Groups for active model and landmark pins
    const pinsGroup = new THREE.Group();
    pinsGroup.name = 'pins_group';
    scene.add(pinsGroup);
    pinsGroupRef.current = pinsGroup;

    // Raycaster for interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      // Check pin intersections first
      if (pinsGroupRef.current && pinsGroupRef.current.children.length > 0) {
        const pinIntersects = raycaster.intersectObjects(pinsGroupRef.current.children, true);
        if (pinIntersects.length > 0) {
          let obj: THREE.Object3D | null = pinIntersects[0].object;
          while (obj && !obj.userData?.landmark) {
            obj = obj.parent;
          }
          if (obj?.userData?.landmark) {
            setHoveredLandmark(obj.userData.landmark);
            setTooltipPos({ x: e.clientX, y: e.clientY });
            container.style.cursor = 'pointer';
            return;
          }
        }
      }

      // Check bone intersections in full skeleton
      if (currentModelGroupRef.current) {
        const boneIntersects = raycaster.intersectObjects(currentModelGroupRef.current.children, true);
        if (boneIntersects.length > 0) {
          let topParent: THREE.Object3D | null = boneIntersects[0].object;
          while (topParent && topParent.parent !== currentModelGroupRef.current && topParent.parent !== scene) {
            topParent = topParent.parent;
          }
          if (topParent && topParent.name.startsWith('bone_')) {
            container.style.cursor = 'pointer';
            setHoveredLandmark(null);
            setTooltipPos(null);
            return;
          }
        }
      }

      container.style.cursor = 'grab';
      setHoveredLandmark(null);
      setTooltipPos(null);
    };

    const onClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      // 1. Check if landmark pin was clicked
      if (pinsGroupRef.current && pinsGroupRef.current.children.length > 0) {
        const pinIntersects = raycaster.intersectObjects(pinsGroupRef.current.children, true);
        if (pinIntersects.length > 0) {
          let obj: THREE.Object3D | null = pinIntersects[0].object;
          while (obj && !obj.userData?.landmark) {
            obj = obj.parent;
          }
          if (obj?.userData?.landmark) {
            propsRef.current.onSelectLandmark(obj.userData.landmark);
            return;
          }
        }
      }

      // 2. Check if a bone was clicked in the skeleton
      if (currentModelGroupRef.current) {
        const boneIntersects = raycaster.intersectObjects(currentModelGroupRef.current.children, true);
        if (boneIntersects.length > 0) {
          let topParent: THREE.Object3D | null = boneIntersects[0].object;
          while (topParent && topParent.parent !== currentModelGroupRef.current && topParent.parent !== scene) {
            topParent = topParent.parent;
          }
          if (topParent && topParent.name.startsWith('bone_')) {
            const boneId = topParent.name.replace('bone_', '');
            propsRef.current.onSelectBoneById(boneId);
          }
        }
      }
    };

    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('click', onClick);

    // Resize handler
    const onResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    let animId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (controls.autoRotate) {
        controls.update();
      } else if (!isSoftwareGl) {
        controls.update();
      }

      // Subtle float animation for landmark pin beacons
      if (pinsGroupRef.current) {
        const elapsed = clock.getElapsedTime();
        pinsGroupRef.current.children.forEach((pin, idx) => {
          const sphere = pin.getObjectByName('pin_sphere');
          if (sphere) {
            sphere.position.y = (pin.userData.origY || 0) + Math.sin(elapsed * 3 + idx) * 0.04;
          }
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('click', onClick);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Effect to rebuild or swap 3D models when selectedBone, viewMode, or showHistology changes
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    // Clean up previous model
    if (currentModelGroupRef.current) {
      scene.remove(currentModelGroupRef.current);
      currentModelGroupRef.current = null;
    }

    // Clean up pins
    if (pinsGroupRef.current) {
      while (pinsGroupRef.current.children.length > 0) {
        pinsGroupRef.current.remove(pinsGroupRef.current.children[0]);
      }
    }

    // Initialize materials
    const materials = createMaterials(false);

    let newModel: THREE.Group;

    if (showHistology) {
      newModel = buildHistologyModel(materials);
      if (controlsRef.current && cameraRef.current) {
        cameraRef.current.position.set(0, 0.8, 6.0);
        controlsRef.current.target.set(0, 0, 0);
      }
    } else if (!selectedBone) {
      // Full Skeleton view
      newModel = buildFullSkeletonModel(materials, viewMode);
      if (controlsRef.current && cameraRef.current) {
        cameraRef.current.position.set(0, 0.8, 8.5);
        controlsRef.current.target.set(0, 0.6, 0);
      }
    } else {
      // Specialized bone model
      switch (selectedBone.modelType) {
        case 'femur':
          newModel = buildFemurModel(materials, viewMode);
          if (controlsRef.current && cameraRef.current) {
            cameraRef.current.position.set(0, 0.2, 7.5);
            controlsRef.current.target.set(0, 0, 0);
          }
          break;
        case 'skull':
          newModel = buildSkullModel(materials, viewMode);
          if (controlsRef.current && cameraRef.current) {
            cameraRef.current.position.set(0, 0.2, 5.5);
            controlsRef.current.target.set(0, 0, 0);
          }
          break;
        case 'vertebra':
          newModel = buildVertebraModel(materials, viewMode);
          if (controlsRef.current && cameraRef.current) {
            cameraRef.current.position.set(0, 1.8, 5.2);
            controlsRef.current.target.set(0, 0, 0);
          }
          break;
        case 'pelvis':
          newModel = buildPelvisModel(materials, viewMode);
          if (controlsRef.current && cameraRef.current) {
            cameraRef.current.position.set(0, 0.2, 6.2);
            controlsRef.current.target.set(0, 0, 0);
          }
          break;
        case 'humerus':
          newModel = buildHumerusModel(materials, viewMode);
          if (controlsRef.current && cameraRef.current) {
            cameraRef.current.position.set(0, 0.2, 7.2);
            controlsRef.current.target.set(0, 0, 0);
          }
          break;
        case 'hand':
          newModel = buildHandModel(materials, viewMode);
          if (controlsRef.current && cameraRef.current) {
            cameraRef.current.position.set(0, 0.2, 5.8);
            controlsRef.current.target.set(0, 0, 0);
          }
          break;
        case 'foot':
          newModel = buildFootModel(materials, viewMode);
          if (controlsRef.current && cameraRef.current) {
            cameraRef.current.position.set(3.2, 2.4, 4.2);
            controlsRef.current.target.set(0, -0.1, 0);
          }
          break;
        default:
          // For other bones, show the full skeleton highlighting the bone
          newModel = buildFullSkeletonModel(materials, viewMode, selectedBone.id);
          if (controlsRef.current && cameraRef.current) {
            cameraRef.current.position.set(0, 0.8, 8.5);
            controlsRef.current.target.set(0, 0.6, 0);
          }
          break;
      }

      // Add 3D Landmark Pins if enabled
      if (showLandmarks && pinsGroupRef.current && selectedBone.landmarks.length > 0) {
        selectedBone.landmarks.forEach((landmark) => {
          if (!landmark.coordinates3D) return;

          const [x, y, z] = landmark.coordinates3D;
          const pinGroup = new THREE.Group();
          pinGroup.position.set(x, y, z);
          pinGroup.userData = { landmark, origY: y };

          const isActive = activeLandmark?.id === landmark.id;

          // Glowing Sphere Pin
          const sphereGeo = new THREE.SphereGeometry(0.12, 16, 16);
          const sphereMat = new THREE.MeshStandardMaterial({
            color: isActive ? 0xef4444 : landmark.type === 'eminencia_articular' ? 0x38bdf8 : landmark.type === 'depresion' ? 0xf59e0b : 0x10b981,
            emissive: isActive ? 0xdc2626 : landmark.type === 'eminencia_articular' ? 0x0284c7 : landmark.type === 'depresion' ? 0xd97706 : 0x059669,
            emissiveIntensity: isActive ? 0.9 : 0.6,
            roughness: 0.2,
          });
          const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
          sphereMesh.name = 'pin_sphere';
          pinGroup.add(sphereMesh);

          // Pulsing halo ring around active or highlighted pin
          const ringGeo = new THREE.RingGeometry(0.16, 0.22, 24);
          const ringMat = new THREE.MeshBasicMaterial({
            color: isActive ? 0xffffff : 0x38bdf8,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.7,
          });
          const ringMesh = new THREE.Mesh(ringGeo, ringMat);
          ringMesh.lookAt(new THREE.Vector3(0, 1.2, 7.5));
          pinGroup.add(ringMesh);

          // Indicator pointer stem
          const stemGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.25, 8);
          const stemMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 });
          const stemMesh = new THREE.Mesh(stemGeo, stemMat);
          stemMesh.position.y = -0.15;
          pinGroup.add(stemMesh);

          pinsGroupRef.current?.add(pinGroup);
        });
      }
    }

    scene.add(newModel);
    currentModelGroupRef.current = newModel;
  }, [selectedBone, viewMode, showLandmarks, activeLandmark, showHistology]);

  // Camera preset handler
  const setCameraView = (view: 'anterior' | 'posterior' | 'lateral' | 'superior') => {
    if (!cameraRef.current || !controlsRef.current) return;
    const dist = selectedBone ? 6.5 : 8.5;
    const targetY = selectedBone ? 0 : 0.6;

    controlsRef.current.target.set(0, targetY, 0);

    switch (view) {
      case 'anterior':
        cameraRef.current.position.set(0, targetY, dist);
        break;
      case 'posterior':
        cameraRef.current.position.set(0, targetY, -dist);
        break;
      case 'lateral':
        cameraRef.current.position.set(dist, targetY, 0);
        break;
      case 'superior':
        cameraRef.current.position.set(0, dist + 1, 0.01);
        break;
    }
    controlsRef.current.update();
  };

  const toggleAutoRotate = () => {
    if (controlsRef.current) {
      const nextState = !isRotating;
      controlsRef.current.autoRotate = nextState;
      controlsRef.current.autoRotateSpeed = 1.8;
      setIsRotating(nextState);
    }
  };

  const resetCamera = () => {
    if (!cameraRef.current || !controlsRef.current) return;
    cameraRef.current.position.set(0, selectedBone ? 0.2 : 0.8, selectedBone ? 6.5 : 8.5);
    controlsRef.current.target.set(0, selectedBone ? 0 : 0.6, 0);
    controlsRef.current.update();
  };

  return (
    <div className="relative w-full h-full select-none overflow-hidden bg-slate-950">
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating 3D Landmark Hover Tooltip */}
      {hoveredLandmark && tooltipPos && (
        <div
          className="fixed pointer-events-none z-40 transform -translate-x-1/2 -translate-y-full mb-3 px-3 py-2 bg-slate-900 border border-teal-500/50 rounded-lg shadow-2xl text-left"
          style={{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y}px` }}
        >
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                hoveredLandmark.type === 'eminencia_articular'
                  ? 'bg-sky-400'
                  : hoveredLandmark.type === 'depresion'
                  ? 'bg-amber-400'
                  : hoveredLandmark.type === 'orificio'
                  ? 'bg-purple-400'
                  : 'bg-emerald-400'
              }`}
            />
            <p className="text-xs font-bold text-white tracking-wide">{hoveredLandmark.name}</p>
          </div>
          <p className="text-[10px] text-teal-300 capitalize mt-0.5">
            {hoveredLandmark.type.replace('_', ' ')} • Haz clic para inspeccionar
          </p>
        </div>
      )}

      {/* Quick View Controls Bar (Camera Presets & Rotate) */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 items-end">
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-1.5 flex gap-1 shadow-xl">
          <button
            onClick={() => setCameraView('anterior')}
            className="px-2.5 py-1 text-xs font-medium rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
            title="Vista Anterior"
          >
            Ant
          </button>
          <button
            onClick={() => setCameraView('posterior')}
            className="px-2.5 py-1 text-xs font-medium rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
            title="Vista Posterior"
          >
            Post
          </button>
          <button
            onClick={() => setCameraView('lateral')}
            className="px-2.5 py-1 text-xs font-medium rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
            title="Vista Lateral"
          >
            Lat
          </button>
          <button
            onClick={() => setCameraView('superior')}
            className="px-2.5 py-1 text-xs font-medium rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
            title="Vista Superior"
          >
            Sup
          </button>
          <div className="w-px h-5 bg-slate-800 my-auto mx-0.5" />
          <button
            onClick={toggleAutoRotate}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition ${
              isRotating
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
            title="Rotación automática"
          >
            {isRotating ? 'Pausar' : 'Girar 360°'}
          </button>
          <button
            onClick={resetCamera}
            className="px-2.5 py-1 text-xs font-medium rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Restablecer posición inicial"
          >
            Reiniciar
          </button>
        </div>

        {/* Reparos Óseos Active Indicator Badge */}
        {selectedBone && showLandmarks && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-lg px-3 py-1.5 text-[11px] text-slate-300 flex items-center gap-2 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-teal-400" />
            <span>{selectedBone.landmarks.length} Reparos Óseos Interactivos</span>
          </div>
        )}
      </div>
    </div>
  );
};
