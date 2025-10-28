'use client';

import { group } from 'console';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function AboutMe() {
  const container = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const [inputValue, setInputValue] = useState<number | ''>('');

  function createScene() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 5, 20);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.current!.appendChild(renderer.domElement);

    // 儲存到 ref 中以便其他地方使用
    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;
  }

  function clearCubes(scene: THREE.Scene) {
    // 清除舊的群組
    if (groupRef.current) {
      scene.remove(groupRef.current); // 重要：從場景中移除群組

      // 清理記憶體：遍歷群組中的所有物件並釋放資源
      groupRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((material) => material.dispose());
          } else {
            child.material.dispose();
          }
        }
      });

      groupRef.current = null;
    }
  }

  function addCubes(scene: THREE.Scene) {
    if (typeof inputValue !== 'number' || inputValue <= 0) return;
    const group = new THREE.Group();

    // 先清除舊的方塊
    clearCubes(scene);

    Array(inputValue)
      .fill(0)
      .forEach((_, index) => {
        // 第一個參數是元素值(0)，第二個是索引
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);

        // 圓形排列的數學公式
        const radius = 8; // 環的半徑
        const angle = (index / inputValue) * Math.PI * 2; // 每個方塊的角度

        cube.position.set(
          Math.cos(angle) * radius, // x = cos(角度) × 半徑
          0, // y 保持在同一水平面
          Math.sin(angle) * radius, // z = sin(角度) × 半徑
        );

        cube.lookAt(0, 0, 0); // 讓方塊面向中心點

        group.add(cube);
      });

    scene.add(group);
    groupRef.current = group;
  }

  function animate() {
    animationIdRef.current = requestAnimationFrame(() => animate());
    if (!groupRef.current) return;
    groupRef.current.rotation.y += 0.01; // 旋轉整個群組
    rendererRef.current!.render(sceneRef.current!, cameraRef.current!);
  }

  // 初始化場景
  useEffect(() => {
    if (container.current === null) return;

    createScene();
    addCubes(sceneRef.current!);
    if (!groupRef.current) return;

    animate();

    // 清理函數
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (rendererRef.current && container.current) {
        container.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
      if (sceneRef.current) {
        clearCubes(sceneRef.current);
      }
    };
  }, []);

  // 當 inputValue 改變時更新方塊
  useEffect(() => {
    if (sceneRef.current) {
      addCubes(sceneRef.current);
      animate();
    }
  }, [inputValue]);

  return (
    <div ref={container} className="w-full h-screen relative">
      <div className="absolute top-4 left-4 z-10 text-white">
        <input
          type="number"
          className="border border-white bg-transparent px-2 py-1"
          value={inputValue}
          onChange={(e) => setInputValue(Number(e.target.value) || '')}
          placeholder="輸入方塊數量"
        />
      </div>
    </div>
  );
}
