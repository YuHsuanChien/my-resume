'use client';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * 練習 3：圓形排列（圓周運動的數學）
 *
 * 學習目標：
 * 1. 理解三角函數（sin, cos）如何創建圓形
 * 2. 學會用數學公式排列物體
 * 3. 理解 lookAt() 的用法
 * 4. 為環狀畫廊打基礎
 */

export default function Exercise3_CircularArrangement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [objectCount, setObjectCount] = useState(8);
  const [radius, setRadius] = useState(5);
  const [showHelper, setShowHelper] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    // 創建場景
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);

    // 創建相機
    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 10, 12);
    camera.lookAt(0, 0, 0);

    // 創建渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight,
    );
    containerRef.current.appendChild(renderer.domElement);

    // 添加光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);

    // ============================================
    // 🔵 輔助工具（幫助理解座標系）
    // ============================================

    // 座標軸輔助線
    const axesHelper = new THREE.AxesHelper(10);
    scene.add(axesHelper);
    // 紅色 = X軸（左右）
    // 綠色 = Y軸（上下）
    // 藍色 = Z軸（前後）

    // 網格輔助線
    const gridHelper = new THREE.GridHelper(20, 20, 0x444444, 0x222222);
    scene.add(gridHelper);

    // 圓形輔助線
    const circlePoints = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      circlePoints.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          0,
          Math.sin(angle) * radius,
        ),
      );
    }
    const circleGeometry = new THREE.BufferGeometry().setFromPoints(
      circlePoints,
    );
    const circleMaterial = new THREE.LineBasicMaterial({ color: 0xffff00 });
    const circle = new THREE.Line(circleGeometry, circleMaterial);
    scene.add(circle);

    // ============================================
    // 🎯 創建物體群組
    // ============================================
    const objectGroup = new THREE.Group();
    scene.add(objectGroup);

    function createObjects() {
      // 清空舊物體
      while (objectGroup.children.length > 0) {
        objectGroup.remove(objectGroup.children[0]);
      }

      // 創建新物體
      for (let i = 0; i < objectCount; i++) {
        // ============================================
        // 📐 數學！計算圓周上的位置
        // ============================================

        // 計算角度（均勻分布）
        const angle = (i / objectCount) * Math.PI * 2;

        // 🧮 三角函數公式：
        // x = cos(角度) × 半徑
        // z = sin(角度) × 半徑
        // y = 0（水平排列）

        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        console.log(`物體 ${i}:`, {
          角度度數: ((angle * 180) / Math.PI).toFixed(1) + '°',
          角度弧度: angle.toFixed(2),
          X座標: x.toFixed(2),
          Z座標: z.toFixed(2),
        });

        // 創建立方體
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({
          color: new THREE.Color().setHSL(i / objectCount, 1, 0.5), // 彩虹色
          roughness: 0.7,
          metalness: 0.3,
        });
        const cube = new THREE.Mesh(geometry, material);

        // 設定位置
        cube.position.set(x, 0, z);

        // 👀 讓立方體面向圓心（重要！）
        cube.lookAt(0, 0, 0);

        // 添加編號
        cube.userData.index = i;

        objectGroup.add(cube);
      }
    }

    createObjects();

    // ============================================
    // 📊 創建說明文字（3D 文字標籤）
    // ============================================

    // 中心點標記
    const centerGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const centerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const centerMarker = new THREE.Mesh(centerGeometry, centerMaterial);
    centerMarker.position.set(0, 0, 0);
    scene.add(centerMarker);

    // ============================================
    // 🎬 動畫循環
    // ============================================
    let time = 0;

    function animate() {
      requestAnimationFrame(animate);
      time += 0.01;

      // 整個群組旋轉（演示效果）
      objectGroup.rotation.y = time * 0.2;

      // 每個立方體自轉
      objectGroup.children.forEach((cube, index) => {
        cube.rotation.y = time + index;
      });

      // 更新輔助線可見性
      axesHelper.visible = showHelper;
      gridHelper.visible = showHelper;
      circle.visible = showHelper;

      renderer.render(scene, camera);
    }

    animate();

    // 清理
    return () => {
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [objectCount, radius, showHelper]);

  return (
    <div className="w-full h-screen bg-black relative">
      <div ref={containerRef} className="w-full h-full" />

      {/* 控制面板 */}
      <div className="absolute top-6 left-6 bg-black/80 backdrop-blur-md rounded-xl p-6 text-white max-w-md border border-white/20">
        <h2 className="text-2xl font-bold mb-4 text-purple-400">
          📐 練習 3: 圓形排列
        </h2>

        <div className="space-y-4">
          {/* 物體數量控制 */}
          <div>
            <label className="block text-sm font-medium mb-2">
              物體數量: {objectCount}
            </label>
            <input
              type="range"
              min="3"
              max="20"
              value={objectCount}
              onChange={(e) => setObjectCount(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* 半徑控制 */}
          <div>
            <label className="block text-sm font-medium mb-2">
              圓的半徑: {radius.toFixed(1)}
            </label>
            <input
              type="range"
              min="3"
              max="10"
              step="0.5"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* 輔助線開關 */}
          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showHelper}
                onChange={(e) => setShowHelper(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">顯示輔助線</span>
            </label>
          </div>
        </div>

        {/* 數學說明 */}
        <div className="mt-6 pt-4 border-t border-white/20">
          <h3 className="font-semibold text-purple-300 mb-2">🧮 數學公式：</h3>
          <div className="text-xs text-white/80 space-y-2 font-mono bg-white/5 p-3 rounded">
            <div>角度 = (索引 / 總數) × 2π</div>
            <div className="text-blue-300">X = cos(角度) × 半徑</div>
            <div className="text-red-300">Z = sin(角度) × 半徑</div>
            <div className="text-green-300">Y = 0 (水平)</div>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold text-purple-300 mb-2">
            📍 座標軸說明：
          </h3>
          <ul className="text-xs text-white/80 space-y-1">
            <li>
              <span className="text-red-400">紅線</span> = X 軸（左右）
            </li>
            <li>
              <span className="text-green-400">綠線</span> = Y 軸（上下）
            </li>
            <li>
              <span className="text-blue-400">藍線</span> = Z 軸（前後）
            </li>
            <li>
              <span className="text-yellow-400">黃圈</span> = 圓形軌跡
            </li>
          </ul>
        </div>
      </div>

      {/* 數學解釋面板 */}
      <div className="absolute top-6 right-6 bg-black/80 backdrop-blur-md rounded-xl p-6 text-white max-w-sm border border-white/20">
        <h3 className="font-semibold text-purple-300 mb-3">
          🎓 為什麼用 sin 和 cos？
        </h3>

        <div className="text-sm text-white/80 space-y-3">
          <div>
            <div className="font-semibold text-white mb-1">想像時鐘：</div>
            <ul className="text-xs space-y-1">
              <li>12點 → 角度 0° → (0, R)</li>
              <li>3點 → 角度 90° → (R, 0)</li>
              <li>6點 → 角度 180° → (0, -R)</li>
              <li>9點 → 角度 270° → (-R, 0)</li>
            </ul>
          </div>

          <div className="pt-3 border-t border-white/20">
            <div className="font-semibold text-white mb-1">公式推導：</div>
            <div className="text-xs bg-white/5 p-2 rounded font-mono">
              cos(0°) = 1<br />
              sin(0°) = 0<br />
              所以 (cos×R, sin×R) = (R, 0)
              <br />
              <br />
              cos(90°) = 0<br />
              sin(90°) = 1<br />
              所以 (cos×R, sin×R) = (0, R)
            </div>
          </div>

          <div className="pt-3 border-t border-white/20">
            <div className="font-semibold text-yellow-400 mb-1">💡 關鍵：</div>
            <p className="text-xs">
              這就是畫廊的核心！
              <br />
              用這個公式，任何數量的物體
              <br />
              都能均勻排成圓形！
            </p>
          </div>
        </div>
      </div>

      {/* 底部提示 */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-md rounded-xl px-6 py-3 text-white text-sm border border-white/20">
        <p className="text-center">
          🎯 調整滑桿看看圓形如何變化 • 打開 Console 看座標計算
        </p>
      </div>
    </div>
  );
}
