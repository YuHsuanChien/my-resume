'use client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import React, { useEffect, useState } from 'react';

// 註冊 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

interface Pic {
  name: string;
  url: string;
}

export default function Portfolio() {
  /**
   * 使用 state 來追蹤視窗尺寸
   * 當這個 state 改變時，會觸發 useGSAP 重新執行
   */
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // 圖片資料陣列
  const pics: Pic[] = [
    { name: 'CICD', url: '/portfolio/cicd.png' },
    { name: 'gx', url: '/portfolio/gx.png' },
    { name: 'gcp', url: '/portfolio/gcp.png' },
    { name: 'Hofit', url: '/portfolio/Hofit.png' },
    { name: 'xsg', url: '/portfolio/xsg.png' },
    { name: 'stock', url: '/portfolio/stock.png' },
    { name: 'CICD2', url: '/portfolio/cicd.png' },
    { name: 'gx2', url: '/portfolio/gx.png' },
    { name: 'Hofit2', url: '/portfolio/Hofit.png' },
  ];

  // 建立 refs 來引用 DOM 元素
  const container = React.useRef<HTMLDivElement>(null); // 圖片容器
  const wrapper = React.useRef<HTMLElement>(null); // 外層 section
  const imgRefs = React.useRef<(HTMLDivElement | null)[]>([]); // 所有圖片的 ref 陣列

  /**
   * 監聽視窗 resize 事件
   * 使用 useEffect 只在組件掛載時設置一次監聽器
   */
  useEffect(() => {
    // 🎯 步驟 1: 初始化視窗尺寸（組件首次載入時）
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // 用於 debounce 的計時器
    let resizeTimer: NodeJS.Timeout;

    /**
     * 處理 resize 的函數
     * 使用 debounce 技巧：等待使用者停止調整視窗 300ms 後才執行
     * 這樣可以避免在調整過程中頻繁觸發，提升性能
     */
    const handleResize = () => {
      // 清除之前的計時器
      clearTimeout(resizeTimer);

      // 設置新的計時器：300ms 後才更新 state
      resizeTimer = setTimeout(() => {
        // 🎯 步驟 2: 更新視窗尺寸 state
        // 這會觸發 useGSAP 重新執行（因為 windowSize 在 dependencies 中）
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 300); // 300ms 的延遲
    };

    // 🎯 步驟 3: 綁定 resize 事件監聽器
    window.addEventListener('resize', handleResize);

    // 🧹 清理函數：組件卸載時執行
    return () => {
      window.removeEventListener('resize', handleResize); // 移除事件監聽器
      clearTimeout(resizeTimer); // 清除計時器
    };
  }, []); // 空依賴陣列 = 只在組件掛載時執行一次

  /**
   * 🎬 GSAP 動畫主邏輯
   * useGSAP 是專為 React 設計的 hook，會自動處理清理工作
   */
  useGSAP(
    () => {
      // 取得 DOM 元素的引用
      const el = container.current; // 圖片容器
      const wrapperEl = wrapper.current; // 外層容器
      const middlePic = imgRefs.current[4]; // 中間的圖片（索引 4）

      // 安全檢查：如果元素不存在就不執行
      if (!middlePic || !el || !wrapperEl) return;

      // ==================== 動畫設置開始 ====================

      // 📏 步驟 1: 測量容器的原始尺寸
      const rectBefore = el.getBoundingClientRect();
      console.log('📦 容器原始尺寸：', rectBefore);

      // 📏 步驟 2: 將容器放大（設置更大的間距和尺寸）
      gsap.set(el, {
        rowGap: '100px',
        columnGap: '200px',
        width: rectBefore.width * 2,
        height: rectBefore.height * 2,
      });

      // 📏 步驟 3: 測量放大後中間格子的尺寸
      const rect = middlePic.getBoundingClientRect();
      console.log('🔍 放大後格子尺寸：', rect);

      // 🎨 步驟 4: 創建黑色遮罩元素
      const newDiv = document.createElement('div');
      newDiv.className =
        'newDiv bg-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg flex flex-col items-start justify-center overflow-hidden';
      el.appendChild(newDiv);

      // 📝 步驟 5: 創建文字元素
      const vsHead = document.createElement('img');
      const vsSide = document.createElement('img');
      const vsFoot = document.createElement('img');
      vsHead.src = '/portfolio/vscode_head.png';
      vsHead.className = 'w-full flex-shrink-0';
      vsSide.src = '/portfolio/vscode_sidebar.png';
      vsFoot.src = '/portfolio/vscode_footer.png';
      vsFoot.className = 'w-full flex-shrink-0';
      newDiv.appendChild(vsHead);
      newDiv.appendChild(vsSide);
      newDiv.appendChild(vsFoot);

      // ✨ 使用 ResizeObserver 監聽高度變化
      const updateSideHeight = () => {
        const headHeight = vsHead.offsetHeight;
        const footHeight = vsFoot.offsetHeight;
        const containerHeight = newDiv.offsetHeight;
        const remainingHeight = containerHeight - headHeight - footHeight;
        vsSide.style.height = `${remainingHeight}px`;
      };

      const observer = new ResizeObserver(() => {
        updateSideHeight();
      });

      observer.observe(vsHead);
      observer.observe(vsFoot);
      observer.observe(newDiv);

      // 🎨 步驟 6: 設置遮罩的初始尺寸（比格子大兩倍）
      gsap.set('.newDiv', {
        width: rect.width * 1.5,
        height: rect.height * 1.5,
      });

      // 👻 步驟 7: 隱藏中間的圖片，顯示遮罩文字
      gsap.set(middlePic, { opacity: 0 });
      gsap.set('.newSpanEl', { opacity: 1 });
      gsap.set(vsHead, { y: '-100%' });
      gsap.set(vsSide, { x: '-100%' });
      gsap.set(vsFoot, { y: '100%' });

      // 🎬 步驟 8: 創建時間軸動畫（主要的滾動動畫）
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperEl, // 觸發元素：外層 section
          start: 'center center', // 開始位置：元素中心到達視窗中心時
          end: '+=250%', // 結束位置：從開始位置再滾動 250% 的距離
          pin: wrapperEl, // 固定外層元素（滾動時保持在視窗中）
          scrub: 2, // 動畫與滾動同步（值越大越平滑）
          pinSpacing: true, // 為固定元素添加空間
          markers: true, // 不顯示除錯標記
        },
      });

      // 🎬 時間軸動畫序列
      tl.to(el, {
        // 動畫 1: 容器縮小回原始尺寸
        rowGap: '10px',
        columnGap: '35px',
        width: rectBefore.width,
        height: rectBefore.height,
      })
        .to(
          [vsHead, vsSide, vsFoot],
          {
            x: '0%',
            y: '0%',
          },
          -0.8, // 負數表示提前開始（重疊）
        )
        .to(
          '.newDiv',
          {
            // 動畫 3: 遮罩縮小（與動畫 1 重疊 0.4 秒）
            width: rect.width / 1.85,
            height: rect.height / 1.85,
            duration: 1.5,
          },
          -0.4,
        )
        .to('.newDiv', {
          // 動畫 4: 遮罩完全隱藏
          opacity: 0,
          duration: 0.01,
        })
        .to(middlePic, {
          // 動畫 5: 顯示中間的圖片
          opacity: 1,
          duration: 0.01,
        });

      /**
       * 🎬 步驟 9: 中間列向下移動的動畫
       * 為所有 class 包含 'moveEl' 的元素添加滾動動畫
       */
      const moveEls = gsap.utils.toArray<HTMLElement>('.moveEl');
      moveEls.forEach((el) => {
        gsap.to(el, {
          y: 300, // 向下移動 300px
          delay: 0,
          scrollTrigger: {
            trigger: wrapperEl,
            start: '100px top', // 當元素距離視窗頂部 100px 時開始
            end: 'bottom top', // 元素底部到達視窗頂部時結束
            scrub: true, // 與滾動同步
            markers: true, // 顯示除錯標記
          },
        });
      });

      // ==================== 動畫設置結束 ====================

      /**
       * 🧹 清理函數
       * useGSAP 會在以下情況自動執行這個函數：
       * 1. 組件卸載時
       * 2. dependencies 改變時（因為設置了 revertOnUpdate: true）
       */
      return () => {
        // 移除動態創建的遮罩元素，避免重複創建
        const dynamicDiv = el?.querySelector('.newDiv');
        if (dynamicDiv) {
          dynamicDiv.remove();
        }

        // 移除監聽器
        observer.disconnect();
      };
    },
    {
      /**
       * 🎯 關鍵配置：dependencies
       * 當 windowSize 改變時，useGSAP 會：
       * 1. 執行清理函數（移除舊的動畫和元素）
       * 2. 重新執行整個動畫邏輯
       */
      dependencies: [windowSize],

      /**
       * 🎯 關鍵配置：scope
       * 限制 GSAP 選擇器的範圍在 container 內
       * 這樣可以避免影響到頁面其他地方的元素
       */
      scope: container,

      /**
       * 🎯 關鍵配置：revertOnUpdate
       * 設為 true 表示每次 dependencies 更新時：
       * - 自動清理所有 GSAP 動畫
       * - 自動清理所有 ScrollTrigger
       * - 然後重新執行動畫邏輯
       */
      revertOnUpdate: true,
    },
  );

  return (
    <section
      className="text-center text-3xl text-gray-700 w-full h-screen overflow-hidden relative brightness-90"
      ref={wrapper} // 綁定外層容器 ref
    >
      <div
        className="grid grid-cols-3 grid-rows-3 w-full h-full gap-10 px-3 absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        ref={container} // 綁定圖片容器 ref
      >
        {pics.map((pic, index) => {
          return (
            <div
              key={pic.name}
              ref={(el) => {
                // 將每個圖片 div 存入 refs 陣列
                imgRefs.current[index] = el;
              }}
              className={`${
                // 索引 1, 4, 7 的圖片（中間列）添加 moveEl class
                index === 1 || index === 4 || index === 7 ? 'moveEl' : ''
              }`}
            >
              <img
                src={pic.url}
                alt={pic.name}
                className="object-cover w-full h-full shadow-lg"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
